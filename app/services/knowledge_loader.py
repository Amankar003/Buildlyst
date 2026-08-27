"""
Buildlyst Knowledge Loader — loads the approved knowledge base and retrieves
relevant sections for grounding LLM responses.

Retrieval Guardrail (Layer 3):
- Only retrieves from the approved Buildlyst knowledge file
- Applies relevance scoring with a configurable threshold
- Returns empty context when no sufficiently relevant section is found
"""

import re
import logging
from pathlib import Path

logger = logging.getLogger("buildlyst.knowledge")

# ── Configuration ────────────────────────────────────────────
KNOWLEDGE_FILE = Path(__file__).resolve().parent.parent / "knowledge" / "buildlyst_knowledge.md"
RELEVANCE_THRESHOLD = 0.15  # Initial default — tune based on testing

# ── Module-Level Knowledge Store ─────────────────────────────
_knowledge_sections: dict[str, str] = {}

# ── Section Keyword Mappings ─────────────────────────────────
# Each section has weighted keyword groups for relevance scoring.
# "phrases" get higher weight than single "words" to reward specificity.
_SECTION_RELEVANCE = {
    "Company Overview": {
        "phrases": ["what is buildlyst", "about buildlyst", "who is buildlyst", "tell me about",
                     "what does buildlyst do", "buildlyst philosophy", "your company", "your studio",
                     "about you", "who are you"],
        "words": ["buildlyst", "company", "about", "philosophy", "studio", "agency", "team",
                  "founded", "mission", "vision", "overview", "background", "introduction"],
    },
    "Services Overview": {
        "phrases": ["what services", "what do you offer", "your services", "capabilities",
                     "what can you do", "what can you build", "your solutions", "service list",
                     "all services", "service categories"],
        "words": ["services", "capabilities", "offer", "provide", "solutions", "help",
                  "build", "categories"],
    },
    "AI Agent Development": {
        "phrases": ["ai agent", "autonomous agent", "customer support bot", "ai chatbot",
                     "multi-agent", "agent swarm", "workflow automation", "lead scoring",
                     "ticket escalation", "human in the loop", "langgraph"],
        "words": ["agent", "autonomous", "automation", "chatbot", "bot", "crm", "swarm",
                  "orchestration", "routing", "sandbox", "tool calling", "whatsapp"],
    },
    "Generative AI": {
        "phrases": ["generative ai", "gen ai", "custom llm", "rag system", "rag architecture",
                     "fine tuning", "fine-tuning", "knowledge base", "retrieval augmented",
                     "vector database", "ai knowledge", "llm deployment"],
        "words": ["genai", "llm", "rag", "gpt", "fine-tune", "finetune", "retrieval",
                  "generation", "embedding", "vector", "citation", "prompt"],
    },
    "Machine Learning and Deep Learning": {
        "phrases": ["machine learning", "deep learning", "predictive model", "neural network",
                     "computer vision", "natural language processing", "nlp", "model training",
                     "model serving", "ml pipeline", "data science"],
        "words": ["ml", "prediction", "classification", "regression", "training", "inference",
                  "pytorch", "tensorflow", "model", "feature", "evaluation", "retraining",
                  "monitoring", "drift"],
    },
    "Data Engineering": {
        "phrases": ["data engineering", "data pipeline", "etl pipeline", "data warehouse",
                     "data analytics", "data platform", "data visualization", "data cleaning",
                     "data integration", "business intelligence"],
        "words": ["data", "etl", "pipeline", "warehouse", "analytics", "dashboard",
                  "snowflake", "airflow", "redshift", "sql", "database", "kpi",
                  "visualization", "bi", "ingestion"],
    },
    "Website and Product Development": {
        "phrases": ["website development", "web development", "web app", "web application",
                     "full stack", "full-stack", "saas product", "landing page",
                     "product development", "frontend", "backend"],
        "words": ["website", "web", "frontend", "backend", "react", "nextjs", "app",
                  "application", "ui", "ux", "responsive", "api", "microservices",
                  "cdn", "deployment"],
    },
    "Strategy Consulting": {
        "phrases": ["strategy consulting", "tech audit", "fractional cto", "strategy sprint",
                     "architecture review", "codebase review", "technology stack"],
        "words": ["consulting", "audit", "strategy", "cto", "roadmap", "feasibility",
                  "blueprint", "review", "guidance", "vendor"],
    },
    "Pricing": {
        "phrases": ["how much", "what does it cost", "pricing plan", "pricing tier",
                     "engagement model", "investment", "pricing matrix", "project cost",
                     "price estimate", "budget"],
        "words": ["price", "pricing", "cost", "budget", "tier", "plan", "package",
                  "affordable", "expensive", "cheap", "rate", "quote", "estimate",
                  "investment", "rupee", "inr"],
    },
    "Engineering Process and Methodology": {
        "phrases": ["your process", "how do you work", "engineering methodology",
                     "project process", "development process", "how does it work",
                     "delivery process", "project phases", "project timeline"],
        "words": ["process", "methodology", "phase", "discovery", "architecture",
                  "engineering", "deployment", "ci/cd", "containerization", "docker",
                  "kubernetes", "testing", "integration"],
    },
    "Case Studies": {
        "phrases": ["case study", "case studies", "past projects", "your work",
                     "portfolio", "success stories", "client projects", "proof of impact",
                     "previous work", "project examples"],
        "words": ["case", "study", "project", "portfolio", "work", "example",
                  "fintech", "healthtech", "ecommerce", "success", "impact",
                  "result", "roi"],
    },
    "Technologies and Tech Stack": {
        "phrases": ["tech stack", "technology stack", "what technologies", "tools you use",
                     "frameworks you use", "programming languages"],
        "words": ["technology", "stack", "framework", "language", "python", "fastapi",
                  "react", "aws", "docker", "kubernetes", "openai", "pytorch",
                  "tensorflow", "postgresql", "pinecone", "langchain", "redis",
                  "celery", "vercel", "nextjs"],
    },
    "FAQs": {
        "phrases": ["frequently asked", "common questions", "faq"],
        "words": ["faq", "question", "answer"],
    },
    "Contact Information": {
        "phrases": ["how to contact", "contact information", "email address",
                     "where are you located", "your location", "office location",
                     "get in touch", "reach you"],
        "words": ["contact", "email", "location", "address", "office", "bangalore",
                  "hyderabad", "noida", "phone", "reach", "touch"],
    },
    "Engagement and Discovery": {
        "phrases": ["free consultation", "discovery call", "strategy call",
                     "book a call", "get started", "start a project",
                     "how to hire", "hire buildlyst", "work with you",
                     "next steps"],
        "words": ["consultation", "discovery", "call", "book", "hire", "start",
                  "engage", "onboard", "begin", "sprint", "obligation"],
    },
}


