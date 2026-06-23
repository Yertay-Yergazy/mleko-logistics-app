import type { Offer } from "../types";

export const offerSlides: Offer[][] = [
  [
    {
      id: "minsk-almaty",
      badge: "Ежедневные рейсы",
      route: "Минск → Алматы",
      description: "Свободные фуры из Беларуси. Сборные грузы и полные загрузки FTL.",
      ctaLabel: "Забронировать",
    },
    {
      id: "almaty-dubai",
      badge: "По запросу",
      route: "Алматы ✈ Дубай",
      routeIcon: "plane",
      description: "Перевозка животных самолётом с комфортом и сопровождением.",
      ctaLabel: "Оставить запрос",
    },
    {
      id: "china-almaty",
      badge: "Морские сборные",
      route: "Китай → Алматы",
      description: "Контейнерные и сборные отправки LCL / FCL. Import под ключ.",
      ctaLabel: "Рассчитать",
    },
  ],
  [
    {
      id: "ny-almaty",
      badge: "3 раза в неделю",
      route: "Нью-Йорк ✈ Алматы",
      routeIcon: "plane",
      description: "Регулярный авиа-рейс. Свободные места под сборные и срочные отправления.",
      ctaLabel: "Забронировать",
    },
    {
      id: "istanbul-almaty",
      badge: "Авто FTL",
      route: "Стамбул → Алматы",
      description: "Полные машины из Турции. Доставка под ключ с таможней.",
      ctaLabel: "Рассчитать",
    },
    {
      id: "moscow-almaty",
      badge: "Ежедневные рейсы",
      route: "Москва → Алматы",
      description: "Еженедельные сборные отправки LTL. Минимальные сроки.",
      ctaLabel: "Забронировать",
    },
  ],
  [
    {
      id: "guangzhou-almaty",
      badge: "Авиа express",
      route: "Гуанчжоу ✈ Алматы",
      routeIcon: "plane",
      description: "Срочная авиа-доставка из Китая. Электроника и хрупкие грузы.",
      ctaLabel: "Рассчитать",
    },
    {
      id: "almaty-bishkek",
      badge: "Дверная доставка",
      route: "Алматы → Бишкек",
      description: "Door-to-door между городами. Авто FTL / LTL, забор от двери.",
      ctaLabel: "Забронировать",
    },
    {
      id: "europe-almaty",
      badge: "ЖД import",
      route: "Европа → Алматы",
      description: "Контейнерный поезд из ЕС. Выгодно для крупных партий.",
      ctaLabel: "Рассчитать",
    },
  ],
];

export const featuredOffer = {
  badge: "Горячее предложение",
  title: "Нью-Йорк → Алматы · 3 раза в неделю",
  description:
    "Регулярный авиа-рейс. Свободные места под сборные грузы и срочные отправления каждую неделю.",
  ctaLabel: "Забронировать",
};
