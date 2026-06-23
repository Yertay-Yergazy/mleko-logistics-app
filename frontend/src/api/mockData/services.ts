import type { Service } from "../types";

export const services: Service[] = [
  {
    id: "intl-auto",
    category: "international",
    badge: { label: "Авто · LTL / FTL", tone: "blue" },
    title: "Международные авто",
    description: "Сборные и полные загрузки по всему миру. Import / Export.",
    priceFrom: "от $1.10/кг",
    ctaLabel: "Рассчитать",
  },
  {
    id: "air",
    category: "international",
    badge: { label: "Авиа · express", tone: "orange" },
    title: "Авиа-доставка",
    description: "Срочные и регулярные авиа-рейсы. Свободные места еженедельно.",
    priceFrom: "от $4.90/кг",
    ctaLabel: "Рассчитать",
  },
  {
    id: "sea",
    category: "international",
    badge: { label: "Море · FCL / LCL", tone: "blue" },
    title: "Морские перевозки",
    description: "Import / Export / Transit. Контейнерные и сборные отправки.",
    priceFrom: "от $850/конт",
    ctaLabel: "Рассчитать",
  },
  {
    id: "rail",
    category: "international",
    badge: { label: "ЖД · import", tone: "blue" },
    title: "ЖД перевозки",
    description: "Импортные перевозки по сети железных дорог.",
    priceFrom: "от $1 200",
    ctaLabel: "Рассчитать",
  },
  {
    id: "multimodal",
    category: "multimodal",
    badge: { label: "Combo", tone: "green" },
    title: "Мультимодальные",
    description: "Интермодальные перевозки: комбинация авто, авиа, моря и ЖД.",
    priceFrom: "по запросу",
    ctaLabel: "Рассчитать",
  },
  {
    id: "domestic",
    category: "domestic",
    badge: { label: "Внутри КЗ", tone: "blue" },
    title: "Перевозки по КЗ",
    description: "Авто (FTL / LTL) и авиа внутри Казахстана. Бронирование онлайн.",
    priceFrom: "от 15 000 ₸",
    ctaLabel: "Рассчитать",
  },
  {
    id: "door-to-door",
    category: "domestic",
    badge: { label: "Дверная доставка", tone: "blue" },
    title: "Door-to-door",
    description: "Доставка внутри городов: Алматы, Астана, Москва, Нью-Йорк и др.",
    priceFrom: "от 8 000 ₸",
    ctaLabel: "Рассчитать",
  },
  {
    id: "customs",
    category: "customs",
    badge: { label: "Таможня", tone: "blue" },
    title: "Таможенное оформление",
    description: "Брокерские услуги, оформление под ключ, СВХ в 3 км (MA ALA).",
    priceFrom: "от $120",
    ctaLabel: "Рассчитать",
  },
  {
    id: "warehouse",
    category: "warehouse",
    badge: { label: "Склад", tone: "green" },
    title: "Складские услуги",
    description: "Хранение, упаковка и доупаковка груза. СВХ в 3 км от аэропорта.",
    priceFrom: "от $2/палета",
    ctaLabel: "Рассчитать",
  },
];

export const serviceFilters = [
  { id: "all", label: "Все услуги" },
  { id: "international", label: "Международные" },
  { id: "domestic", label: "Внутри КЗ" },
  { id: "multimodal", label: "Мультимодальные" },
  { id: "customs", label: "Таможня" },
  { id: "warehouse", label: "Склад" },
  { id: "special", label: "Спецгрузы" },
] as const;

export interface AdditionalService {
  id: string;
  title: string;
  description: string;
}

export const additionalServices: AdditionalService[] = [
  { id: "packaging", title: "Упаковка / доупаковка", description: "Профессиональная упаковка и доупаковка груза любой сложности." },
  { id: "warehouse", title: "Складские услуги", description: "Хранение на складе. СВХ в 3 км от аэропорта (MA ALA)." },
  { id: "broker", title: "Брокерские услуги", description: "Таможенное оформление и сопровождение документов." },
  { id: "animals", title: "Перевозка животных", description: "Комфортная перевозка авиа и авто с сопровождением." },
  { id: "perishable", title: "Скоропорт", description: "Температурные грузы: рефрижераторы и контроль режима." },
  { id: "special-equipment", title: "Услуги спец. техники", description: "Кран-манипулятор, вилочный погрузчик и спецтехника для погрузки и разгрузки." },
];

export const extraServices: AdditionalService[] = [
  { id: "loaders", title: "Услуги грузчиков", description: "Погрузка и разгрузка в любом городе присутствия." },
  { id: "door-to-door", title: "Дверная доставка", description: "Door-to-door внутри городов присутствия компании." },
];

export const dangerousGoodsClasses = [
  { id: 1, label: "Взрывчатые" },
  { id: 2, label: "Газы" },
  { id: 3, label: "Жидкости" },
  { id: 4, label: "Тв. вещества" },
  { id: 5, label: "Окислители" },
  { id: 6, label: "Токсичные" },
  { id: 7, label: "Радиоакт." },
  { id: 8, label: "Коррозия" },
  { id: 9, label: "Прочие" },
];
