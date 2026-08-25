import os

SERVICES_DIR = r"d:\End to End Projects\buildlyst\app\templates\services"
os.makedirs(SERVICES_DIR, exist_ok=True)

# 1. Create services_layout.html
layout_html = """{% extends 'base.html' %}

{% block back_button %}
<div style="position: absolute; top: 24px; left: 32px; z-index: 1000;">
    <a href="/" class="btn glass-btn" style="padding: 8px 16px; font-size: 14px;">&larr; Back to Home</a>
</div>
{% endblock %}

{% block content %}
<style>
    /* Styling for the 5 buttons */
    .service-nav-btn {
        padding: 12px 24px;
        border-radius: 50px;
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(255,255,255,0.1);
        color: var(--c-text-secondary);
        font-weight: 500;
        transition: all 0.3s ease;
        text-decoration: none;
        white-space: nowrap;
    }
    .service-nav-btn:hover {
        background: rgba(255,255,255,0.08);
        color: #fff;
    }
    .service-nav-btn.active {
        background: rgba(0, 210, 255, 0.1);
        border-color: var(--c-accent-cyan);
        color: #fff;
        box-shadow: 0 0 20px rgba(0, 210, 255, 0.2);
    }
    .service-nav-container {
        display: flex;
        gap: 16px;
        justify-content: center;
        flex-wrap: wrap;
        margin-top: 32px;
    }
</style>

<!-- Common Hero Section -->
<section class="reveal" style="padding: 140px 0 60px 0; background: radial-gradient(circle at top center, rgba(0, 210, 255, 0.05) 0%, transparent 70%); text-align: center; border-bottom: 1px solid rgba(255,255,255,0.05);">
    <div class="container">
        <span class="overline highlight">Buildlyst Capabilities</span>
        <h1 class="text-gradient-hero" style="font-size: clamp(36px, 5vw, 56px); line-height: 1.1; margin-bottom: 16px;">
            Engineering Excellence
        </h1>
        <p class="subtext mx-auto" style="font-size: 16px; max-width: 600px; margin-bottom: 0;">
            Select a capability below to explore our specific architectures, deliverables, and transparent pricing.
        </p>
        
        <!-- 5 Buttons -->
        <div class="service-nav-container">
            <a href="/services/ai-agents" class="service-nav-btn {% if request.url.path == '/services/ai-agents' %}active{% endif %}">🤖 AI Agents</a>
            <a href="/services/gen-ai" class="service-nav-btn {% if request.url.path == '/services/gen-ai' %}active{% endif %}">🧠 Gen AI</a>
            <a href="/services/machine-learning" class="service-nav-btn {% if request.url.path == '/services/machine-learning' %}active{% endif %}">🔬 Machine Learning</a>
            <a href="/services/data-engineering" class="service-nav-btn {% if request.url.path == '/services/data-engineering' %}active{% endif %}">🗄️ Data Engineering</a>
            <a href="/services/web-development" class="service-nav-btn {% if request.url.path == '/services/web-development' %}active{% endif %}">⚡ Web Development</a>
        </div>
    </div>
</section>

{% block service_detail %}{% endblock %}

{% endblock %}
"""

with open(os.path.join(SERVICES_DIR, "services_layout.html"), "w", encoding="utf-8") as f:
    f.write(layout_html)


