export type Tone = "orange" | "blue" | "green" | "navy";

export type StatusTone = "wait" | "ok" | "pending" | "alert";

export interface Service {
  id: string;
  category: "international" | "domestic" | "multimodal" | "customs" | "warehouse" | "special";
  badge: { label: string; tone: Tone };
  title: string;
  description: string;
  priceFrom: string;
  ctaLabel: string;
  image?: string;
}

export interface Offer {
  id: string;
  badge: string;
  route: string;
  routeIcon?: "plane" | "arrow";
  description: string;
  ctaLabel: string;
}

export interface TransportLeaf {
  label: string;
  action: string;
}

export interface TransportNode {
  id: string;
  label: string;
  tone: Tone;
  leaves: TransportLeaf[];
  scope: string;
}

export interface DirectionChip {
  from: string;
  to: string;
  mode: "plane" | "truck" | "ship" | "train";
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface Booking {
  id: string;
  route: string;
  type: string;
  amount: string;
  status: StatusTone;
  statusLabel: string;
}

export interface BookingDetail {
  id: string;
  createdAt: string;
  status: StatusTone;
  statusLabel: string;
  transportType: string;
  direction: string;
  route: string;
  departureDate: string;
  weightVolume: string;
  cargoType: string;
  amount: string;
}

export interface QuoteRequest {
  transportMode: string;
  from: string;
  to: string;
  cargoType: string;
  direction: string;
  weightKg: string;
  dimensions: string;
  pieces: string;
  comment: string;
  email: string;
  whatsapp: string;
  replyByEmail: boolean;
  replyByWhatsapp: boolean;
}

export interface CabinetUser {
  name: string;
  initials: string;
  company: string;
}

export interface CabinetStat {
  id: string;
  label: string;
  value: string;
  trend: string;
  tone: Tone;
}

export interface CabinetRequest {
  id: string;
  route: string;
  cargoInfo: string;
  type: "air" | "auto" | "sea";
  typeLabel: string;
  status: StatusTone;
  statusLabel: string;
  sentDate: string;
  arrivalDate: string;
  arrivalDone?: boolean;
}

export interface TimelineStep {
  label: string;
  date: string;
  state: "done" | "active" | "pending";
}

export interface ShipmentDocument {
  name: string;
  status: "ready" | "needs-signature";
}

export interface CabinetRequestDetail {
  id: string;
  fromCode: string;
  fromCity: string;
  toCode: string;
  toCity: string;
  progressPercent: number;
  mode: "air" | "auto" | "sea";
  timeline: TimelineStep[];
  weight: string;
  volume: string;
  cargoType: string;
  packaging: string;
  documents: ShipmentDocument[];
}
