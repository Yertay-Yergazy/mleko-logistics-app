from typing import Literal

from pydantic import BaseModel, ConfigDict, Field

StatusTone = Literal["wait", "ok", "pending", "alert"]
TransportMode = Literal["air", "auto", "sea"]


class TimelineStep(BaseModel):
    label: str
    date: str
    state: Literal["done", "active", "pending"]


class ShipmentDocument(BaseModel):
    name: str
    status: Literal["ready", "needs-signature"]


class RequestDetailEmbed(BaseModel):
    """Embedded 1:1 cargo detail — denormalized into the request document
    because it's always read together with the request (KISS, no join)."""

    model_config = ConfigDict(populate_by_name=True)

    from_code: str = Field(alias="fromCode")
    from_city: str = Field(alias="fromCity")
    to_code: str = Field(alias="toCode")
    to_city: str = Field(alias="toCity")
    progress_percent: int = Field(alias="progressPercent")
    timeline: list[TimelineStep]
    weight: str
    volume: str
    cargo_type: str = Field(alias="cargoType")
    packaging: str
    documents: list[ShipmentDocument]


class RequestDocument(BaseModel):
    """Mongo document in the `requests` collection."""

    model_config = ConfigDict(populate_by_name=True)

    id: str = Field(alias="_id")
    route: str
    cargo_info: str = Field(alias="cargoInfo")
    type: TransportMode
    type_label: str = Field(alias="typeLabel")
    status: StatusTone
    status_label: str = Field(alias="statusLabel")
    sent_date: str = Field(alias="sentDate")
    arrival_date: str = Field(alias="arrivalDate")
    arrival_done: bool = Field(default=False, alias="arrivalDone")
    detail: RequestDetailEmbed

    def to_summary(self) -> "CabinetRequest":
        return CabinetRequest(
            id=self.id,
            route=self.route,
            cargoInfo=self.cargo_info,
            type=self.type,
            typeLabel=self.type_label,
            status=self.status,
            statusLabel=self.status_label,
            sentDate=self.sent_date,
            arrivalDate=self.arrival_date,
            arrivalDone=self.arrival_done,
        )

    def to_detail(self) -> "CabinetRequestDetail":
        return CabinetRequestDetail(
            id=self.id,
            fromCode=self.detail.from_code,
            fromCity=self.detail.from_city,
            toCode=self.detail.to_code,
            toCity=self.detail.to_city,
            progressPercent=self.detail.progress_percent,
            mode=self.type,
            timeline=self.detail.timeline,
            weight=self.detail.weight,
            volume=self.detail.volume,
            cargoType=self.detail.cargo_type,
            packaging=self.detail.packaging,
            documents=self.detail.documents,
        )


class CabinetRequest(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: str
    route: str
    cargo_info: str = Field(alias="cargoInfo")
    type: TransportMode
    type_label: str = Field(alias="typeLabel")
    status: StatusTone
    status_label: str = Field(alias="statusLabel")
    sent_date: str = Field(alias="sentDate")
    arrival_date: str = Field(alias="arrivalDate")
    arrival_done: bool = Field(default=False, alias="arrivalDone")


class CabinetRequestDetail(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: str
    from_code: str = Field(alias="fromCode")
    from_city: str = Field(alias="fromCity")
    to_code: str = Field(alias="toCode")
    to_city: str = Field(alias="toCity")
    progress_percent: int = Field(alias="progressPercent")
    mode: TransportMode
    timeline: list[TimelineStep]
    weight: str
    volume: str
    cargo_type: str = Field(alias="cargoType")
    packaging: str
    documents: list[ShipmentDocument]


class CabinetUser(BaseModel):
    name: str
    initials: str
    company: str


class CabinetStat(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: str
    label: str
    value: str
    trend: str
    tone: Literal["orange", "blue", "green", "navy"]
