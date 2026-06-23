import { requestFilters } from "./mockData/cabinet";
import { apiGet } from "./client";
import type { CabinetRequest, CabinetRequestDetail, CabinetStat, CabinetUser } from "./types";

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
