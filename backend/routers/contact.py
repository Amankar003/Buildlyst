"""
Contact form & newsletter endpoints.
"""

import time
import json
import logging
import smtplib
from email.message import EmailMessage
from collections import defaultdict
from fastapi import APIRouter, HTTPException, Request, status, BackgroundTasks

from backend.config import get_settings
from backend.models.schemas import (
    ContactRequest, ContactResponse,
    NewsletterRequest, NewsletterResponse,
)

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

def send_smtp_email(data: ContactRequest, settings):
    if not settings.SMTP_SERVER or not settings.SMTP_USERNAME or not settings.SMTP_PASSWORD:
        logger.warning("SMTP configuration is missing in .env.")
        return

    try:
        msg = EmailMessage()
        msg['Subject'] = f"New Inquiry from Buildlyst: {data.project_type.value}"
        msg['From'] = settings.SMTP_USERNAME
        msg['To'] = settings.SMTP_USERNAME  # Send to ourselves

        body = f"Name: {data.name}\n"
        body += f"Email: {data.email}\n"
        body += f"Project Type: {data.project_type.value}\n"
        if data.company:
            body += f"Company: {data.company}\n"
        body += f"\nMessage:\n{data.message}\n"

        msg.set_content(body)

        with smtplib.SMTP_SSL(settings.SMTP_SERVER, settings.SMTP_PORT) as server:
            server.login(settings.SMTP_USERNAME, settings.SMTP_PASSWORD)
            server.send_message(msg)
            
        logger.info("SMTP email sent successfully for lead: %s", data.email)
    except Exception as e:
        logger.error("SMTP email failed for lead: %s", str(e))

@router.post(
    "/contact",
    response_model=ContactResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Submit a contact / project inquiry",
)
async def submit_contact(data: ContactRequest, request: Request, background_tasks: BackgroundTasks):
    client_ip = request.client.host if request.client else "unknown"
    _check_rate_limit(client_ip)

    try:
        settings = get_settings()
        
        # Add email sending to background tasks so we don't block the API response
        background_tasks.add_task(send_smtp_email, data, settings)

        return ContactResponse(
            success=True,
            message="Thank you! We'll get back to you within 24 hours.",
            lead_id=0,
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
        # For a truly stateless site, we just acknowledge receipt. 
        # (In reality, they might hook this up to Mailchimp or another CRM later).
        return NewsletterResponse(success=True, message="Thanks for subscribing! We'll send you updates.")
    except Exception as e:
        logger.error("Newsletter subscription failed: %s", str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Subscription failed. Please try again later.",
        )
