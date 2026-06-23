import { apiGet, apiPost } from "./client";
import type { Booking, BookingDetail } from "./types";

export async function getBookings(): Promise<Booking[]> {
  return apiGet<Booking[]>("/bookings");
}

export async function getBookingById(id: string): Promise<BookingDetail | undefined> {
  try {
    return await apiGet<BookingDetail>(`/bookings/${encodeURIComponent(id)}`);
  } catch {
    return undefined;
  }
}

export async function issueInvoice(id: string, method: "requisites" | "remote"): Promise<{ ok: true }> {
  return apiPost<{ ok: true }>(`/bookings/${encodeURIComponent(id)}/invoice`, { method });
}
