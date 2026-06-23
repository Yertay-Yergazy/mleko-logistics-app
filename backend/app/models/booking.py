from typing import Literal

from pydantic import BaseModel, ConfigDict, Field

StatusTone = Literal["wait", "ok", "pending", "alert"]


class BookingDocument(BaseModel):
    """Mongo document for one booking. `id` doubles as the human-readable
    booking code (e.g. MP-024815) — no separate ObjectId needed (KISS)."""

    model_config = ConfigDict(populate_by_name=True)

    id: str = Field(alias="_id")
    created_at: str = Field(alias="createdAt")
    status: StatusTone
    status_label: str = Field(alias="statusLabel")
    type: str
    transport_type: str = Field(alias="transportType")
    direction: str
    route: str
    departure_date: str = Field(alias="departureDate")
    weight_volume: str = Field(alias="weightVolume")
    cargo_type: str = Field(alias="cargoType")
    amount: str
    payment_method: str | None = Field(default=None, alias="paymentMethod")

    def to_summary(self) -> "Booking":
        return Booking(
            id=self.id,
            route=self.route,
            type=self.type,
            amount=self.amount,
            status=self.status,
            statusLabel=self.status_label,
        )

    def to_detail(self) -> "BookingDetail":
        return BookingDetail(
            id=self.id,
            createdAt=self.created_at,
            status=self.status,
            statusLabel=self.status_label,
            transportType=self.transport_type,
            direction=self.direction,
            route=self.route,
            departureDate=self.departure_date,
            weightVolume=self.weight_volume,
            cargoType=self.cargo_type,
            amount=self.amount,
        )


class Booking(BaseModel):
    """List row — matches frontend `Booking` type."""

    model_config = ConfigDict(populate_by_name=True)

    id: str
    route: str
    type: str
    amount: str
    status: StatusTone
    status_label: str = Field(alias="statusLabel")


class BookingDetail(BaseModel):
    """Matches frontend `BookingDetail` type."""

    model_config = ConfigDict(populate_by_name=True)

    id: str
    created_at: str = Field(alias="createdAt")
    status: StatusTone
    status_label: str = Field(alias="statusLabel")
    transport_type: str = Field(alias="transportType")
    direction: str
    route: str
    departure_date: str = Field(alias="departureDate")
    weight_volume: str = Field(alias="weightVolume")
    cargo_type: str = Field(alias="cargoType")
    amount: str


class IssueInvoiceRequest(BaseModel):
    method: Literal["requisites", "remote"]
