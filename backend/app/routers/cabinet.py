from fastapi import APIRouter, HTTPException
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.config import get_current_user_id
from app.db import get_database
from app.models.cabinet import (
    STATUS_OPTIONS,
    CabinetRequest,
    CabinetRequestDetail,
    CabinetStat,
    CabinetUser,
    RequestDocument,
    RequestStatusOption,
    UpdateRequestStatusRequest,
)

router = APIRouter(prefix="/api/cabinet", tags=["cabinet"])


async def _find_request(db: AsyncIOMotorDatabase, request_id: str) -> RequestDocument:
    raw = await db.requests.find_one({"_id": request_id})
    if raw is None:
        raise HTTPException(status_code=404, detail="Request not found")
    return RequestDocument.model_validate(raw)


# Trend captions are presentational, not derived data (KISS) — only the
# numeric value is computed live from `requests`.
_STAT_TRENDS = {
    "active": ("Активных заявок", "↑ +1 за неделю", "navy"),
    "in-transit": ("В пути", "идут к получателю", "orange"),
    "delivered": ("Доставлено в июне", "↑ +3 к прошлому мес.", "green"),
    "documents": ("Документов", "ожидают подписи", "navy"),
}


@router.get("/user", response_model=CabinetUser)
async def get_user() -> CabinetUser:
    db = get_database()
    raw = await db.users.find_one({"_id": get_current_user_id()})
    if raw is None:
        raise HTTPException(status_code=404, detail="User not found")
    return CabinetUser.model_validate(raw)


@router.get("/stats", response_model=list[CabinetStat])
async def get_stats() -> list[CabinetStat]:
    db = get_database()
    docs = [RequestDocument.model_validate(raw) async for raw in db.requests.find()]

    active = sum(1 for d in docs if d.status_label != "Доставлен")
    in_transit = sum(1 for d in docs if d.status_label == "В пути")
    delivered = sum(1 for d in docs if d.status_label == "Доставлен")
    documents_pending = sum(
        1 for d in docs for doc in d.detail.documents if doc.status == "needs-signature"
    )
    values = {"active": active, "in-transit": in_transit, "delivered": delivered, "documents": documents_pending}

    return [
        CabinetStat(id=stat_id, label=label, value=str(values[stat_id]), trend=trend, tone=tone)
        for stat_id, (label, trend, tone) in _STAT_TRENDS.items()
    ]


@router.get("/requests", response_model=list[CabinetRequest])
async def list_requests() -> list[CabinetRequest]:
    db = get_database()
    docs = [RequestDocument.model_validate(raw) async for raw in db.requests.find()]
    return [doc.to_summary() for doc in docs]


@router.get("/requests/statuses", response_model=list[RequestStatusOption])
async def list_request_statuses() -> list[RequestStatusOption]:
    return [RequestStatusOption(label=label, tone=tone) for label, tone in STATUS_OPTIONS.items()]


@router.get("/requests/{request_id}", response_model=CabinetRequestDetail)
async def get_request(request_id: str) -> CabinetRequestDetail:
    db = get_database()
    doc = await _find_request(db, request_id)
    return doc.to_detail()


@router.patch("/requests/{request_id}/status", response_model=CabinetRequest)
async def update_request_status(request_id: str, payload: UpdateRequestStatusRequest) -> CabinetRequest:
    if payload.status_label not in STATUS_OPTIONS:
        raise HTTPException(status_code=400, detail="Unknown status")

    db = get_database()
    await _find_request(db, request_id)
    status_tone = STATUS_OPTIONS[payload.status_label]
    await db.requests.update_one(
        {"_id": request_id},
        {
            "$set": {
                "status": status_tone,
                "statusLabel": payload.status_label,
                "arrivalDone": status_tone == "ok",
            }
        },
    )
    updated = await _find_request(db, request_id)
    return updated.to_summary()