def _load_knowledge() -> None:
    """Load and parse the knowledge markdown file into sections.
    Called once at module import time. Sections are keyed by ## heading."""
    global _knowledge_sections

    if not KNOWLEDGE_FILE.exists():
        logger.error("Knowledge file not found: %s", KNOWLEDGE_FILE)
        return

    try:
        content = KNOWLEDGE_FILE.read_text(encoding="utf-8")
    except Exception as e:
        logger.error("Failed to read knowledge file: %s", e)
        return

    # Split by ## headings
    sections = re.split(r"^## ", content, flags=re.MULTILINE)
    for section in sections:
        section = section.strip()
        if not section:
            continue
        # First line is the section title
        lines = section.split("\n", 1)
        title = lines[0].strip()
        body = lines[1].strip() if len(lines) > 1 else ""
        if title and body:
            _knowledge_sections[title] = body

    logger.info(
        "Loaded %d knowledge sections: %s",
        len(_knowledge_sections),
        list(_knowledge_sections.keys()),
    )


def _score_section(section_name: str, query_lower: str) -> float:
    """Score a knowledge section against the user query.

    Uses weighted keyword + phrase matching:
    - Phrase matches score higher (0.3 each) because they indicate specific intent
    - Single word matches score lower (0.1 each) to avoid noise
    - Score is capped at 1.0
    """
    relevance = _SECTION_RELEVANCE.get(section_name)
    if not relevance:
        return 0.0

    score = 0.0

    # Phrase matches (high weight)
    for phrase in relevance.get("phrases", []):
        if phrase in query_lower:
            score += 0.3

    # Single word matches (lower weight)
    query_words = set(re.findall(r"[a-z0-9/\-]+", query_lower))
    section_words = set(relevance.get("words", []))
    word_matches = query_words & section_words
    score += len(word_matches) * 0.1

    return min(score, 1.0)


def get_relevant_context(message: str) -> tuple[str, float]:
    """Retrieve the most relevant Buildlyst knowledge sections for a query.

    Returns:
        (context_text, max_relevance_score)

    - Scores all sections against the query
    - Returns top 2-3 sections above the relevance threshold
    - If no section scores above threshold, returns ("", 0.0)
      signaling that the knowledge base has no relevant info
    - Company Overview is NOT automatically included — it is only
      returned when it scores above threshold for the query
    """
    if not _knowledge_sections:
        logger.warning("Knowledge sections empty — returning no context")
        return "", 0.0

    query_lower = message.lower().strip()

    # Score all sections
    scored: list[tuple[str, float]] = []
    for section_name in _knowledge_sections:
        score = _score_section(section_name, query_lower)
        if score > 0:
            scored.append((section_name, score))

    # Sort by score descending
    scored.sort(key=lambda x: x[1], reverse=True)

    # Filter by threshold
    relevant = [(name, score) for name, score in scored if score >= RELEVANCE_THRESHOLD]

    if not relevant:
        return "", 0.0

    # Take top 3 sections max to avoid context bloat
    top_sections = relevant[:3]
    max_score = top_sections[0][1]

    # Build context string
    context_parts = []
    for section_name, score in top_sections:
        content = _knowledge_sections.get(section_name, "")
        context_parts.append(f"### {section_name}\n{content}")

    context_text = "\n\n".join(context_parts)

    # Truncate if too long (keep under ~3000 chars to leave room for prompt + history)
    if len(context_text) > 3000:
        context_text = context_text[:3000] + "\n[... additional details available on buildlyst.in]"

    return context_text, max_score


def get_all_sections() -> dict[str, str]:
    """Return all loaded knowledge sections (for debugging/fallback)."""
    return dict(_knowledge_sections)


# ── Load knowledge on module import ──────────────────────────
_load_knowledge()
