"""Populates MongoDB with the same data the frontend used to mock
(see specs/content-inventory.md). Idempotent — upserts by `_id`, safe to
re-run. Usage: `python -m app.seed` (with MongoDB reachable and `.env` set).
"""

import asyncio

from app.db import close, connect, get_database

USERS = [
    {"_id": "default", "name": "Аяулым Сатыбалды", "initials": "АС", "company": "ТОО «Cargo Plus»"},
]

BOOKINGS = [
    {
        "_id": "MP-024815",
        "createdAt": "09.06.2026",
        "status": "wait",
        "statusLabel": "В ожидании",
        "type": "Авто · FTL",
        "transportType": "Авто · FTL (полная)",
        "direction": "Export",
        "route": "Алматы → Москва",
        "departureDate": "14.06.2026",
        "weightVolume": "1 200 кг · 4.5 м³",
        "cargoType": "Сборный груз",
        "amount": "₸ 348 000",
        "paymentMethod": None,
    },
    {
        "_id": "MP-024788",
        "createdAt": "02.06.2026",
        "status": "ok",
        "statusLabel": "Готово",
        "type": "Авиа",
        "transportType": "Авиа · регулярный рейс",
        "direction": "Import",
        "route": "Нью-Йорк → Алматы",
        "departureDate": "07.06.2026",
        "weightVolume": "640 кг · 2.1 м³",
        "cargoType": "Сборный груз",
        "amount": "$ 1 240",
        "paymentMethod": "requisites",
    },
    {
        "_id": "MP-024750",
        "createdAt": "28.05.2026",
        "status": "ok",
        "statusLabel": "Готово",
        "type": "Авто · LTL",
        "transportType": "Авто · LTL (сборный)",
        "direction": "Import",
        "route": "Минск → Алматы",
        "departureDate": "02.06.2026",
        "weightVolume": "980 кг · 3.4 м³",
        "cargoType": "Сборный груз",
        "amount": "$ 980",
        "paymentMethod": "remote",
    },
]

