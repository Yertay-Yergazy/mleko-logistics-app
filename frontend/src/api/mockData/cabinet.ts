// Filter labels are a static UI concern, not domain data — kept on the
// frontend even after bookings/cabinet moved to the real backend (KISS).
export const requestFilters = [
  { id: "all", label: "Все" },
  { id: "in-transit", label: "В пути" },
  { id: "processing", label: "Оформление" },
  { id: "customs", label: "На таможне" },
  { id: "delivered", label: "Доставлен" },
];
