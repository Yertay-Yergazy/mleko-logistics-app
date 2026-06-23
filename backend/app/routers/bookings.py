from fastapi import APIRouter, HTTPException
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.db import get_database
from app.models.booking import Booking, BookingDetail, BookingDocument, IssueInvoiceRequest

router = APIRouter(prefix="/api/bookings", tags=["bookings"])


async def _find_booking(db: AsyncIOMotorDatabase, booking_id: str) -> BookingDocument:
    raw = await db.bookings.find_one({"_id": booking_id})
    if raw is None:
        raise HTTPException(status_code=404, detail="Booking not found")
    return BookingDocument.model_validate(raw)


@router.get("", response_model=list[Booking])
async def list_bookings() -> list[Booking]:
    db = get_database()
    docs = [BookingDocument.model_validate(raw) async for raw in db.bookings.find()]
    return [doc.to_summary() for doc in docs]


@router.get("/{booking_id}", response_model=BookingDetail)
async def get_booking(booking_id: str) -> BookingDetail:
    db = get_database()
    doc = await _find_booking(db, booking_id)
    return doc.to_detail()


@router.post("/{booking_id}/invoice")
async def issue_invoice(booking_id: str, payload: IssueInvoiceRequest) -> dict:
    db = get_database()
    await _find_booking(db, booking_id)
    await db.bookings.update_one({"_id": booking_id}, {"$set": {"paymentMethod": payload.method}})
    return {"ok": True}
