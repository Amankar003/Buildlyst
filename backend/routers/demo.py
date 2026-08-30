"""
AI demo endpoint — mock insight generation.
Will be wired to real model inference in Part 3.
"""

import logging
from fastapi import APIRouter, HTTPException, status

from backend.models.schemas import DemoRequest, DemoResponse
from backend.services.chatbot import generate_mock_insight

logger = logging.getLogger("buildlyst.demo")
router = APIRouter(prefix="/api", tags=["AI Demo"])


@router.post(
    "/demo",
    response_model=DemoResponse,
    summary="Get a mock AI insight from a text prompt",
)
async def run_demo(data: DemoRequest):
    try:
        result = generate_mock_insight(data)
        return result
    except Exception as e:
        logger.error("Demo generation failed: %s", str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="AI demo service is temporarily unavailable.",
        )
