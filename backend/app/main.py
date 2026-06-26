import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.db import close, connect
from app.routers import bookings, cabinet, quotes

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(name)s %(message)s")


@asynccontextmanager
async def lifespan(app: FastAPI):
    connect()
    yield
    close()


app = FastAPI(title="Млечный Путь API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(bookings.router)
app.include_router(cabinet.router)
app.include_router(quotes.router)


@app.get("/api/health")
async def health() -> dict:
    return {"ok": True}
