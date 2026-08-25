import os

SERVICES_DIR = r"d:\End to End Projects\buildlyst\app\templates\services"
os.makedirs(SERVICES_DIR, exist_ok=True)

def generate_page(title, subtitle, icon, features, tech_stack, start_price, url_path):
    features_html = ""
    for f_title, f_desc in features:
        features_html += f"""
                    <div class="glass-panel" style="padding: 32px; border-radius: var(--radius-lg); transition: transform 0.3s ease;">
                        <h3 style="font-size: 20px; color: #fff; margin-bottom: 12px;">{f_title}</h3>
                        <p style="color: var(--c-text-secondary); font-size: 15px; line-height: 1.6;">{f_desc}</p>
                    </div>"""
    
    tech_stack_html = " - ".join([f'<span style="color: var(--c-accent-cyan); font-weight: 600;">[{tech}]</span>' for tech in tech_stack])

    html = f"""{{% extends 'base.html' %}}

{{% block content %}}
<style>
    .service-hero {{ padding: 160px 0 80px 0; background: radial-gradient(circle at top center, rgba(0, 210, 255, 0.08) 0%, transparent 60%); text-align: center; border-bottom: 1px solid rgba(255,255,255,0.05); }}
    .service-section {{ padding: 100px 0; border-bottom: 1px solid rgba(255,255,255,0.05); }}
    .bento-grid {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; margin-top: 48px; }}
</style>

<div style="min-height: 100vh;">
    <!-- Service Hero -->
    <section class="service-hero reveal">
        <div class="container" style="max-width: 900px;">
            <div style="font-size: 48px; margin-bottom: 16px;">{icon}</div>
            <span class="overline highlight">Service Capabilities</span>
            <h1 class="text-gradient-hero" style="font-size: clamp(40px, 6vw, 64px); line-height: 1.1; margin-bottom: 24px; letter-spacing: -1px;">
                {title}
            </h1>
            <p class="subtext mx-auto" style="font-size: 18px; max-width: 700px; margin-bottom: 40px;">
                {subtitle}
            </p>
            <div style="display: flex; gap: 16px; justify-content: center;">
                <a href="/#contact" class="btn btn-primary glow-border-btn">Start This Project &rarr;</a>
                <a href="#details" class="btn btn-secondary glass-btn">View Details</a>
            </div>
        </div>
    </section>

    <!-- Core Features (Bento Box) -->
    <section id="details" class="service-section reveal">
        <div class="container">
            <div class="section-header text-center">
                <span class="overline highlight">Deep Dive</span>
                <h2 class="section-heading text-gradient" style="font-size: 36px;">Core Capabilities</h2>
            </div>
            <div class="bento-grid">
                {features_html}
            </div>
        </div>
    </section>

    <!-- Technology Stack -->
    <section class="service-section reveal" style="background: rgba(255,255,255,0.01);">
        <div class="container text-center">
            <span class="overline highlight">Engineering Core</span>
            <h2 class="section-heading text-gradient" style="font-size: 36px; margin-bottom: 32px;">The Technology Stack</h2>
            <div class="glass-panel" style="padding: 40px; display: inline-block; border-radius: var(--radius-lg);">
                <p style="font-size: 18px; font-family: var(--font-display); letter-spacing: 1px;">
                    {tech_stack_html}
                </p>
            </div>
        </div>
    </section>

    <!-- Pricing / Engagement -->
    <section class="service-section reveal">
        <div class="container text-center">
            <span class="overline highlight">Transparent Investment</span>
            <h2 class="section-heading text-gradient" style="font-size: 36px; margin-bottom: 32px;">Project Pricing</h2>
            <div class="glass-panel" style="padding: 48px; max-width: 600px; margin: 0 auto; border-radius: var(--radius-lg); border: 1px solid var(--c-accent-cyan);">
                <h3 style="color: #fff; font-size: 28px; margin-bottom: 16px;">Starting at {start_price}</h3>
                <p style="color: var(--c-text-secondary); margin-bottom: 32px;">Exact pricing varies based on enterprise scale, required integrations, and data volume constraints. Contact us for a precise architecture scoping.</p>
                <a href="/#contact" class="btn btn-primary glow-border-btn w-100">Request Custom Quote</a>
            </div>
        </div>
    </section>
</div>
{{% endblock %}}
"""
    return html

