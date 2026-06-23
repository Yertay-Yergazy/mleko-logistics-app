import type { ProcessStep, TransportNode } from "../types";

export const transportTree: TransportNode[] = [
  {
    id: "auto",
    label: "Авто",
    tone: "orange",
    scope: "IMPORT / EXPORT",
    leaves: [
      { label: "Сборные грузы LTL", action: "расчёт" },
      { label: "Полная машина FTL", action: "расчёт" },
    ],
  },
  {
    id: "air",
    label: "Авиа",
    tone: "blue",
    scope: "IMPORT / EXPORT",
    leaves: [
      { label: "Регулярные рейсы", action: "расчёт" },
      { label: "Чартерные рейсы", action: "расчёт" },
    ],
  },
  {
    id: "sea",
    label: "Море",
    tone: "navy",
    scope: "IMPORT / EXPORT / TRANSIT",
    leaves: [
      { label: "Контейнеры FCL", action: "расчёт" },
      { label: "Сборные LCL", action: "расчёт" },
    ],
  },
  {
    id: "rail",
    label: "ЖД",
    tone: "navy",
    scope: "IMPORT",
    leaves: [
      { label: "Вагонные отправки", action: "расчёт" },
      { label: "Контейнерный поезд", action: "расчёт" },
    ],
  },
];

export const outboundDirections = [
  "ALA ✈ JFK", "ALA ✈ SVO", "ALA ✈ DXB", "ALA ✈ IST", "ALA ✈ PEK",
  "ALA ✈ FRA", "ALA ✈ ICN", "ALA ✈ DEL", "ALA ✈ PVG", "ALA ✈ HKG",
  "ALA ✈ LHR", "ALA ✈ CDG", "ALA ✈ AMS", "ALA ✈ TAS", "ALA ✈ DME",
  "ALA ✈ LED", "ALA ✈ CAN", "ALA ✈ URC", "ALA ✈ BKK", "ALA ✈ SGN",
  "ALA ✈ KZN", "ALA ✈ OVB", "ALA ✈ GYD", "ALA ✈ TBS", "ALA ✈ EVN",
];

export const inboundDirections = [
  "MNL ✈ ALA", "KUL ✈ ALA", "SIN ✈ ALA", "NRT ✈ ALA", "ORD ✈ ALA",
  "LAX ✈ ALA", "YYZ ✈ ALA", "MXP ✈ ALA", "ZRH ✈ ALA", "VIE ✈ ALA",
  "WAW ✈ ALA", "PRG ✈ ALA", "BUD ✈ ALA", "HEL ✈ ALA", "DOH ✈ ALA",
  "AUH ✈ ALA", "JED ✈ ALA", "RUH ✈ ALA", "BOM ✈ ALA", "CGK ✈ ALA",
  "TLV ✈ ALA", "ATH ✈ ALA", "MAD ✈ ALA", "BCN ✈ ALA", "MUC ✈ ALA",
];

export const processSteps: ProcessStep[] = [
  { number: "01", title: "Заявка и расчёт", description: "Запрос стоимости приходит на e-mail / WhatsApp." },
  { number: "02", title: "Бронирование", description: "Подтверждаем место и выставляем счёт." },
  { number: "03", title: "Таможня и документы", description: "Оформление под ключ, брокерские услуги." },
  { number: "04", title: "Доставка и статус", description: "Отслеживание: «В ожидании» → «Готово»." },
];

export const domesticCities = [
  { city: "Алматы", price: "цена" },
  { city: "Астана", price: "цена" },
  { city: "Бишкек", price: "цена" },
  { city: "Москва", price: "цена" },
  { city: "Санкт-Петербург", price: "цена" },
  { city: "Ташкент", price: "цена" },
  { city: "Нью-Йорк", price: "цена" },
];
