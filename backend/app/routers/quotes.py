import logging
import time
from collections import defaultdict
from datetime import datetime

from fastapi import APIRouter, HTTPException, Request

from app.db import get_database, next_request_number
from app.models.quote import QuoteRequest

logger = logging.getLogger("quotes")

router = APIRouter(prefix="/api/quotes", tags=["quotes"])

RATE_LIMIT = 5
RATE_WINDOW_SECONDS = 60.0

# In-memory sliding window per IP. Single-process only — fine at this scale,
# would need Redis (or similar) behind multiple backend instances.
_request_times: dict[str, list[float]] = defaultdict(list)

_TYPE_BY_TRANSPORT_MODE = {"air": "air", "sea": "sea"}
_TYPE_LABEL_BY_TRANSPORT_MODE = {
    "auto": "Авто",
    "air": "Авиа",
    "sea": "Море",
    "rail": "ЖД",
    "multimodal": "Мультимодальная",
}
_CARGO_TYPE_LABELS = {"ltl": "сборный груз", "ftl": "полная машина"}
_RU_MONTHS = [
    "января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря",
]


def _enforce_rate_limit(ip: str) -> None:
    now = time.monotonic()
    recent = [t for t in _request_times[ip] if now - t < RATE_WINDOW_SECONDS]
    if len(recent) >= RATE_LIMIT:
        raise HTTPException(
            status_code=429,
            detail="Превышено количество расчётов, попробуйте через пару минут",
        )
    recent.append(now)
    _request_times[ip] = recent


def _format_ru_datetime(dt: datetime) -> str:
    return f"{dt.day} {_RU_MONTHS[dt.month - 1]} · {dt.strftime('%H:%M')}"


def _build_request_document(payload: QuoteRequest, seq: int) -> dict:
    cargo_type_label = _CARGO_TYPE_LABELS.get(payload.cargo_type, payload.cargo_type)
    now = datetime.now()

    return {
        "_id": f"МП-{seq}",
        "route": f"{payload.origin} → {payload.destination}",
        "cargoInfo": f"{payload.weight_kg} кг · {cargo_type_label}",
        "type": _TYPE_BY_TRANSPORT_MODE.get(payload.transport_mode, "auto"),
        "typeLabel": _TYPE_LABEL_BY_TRANSPORT_MODE.get(payload.transport_mode, "Авто"),
        "status": "wait",
        "statusLabel": "Новая заявка",
        "sentDate": now.strftime("%d.%m.%y"),
        "arrivalDate": "уточняется",
        "arrivalDone": False,
        "detail": {
            "fromCode": payload.origin[:3].upper(),
            "fromCity": payload.origin,
            "toCode": payload.destination[:3].upper(),
            "toCity": payload.destination,
            "progressPercent": 0,
            "timeline": [
                {"label": "Заявка принята", "date": _format_ru_datetime(now), "state": "active"},
                {"label": "Обработка менеджером", "date": "ожидается", "state": "pending"},
            ],
            "weight": f"{payload.weight_kg} кг",
            "volume": f"{payload.dimensions} см",
            "cargoType": cargo_type_label,
            "packaging": f"{payload.pieces} мест",
            "documents": [],
            "email": payload.email or None,
            "whatsapp": payload.whatsapp or None,
            "comment": payload.comment or None,
        },
    }


@router.post("")
async def submit_quote(payload: QuoteRequest, request: Request) -> dict:
    ip = request.client.host if request.client else "unknown"
    logger.info("quote request from %s", ip)
    _enforce_rate_limit(ip)
    logger.info("quote payload from %s: %s", ip, payload.model_dump(by_alias=True))

    seq = await next_request_number()
    document = _build_request_document(payload, seq)
    db = get_database()
    await db.requests.insert_one(document)

    return {"ok": True, "id": document["_id"]}