def build_3d_pipeline(left_nodes, center_title, right_nodes):
    svg = """
    <div class="bridge-viz-container" style="position: relative; width: 100%; height: 420px; display: flex; justify-content: space-between; align-items: center; padding: 10px 0;">
        <svg class="bridge-svg" preserveAspectRatio="none" viewBox="0 0 100 100" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0;">
            <defs>
                <filter id="pipeGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="1.5" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>
            <path class="real-pipe-track" d="M 20 12 C 35 12, 35 50, 50 50" style="fill:none; stroke:rgba(255,255,255,0.05); stroke-width:0.5;"/>
            <path class="real-pipe-track" d="M 20 37 C 35 37, 35 50, 50 50" style="fill:none; stroke:rgba(255,255,255,0.05); stroke-width:0.5;"/>
            <path class="real-pipe-track" d="M 20 63 C 35 63, 35 50, 50 50" style="fill:none; stroke:rgba(255,255,255,0.05); stroke-width:0.5;"/>
            <path class="real-pipe-track" d="M 20 88 C 35 88, 35 50, 50 50" style="fill:none; stroke:rgba(255,255,255,0.05); stroke-width:0.5;"/>
            <path class="real-pipe-track" d="M 50 50 C 65 50, 65 12, 80 12" style="fill:none; stroke:rgba(255,255,255,0.05); stroke-width:0.5;"/>
            <path class="real-pipe-track" d="M 50 50 C 65 50, 65 37, 80 37" style="fill:none; stroke:rgba(255,255,255,0.05); stroke-width:0.5;"/>
            <path class="real-pipe-track" d="M 50 50 C 65 50, 65 63, 80 63" style="fill:none; stroke:rgba(255,255,255,0.05); stroke-width:0.5;"/>
            <path class="real-pipe-track" d="M 50 50 C 65 50, 65 88, 80 88" style="fill:none; stroke:rgba(255,255,255,0.05); stroke-width:0.5;"/>
            
            <path class="real-pipe-pulse" filter="url(#pipeGlow)" d="M 20 12 C 35 12, 35 50, 50 50" style="fill:none; stroke:#00d2ff; stroke-width:1; stroke-dasharray:10 100; animation: dash 3s linear infinite; animation-delay: 0s;" />
            <path class="real-pipe-pulse" filter="url(#pipeGlow)" d="M 20 37 C 35 37, 35 50, 50 50" style="fill:none; stroke:#00d2ff; stroke-width:1; stroke-dasharray:10 100; animation: dash 3s linear infinite; animation-delay: -1.2s;" />
            <path class="real-pipe-pulse" filter="url(#pipeGlow)" d="M 20 63 C 35 63, 35 50, 50 50" style="fill:none; stroke:#00d2ff; stroke-width:1; stroke-dasharray:10 100; animation: dash 3s linear infinite; animation-delay: -0.6s;" />
            <path class="real-pipe-pulse" filter="url(#pipeGlow)" d="M 20 88 C 35 88, 35 50, 50 50" style="fill:none; stroke:#00d2ff; stroke-width:1; stroke-dasharray:10 100; animation: dash 3s linear infinite; animation-delay: -1.8s;" />
            <path class="real-pipe-pulse" filter="url(#pipeGlow)" d="M 50 50 C 65 50, 65 12, 80 12" style="fill:none; stroke:#8a2387; stroke-width:1; stroke-dasharray:10 100; animation: dash 3s linear infinite; animation-delay: -0.4s;" />
            <path class="real-pipe-pulse" filter="url(#pipeGlow)" d="M 50 50 C 65 50, 65 37, 80 37" style="fill:none; stroke:#8a2387; stroke-width:1; stroke-dasharray:10 100; animation: dash 3s linear infinite; animation-delay: -1.6s;" />
            <path class="real-pipe-pulse" filter="url(#pipeGlow)" d="M 50 50 C 65 50, 65 63, 80 63" style="fill:none; stroke:#8a2387; stroke-width:1; stroke-dasharray:10 100; animation: dash 3s linear infinite; animation-delay: -0.9s;" />
            <path class="real-pipe-pulse" filter="url(#pipeGlow)" d="M 50 50 C 65 50, 65 88, 80 88" style="fill:none; stroke:#8a2387; stroke-width:1; stroke-dasharray:10 100; animation: dash 3s linear infinite; animation-delay: -2.1s;" />
            
            <circle cx="20" cy="12" r="1.2" style="fill:#fff;" />
            <circle cx="20" cy="37" r="1.2" style="fill:#fff;" />
            <circle cx="20" cy="63" r="1.2" style="fill:#fff;" />
            <circle cx="20" cy="88" r="1.2" style="fill:#fff;" />
            <circle cx="50" cy="50" r="2.0" style="fill:#00d2ff;" filter="url(#pipeGlow)" />
            <circle cx="80" cy="12" r="1.2" style="fill:#fff;" />
            <circle cx="80" cy="37" r="1.2" style="fill:#fff;" />
            <circle cx="80" cy="63" r="1.2" style="fill:#fff;" />
            <circle cx="80" cy="88" r="1.2" style="fill:#fff;" />
        </svg>
        <div class="bridge-col" style="z-index:1; width:200px; display:flex; flex-direction:column; gap:65px; text-align:left;">
            {"".join(f'<div class="compact-node glass-panel" style="padding:10px; font-size:12px; border:1px solid rgba(255,255,255,0.1); border-radius:6px; background:#000;">{node}</div>' for node in left_nodes)}
        </div>
        <div class="bridge-col" style="z-index:1; display:flex; justify-content:center; align-items:center;">
            <div class="bridge-center-node tilt-card glass-panel" data-tilt style="padding: 24px 32px; text-align: center; border: 1px solid var(--c-accent-cyan); box-shadow: 0 0 30px rgba(0, 210, 255, 0.1);">
                <h3 class="text-gradient" style="margin: 0; font-size: 24px; letter-spacing: -0.5px;">{center_title}</h3>
            </div>
        </div>
        <div class="bridge-col" style="z-index:1; width:200px; display:flex; flex-direction:column; gap:65px; text-align:right;">
            {"".join(f'<div class="compact-node glass-panel" style="padding:10px; font-size:12px; border:1px solid rgba(255,255,255,0.1); border-radius:6px; background:#000;">{node}</div>' for node in right_nodes)}
        </div>
    </div>
    """
    return svg

