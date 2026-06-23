# Design — Backend (итерация 2: Бронирование + Личный кабинет)

## 1. Стек

- **FastAPI** + **Uvicorn**
- **Motor** (async MongoDB driver) — без ODM-фреймворков сверху (KISS):
  Pydantic v2 модели + прямые запросы через Motor.
- **pydantic-settings** для конфига (`.env`)
- **MongoDB 7** через Docker Compose
- Обычный `venv` + `requirements.txt` (без uv/poetry)

## 2. Структура

```
mleko/
├── docker-compose.yml        # сервис mongo
├── backend/
│   ├── requirements.txt
│   ├── .env.example
│   └── app/
│       ├── main.py            # FastAPI app, CORS, lifespan (connect/close Mongo)
│       ├── config.py          # Settings: mongo_uri, mongo_db, cors_origins
│       ├── db.py              # get_database() -> AsyncIOMotorDatabase
│       ├── seed.py            # наполняет bookings/requests/users из mock-данных
│       ├── models/
│       │   ├── booking.py     # BookingDocument, IssueInvoiceRequest
│       │   └── cabinet.py     # RequestDocument, CabinetUser, CabinetStats
│       └── routers/
│           ├── bookings.py    # /api/bookings...
│           └── cabinet.py     # /api/cabinet...
└── frontend/                  # без изменений в структуре, меняются только
                                # тела функций в src/api/bookingsApi.ts и
                                # src/api/cabinetApi.ts
```

## 3. REST-контракт

Базовый URL: `http://localhost:8000/api`. Формы ответов 1-в-1 совпадают с
`frontend/src/api/types.ts` — никаких отдельных backend-DTO с другими именами
полей.

| Метод | Путь | Ответ | Назначение |
|---|---|---|---|
| GET | `/bookings` | `Booking[]` | список для таблицы «Мои бронирования» |
| GET | `/bookings/{id}` | `BookingDetail` | деталь брони (`/bron/:id`) |
| POST | `/bookings/{id}/invoice` | `{ ok: true }` | выставить счёт, body `{ method: "requisites" \| "remote" }` |
| GET | `/cabinet/user` | `CabinetUser` | текущий (единственный) пользователь |
| GET | `/cabinet/stats` | `CabinetStat[]` | агрегат из `requests` |
| GET | `/cabinet/requests` | `CabinetRequest[]` | список заявок (фильтрация — на фронте, как сейчас) |
| GET | `/cabinet/requests/{id}` | `CabinetRequestDetail` | деталь заявки с таймлайном/документами |

Коды ошибок: 404 если id не найден (`{"detail": "..."}` — стандартный
FastAPI `HTTPException`), без кастомного формата ошибок (KISS).

## 4. Mongo-схема

### `bookings`
```json
{
  "_id": "MP-024815",
  "createdAt": "09.06.2026",
  "status": "wait",
  "statusLabel": "В ожидании",
  "transportType": "Авто · FTL (полная)",
  "direction": "Export",
  "route": "Алматы → Москва",
  "departureDate": "14.06.2026",
  "weightVolume": "1 200 кг · 4.5 м³",
  "cargoType": "Сборный груз",
  "amount": "₸ 348 000",
  "type": "Авто · FTL",
  "paymentMethod": null
}
```
`_id` — тот же человекочитаемый код (MP-024815), отдельный ObjectId не нужен
(KISS — это и есть бизнес-идентификатор бронирования).

Поля `type`/`amount`/`route` дублируются и для списка (`Booking`), и для
детали (`BookingDetail`) — единый документ, два Pydantic-представления через
`model_dump(include={...})`, без двух мест, где хранится «маршрут».

### `requests` (заявки личного кабинета, включает деталь груза)
```json
{
  "_id": "МП-2847",
  "route": "Нью-Йорк → Алматы",
  "cargoInfo": "820 кг · сборный",
  "type": "air",
  "typeLabel": "Авиа",
  "status": "wait",
  "statusLabel": "В пути",
  "sentDate": "14.06.26",
  "arrivalDate": "22.06.26",
  "arrivalDone": false,
  "detail": {
    "fromCode": "JFK", "fromCity": "Нью-Йорк",
    "toCode": "ALA", "toCity": "Алматы",
    "progressPercent": 62,
    "timeline": [
      {"label": "Заявка принята", "date": "13 июня · 14:22", "state": "done"},
      ...
    ],
    "weight": "820 кг", "volume": "4.2 м³",
    "cargoType": "Электроника", "packaging": "5 паллет",
    "documents": [{"name": "Авиа-накладная (AWB)", "status": "ready"}, ...]
  }
}
```
Деталь груза денормализована внутрь документа заявки (1:1 отношение, всегда
читаются вместе) — отдельная коллекция была бы JOIN-ом без пользы (KISS).

`GET /cabinet/requests` возвращает только верхнеуровневые поля (без `detail`)
— `CabinetRequestSummary`. `GET /cabinet/requests/{id}` возвращает `detail`,
разложенный в плоскую форму `CabinetRequestDetail` (id + поля из `detail`).
Обе модели строятся из одного `RequestDocument` (DRY).

### `users`
```json
{ "_id": "default", "name": "Аяулым Сатыбалды", "initials": "АС", "company": "ТОО «Cargo Plus»" }
```
Один документ — `_id: "default"`. Когда появится auth, добавится реальный
`_id` пользователя; код роутера `cabinet.py` уже обращается к пользователю
через одну функцию `get_current_user_id()` в `config.py`, которая сейчас
просто возвращает `"default"` — это единственное место, которое поменяется.

### Агрегация `cabinet/stats`
Вычисляется на запрос из `requests` (без отдельной коллекции):
- `active` = count где `statusLabel != "Доставлен"`
- `in-transit` = count где `statusLabel == "В пути"`
- `delivered` = count где `statusLabel == "Доставлен"`
- `documents` = сумма документов со статусом `needs-signature` по всем заявкам

Числа «тренда» (`↑ +1 за неделю` и т.п.) в этой итерации — статичные подписи
из мока (хранить историю для реального тренда — отдельная задача, не нужна
сейчас по KISS).

## 5. CORS и конфиг

`.env`:
```
MONGO_URI=mongodb://localhost:27017
MONGO_DB=mleko
CORS_ORIGINS=http://localhost:5173
```

`docker-compose.yml` (корень репозитория):
```yaml
services:
  mongo:
    image: mongo:7
    ports: ["27017:27017"]
    volumes: ["mongo_data:/data/db"]
volumes:
  mongo_data:
```

## 6. Фронтенд: точка подключения

`frontend/src/api/bookingsApi.ts` и `cabinetApi.ts` — меняются **только**
тела функций (сигнатуры и точки вызова в компонентах не трогаем, как и было
спроектировано в итерации 1):

```ts
const API_BASE = "http://localhost:8000/api";

export async function getBookings(): Promise<Booking[]> {
  return fetch(`${API_BASE}/bookings`).then((r) => r.json());
}
```

Мок-данные (`mockData/bookings.ts`, `mockData/cabinet.ts`) остаются в
репозитории как источник для `app/seed.py` (одно и то же содержимое, не
дублируем вручную — backend-сид читает форму данных, описанную в
content-inventory.md, и оформляет как Mongo-документы).

## 7. Что НЕ делаем (см. requirements.md §2)

Auth, создание заявок через UI, realtime-трекинг, остальные разделы сайта на
бэкенде — везде, где раньше было "мок", там и остаётся мок до следующей
итерации.
