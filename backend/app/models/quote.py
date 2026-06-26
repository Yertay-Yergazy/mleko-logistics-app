from pydantic import BaseModel, ConfigDict, Field


class QuoteRequest(BaseModel):
    """Matches frontend `QuoteRequest` type."""

    model_config = ConfigDict(populate_by_name=True)

    transport_mode: str = Field(alias="transportMode")
    origin: str = Field(alias="from")
    destination: str = Field(alias="to")
    cargo_type: str = Field(alias="cargoType")
    direction: str
    weight_kg: str = Field(alias="weightKg")
    dimensions: str
    pieces: str
    comment: str
    email: str
    whatsapp: str
    reply_by_email: bool = Field(alias="replyByEmail")
    reply_by_whatsapp: bool = Field(alias="replyByWhatsapp")
