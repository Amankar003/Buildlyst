"""
Buildlyst — FastAPI Application
================================
AI Agency single-page website backend.
Serves index.html via Jinja2, exposes REST API for contact, newsletter, demo & chat.
"""

import time
import logging
from pathlib import Path
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse

from app.config import get_settings
from app.models.schemas import HealthResponse
from app.routers import contact, demo, chat

# ── Paths ────────────────────────────────────────────────────
BASE_DIR = Path(__file__).resolve().parent

# ── Logging ──────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s │ %(levelname)-8s │ %(name)s │ %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger("buildlyst")


# ── Lifespan ─────────────────────────────────────────────────
@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup / shutdown lifecycle."""
    settings = get_settings()
    logger.info("🚀 Starting %s v%s", settings.APP_NAME, settings.APP_VERSION)
    yield
    logger.info("👋 Shutting down %s", settings.APP_NAME)


# ── App Instance ─────────────────────────────────────────────
settings = get_settings()

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="Buildlyst AI Agency — Backend API",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

# ── CORS ─────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost",
        "http://localhost:8000",
        "http://localhost:3000",
        "http://localhost:5173",
        "http://127.0.0.1:8000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Request Logging Middleware ───────────────────────────────
@app.middleware("http")
async def log_requests(request: Request, call_next):
    start = time.perf_counter()
    response = await call_next(request)
    duration_ms = (time.perf_counter() - start) * 1000
    logger.info(
        "%s %s → %d (%.1fms)",
        request.method,
        request.url.path,
        response.status_code,
        duration_ms,
    )
    return response


# ── Static Files & Templates ────────────────────────────────
app.mount("/static", StaticFiles(directory=BASE_DIR / "static"), name="static")
templates = Jinja2Templates(directory=BASE_DIR / "templates")


# ── Routers ──────────────────────────────────────────────────
app.include_router(contact.router)
app.include_router(demo.router)
app.include_router(chat.router)


# ── Root — Serve SPA ─────────────────────────────────────────
@app.get("/", response_class=HTMLResponse, include_in_schema=False)
async def serve_index(request: Request):
    """Serve the Buildlyst single-page website."""
    return templates.TemplateResponse(name="index.html", request=request)


# ── Health Check ─────────────────────────────────────────────
@app.get(
    "/health",
    response_model=HealthResponse,
    tags=["System"],
    summary="Health check",
)
async def health():
    return HealthResponse(status="ok", version=settings.APP_VERSION)
