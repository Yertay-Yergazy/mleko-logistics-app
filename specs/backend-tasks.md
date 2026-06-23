# Tasks — Backend (итерация 2)

## 1. Инфраструктура
- [ ] `docker-compose.yml` в корне с сервисом `mongo:7` + volume
- [ ] `backend/requirements.txt` (fastapi, uvicorn[standard], motor, pydantic-settings, python-dotenv)
- [ ] `backend/.env.example` + `.env`
- [ ] venv в `backend/.venv`, установка зависимостей

## 2. Core
- [ ] `app/config.py` — Settings (mongo_uri, mongo_db, cors_origins), `get_current_user_id()`
- [ ] `app/db.py` — Motor client, `get_database()`
- [ ] `app/main.py` — FastAPI app, CORS middleware, lifespan connect/close, роутеры

## 3. Модели
- [ ] `app/models/booking.py` — BookingDocument, Booking (summary), BookingDetail, IssueInvoiceRequest
- [ ] `app/models/cabinet.py` — RequestDocument (+ embedded Detail/Timeline/Document), CabinetUser, CabinetStat

## 4. Роутеры
- [ ] `app/routers/bookings.py`:
  - GET `/api/bookings`
  - GET `/api/bookings/{id}` (404 если нет)
  - POST `/api/bookings/{id}/invoice`
- [ ] `app/routers/cabinet.py`:
  - GET `/api/cabinet/user`
  - GET `/api/cabinet/stats` (агрегация из `requests`)
  - GET `/api/cabinet/requests`
  - GET `/api/cabinet/requests/{id}` (404 если нет)

## 5. Seed
- [ ] `app/seed.py` — наполняет `users`/`bookings`/`requests` данными из
      `specs/content-inventory.md` (те же MP-024815/788/750 и МП-2847/2831/2819/2804/2798)
- [ ] Скрипт идемпотентен (upsert по `_id`, можно гонять повторно)

## 6. Подключение фронтенда
- [ ] `frontend/src/api/bookingsApi.ts` → `fetch` к `/api/bookings*`
- [ ] `frontend/src/api/cabinetApi.ts` → `fetch` к `/api/cabinet/*`
- [ ] `requestFilters` (статичные лейблы фильтров) остаются на фронте — не
      переносим в backend (это UI-константа, не данные)
- [ ] `.env`/конфиг во фронте для `VITE_API_BASE_URL` (сейчас — `http://localhost:8000/api`)

## 7. Проверка
- [ ] `docker compose up -d` → Mongo поднят
- [ ] `python -m app.seed` → данные в базе
- [ ] `uvicorn app.main:app --reload` → API на :8000, `/docs` открывается
- [ ] Ручной smoke по эндпоинтам (curl/HTTPie)
- [ ] Фронтенд (`npm run dev`) → `/bron/MP-024815` и `/cabinet*` рендерятся
      с теми же данными, что раньше из моков, но через сеть (Network tab)
