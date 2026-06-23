# Tasks — Млечный Путь Web App (Frontend)

Чеклист реализации. Каждый пункт — отдельный шаг, выполняется последовательно
(блоки 2-7 опираются на блок 1; внутри блока 4-6 страницы можно делать в любом
порядке после готовности компонентов из блока 3).

## 0. Подготовка
- [x] Извлечь и разобрать контент макета → `specs/content-inventory.md`
- [x] Зафиксировать requirements.md / design.md

## 1. Скаффолдинг проекта
- [ ] `frontend/`: `npm create vite@latest . -- --template react-ts`
- [ ] Установить и настроить Tailwind CSS (`tailwindcss`, `postcss`, `autoprefixer`)
- [ ] Установить `react-router-dom`
- [ ] Перенести `mleko_logo.jpg` в `frontend/src/assets/logo.jpg`
- [ ] Настроить `tailwind.config.ts` с токенами из design.md §3
- [ ] Подключить шрифты (Montserrat, Golos Text, JetBrains Mono) в `index.html`/`index.css`
- [ ] Базовый `index.css` (@tailwind base/components/utilities)
- [ ] Проверить `npm run dev` поднимается

## 2. Типы и мок-данные (`src/api`)
- [ ] `types.ts` — Service, Offer, Direction, QuoteRequest, Booking, Shipment,
      ShipmentDocument, CabinetUser, CabinetStat
- [ ] `mockData/services.ts` — 9 услуг каталога
- [ ] `mockData/offers.ts` — 3 слайда × 3 hotcard
- [ ] `mockData/directions.ts` — дерево + маршруты marquee (международные/КЗ)
- [ ] `mockData/bookings.ts` — MP-024815/788/750
- [ ] `mockData/cabinet.ts` — stat cards, 5 заявок, detail для МП-2847
- [ ] `servicesApi.ts`, `quoteApi.ts`, `bookingsApi.ts`, `cabinetApi.ts` —
      async-обёртки над мок-данными

## 3. Atoms / Molecules
- [ ] Button (variant: orange/navy/ghost/outline, size md/sm)
- [ ] Pill (tone: orange/blue/green)
- [ ] Badge / StatusBadge (wait/ok/pending/alert)
- [ ] Input, Textarea, Select (стили `.inp`)
- [ ] Radio, Checkbox
- [ ] SegmentedControl
- [ ] Breadcrumb
- [ ] ContactCard
- [ ] StatCard (кабинет)
- [ ] WhatsAppButton (floating)

## 4. Organisms — публичный сайт
- [ ] TopNav (логотип, меню, языки, CTA «Рассчитать»)
- [ ] Footer (3 колонки + low bar)
- [ ] SiteLayout (TopNav + Outlet + Footer + WhatsAppButton)
- [ ] ServiceCard (vertical/horizontal)
- [ ] HotCard
- [ ] OffersCarousel (autoplay 3.5s, dots, arrows, pause on hover)
- [ ] DirectionsTree (4 колонки видов транспорта)
- [ ] DirectionsMarquee (бегущая лента, hover-pause)
- [ ] ProcessSteps (4 шага)
- [ ] CalculatorForm (segmented + поля + чекбоксы)
- [ ] StepperBar (статус-бронирования)
- [ ] BookingsTable (фильтры + строки)

## 5. Organisms — кабинет
- [ ] Sidebar (профиль + nav с бейджами + выход)
- [ ] CabinetTopbar (поиск, «Новая заявка», уведомления, аватар)
- [ ] CabinetLayout (Sidebar + Topbar + Outlet)
- [ ] RequestsTable (фильтры по статусу, выбор строки)
- [ ] DetailPanel (маршрут+прогресс, таймлайн, детали груза, документы, действия)

## 6. Страницы
- [ ] HomePage — hero, OffersCarousel, featured banner, преимущества/контакты
- [ ] CatalogPage — поиск/сортировка/фильтры + grid ServiceCard
- [ ] InternationalPage — hero, DirectionsTree, DirectionsMarquee, ProcessSteps, CTA
- [ ] DomesticPage — Авиа/Авто блоки, города дверной доставки, warning-блок
- [ ] AdditionalServicesPage — grid услуг, опасные грузы (9 классов), CTA
- [ ] CalculatorPage — CalculatorForm + side panel
- [ ] BookingDetailPage — StepperBar, детали, выставление счёта, BookingsTable
- [ ] CabinetDashboardPage — stat cards + RequestsTable + DetailPanel
- [ ] CabinetDocumentsPage / CabinetProfilePage / CabinetSettingsPage (заглушки
      по образцу Sidebar-разделов, минимальный контент)

## 7. Роутинг и сборка приложения
- [ ] `App.tsx` — маршруты согласно design.md §4 (React Router, nested routes
      для SiteLayout/CabinetLayout)
- [ ] LanguageContext (RU по умолчанию, переключение меняет активный пункт UI)
- [ ] 404 / fallback маршрут

## 8. Адаптив и проверка
- [ ] Прогнать каждую страницу на 375 / 768 / 1280+ — поправить grid/flex на
      `sm:`/`md:`/`lg:`
- [ ] Сверить цвета/шрифты/радиусы с макетом постранично
- [ ] `npm run build` — без ошибок TS/линта
- [ ] Ручной смоук-тест в браузере (`/loop`-проверка не нужна, просто открыть
      все маршруты и основные интеракции: карусель, фильтры таблицы, выбор
      строки кабинета, segmented control калькулятора)

## 9. Дальше (вне этой итерации, зафиксировать для памяти)
- [ ] Подключение `backend/` (FastAPI): заменить тела функций в `src/api/*Api.ts`
- [ ] Реальный i18n (react-i18next) для EN/TR
- [ ] Аутентификация кабинета