def generate_isolated_page(service):
    # What We Build List
    build_items_html = "".join([f'<li style="margin-bottom:16px; font-size:16px; display:flex; align-items:center; gap:12px;"><span style="color:var(--c-accent-cyan); font-size:20px;">✓</span> {item}</li>' for item in service["build_list"]])
    
    # Core Capabilities Grid
    caps_html = "".join([f'<div class="glass-panel tilt-card" data-tilt style="padding:32px; border-radius:var(--radius-lg); border:1px solid rgba(255,255,255,0.03);"><h3 style="color:#fff;font-size:20px;margin-bottom:12px;">{t}</h3><p style="color:var(--c-text-secondary);font-size:14px;line-height:1.6;">{d}</p></div>' for t, d in service["capabilities"]])

    # Transformations
    transform_html = "".join([f'<div class="glass-panel text-center tilt-card" data-tilt style="padding:32px; border-radius:var(--radius-lg); border:1px solid rgba(255,255,255,0.03);"><h3 class="text-gradient" style="font-size:48px; font-weight:700; margin-bottom:12px;">{val}</h3><p style="color:var(--c-text-secondary); font-size:16px;">{desc}</p></div>' for val, desc in service["transformations"]])

    # Tech Stack Carousel
    tech_logos = "".join([f'<div style="flex: 0 0 auto; padding: 20px 40px; background: rgba(255,255,255,0.03); border-radius: 8px; border: 1px solid rgba(255,255,255,0.05); font-family: var(--font-display); font-size: 20px; font-weight: 600; color: #fff;">{t}</div>' for t in service["tech_stack"]] * 3)

    html = f"""{{% extends 'services/services_layout.html' %}}

{{% block service_detail %}}
<style>
    @keyframes dash {{
        to {{ stroke-dashoffset: -110; }}
    }}
    @keyframes marqueeScroll {{
        0% {{ transform: translateX(0); }}
        100% {{ transform: translateX(-50%); }}
    }}
    .tech-carousel-wrapper {{ overflow: hidden; white-space: nowrap; width: 100%; position: relative; margin: 40px 0; }}
    .tech-carousel-track {{ display: inline-flex; gap: 24px; animation: marqueeScroll 20s linear infinite; }}
    .tech-carousel-track:hover {{ animation-play-state: paused; }}
</style>

<div style="min-height: 100vh;">
    <!-- 1. Service Introduction -->
    <section class="reveal" style="padding: 80px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
        <div class="container text-center" style="max-width: 800px;">
            <div style="font-size: 56px; margin-bottom: 24px;">{service["icon"]}</div>
            <h2 class="text-gradient" style="font-size: 40px; margin-bottom: 24px;">{service["title"]}</h2>
            <p style="color: var(--c-text-secondary); font-size: 18px; line-height: 1.7; margin-bottom: 0;">
                {service["about"]}
            </p>
        </div>
    </section>

    <!-- 2. Tech Stack Carousel -->
    <section class="reveal" style="padding: 60px 0; border-bottom: 1px solid rgba(255,255,255,0.05); background: rgba(0,0,0,0.2);">
        <div class="container text-center">
            <span class="overline highlight">Core Engineering Stack</span>
            <div class="tech-carousel-wrapper">
                <div class="tech-carousel-track">
                    {tech_logos}
                </div>
            </div>
        </div>
    </section>

    <!-- 3. What We Build -->
    <section class="reveal" style="padding: 100px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
        <div class="container">
            <div class="split-layout" style="display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center;">
                <div>
                    <span class="overline highlight">Deliverables</span>
                    <h2 class="section-heading text-gradient" style="margin-bottom: 24px; font-size: 36px;">Exactly what we build.</h2>
                    <p style="color: var(--c-text-secondary); font-size: 16px; margin-bottom: 32px; line-height:1.6;">We don't sell consulting hours; we deploy working systems. Our typical deployments include:</p>
                    <ul style="list-style: none; padding: 0;">
                        {build_items_html}
                    </ul>
                </div>
                <div class="glass-panel" style="border-radius: var(--radius-lg); position: relative; overflow: hidden; border: 1px solid rgba(255,255,255,0.05);">
                    <div style="position: absolute; top: 0; left: 0; width: 100%; height: 4px; background: linear-gradient(90deg, #00D2FF, #8A2387);"></div>
                    <img src="{service["image"]}" alt="Code engineering" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.8; filter: grayscale(50%) contrast(1.2); display: block;">
                </div>
            </div>
        </div>
    </section>

    <!-- 4. 3D System Architecture -->
    <section class="reveal" style="padding: 100px 0; border-bottom: 1px solid rgba(255,255,255,0.05); background: radial-gradient(circle at left center, rgba(0,210,255,0.02) 0%, transparent 60%);">
        <div class="container">
            <div class="section-header text-center">
                <span class="overline highlight">Pipeline Flow</span>
                <h2 class="section-heading text-gradient" style="font-size: 36px;">System Architecture</h2>
                <p class="subtext text-center mx-auto">How we process your raw inputs into automated outputs.</p>
            </div>
            
            {build_3d_pipeline(service["pipe_left"], service["pipe_center"], service["pipe_right"])}
            
        </div>
    </section>

    <!-- 5. Core Capabilities (Bento) -->
    <section class="reveal" style="padding: 100px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
        <div class="container">
            <div class="section-header text-center">
                <span class="overline highlight">Technical Deep Dive</span>
                <h2 class="section-heading text-gradient" style="font-size: 36px;">Core Capabilities</h2>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
                {caps_html}
            </div>
        </div>
    </section>

    <!-- 6. Transformations (ROI) -->
    <section class="reveal" style="padding: 100px 0; border-bottom: 1px solid rgba(255,255,255,0.05); background: rgba(255,255,255,0.01);">
        <div class="container">
            <div class="section-header text-center">
                <span class="overline highlight">Outcomes</span>
                <h2 class="section-heading text-gradient" style="font-size: 36px;">Business Transformations</h2>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 24px;">
                {transform_html}
            </div>
        </div>
    </section>

    <!-- 7. Isolated Pricing Card -->
    <section class="reveal" style="padding: 100px 0;">
        <div class="container">
            <div class="section-header text-center" style="margin-bottom: 48px;">
                <span class="overline highlight">Transparent Investment</span>
                <h2 class="section-heading text-gradient" style="font-size: 36px;">Pricing for {service['title']}</h2>
            </div>
            
            <div style="display: flex; justify-content: center;">
                <!-- Exact Single Pricing Card for this service -->
                <div class="pricing-card glass-panel tilt-card" data-tilt style="padding: 48px 40px; text-align: left; max-width: 450px; width: 100%; position: relative; overflow: visible !important; border: 1px solid rgba(0, 210, 255, 0.5); box-shadow: 0 0 40px rgba(0, 210, 255, 0.1);">
                    <div class="popular-badge" style="position: absolute; top: -14px; left: 50%; transform: translateX(-50%); font-size: 11px; font-weight: 800; padding: 6px 16px; border-radius: 12px; background: linear-gradient(90deg, #00D2FF, #8A2387); color: #ffffff; text-transform: uppercase; letter-spacing: 1.5px; box-shadow: 0 0 20px rgba(0,210,255,0.4); white-space: nowrap;">
                        Enterprise Grade
                    </div>
                    
                    <h4 style="color: var(--c-accent-cyan); margin-bottom: 12px; font-size: 20px;">{service['title']} Engagement</h4>
                    <div class="price" style="font-size: 48px; margin-bottom: 32px; font-weight: bold;">{service['start_price']}</div>
                    
                    <ul class="pricing-features" style="margin-bottom: 40px; padding-left:0; list-style:none;">
                        {"".join(f'<li style="margin-bottom:12px; font-size:15px; color:#ddd; display:flex; gap:10px;"><span style="color:#00d2ff;">✓</span> {feat}</li>' for feat in service['pricing_features'])}
                    </ul>
                    
                    <a href="/#contact" class="btn glow-border-btn w-100" style="padding: 16px; font-size: 16px;">Request Architectural Scoping</a>
                </div>
            </div>
            
        </div>
    </section>
</div>
{{% endblock %}}
"""
    return html


