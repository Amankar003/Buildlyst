"""
Chatbot / AI demo service — placeholder logic.
Will be wired to a real model in Part 3.
"""

import random
from datetime import datetime, timezone
from app.models.schemas import DemoRequest, DemoResponse


# Mock insight templates by detected category
_INSIGHT_TEMPLATES = {
    "churn": {
        "insight": "Based on analysis of 12,000 customer records, churn risk peaks at month 3 of subscription. "
                   "Key drivers: low product engagement (42%), pricing sensitivity (28%), and poor onboarding (19%). "
                   "Recommended intervention: automated re-engagement campaign at day 60.",
        "tags": ["churn-prediction", "customer-retention", "behavioral-analytics"],
    },
    "sales": {
        "insight": "Revenue forecasting model indicates a 15.3% growth trajectory for Q4. "
                   "Top-performing segments: Enterprise SaaS (+23%) and Mid-Market fintech (+18%). "
                   "Pipeline bottleneck detected in lead-to-demo conversion (current: 8.2%, benchmark: 14%).",
        "tags": ["revenue-forecast", "sales-analytics", "pipeline-optimization"],
    },
    "sentiment": {
        "insight": "NLP sentiment analysis of 50,000 customer reviews shows 73% positive, 18% neutral, 9% negative. "
                   "Negative sentiment clusters around 'response time' and 'billing issues'. "
                   "Positive drivers: 'ease of use' and 'customer support quality'.",
        "tags": ["sentiment-analysis", "nlp", "customer-feedback"],
    },
    "default": {
        "insight": "Preliminary analysis suggests 3 actionable optimization opportunities in your data pipeline. "
                   "Estimated efficiency gain: 22-31%. Key areas: data deduplication, feature engineering automation, "
                   "and model retraining cadence optimization from monthly to event-driven.",
        "tags": ["data-optimization", "ml-ops", "automation"],
    },
}


def generate_mock_insight(request: DemoRequest) -> DemoResponse:
    """
    Generate a mock AI insight based on keyword matching.
    This is a placeholder — will be replaced with real model inference.
    """
    prompt_lower = request.prompt.lower()

    if any(kw in prompt_lower for kw in ["churn", "retention", "attrition"]):
        template = _INSIGHT_TEMPLATES["churn"]
    elif any(kw in prompt_lower for kw in ["sales", "revenue", "forecast", "pipeline"]):
        template = _INSIGHT_TEMPLATES["sales"]
    elif any(kw in prompt_lower for kw in ["sentiment", "review", "feedback", "nlp"]):
        template = _INSIGHT_TEMPLATES["sentiment"]
    else:
        template = _INSIGHT_TEMPLATES["default"]

    return DemoResponse(
        success=True,
        prompt=request.prompt,
        insight=template["insight"],
        confidence=round(random.uniform(0.82, 0.97), 2),
        tags=template["tags"],
        generated_at=datetime.now(timezone.utc),
    )
