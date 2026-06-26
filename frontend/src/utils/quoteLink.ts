export function buildQuoteQuery(routeText?: string, extra?: Record<string, string>): string {
  const params = new URLSearchParams();

  if (routeText) {
    const [from, to] = routeText.split(/→|✈/).map((s) => s.trim());
    if (from) params.set("from", from);
    if (to) params.set("to", to);
  }

  for (const [key, value] of Object.entries(extra ?? {})) {
    params.set(key, value);
  }

  return params.toString();
}
