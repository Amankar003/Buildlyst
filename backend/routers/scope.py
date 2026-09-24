"""
Scope recommendation endpoint powered by Groq LLM.
"""

import time
import json
import logging
from collections import defaultdict
from fastapi import APIRouter, HTTPException, Request, status
from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage, SystemMessage

from backend.config import get_settings
from backend.models.schemas import ScopeRequest, ScopeResponse

logger = logging.getLogger("buildlyst.scope")
router = APIRouter(prefix="/api", tags=["Scope Recommendation"])

# ── Simple in-memory rate limiter ────────────────────────────
_rate_store: dict[str, list[float]] = defaultdict(list)


def _check_rate_limit(client_ip: str):
    settings = get_settings()
    now = time.time()
    window = settings.RATE_LIMIT_WINDOW_SECONDS
    max_reqs = settings.RATE_LIMIT_MAX_REQUESTS

    _rate_store[client_ip] = [
        ts for ts in _rate_store[client_ip] if now - ts < window
    ]

    if len(_rate_store[client_ip]) >= max_reqs:
        logger.warning("Scope rate limit exceeded for IP: %s", client_ip)
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail=f"Too many requests. Please wait before trying again.",
        )

    _rate_store[client_ip].append(now)


_SYSTEM_PROMPT = """You are Buildlyst's AI Architect. Your job is to recommend the best technical solution for a potential client based on their business description and problem.

AVAILABLE BUILDLYST SERVICES:
1. AI AGENTS & AUTOMATION (WhatsApp AI Qualification Agent, Customer Support Agent, Sales Agent, Autonomous Workflows)
2. GENERATIVE AI & RAG (RAG / Knowledge Assistant, AI Document Processing, Custom LLM Pipeline)
3. MACHINE LEARNING & PREDICTIVE AI (Predictive ML System, Computer Vision, Data Analytics Model)
4. DATA ENGINEERING & ANALYTICS (Data Pipeline, Data Warehouse, Real-time Streaming, AI Insight Dashboard)
5. AI PRODUCT ENGINEERING (Business Website, Custom E-commerce, SaaS Platform, Web Application Build)

Analyze the user's business and problem, and recommend exactly 3 relevant solutions from the available services list above.
Format the output EXACTLY as valid JSON matching this schema. DO NOT output any markdown, explanations, or code blocks outside the JSON.
{
  "primaryRecommendation": {
    "name": "Specific Solution Name (e.g., WhatsApp AI Qualification Agent)",
    "service": "Broad Service Category (e.g., AI AGENTS)",
    "reason": "1-2 short sentences explaining why this fits."
  },
  "alternativeRecommendations": [
    {
      "name": "...",
      "service": "...",
      "reason": "..."
    },
    {
      "name": "...",
      "service": "...",
      "reason": "..."
    }
  ],
  "complexity": "low" | "medium" | "high"
}
"""

@router.post(
    "/scope-recommend",
    response_model=ScopeResponse,
    summary="Get an AI-powered project scope recommendation",
)
async def scope_recommend(data: ScopeRequest, request: Request):
    client_ip = request.client.host if request.client else "unknown"
    _check_rate_limit(client_ip)

    settings = get_settings()
    api_key = settings.GROQ_API_KEY

    if not api_key:
        logger.warning("No GROQ_API_KEY found, falling back.")
        return ScopeResponse(
            primaryRecommendation={"name": "Tech Stack Consultation", "service": "AI PRODUCT ENGINEERING", "reason": "Fallback recommendation."},
            alternativeRecommendations=[],
            complexity="medium",
            fallback=True
        )

    try:
        messages = [
            SystemMessage(content=_SYSTEM_PROMPT),
            HumanMessage(content=f"Business: {data.business}\n\nProblem: {data.problem}")
        ]

        llm = ChatGroq(
            model="openai/gpt-oss-120b",
            api_key=api_key,
            temperature=0.1,
            max_tokens=1024,
            model_kwargs={"response_format": {"type": "json_object"}}
        )

        response = llm.invoke(messages)
        content = response.content or "{}"
        
        # Parse JSON
        parsed = json.loads(content)
        
        return ScopeResponse(
            primaryRecommendation=parsed.get("primaryRecommendation", {}),
            alternativeRecommendations=parsed.get("alternativeRecommendations", []),
            complexity=parsed.get("complexity", "medium").lower(),
            fallback=False
        )

    except Exception as e:
        logger.error(f"Scope recommendation failed: {e}")
        # Return fallback flag instead of 500 error to ensure frontend keeps working gracefully
        return ScopeResponse(
            primaryRecommendation={"name": "Custom System Architecture", "service": "AI PRODUCT ENGINEERING", "reason": "Error generating recommendation."},
            alternativeRecommendations=[],
            complexity="high",
            fallback=True
        )
