import type { QuoteRequest } from "./types";

export async function submitQuoteRequest(payload: QuoteRequest): Promise<{ ok: true }> {
  console.info("[mock] quote request submitted", payload);
  return { ok: true };
}
