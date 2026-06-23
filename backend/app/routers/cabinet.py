from fastapi import APIRouter, HTTPException
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.config import get_current_user_id
from app.db import get_database
from app.models.cabinet import CabinetRequest, CabinetRequestDetail, CabinetStat, CabinetUser, RequestDocument

router = APIRouter(prefix="/api/cabinet", tags=["cabinet"])

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


@router.get("/requests/{request_id}", response_model=CabinetRequestDetail)
async def get_request(request_id: str) -> CabinetRequestDetail:
    db = get_database()
    raw = await db.requests.find_one({"_id": request_id})
    if raw is None:
        raise HTTPException(status_code=404, detail="Request not found")
    return RequestDocument.model_validate(raw).to_detail()
