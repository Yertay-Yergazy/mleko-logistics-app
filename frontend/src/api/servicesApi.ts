import { additionalServices, dangerousGoodsClasses, extraServices, serviceFilters, services } from "./mockData/services";
import type { Service } from "./types";

export async function getServices(): Promise<Service[]> {
  return services;
}

export async function getServiceFilters() {
  return serviceFilters;
}

export async function getAdditionalServices() {
  return additionalServices;
}

export async function getExtraServices() {
  return extraServices;
}

export async function getDangerousGoodsClasses() {
  return dangerousGoodsClasses;
}
