import { apiPost } from "./client";
import type { QuoteRequest } from "./types";
import { CONTACTS } from "../constants/contacts";

export async function submitQuoteRequest(payload: QuoteRequest): Promise<{ ok: true }> {
  const result = await apiPost<{ ok: true }>("/quotes", payload);
  console.info(`[mock] quote request sent to ${CONTACTS.quoteRecipientWhatsapp}`, payload);
  return result;
}