REQUESTS = [
    {
        "_id": "МП-2847",
        "route": "Нью-Йорк → Алматы",
        "cargoInfo": "820 кг · сборный",
        "type": "air",
        "typeLabel": "Авиа",
        "status": "wait",
        "statusLabel": "В пути",
        "sentDate": "14.06.26",
        "arrivalDate": "22.06.26",
        "arrivalDone": False,
        "detail": {
            "fromCode": "JFK",
            "fromCity": "Нью-Йорк",
            "toCode": "ALA",
            "toCity": "Алматы",
            "progressPercent": 62,
            "timeline": [
                {"label": "Заявка принята", "date": "13 июня · 14:22", "state": "done"},
                {"label": "Груз принят к отправке", "date": "14 июня · 09:05", "state": "done"},
                {"label": "В пути · рейс KZ704", "date": "14 июня · 22:40 — расч. прибытие 22 июня", "state": "active"},
                {"label": "Таможенное оформление", "date": "ожидается", "state": "pending"},
                {"label": "Доставка получателю", "date": "ожидается · 22 июня", "state": "pending"},
            ],
            "weight": "820 кг",
            "volume": "4.2 м³",
            "cargoType": "Электроника",
            "packaging": "5 паллет",
            "documents": [
                {"name": "Авиа-накладная (AWB)", "status": "ready"},
                {"name": "Инвойс", "status": "ready"},
                {"name": "Таможенная декларация", "status": "needs-signature"},
            ],
        },
    },
    {
        "_id": "МП-2831",
        "route": "Минск → Алматы",
        "cargoInfo": "3 200 кг · полная машина",
        "type": "auto",
        "typeLabel": "Авто",
        "status": "wait",
        "statusLabel": "На таможне",
        "sentDate": "10.06.26",
        "arrivalDate": "28.06.26",
        "arrivalDone": False,
        "detail": {
            "fromCode": "MSQ",
            "fromCity": "Минск",
            "toCode": "ALA",
            "toCity": "Алматы",
            "progressPercent": 70,
            "timeline": [
                {"label": "Заявка принята", "date": "09 июня · 10:00", "state": "done"},
                {"label": "Груз принят к отправке", "date": "10 июня · 08:30", "state": "done"},
                {"label": "В пути", "date": "10 июня — 24 июня", "state": "done"},
                {"label": "Таможенное оформление", "date": "сейчас", "state": "active"},
                {"label": "Доставка получателю", "date": "ожидается · 28 июня", "state": "pending"},
            ],
            "weight": "3 200 кг",
            "volume": "9.8 м³",
            "cargoType": "Стройматериалы",
            "packaging": "паллеты",
            "documents": [
                {"name": "CMR", "status": "ready"},
                {"name": "Инвойс", "status": "ready"},
                {"name": "Таможенная декларация", "status": "needs-signature"},
            ],
        },
    },
    {
        "_id": "МП-2819",
        "route": "Китай → Алматы",
        "cargoInfo": "1 × 20ft контейнер",
        "type": "sea",
        "typeLabel": "Море",
        "status": "ok",
        "statusLabel": "Доставлен",
        "sentDate": "01.06.26",
        "arrivalDate": "18.06.26",
        "arrivalDone": True,
        "detail": {
            "fromCode": "SHA",
            "fromCity": "Шанхай",
            "toCode": "ALA",
            "toCity": "Алматы",
            "progressPercent": 100,
            "timeline": [
                {"label": "Заявка принята", "date": "30 мая · 09:00", "state": "done"},
                {"label": "Груз принят к отправке", "date": "01 июня · 12:00", "state": "done"},
                {"label": "В пути", "date": "01 июня — 16 июня", "state": "done"},
                {"label": "Таможенное оформление", "date": "17 июня", "state": "done"},
                {"label": "Доставка получателю", "date": "18 июня", "state": "done"},
            ],
            "weight": "18 000 кг",
            "volume": "28 м³",
            "cargoType": "Бытовая техника",
            "packaging": "1 контейнер 20ft",
            "documents": [
                {"name": "Коносамент (B/L)", "status": "ready"},
                {"name": "Инвойс", "status": "ready"},
                {"name": "Таможенная декларация", "status": "ready"},
            ],
        },
    },
    {
        "_id": "МП-2804",
        "route": "Стамбул → Алматы",
        "cargoInfo": "1 850 кг · сборный",
        "type": "auto",
        "typeLabel": "Авто",
        "status": "wait",
        "statusLabel": "В пути",
        "sentDate": "05.06.26",
        "arrivalDate": "25.06.26",
        "arrivalDone": False,
        "detail": {
            "fromCode": "IST",
            "fromCity": "Стамбул",
            "toCode": "ALA",
            "toCity": "Алматы",
            "progressPercent": 45,
            "timeline": [
                {"label": "Заявка принята", "date": "04 июня · 11:15", "state": "done"},
                {"label": "Груз принят к отправке", "date": "05 июня · 09:40", "state": "done"},
                {"label": "В пути", "date": "05 июня — 25 июня", "state": "active"},
                {"label": "Таможенное оформление", "date": "ожидается", "state": "pending"},
                {"label": "Доставка получателю", "date": "ожидается · 25 июня", "state": "pending"},
            ],
            "weight": "1 850 кг",
            "volume": "5.6 м³",
            "cargoType": "Текстиль",
            "packaging": "12 коробов",
            "documents": [
                {"name": "CMR", "status": "ready"},
                {"name": "Инвойс", "status": "needs-signature"},
            ],
        },
    },
    {
        "_id": "МП-2798",
        "route": "Москва → Алматы",
        "cargoInfo": "640 кг · сборный",
        "type": "auto",
        "typeLabel": "Авто",
        "status": "pending",
        "statusLabel": "Оформление",
        "sentDate": "18.06.26",
        "arrivalDate": "02.07.26",
        "arrivalDone": False,
        "detail": {
            "fromCode": "MOW",
            "fromCity": "Москва",
            "toCode": "ALA",
            "toCity": "Алматы",
            "progressPercent": 15,
            "timeline": [
                {"label": "Заявка принята", "date": "17 июня · 16:20", "state": "done"},
                {"label": "Груз принят к отправке", "date": "18 июня · 10:05", "state": "active"},
                {"label": "В пути", "date": "ожидается", "state": "pending"},
                {"label": "Таможенное оформление", "date": "ожидается", "state": "pending"},
                {"label": "Доставка получателю", "date": "ожидается · 02 июля", "state": "pending"},
            ],
            "weight": "640 кг",
            "volume": "2.0 м³",
            "cargoType": "Запчасти",
            "packaging": "4 коробки",
            "documents": [
                {"name": "Инвойс", "status": "ready"},
                {"name": "Таможенная декларация", "status": "needs-signature"},
            ],
        },
    },
]


async def seed() -> None:
    connect()
    db = get_database()

    for user in USERS:
        await db.users.update_one({"_id": user["_id"]}, {"$set": user}, upsert=True)
    for booking in BOOKINGS:
        await db.bookings.update_one({"_id": booking["_id"]}, {"$set": booking}, upsert=True)
    for request in REQUESTS:
        await db.requests.update_one({"_id": request["_id"]}, {"$set": request}, upsert=True)

    print(f"Seeded {len(USERS)} users, {len(BOOKINGS)} bookings, {len(REQUESTS)} requests.")
    close()


if __name__ == "__main__":
    asyncio.run(seed())
