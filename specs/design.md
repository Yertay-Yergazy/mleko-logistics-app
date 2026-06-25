# Design — Млечный Путь Web App (Frontend)

## 1. Стек

- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS** (v3) — стилизация, токены дизайн-системы в `tailwind.config.ts`
- **React Router v6** — клиентский роутинг
- **Без** глобального state-менеджера на этом этапе (useState/useContext
  достаточно: язык, мок-сессия кабинета)

## 2. Структура репозитория (монорепо)

```
mleko/
├── frontend/                  ← React-приложение (этот этап)
│   ├── src/
│   │   ├── api/                 # слой данных, см. §5
│   │   │   ├── types.ts
│   │   │   ├── mockData/
│   │   │   │   ├── services.ts
│   │   │   │   ├── offers.ts
│   │   │   │   ├── directions.ts
│   │   │   │   ├── bookings.ts
│   │   │   │   └── cabinet.ts
│   │   │   ├── servicesApi.ts
│   │   │   ├── quoteApi.ts
│   │   │   ├── bookingsApi.ts
│   │   │   └── cabinetApi.ts
│   │   ├── components/
│   │   │   ├── atoms/         # Button, Pill, Badge, Input, Radio, Checkbox, Icon
│   │   │   ├── molecules/     # StatusBadge, FormField, SegmentedControl,
│   │   │   │                 # Breadcrumb, ContactCard, SearchBar, StatCard
│   │   │   └── organisms/     # TopNav, Footer, ServiceCard, HotCard,
│   │   │                     # OffersCarousel, DirectionsTree, DirectionsMarquee,
│   │   │                     # CalculatorForm, StepperBar, BookingsTable,
│   │   │                     # Sidebar, DetailPanel, WhatsAppButton
│   │   ├── layouts/
│   │   │   ├── SiteLayout.tsx     # TopNav + <Outlet/> + Footer + WhatsAppButton
│   │   │   └── CabinetLayout.tsx  # Sidebar + Topbar + <Outlet/>
│   │   ├── pages/
│   │   │   ├── HomePage.tsx
│   │   │   ├── CatalogPage.tsx
│   │   │   ├── InternationalPage.tsx
│   │   │   ├── DomesticPage.tsx
│   │   │   ├── AdditionalServicesPage.tsx
│   │   │   ├── CalculatorPage.tsx
│   │   │   ├── BookingDetailPage.tsx
│   │   │   └── cabinet/
│   │   │       ├── CabinetDashboardPage.tsx
│   │   │       ├── CabinetDocumentsPage.tsx
│   │   │       ├── CabinetProfilePage.tsx
│   │   │       └── CabinetSettingsPage.tsx
│   │   ├── context/
│   │   │   └── LanguageContext.tsx   # RU only сейчас, заготовка под i18n
│   │   ├── App.tsx               # роуты
│   │   ├── main.tsx
│   │   └── index.css             # @tailwind директивы + @font-face
│   ├── public/
│   │   └── logo.png (mleko_logo.jpg → logo)
│   ├── index.html
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── package.json
├── backend/                    ← появится позже (FastAPI)
└── specs/                      ← requirements.md / design.md / tasks.md
```

## 3. Design tokens → Tailwind theme

Установлен **Tailwind CSS v4** — конфиг не через `tailwind.config.ts`, а через
CSS-блок `@theme` прямо в `src/index.css` (v4 убрал JS-конфиг как обязательный
шаг, сканирование content происходит автоматически). Токены из `:root` макета:

```css
@import "tailwindcss";
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,700;0,800;0,900;1,700;1,800;1,900&family=JetBrains+Mono:wght@400;500;700&family=Golos+Text:wght@400;500;600;700&display=swap");

@theme {
  --color-navy: #1f2a72;
  --color-navy-2: #27368c;
  --color-blue: #2b3f9e;
  --color-royal: #3a55c8;
  --color-orange: #f3852b;
  --color-orange-dark: #e0701a;
  --color-sky: #5fa6d8;
  --color-sky-2: #3f86c4;
  --color-sky-light: #cfe3f2;
  --color-mist: #eef3fa;
  --color-mist-2: #f6f9fd;
  --color-ink: #19224f;
  --color-muted: #5c6790;
  --color-line: #dde5f2;
  --color-ok: #1f9d6b;
  --color-wait: #e8a32b;

  --font-display: "Montserrat", sans-serif;
  --font-body: "Golos Text", sans-serif;
  --font-mono: "JetBrains Mono", monospace;
}
```

Tailwind v4 автоматически генерирует утилиты из этих переменных:
`bg-navy`, `text-orange`, `border-line`, `font-display` и т.д. PostCSS настроен
через `@tailwindcss/postcss` (а не классический `tailwindcss` плагин — это
отличие v4 от v3). Шрифты подключены через Google Fonts `<link>`/`@import` —
Montserrat (700-900, italic) для заголовков, Golos Text для текста, JetBrains
Mono для кодов/номеров.

