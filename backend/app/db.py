import re

from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from pymongo import ReturnDocument

from app.config import settings

_client: AsyncIOMotorClient | None = None


def connect() -> None:
    global _client
    _client = AsyncIOMotorClient(settings.mongo_uri)


def close() -> None:
    if _client is not None:
        _client.close()


def get_database() -> AsyncIOMotorDatabase:
    if _client is None:
        connect()
    assert _client is not None
    return _client[settings.mongo_db]


async def next_request_number() -> int:
    """Atomic counter for `requests._id` (e.g. "МП-2848"), so IDs created from
    the calculator continue the same human-readable sequence as seeded data
    instead of looking like a random hex string next to it."""
    db = get_database()
    counter = await db.counters.find_one({"_id": "requests"})
    if counter is None:
        baseline = 0
        async for doc in db.requests.find({}, {"_id": 1}):
            match = re.match(r"МП-(\d+)$", doc["_id"])
            if match:
                baseline = max(baseline, int(match.group(1)))
        await db.counters.update_one({"_id": "requests"}, {"$set": {"seq": baseline}}, upsert=True)

    updated = await db.counters.find_one_and_update(
        {"_id": "requests"},
        {"$inc": {"seq": 1}},
        upsert=True,
        return_document=ReturnDocument.AFTER,
    )
    return updated["seq"]
