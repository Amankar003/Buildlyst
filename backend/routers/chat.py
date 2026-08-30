"""
Chat endpoint — powered by Gemini LLM with keyword fallback.
"""

import time
import logging
from collections import defaultdict
from fastapi import APIRouter, HTTPException, Request, status

from backend.config import get_settings
from backend.models.schemas import ChatRequest, ChatResponse
from backend.services.chat_service import get_reply

logger = logging.getLogger("buildlyst.chat")
router = APIRouter(prefix="/api", tags=["Chat"])

# ── Simple in-memory rate limiter for Chat ───────────────────
_chat_rate_store: dict[str, list[float]] = defaultdict(list)

def _check_chat_rate_limit(client_ip: str):
    """Raise 429 if the IP exceeds the configured request window."""
    settings = get_settings()
    now = time.time()
    window = settings.RATE_LIMIT_WINDOW_SECONDS
    # Allow a bit more chat requests per minute compared to contact form (e.g. 15 instead of 5)
    max_reqs = settings.RATE_LIMIT_MAX_REQUESTS * 3

    _chat_rate_store[client_ip] = [
        ts for ts in _chat_rate_store[client_ip] if now - ts < window
    ]

    if len(_chat_rate_store[client_ip]) >= max_reqs:
        logger.warning("Chat rate limit exceeded for IP: %s", client_ip)
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail=f"Too many messages. Please wait a minute before trying again.",
        )

    _chat_rate_store[client_ip].append(now)


@router.post(
    "/chat",
    response_model=ChatResponse,
    summary="Send a message to the Buildlyst AI assistant",
)
async def chat(data: ChatRequest, request: Request):
    client_ip = request.client.host if request.client else "unknown"
    _check_chat_rate_limit(client_ip)
    
    try:
        reply_text, conv_id = get_reply(data.message, data.conversation_id)
        return ChatResponse(reply=reply_text, conversation_id=conv_id)
    except Exception as e:
        logger.error(f"Chat endpoint error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Something went wrong. Please try again later.",
        )
