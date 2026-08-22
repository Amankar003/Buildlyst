"""
Application configuration using pydantic-settings.
All secrets are loaded from a .env file — never hardcoded.
"""

from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    # ── App ──────────────────────────────────────────────
    APP_NAME: str = "Buildlyst"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True



    # ── API Keys (for future integrations) ───────────────
    GEMINI_API_KEY: str = ""
    GROQ_API_KEY: str = ""

    # ── SMTP Configuration ───────────────────────────────────
    SMTP_SERVER: str = ""
    SMTP_PORT: int = 465
    SMTP_USERNAME: str = ""
    SMTP_PASSWORD: str = ""

    # ── Rate Limiting ────────────────────────────────────
    RATE_LIMIT_MAX_REQUESTS: int = 5
    RATE_LIMIT_WINDOW_SECONDS: int = 60

    # ── Chatbot ──────────────────────────────────────────
    CHAT_MAX_HISTORY: int = 20
    CHAT_SESSION_TTL_SECONDS: int = 3600

    model_config = {
        "env_file": ".env",
        "env_file_encoding": "utf-8",
        "case_sensitive": True,
    }


@lru_cache()
def get_settings() -> Settings:
    """Cached settings instance — read once, reuse everywhere."""
    return Settings()