Брейкпоинты — стандартные Tailwind (`sm/md/lg/xl`), ширина «desktop» контента
ограничивается `max-w-7xl` / `container`.

## 4. Карта маршрутов

| Маршрут                 | Страница               | Источник в макете               |
| ----------------------- | ---------------------- | ------------------------------- |
| `/`                     | HomePage               | «Главная · илл. полупрозрачная» |
| `/uslugi`               | CatalogPage            | «Каталог услуг»                 |
| `/mezhdunarodnye`       | InternationalPage      | «Международные»                 |
| `/vnutri-kz`            | DomesticPage           | «Внутри КЗ»                     |
| `/uslugi/dopolnitelnye` | AdditionalServicesPage | «Доп. услуги»                   |
| `/raschet`              | CalculatorPage         | «Расчёт стоимости»              |
| `/bron/:id`             | BookingDetailPage      | «Бронирование»                  |
| `/cabinet`              | CabinetDashboardPage   | «Личный кабинет»                |
| `/cabinet/documents`    | CabinetDocumentsPage   | пункт сайдбара «Документы»      |
| `/cabinet/profile`      | CabinetProfilePage     | пункт сайдбара «Профиль»        |
| `/cabinet/settings`     | CabinetSettingsPage    | пункт сайдбара «Настройки»      |

Публичные страницы оборачиваются в `SiteLayout` (TopNav+Footer+WhatsApp),
`/cabinet/*` — в `CabinetLayout` (Sidebar+Topbar), без TopNav/Footer.

Мобильные мокеты из макета («Мобильные экраны») — это не отдельные страницы,
а доказательство того, что HomePage/CalculatorPage/BookingDetailPage обязаны
быть responsive. Отдельных mobile-роутов не создаём.

## 5. Слой данных (готовность к FastAPI)

Каждый файл в `src/api/*Api.ts` экспортирует async-функции с сигнатурой,
которая 1-в-1 совпадает с будущим REST-контрактом:

```ts
// src/api/servicesApi.ts
export async function getServices(): Promise<Service[]> {
  // сейчас: return mockServices;
  // потом:  return fetch('/api/services').then(r => r.json());
}
```

Компоненты вызывают только `*Api.ts`, никогда — `mockData/*` напрямую.
Это единственная точка замены при подключении FastAPI: меняется тело
функции, сигнатура и место вызова в компоненте остаются прежними.

Типы (`api/types.ts`) — будущие pydantic-модели бэкенда:
`Service`, `Offer`, `Direction`, `QuoteRequest`, `Booking`, `BookingStatus`,
`Shipment`, `ShipmentDocument`, `CabinetUser`, `CabinetStat`.

## 6. Переиспользуемые компоненты (контракт props)

- **Button** — `variant: 'orange'|'navy'|'ghost'|'outline'`, `size: 'md'|'sm'`
- **Pill** — `tone: 'orange'|'blue'|'green'`
- **StatusBadge** — `status: 'wait'|'ok'|'pending'|'alert'`, `label`
- **ServiceCard** — `layout: 'vertical'|'horizontal'`, image/badge/title/desc/
  price/ctaLabel/onCta
- **HotCard** — badge, route, description, ctaLabel
- **OffersCarousel** — `slides: HotCard[][]`, autoplay 3.5s, dots, arrows,
  pause on hover
- **SegmentedControl** — `options`, `value`, `onChange`
- **StepperBar** — `steps: {label, status: 'done'|'now'|'todo'}[]`
- **BookingsTable** — `rows`, `filters`, `selectedId`, `onSelect`
- **DetailPanel** — маршрут+прогресс, timeline, детали груза, документы,
  действия (кабинет)
- **Sidebar** — user, nav items (icon+label+badge), активный пункт
- **WhatsAppButton** — фиксированная плавающая кнопка, ссылка
  `https://wa.me/77055969604`

## 7. Контент/контакты (источник истины — макет)

- Телефон: `+7 708 936 68 52`
- WhatsApp: `+7 775 973 51 78 `
- E-mail: `byte083@gmail.com`
- Адреса: г. Алматы, Закарпатская 51Б, оф. 512; г. Астана, Рыскулбекова 16/1,
  оф. 323
- Метрики: 10+ лет, 20 000+ т груза, 3 000+ городов, ответ ~5 мин 24/7
- Логотип: `mleko_logo.jpg` (перенести в `frontend/public` и/или `src/assets`)

Полный текстовый контент по каждому экрану — в `specs/content-inventory.md`
(копия отчёта, собранного из макета).

## 8. Что НЕ делаем сейчас

- Реальную авторизацию/JWT.
- Реальные сетевые вызовы (только мок-слой с искусственной задержкой опционально).
- i18n библиотеку (react-i18next) — переключатель РУ/EN/TR в UI кликабелен,
  но меняет только активный пункт визуально; контент остаётся RU.
- WebSocket/polling для трекинга — статус груза статичен (мок).
