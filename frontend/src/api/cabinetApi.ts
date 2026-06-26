import { requestFilters } from "./mockData/cabinet";
import { apiGet, apiPatch } from "./client";
import type { CabinetRequest, CabinetRequestDetail, CabinetStat, CabinetUser, RequestStatusOption } from "./types";

export async function getCabinetUser(): Promise<CabinetUser> {
  return apiGet<CabinetUser>("/cabinet/user");
}

export async function getCabinetStats(): Promise<CabinetStat[]> {
  return apiGet<CabinetStat[]>("/cabinet/stats");
}

export async function getRequestFilters() {
  // Static UI labels, not domain data — stays on the frontend (KISS).
  return requestFilters;
}

export async function getCabinetRequests(): Promise<CabinetRequest[]> {
  return apiGet<CabinetRequest[]>("/cabinet/requests");
}

export async function getRequestDetail(id: string): Promise<CabinetRequestDetail | undefined> {
  try {
    return await apiGet<CabinetRequestDetail>(`/cabinet/requests/${encodeURIComponent(id)}`);
  } catch {
    return undefined;
  }
}

export async function getRequestStatusOptions(): Promise<RequestStatusOption[]> {
  return apiGet<RequestStatusOption[]>("/cabinet/requests/statuses");
}

export async function updateRequestStatus(id: string, statusLabel: string): Promise<CabinetRequest> {
  return apiPatch<CabinetRequest>(`/cabinet/requests/${encodeURIComponent(id)}/status`, { statusLabel });
}
