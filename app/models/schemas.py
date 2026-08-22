"""
Pydantic schemas for all API request / response payloads.
"""

from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from enum import Enum
from datetime import datetime


# ── Enums ────────────────────────────────────────────────────

class ProjectType(str, Enum):
    AI_AGENTS = "AI Agents"
    GEN_AI = "Gen AI"
    ML = "Machine Learning"
    DEEP_LEARNING = "Deep Learning"
    DATA_ANALYSIS = "Data Analysis"
    DATA_ENGINEERING = "Data Engineering"
    WEB_DEV = "Web Development"
    OTHER = "Other"


# ── Contact Form ─────────────────────────────────────────────

class ContactRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=100, examples=["Jane Doe"])
    email: EmailStr = Field(..., examples=["jane@example.com"])
    company: Optional[str] = Field(None, max_length=200, examples=["Acme Corp"])
    project_type: ProjectType = Field(..., examples=[ProjectType.AI_AGENTS])
    message: str = Field(..., min_length=10, max_length=2000, examples=["I need an AI agent for customer support."])


class ContactResponse(BaseModel):
    success: bool
    message: str
    lead_id: Optional[int] = None


# ── Newsletter ───────────────────────────────────────────────

class NewsletterRequest(BaseModel):
    email: EmailStr = Field(..., examples=["subscriber@example.com"])


class NewsletterResponse(BaseModel):
    success: bool
    message: str


# ── Demo ─────────────────────────────────────────────────────

class DemoRequest(BaseModel):
    prompt: str = Field(..., min_length=3, max_length=500, examples=["Analyze customer churn trends"])


class DemoResponse(BaseModel):
    success: bool
    prompt: str
    insight: str
    confidence: float
    tags: list[str]
    generated_at: datetime


# ── Chat ─────────────────────────────────────────────────────

class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=1000, examples=["What services do you offer?"])
    conversation_id: Optional[str] = Field(None, examples=["abc-123"])


class ChatResponse(BaseModel):
    reply: str
    conversation_id: str


# ── Health ───────────────────────────────────────────────────

class HealthResponse(BaseModel):
    status: str
    version: str
