"""
Chatbot service handling Gemini LLM integration, conversation history, and fallback logic.
"""

import time
import logging
import uuid
import warnings
warnings.filterwarnings("ignore", category=FutureWarning)

import google.generativeai as genai
from google.generativeai.types import HarmCategory, HarmBlockThreshold
from app.config import get_settings

logger = logging.getLogger("buildlyst.chat_service")

# ── In-Memory Store ──────────────────────────────────────────
# Dictionary mapping conversation_id -> list of message dicts (role, parts)
# Example message: {"role": "user", "parts": [{"text": "Hello"}]}
_conversations: dict[str, list[dict]] = {}
_last_activity: dict[str, float] = {}

# ── Persona Prompt ───────────────────────────────────────────
SYSTEM_PROMPT = (
    "You are the official AI assistant for Buildlyst, an elite AI agency specializing in "
    "AI Agent Development, Gen AI, Machine Learning, Deep Learning, Data Analysis, and Web Development.\n"
    "Your goal is to be helpful, professional, and concise.\n"
    "You can explain our services, provide high-level insights, and give rough project timelines (usually 4 to 12 weeks).\n"
    "However, you MUST hand off to a human for pricing specifics, contract details, or complex technical consulting. "
    "To hand off, encourage the user to fill out the contact form or email hello@buildlyst.com.\n"
    "Always keep your answers under 3-4 short paragraphs. Use bullet points if listing multiple items."
)


def _prune_old_conversations():
    """Remove sessions that have expired based on TTL."""
    settings = get_settings()
    ttl = settings.CHAT_SESSION_TTL_SECONDS
    now = time.time()
    expired = [cid for cid, ts in _last_activity.items() if now - ts > ttl]
    for cid in expired:
        _conversations.pop(cid, None)
        _last_activity.pop(cid, None)


def get_reply(message: str, conversation_id: str | None) -> tuple[str, str]:
    """
    Get a reply from the LLM. If the API key is missing or fails, 
    use keyword-matching fallback logic.
    Returns (reply_text, conversation_id).
    """
    settings = get_settings()
    
    # 1. Manage Conversation ID & Cleanup
    _prune_old_conversations()
    if not conversation_id or conversation_id not in _conversations:
        conversation_id = str(uuid.uuid4())
        _conversations[conversation_id] = []
    
    now = time.time()
    _last_activity[conversation_id] = now

    # 2. Add user message to history
    history = _conversations[conversation_id]
    history.append({"role": "user", "parts": [{"text": message}]})
    
    # Cap history length
    max_hist = settings.CHAT_MAX_HISTORY
    if len(history) > max_hist * 2: # User + Model pairs
        history = history[-(max_hist * 2):]
        _conversations[conversation_id] = history

    # 3. Try LLM Call
    api_key = settings.GEMINI_API_KEY
    if api_key:
        try:
            genai.configure(api_key=api_key)
            # Use gemini-2.0-flash as the standard fast text model
            model = genai.GenerativeModel('gemini-2.0-flash', system_instruction=SYSTEM_PROMPT)
            
            # Create a chat session with the previous history (excluding the very last user message we just appended)
            # as send_message will append the new message for us.
            previous_history = history[:-1]
            chat_session = model.start_chat(history=previous_history)
            
            response = chat_session.send_message(
                message,
                safety_settings={
                    HarmCategory.HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_ONLY_HIGH,
                    HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_ONLY_HIGH,
                    HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: HarmBlockThreshold.BLOCK_ONLY_HIGH,
                    HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_ONLY_HIGH,
                }
            )
            
            reply_text = response.text
            # Append the model's reply to our history
            history.append({"role": "model", "parts": [{"text": reply_text}]})
            return reply_text, conversation_id
            
        except Exception as e:
            logger.error(f"Gemini API error: {e}")
            # Fall through to fallback logic below
    
    # 4. Fallback Keyword Logic (No API key or API error)
    msg_lower = message.lower()
    if any(kw in msg_lower for kw in ["agent", "ai agent", "automation"]):
        reply_text = (
            "We build custom AI agents that automate complex business workflows — from customer support "
            "to data pipeline orchestration. Want to schedule a discovery call? You can fill out the contact form."
        )
    elif any(kw in msg_lower for kw in ["price", "cost", "pricing", "budget"]):
        reply_text = (
            "Projects scale based on complexity. For specific pricing or tailored estimates, "
            "please fill out the contact form and our team will get back to you with a detailed proposal."
        )
    elif any(kw in msg_lower for kw in ["ml", "machine learning", "model", "deep learning"]):
        reply_text = (
            "We offer end-to-end ML/DL services including data collection, model architecture design, "
            "training, and production deployment with monitoring."
        )
    else:
        reply_text = (
            "Thanks for reaching out! Buildlyst specializes in AI Agent Development, Gen AI, Machine Learning, "
            "Deep Learning, Data Analysis, and Web Development. How can we help you today? "
            "For specific project inquiries, feel free to use the contact form."
        )
    
    # Append fallback reply to history as model
    history.append({"role": "model", "parts": [{"text": reply_text}]})
    
    return reply_text, conversation_id
