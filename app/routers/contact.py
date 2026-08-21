"""
Contact form & newsletter endpoints.
"""

import time
import logging
from collections import defaultdict
from fastapi import APIRouter, HTTPException, Request, status

from app.config import get_settings
from app.models.schemas import (
    ContactRequest, ContactResponse,
    NewsletterRequest, NewsletterResponse,
)
from app.services.email_service import send_contact_email
from app.services.lead_storage import save_lead, subscribe_email

logger = logging.getLogger("buildlyst.contact")
router = APIRouter(prefix="/api", tags=["Contact & Newsletter"])

# ── Simple in-memory rate limiter ────────────────────────────
_rate_store: dict[str, list[float]] = defaultdict(list)


def _check_rate_limit(client_ip: str):
    """Raise 429 if the IP exceeds the configured request window."""
    settings = get_settings()
    now = time.time()
    window = settings.RATE_LIMIT_WINDOW_SECONDS
    max_reqs = settings.RATE_LIMIT_MAX_REQUESTS

    # Prune old timestamps
    _rate_store[client_ip] = [
        ts for ts in _rate_store[client_ip] if now - ts < window
    ]

    if len(_rate_store[client_ip]) >= max_reqs:
        logger.warning("Rate limit exceeded for IP: %s", client_ip)
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail=f"Too many requests. Please wait {window} seconds before trying again.",
        )

    _rate_store[client_ip].append(now)


# ── POST /api/contact ───────────────────────────────────────

@router.post(
    "/contact",
    response_model=ContactResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Submit a contact / project inquiry",
)
async def submit_contact(data: ContactRequest, request: Request):
    client_ip = request.client.host if request.client else "unknown"
    _check_rate_limit(client_ip)

    try:
        # 1. Save lead to SQLite
        lead_id = save_lead(data)

        # 2. Send notification email (non-blocking on failure)
        email_sent = send_contact_email(data)
        if not email_sent:
            logger.warning("Email notification failed for lead %d, but lead was saved.", lead_id)

        return ContactResponse(
            success=True,
            message="Thank you! We'll get back to you within 24 hours.",
            lead_id=lead_id,
        )

    except Exception as e:
        logger.error("Contact submission failed: %s", str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Something went wrong. Please try again later.",
        )


# ── POST /api/newsletter ────────────────────────────────────

@router.post(
    "/newsletter",
    response_model=NewsletterResponse,
    summary="Subscribe to the Buildlyst newsletter",
)
async def subscribe_newsletter(data: NewsletterRequest, request: Request):
    client_ip = request.client.host if request.client else "unknown"
    _check_rate_limit(client_ip)

    try:
        result = subscribe_email(str(data.email))
        status_code = status.HTTP_201_CREATED if result["success"] else status.HTTP_409_CONFLICT
        return NewsletterResponse(**result)

    except Exception as e:
        logger.error("Newsletter subscription failed: %s", str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Subscription failed. Please try again later.",
        )