# Service Data
services_data = [
    {
        "filename": "ai_agents.html",
        "title": "Autonomous AI Agents",
        "icon": "🤖",
        "about": "We build multi-agent systems that don't just chat—they execute complex workflows, analyze data, and drive real business outcomes. Our agents integrate directly with your enterprise APIs to act on your behalf securely.",
        "image": "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "tech_stack": ["LangGraph", "CrewAI", "AutoGPT", "FastAPI", "OpenAI / Claude", "PostgreSQL", "Docker"],
        "build_list": ["Customer Support Autonomous Agents", "Automated Research & Lead Scraping Bots", "Multi-Agent Trading Simulators", "Internal HR & IT Ticketing Agents"],
        "pipe_left": ["User Prompt", "CRM Data", "Web Search", "SQL DBs"],
        "pipe_center": "MULTI-AGENT ORCHESTRATION",
        "pipe_right": ["Send Email", "Update CRM", "Generate Report", "Trigger API"],
        "capabilities": [
            ("Multi-Agent Orchestration", "Agents that communicate, delegate tasks, and solve complex reasoning problems collaboratively."),
            ("Tool & API Integration", "Seamlessly connect agents to your CRM, ERP, SQL databases, and custom APIs to perform real-world actions."),
            ("Memory & State Management", "Long-term and short-term memory architecture so agents remember past interactions and user context."),
            ("Human-in-the-Loop", "Define strict guardrails where agents pause execution and request human approval for high-risk actions.")
        ],
        "transformations": [("40+ Hrs", "Saved per week"), ("100%", "Automated Workflows"), ("3x", "Faster Response Time")],
        "start_price": "₹1.5L+",
        "pricing_features": ["Custom multi-agent architecture", "Integration with CRM/APIs", "Long-term memory vector DB", "Human-in-the-loop guardrails", "Production Deployment"]
    },
    {
        "filename": "gen_ai.html",
        "title": "Generative AI Systems",
        "icon": "🧠",
        "about": "Deploy private, highly-secure Retrieval-Augmented Generation (RAG) architectures and custom LLMs. We connect cutting-edge language models directly to your proprietary enterprise data silos without sending a single byte to public servers.",
        "image": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "tech_stack": ["LlamaIndex", "Pinecone", "HuggingFace", "AWS Bedrock", "vLLM", "Weaviate"],
        "build_list": ["Enterprise Document Search Chatbots (RAG)", "Legal & Compliance Auditing LLMs", "Custom Fine-Tuned Llama 3 Models", "Automated Content Generation Pipelines"],
        "pipe_left": ["PDFs / Docs", "Confluence", "Jira Tickets", "Codebases"],
        "pipe_center": "ENTERPRISE RAG PIPELINE",
        "pipe_right": ["Vector Embeddings", "Contextual Answers", "Citation Links", "Secure Sandbox"],
        "capabilities": [
            ("Private RAG Architecture", "Securely chat with your internal PDFs and data silos without sending data to public endpoints."),
            ("Custom LLM Fine-Tuning", "Train open-source models on your specific domain language and syntax for unparalleled accuracy."),
            ("Multimodal Pipelines", "Process not just text, but images, audio, and video inputs to generate rich, contextual outputs."),
            ("Enterprise Data Privacy", "Deploy models inside your own VPC ensuring zero data leakage and SOC2 compliance.")
        ],
        "transformations": [("99.9%", "Data Privacy"), ("10x", "Search Speed"), ("Zero", "Hallucinations (Grounded)")],
        "start_price": "₹2.5L+",
        "pricing_features": ["Private Vector Database setup", "Custom LlamaIndex chunking", "LLM fine-tuning if required", "VPC / Secure cloud deployment", "Automated document syncing"]
    },
    {
        "filename": "machine_learning.html",
        "title": "Machine & Deep Learning",
        "icon": "🔬",
        "about": "Advanced predictive modeling, computer vision, natural language processing, and real-time classification systems deployed at scale. We turn raw datasets into predictive engines that forecast trends and detect anomalies.",
        "image": "https://images.unsplash.com/photo-1518932945647-7a3c96943e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "tech_stack": ["PyTorch", "TensorFlow", "Scikit-Learn", "MLflow", "Triton Inference", "CUDA"],
        "build_list": ["Sales & Demand Forecasting Models", "Real-Time Fraud Detection Systems", "Manufacturing Computer Vision (Defect Detection)", "Customer Churn Prediction Engines"],
        "pipe_left": ["Raw Telemetry", "Transaction Logs", "Video Feeds", "User Behavior"],
        "pipe_center": "DEEP LEARNING ENGINE",
        "pipe_right": ["Fraud Alerts", "Demand Forecasts", "Quality Flags", "Churn Probability"],
        "capabilities": [
            ("Predictive Analytics", "Forecast sales, predict customer churn, and optimize supply chains using advanced statistical modeling."),
            ("Computer Vision", "Real-time object detection, facial recognition, and automated quality control for manufacturing pipelines."),
            ("Natural Language Processing", "Sentiment analysis, automated document classification, and entity extraction from unstructured text."),
            ("MLOps & Scalable Inference", "Robust pipelines to train, evaluate, deploy, and monitor machine learning models in production environments.")
        ],
        "transformations": [("+45%", "Accuracy Increase"), ("-30%", "Fraud Reduction"), ("24/7", "Real-Time Monitoring")],
        "start_price": "₹2.0L+",
        "pricing_features": ["Custom PyTorch/TF neural networks", "Data cleaning & feature engineering", "Model evaluation & backtesting", "MLOps deployment via MLflow", "Real-time inference API"]
    },
    {
        "filename": "data_engineering.html",
        "title": "Data Engineering",
        "icon": "🗄️",
        "about": "Robust ETL pipelines, scalable cloud data warehousing, and interactive visualization dashboards. We untangle messy, distributed data architectures into clean, unified, and strategic assets for your entire organization.",
        "image": "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "tech_stack": ["Apache Airflow", "Snowflake", "dbt", "Apache Kafka", "AWS Redshift", "PostgreSQL"],
        "build_list": ["Automated Data Warehouses (Snowflake/Redshift)", "Real-time Event Streaming (Kafka)", "Custom Airflow ETL DAGs", "Executive BI & Looker Dashboards"],
        "pipe_left": ["SaaS APIs", "Legacy DBs", "IoT Sensors", "Flat Files"],
        "pipe_center": "ETL & WAREHOUSING",
        "pipe_right": ["Clean Warehouse", "BI Dashboards", "ML Feature Store", "Alerting"],
        "capabilities": [
            ("Automated ETL Pipelines", "Extract, transform, and load massive datasets from diverse sources with zero downtime or data loss."),
            ("Cloud Data Warehousing", "Architect highly scalable data lakes and warehouses using modern columnar databases."),
            ("Real-Time Stream Processing", "Process millions of events per second for real-time analytics, fraud detection, and dynamic pricing."),
            ("Data Governance", "Implement strict role-based access controls, data anonymization, and comprehensive audit logs.")
        ],
        "transformations": [("100TB+", "Scale Capable"), ("99.99%", "Uptime SLAs"), ("Real-Time", "Data Sync")],
        "start_price": "₹1.75L+",
        "pricing_features": ["Robust Airflow DAG creation", "Snowflake/Redshift architecture", "Data security & governance", "Automated error alerting", "Executive dashboard setup"]
    },
    {
        "filename": "website_development.html",
        "title": "Web Development",
        "icon": "⚡",
        "about": "High-performance web applications, stunning landing pages, and complex admin dashboards built with modern frameworks and deeply integrated AI backends. We build Silicon Valley-grade digital products.",
        "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "tech_stack": ["React / Next.js", "Vue / Nuxt", "FastAPI", "TailwindCSS", "GSAP Animations", "Vercel"],
        "build_list": ["Full-Stack SaaS Platforms", "High-Converting Animated Landing Pages", "Internal Enterprise Dashboards", "AI-Integrated Web Portals"],
        "pipe_left": ["Figma Designs", "User Flows", "Brand Assets", "Backend APIs"],
        "pipe_center": "FULL-STACK ENGINEERING",
        "pipe_right": ["Next.js Frontend", "FastAPI Backend", "Global CDN Edge", "Auth & DB"],
        "capabilities": [
            ("Full-Stack Web Apps", "End-to-end development of dynamic SaaS platforms with secure authentication, databases, and responsive UI."),
            ("AI-Integrated Interfaces", "Seamlessly embed AI chatbots, intelligent search bars, and dynamic content generation into your frontend."),
            ("Lightning Fast Performance", "Server-side rendering, CDN edge caching, and optimized assets ensuring 99+ Lighthouse scores."),
            ("Bespoke UI/UX Design", "Silicon Valley-grade aesthetics featuring glassmorphism, smooth GSAP animations, and intuitive flows.")
        ],
        "transformations": [("99+", "Lighthouse Score"), ("Global", "CDN Edge Delivery"), ("Sub-1s", "Load Times")],
        "start_price": "₹75K+",
        "pricing_features": ["Premium UI/UX Design", "Responsive frontend architecture", "FastAPI backend integration", "Authentication & Database setup", "Vercel edge deployment"]
    }
]

for service in services_data:
    filepath = os.path.join(SERVICES_DIR, service["filename"])
    content = generate_isolated_page(service)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

print("services_layout.html and 5 unified service pages generated successfully.")