pages = [
    {
        "filename": "ai_agents.html",
        "title": "Autonomous AI Agents",
        "subtitle": "Deploy intelligent multi-agent systems that autonomously execute complex enterprise workflows, integrate with APIs, and optimize decision-making at scale.",
        "icon": "🤖",
        "features": [
            ("Multi-Agent Orchestration", "Agents that communicate, delegate tasks, and solve complex reasoning problems collaboratively."),
            ("Tool & API Integration", "Seamlessly connect agents to your CRM, ERP, SQL databases, and custom APIs to perform real-world actions."),
            ("Memory & State Management", "Long-term and short-term memory architecture so agents remember past interactions and user context."),
            ("Human-in-the-Loop Workflow", "Define strict guardrails where agents pause execution and request human approval for high-risk actions.")
        ],
        "tech_stack": ["LangGraph", "CrewAI", "OpenAI / Claude", "FastAPI", "Python"],
        "start_price": "₹1,50,000",
        "url_path": "/services/ai-agents"
    },
    {
        "filename": "gen_ai.html",
        "title": "Generative AI Systems",
        "subtitle": "Custom LLM deployments, fine-tuning, and highly secure RAG architectures tailored entirely to your proprietary enterprise data.",
        "icon": "🧠",
        "features": [
            ("Private RAG Architecture", "Securely chat with your internal PDFs, documentation, and data silos without sending data to public endpoints."),
            ("Custom LLM Fine-Tuning", "Train open-source models (like Llama 3) on your specific domain language and syntax for unparalleled accuracy."),
            ("Multimodal Pipelines", "Process not just text, but images, audio, and video inputs to generate rich, contextual outputs."),
            ("Enterprise Data Privacy", "Deploy models inside your own VPC (AWS/GCP) ensuring zero data leakage and full SOC2 compliance.")
        ],
        "tech_stack": ["LlamaIndex", "HuggingFace", "vLLM", "Pinecone / Qdrant", "AWS SageMaker"],
        "start_price": "₹2,50,000",
        "url_path": "/services/gen-ai"
    },
    {
        "filename": "machine_learning.html",
        "title": "Machine & Deep Learning",
        "subtitle": "Advanced predictive modeling, computer vision, natural language processing, and real-time classification systems deployed at scale.",
        "icon": "🔬",
        "features": [
            ("Predictive Analytics", "Forecast sales, predict customer churn, and optimize supply chains using advanced statistical modeling."),
            ("Computer Vision", "Real-time object detection, facial recognition, and automated quality control for manufacturing pipelines."),
            ("Natural Language Processing", "Sentiment analysis, automated document classification, and entity extraction from unstructured text."),
            ("MLOps & Scalable Inference", "Robust pipelines to train, evaluate, deploy, and monitor machine learning models in production environments.")
        ],
        "tech_stack": ["PyTorch", "TensorFlow", "Scikit-Learn", "MLflow", "CUDA / Triton"],
        "start_price": "₹2,00,000",
        "url_path": "/services/machine-learning"
    },
    {
        "filename": "data_engineering.html",
        "title": "Enterprise Data Engineering",
        "subtitle": "Robust ETL pipelines, scalable data warehousing, and interactive visualization dashboards that turn raw data into strategic assets.",
        "icon": "🗄️",
        "features": [
            ("Automated ETL Pipelines", "Extract, transform, and load massive datasets from diverse sources with zero downtime or data loss."),
            ("Cloud Data Warehousing", "Architect highly scalable data lakes and warehouses using modern columnar databases."),
            ("Real-Time Stream Processing", "Process millions of events per second for real-time analytics, fraud detection, and dynamic pricing."),
            ("Data Governance & Security", "Implement strict role-based access controls, data anonymization, and comprehensive audit logs.")
        ],
        "tech_stack": ["Apache Airflow", "Snowflake", "dbt", "Apache Kafka", "AWS Redshift"],
        "start_price": "₹1,75,000",
        "url_path": "/services/data-engineering"
    },
    {
        "filename": "website_development.html",
        "title": "Premium Website Development",
        "subtitle": "High-performance web applications, stunning landing pages, and complex admin dashboards built with modern frameworks and deeply integrated AI backends.",
        "icon": "⚡",
        "features": [
            ("Full-Stack Web Apps", "End-to-end development of dynamic SaaS platforms with secure authentication, databases, and responsive UI."),
            ("AI-Integrated Interfaces", "Seamlessly embed AI chatbots, intelligent search bars, and dynamic content generation into your frontend."),
            ("Lightning Fast Performance", "Server-side rendering, CDN edge caching, and optimized assets ensuring 99+ Lighthouse performance scores."),
            ("Bespoke UI/UX Design", "Silicon Valley-grade aesthetics featuring glassmorphism, smooth GSAP animations, and intuitive user flows.")
        ],
        "tech_stack": ["React / Next.js", "Vue / Nuxt", "FastAPI", "TailwindCSS", "PostgreSQL"],
        "start_price": "₹75,000",
        "url_path": "/services/web-development"
    }
]

for page in pages:
    filepath = os.path.join(SERVICES_DIR, page["filename"])
    content = generate_page(
        page["title"], page["subtitle"], page["icon"], 
        page["features"], page["tech_stack"], page["start_price"], page["url_path"]
    )
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

print("Service pages generated successfully.")
