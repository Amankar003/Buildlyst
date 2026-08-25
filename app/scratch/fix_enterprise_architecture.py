import os

SERVICES_DIR = r"d:\End to End Projects\buildlyst\app\templates\services"
os.makedirs(SERVICES_DIR, exist_ok=True)

# 1. Update services_layout.html
layout_html = """{% extends 'base.html' %}

{% block back_button %}
<div style="position: absolute; top: 24px; left: 32px; z-index: 1000;">
    <a href="/" class="btn glass-btn" style="padding: 8px 18px; font-size: 14px; display: inline-flex; align-items: center; gap: 8px; border-radius: 50px;">
        <span>&larr;</span> Back to Home
    </a>
</div>
{% endblock %}

{% block content %}
<style>
    /* Styling for Service Navigation Buttons Header */
    .service-nav-btn {
        padding: 12px 24px;
        border-radius: 50px;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: var(--c-text-secondary);
        font-weight: 500;
        font-size: 14px;
        transition: all 0.3s ease;
        text-decoration: none;
        white-space: nowrap;
        display: inline-flex;
        align-items: center;
        gap: 8px;
    }
    .service-nav-btn:hover {
        background: rgba(255, 255, 255, 0.08);
        color: #fff;
        border-color: rgba(0, 210, 255, 0.3);
        transform: translateY(-2px);
    }
    .service-nav-btn.active {
        background: rgba(0, 210, 255, 0.12);
        border-color: var(--c-accent-cyan);
        color: #fff;
        box-shadow: 0 0 20px rgba(0, 210, 255, 0.25);
    }
    .service-nav-container {
        display: flex;
        gap: 12px;
        justify-content: center;
        flex-wrap: wrap;
        margin-top: 32px;
    }

    /* 3 Pricing Cards Grid */
    .pricing-grid-3 {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 24px;
        align-items: stretch;
        margin-top: 48px;
    }
    @media (max-width: 992px) {
        .pricing-grid-3 {
            grid-template-columns: 1fr;
            max-width: 480px;
            margin-left: auto;
            margin-right: auto;
        }
    }
    .service-pricing-card {
        padding: 36px 28px;
        border-radius: 20px;
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.08);
        text-align: left;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
        transition: all 0.3s ease;
    }
    .service-pricing-card:hover {
        transform: translateY(-6px);
        border-color: rgba(0, 210, 255, 0.3);
        box-shadow: 0 10px 30px rgba(0,0,0,0.4);
    }
    .service-pricing-card.featured {
        border: 1px solid rgba(0, 210, 255, 0.5);
        background: rgba(0, 210, 255, 0.03);
        box-shadow: 0 0 35px rgba(0, 210, 255, 0.15);
    }
    .service-pricing-card .popular-badge {
        position: absolute;
        top: -14px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 10px;
        font-weight: 800;
        padding: 5px 16px;
        border-radius: 12px;
        background: linear-gradient(90deg, #00D2FF, #8A2387);
        color: #ffffff;
        text-transform: uppercase;
        letter-spacing: 1px;
        box-shadow: 0 0 15px rgba(0, 210, 255, 0.5);
        white-space: nowrap;
    }
    .pricing-tier-title {
        font-size: 20px;
        font-weight: 700;
        margin-bottom: 8px;
    }
    .pricing-tier-price {
        font-size: 38px;
        font-weight: 800;
        color: #fff;
        margin-bottom: 24px;
    }
    .pricing-feature-list {
        list-style: none;
        padding: 0;
        margin: 0 0 32px 0;
        flex-grow: 1;
    }
    .pricing-feature-list li {
        margin-bottom: 12px;
        font-size: 14px;
        color: #ccc;
        display: flex;
        align-items: flex-start;
        gap: 10px;
        line-height: 1.4;
    }
    .pricing-feature-list li span {
        color: var(--c-accent-cyan);
        font-weight: bold;
    }
</style>

<!-- Common Hero Section -->
<section class="reveal" style="padding: 140px 0 50px 0; background: radial-gradient(circle at top center, rgba(0, 210, 255, 0.06) 0%, transparent 70%); text-align: center; border-bottom: 1px solid rgba(255,255,255,0.05);">
    <div class="container">
        <span class="overline highlight">Buildlyst Engineering Capabilities</span>
        <h1 class="text-gradient-hero" style="font-size: clamp(36px, 5vw, 56px); line-height: 1.1; margin-bottom: 16px;">
            Enterprise Architecture & Services
        </h1>
        <p class="subtext mx-auto" style="font-size: 16px; max-width: 640px; margin-bottom: 0;">
            Select a specialized service category below to view technical specifications, enterprise architecture, and transparent pricing.
        </p>
        
        <!-- 5 Service Navigation Buttons -->
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


def generate_service_page(service):
    # Deliverables
    build_items_html = "".join([f'<li style="margin-bottom:16px; font-size:15px; color:#e0e0e0; display:flex; align-items:center; gap:12px;"><span style="color:var(--c-accent-cyan); font-size:18px;">✓</span> {item}</li>' for item in service["build_list"]])
    
    # 6 Core Capabilities Grid
    caps_html = "".join([f'<div class="glass-panel tilt-card" data-tilt style="padding:32px; border-radius:var(--radius-lg); border:1px solid rgba(255,255,255,0.04); background:rgba(255,255,255,0.015);"><h3 style="color:#fff;font-size:19px;margin-bottom:12px;font-weight:700;">{t}</h3><p style="color:var(--c-text-secondary);font-size:14px;line-height:1.6;">{d}</p></div>' for t, d in service["capabilities"]])

    # Transformations
    transform_html = "".join([f'<div class="glass-panel text-center tilt-card" data-tilt style="padding:32px; border-radius:var(--radius-lg); border:1px solid rgba(255,255,255,0.04); background:rgba(255,255,255,0.015);"><h3 class="text-gradient" style="font-size:48px; font-weight:800; margin-bottom:8px;">{val}</h3><p style="color:var(--c-text-secondary); font-size:15px;">{desc}</p></div>' for val, desc in service["transformations"]])

    # Pipeline Nodes HTML (Exact homepage structure!)
    nodes_html = ""
    for idx, (label, icon) in enumerate(service["pipeline_nodes"]):
        nodes_html += f'''
        <div class="pipe-node" data-label="{label}">
            <div class="pipe-icon">{icon}</div>
        </div>'''
        if idx < len(service["pipeline_nodes"]) - 1:
            nodes_html += '\n        <div class="pipe-arrow"></div>'

    # 3 Pricing Cards
    tier1 = service["pricing_tiers"][0]
    tier2 = service["pricing_tiers"][1]
    tier3 = service["pricing_tiers"][2]

    tier1_feats = "".join([f'<li><span>✓</span> {f}</li>' for f in tier1["features"]])
    tier2_feats = "".join([f'<li><span>✓</span> {f}</li>' for f in tier2["features"]])
    tier3_feats = "".join([f'<li><span>✓</span> {f}</li>' for f in tier3["features"]])

    pricing_grid_html = f"""
    <div class="pricing-grid-3">
        <!-- Tier 1: Launch -->
        <div class="service-pricing-card glass-panel tilt-card" data-tilt>
            <div>
                <div class="pricing-tier-title" style="color: var(--c-text-secondary);">{tier1['name']}</div>
                <div class="pricing-tier-price">{tier1['price']}</div>
                <ul class="pricing-feature-list">
                    {tier1_feats}
                </ul>
            </div>
            <a href="/#contact" class="btn glass-btn w-100" style="padding: 14px; text-align: center;">Get Started</a>
        </div>

        <!-- Tier 2: Build (Featured / Most Popular) -->
        <div class="service-pricing-card glass-panel featured tilt-card" data-tilt>
            <div class="popular-badge">Most Popular</div>
            <div>
                <div class="pricing-tier-title" style="color: var(--c-accent-cyan);">{tier2['name']}</div>
                <div class="pricing-tier-price" style="color: var(--c-accent-cyan);">{tier2['price']}</div>
                <ul class="pricing-feature-list">
                    {tier2_feats}
                </ul>
            </div>
            <a href="/#contact" class="btn glow-border-btn w-100" style="padding: 14px; text-align: center;">Select Pro</a>
        </div>

        <!-- Tier 3: Scale -->
        <div class="service-pricing-card glass-panel tilt-card" data-tilt>
            <div>
                <div class="pricing-tier-title" style="color: var(--c-text-secondary);">{tier3['name']}</div>
                <div class="pricing-tier-price">{tier3['price']}</div>
                <ul class="pricing-feature-list">
                    {tier3_feats}
                </ul>
            </div>
            <a href="/#contact" class="btn glass-btn w-100" style="padding: 14px; text-align: center;">Contact Sales</a>
        </div>
    </div>
    """

    html = f"""{{% extends 'services/services_layout.html' %}}

{{% block service_detail %}}
<div style="min-height: 100vh;">

    <!-- 1. Service Overview Header -->
    <section class="reveal" style="padding: 70px 0 50px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
        <div class="container text-center" style="max-width: 840px;">
            <div style="font-size: 54px; margin-bottom: 20px;">{service["icon"]}</div>
            <span class="overline highlight">Service Overview</span>
            <h2 class="text-gradient" style="font-size: 38px; margin-bottom: 20px; font-weight: 700;">{service["title"]}</h2>
            <p style="color: var(--c-text-secondary); font-size: 17px; line-height: 1.7; margin-bottom: 0;">
                {service["about"]}
            </p>
        </div>
    </section>

    <!-- 2. EXACT HOMEPAGE ENTERPRISE ARCHITECTURE SECTION -->
    <section id="architecture" class="architecture-section reveal" style="padding: 80px 0;">
        <div class="container">
            <div class="section-header text-center">
                <span class="overline highlight">Engineering Core</span>
                <h2 class="section-heading text-gradient">Enterprise Architecture</h2>
                <p class="subtext text-center mx-auto">Built on a foundation of elite frameworks, tailored for specific enterprise use-cases.</p>
            </div>

            <!-- Infinite Tech Marquee (Exact Homepage Marquee) -->
            <div class="marquee-container" style="margin-bottom: 48px; border-radius: var(--radius-lg);">
                <div class="marquee-content">
                    <span>Python</span><span>FastAPI</span><span>React</span><span>Next.js</span><span>AWS</span>
                    <span>Docker</span><span>Kubernetes</span><span>OpenAI</span><span>PyTorch</span><span>TensorFlow</span>
                    <span>PostgreSQL</span><span>Snowflake</span><span>Pinecone</span><span>LangChain</span><span>Redis</span><span>Celery</span>
                    <!-- Duplicate for infinite scroll -->
                    <span>Python</span><span>FastAPI</span><span>React</span><span>Next.js</span><span>AWS</span>
                    <span>Docker</span><span>Kubernetes</span><span>OpenAI</span><span>PyTorch</span><span>TensorFlow</span>
                    <span>PostgreSQL</span><span>Snowflake</span><span>Pinecone</span><span>LangChain</span><span>Redis</span><span>Celery</span>
                </div>
            </div>

            <!-- Architecture Tabs (Quick Switcher) -->
            <div class="arch-tabs">
                <a href="/services/ai-agents" class="arch-tab-btn {{% if request.url.path == '/services/ai-agents' %}}active{{% endif %}}">AI Agents</a>
                <a href="/services/gen-ai" class="arch-tab-btn {{% if request.url.path == '/services/gen-ai' %}}active{{% endif %}}">Gen AI</a>
                <a href="/services/machine-learning" class="arch-tab-btn {{% if request.url.path == '/services/machine-learning' %}}active{{% endif %}}">Machine Learning</a>
                <a href="/services/data-engineering" class="arch-tab-btn {{% if request.url.path == '/services/data-engineering' %}}active{{% endif %}}">Data Engineering</a>
                <a href="/services/web-development" class="arch-tab-btn {{% if request.url.path == '/services/web-development' %}}active{{% endif %}}">Web Development</a>
            </div>

            <!-- Dynamic Pipeline Container (Exact Homepage Design) -->
            <div class="pipeline-container glass-panel glow-border p-lg" style="margin-top: 32px;">
                <div class="pipeline-flow active" id="{service['flow_id']}">
                    {nodes_html}
                </div>
            </div>
        </div>
    </section>

    <!-- 3. What We Build (Deliverables) -->
    <section class="reveal" style="padding: 90px 0; border-top: 1px solid rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.05);">
        <div class="container">
            <div class="split-layout" style="display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center;">
                <div>
                    <span class="overline highlight">Production Deliverables</span>
                    <h2 class="section-heading text-gradient" style="margin-bottom: 24px; font-size: 34px;">Exactly what we build.</h2>
                    <p style="color: var(--c-text-secondary); font-size: 16px; margin-bottom: 28px; line-height:1.6;">We don't sell generic advice; we deliver production-ready codebases. Our standard engineering deployments include:</p>
                    <ul style="list-style: none; padding: 0;">
                        {build_items_html}
                    </ul>
                </div>
                <div class="glass-panel" style="border-radius: 20px; position: relative; overflow: hidden; border: 1px solid rgba(255,255,255,0.08); box-shadow: 0 20px 40px rgba(0,0,0,0.4);">
                    <div style="position: absolute; top: 0; left: 0; width: 100%; height: 4px; background: linear-gradient(90deg, #00D2FF, #8A2387);"></div>
                    <img src="{service["image"]}" alt="{service['title']}" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.85; filter: contrast(1.1); display: block;">
                </div>
            </div>
        </div>
    </section>

    <!-- 4. 6 Core Capabilities Grid -->
    <section class="reveal" style="padding: 90px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
        <div class="container">
            <div class="section-header text-center" style="margin-bottom: 48px;">
                <span class="overline highlight">Core Specs</span>
                <h2 class="section-heading text-gradient" style="font-size: 34px;">6 Core Capabilities</h2>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
                {caps_html}
            </div>
        </div>
    </section>

    <!-- 5. Business Transformations (ROI) -->
    <section class="reveal" style="padding: 90px 0; border-bottom: 1px solid rgba(255,255,255,0.05); background: rgba(255,255,255,0.01);">
        <div class="container">
            <div class="section-header text-center" style="margin-bottom: 48px;">
                <span class="overline highlight">Business Outcomes</span>
                <h2 class="section-heading text-gradient" style="font-size: 34px;">Measurable Impact</h2>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 24px;">
                {transform_html}
            </div>
        </div>
    </section>

    <!-- 6. 3 Tier Pricing Section (Exact Match to Homepage 3 Cards) -->
    <section class="reveal" style="padding: 100px 0 120px 0;">
        <div class="container">
            <div class="section-header text-center">
                <span class="overline highlight">Transparent Investment</span>
                <h2 class="section-heading text-gradient" style="font-size: 34px;">Tailored Pricing Tiers</h2>
                <p class="subtext text-center mx-auto">Select the engagement level that fits your business scale for {service['title']}.</p>
            </div>
            
            {pricing_grid_html}
            
        </div>
    </section>

</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {{
        if (typeof startPipelineAnimation === 'function') {{
            startPipelineAnimation('{service['flow_id']}');
        }}
    }});
</script>
{{% endblock %}}
"""
    return html

# 5 Service Specs with exact Homepage pipeline node flows
services_data = [
    {
        "filename": "ai_agents.html",
        "title": "Autonomous AI Agents",
        "icon": "🤖",
        "flow_id": "flow-agents",
        "about": "We architect autonomous multi-agent systems that execute complex reasoning, run asynchronous workflows, and integrate directly into your enterprise tools and SQL databases with strict human-in-the-loop guardrails.",
        "image": "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "pipeline_nodes": [
            ("User Intent", "👤"),
            ("Reasoning Engine", "🧠"),
            ("Tool Execution", "⚙️"),
            ("Vector Memory", "🗄️"),
            ("Autonomous Action", "⚡")
        ],
        "build_list": [
            "Customer Support Autonomous Agents with Ticket Escalation",
            "Automated Market Research & Lead Scraping Agents",
            "Multi-Agent Code Review & Security Auditing Bots",
            "Internal HR & IT Operational Workflow Automation"
        ],
        "capabilities": [
            ("Multi-Agent Orchestration", "Agents that communicate, delegate tasks, and solve complex reasoning problems collaboratively using frameworks like CrewAI and LangGraph."),
            ("Tool & API Function Calling", "Seamlessly connect agents to your CRM, ERP, SQL databases, and custom APIs to perform real-world automated actions."),
            ("Long-Term Vector Memory", "Long-term and short-term memory architecture so agents remember past interactions, maintain context, and learn over time."),
            ("Human-in-the-Loop Guardrails", "Define strict safety thresholds where agents pause execution and request human approval for high-risk actions or financial transactions."),
            ("Dynamic Task Routing", "Intelligent semantic routers that analyze incoming prompts and route them to the most specialized agent automatically."),
            ("Sandboxed Code Execution", "Execute code generated by agents securely inside isolated Docker containers to prevent unauthorized system access.")
        ],
        "transformations": [("40+ Hrs", "Saved per week"), ("100%", "Automated Workflows"), ("3x", "Faster SLA Times")],
        "pricing_tiers": [
            {
                "name": "Launch (MVP)",
                "price": "₹45K+",
                "features": [
                    "Single Autonomous Agent",
                    "1 API/Database Integration",
                    "Basic State Memory",
                    "FastAPI Wrapper & Docs",
                    "Vercel / Cloud Deployment"
                ]
            },
            {
                "name": "Build (Pro)",
                "price": "₹1.2L+",
                "features": [
                    "Multi-Agent Collaborative Architecture",
                    "Long-Term Memory (Pinecone/Postgres)",
                    "3 Third-Party API Integrations",
                    "Human-in-the-Loop Approval UI",
                    "Dockerized Telemetry Dashboard",
                    "Priority Engineering Support"
                ]
            },
            {
                "name": "Scale (Enterprise)",
                "price": "₹2.8L+",
                "features": [
                    "Enterprise Autonomous Agent Swarm",
                    "Custom Fine-Tuned Agent Protocols",
                    "Unlimited API & Tool Integrations",
                    "On-Premises / Private VPC Hosting",
                    "Dedicated SLA & 24/7 Monitoring",
                    "SOC2 Compliance Verification"
                ]
            }
        ]
    },
    {
        "filename": "gen_ai.html",
        "title": "Generative AI Systems",
        "icon": "🧠",
        "flow_id": "flow-genai",
        "about": "Deploy private, highly-secure Retrieval-Augmented Generation (RAG) architectures and custom LLMs. We connect cutting-edge language models directly to your proprietary enterprise data silos without exposing data to public servers.",
        "image": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "pipeline_nodes": [
            ("Raw Documents", "📄"),
            ("Embedding Model", "📉"),
            ("Vector Database", "🗄️"),
            ("Context Retrieval", "🔍"),
            ("Generated Response", "💬")
        ],
        "build_list": [
            "Enterprise Document Search & Knowledge Base Chatbots (RAG)",
            "Legal & Compliance Contract Auditing LLMs",
            "Custom Fine-Tuned Llama 3 & Mistral Domain Models",
            "Automated Multi-Format Content Generation Pipelines"
        ],
        "capabilities": [
            ("Private RAG Architecture", "Securely chat with your internal PDFs and data silos without sending data to public endpoints, using advanced chunking strategies."),
            ("Custom LLM Fine-Tuning", "Train open-source models like Llama 3 or Mistral on your specific domain language and syntax for business accuracy."),
            ("Multimodal Pipelines", "Process not just text, but images, audio, and video inputs to generate rich, contextual, cross-modal outputs."),
            ("Enterprise Data Privacy", "Deploy models inside your own VPC ensuring zero data leakage, role-based access control, and SOC2 compliance."),
            ("Semantic Hybrid Search", "Combine dense vector search with sparse keyword search (BM25) to guarantee precise document retrieval even for technical codes."),
            ("Quantized Self-Hosting", "Quantize massive 70B parameter models down to 4-bit, allowing cost-effective self-hosting on affordable GPU infrastructure.")
        ],
        "transformations": [("99.9%", "Data Privacy"), ("10x", "Search Speed"), ("Zero", "Hallucinations")],
        "pricing_tiers": [
            {
                "name": "Launch (MVP)",
                "price": "₹60K+",
                "features": [
                    "Private Document RAG Chatbot",
                    "Up to 1,000 Documents Ingested",
                    "Vector Embeddings Pipeline",
                    "Basic Web Search Portal",
                    "Standard AWS Hosting"
                ]
            },
            {
                "name": "Build (Pro)",
                "price": "₹1.8L+",
                "features": [
                    "Enterprise Hybrid RAG System",
                    "Unlimited Document Ingestion",
                    "Role-Based Access Control (RBAC)",
                    "Custom Chunking & Semantic Re-Ranking",
                    "Slack / Teams Integration",
                    "Admin Document Dashboard"
                ]
            },
            {
                "name": "Scale (Enterprise)",
                "price": "₹3.5L+",
                "features": [
                    "Full LLM Fine-Tuning & Quantization",
                    "Private On-Premises / VPC Self-Hosting",
                    "Multimodal Ingestion (Text + Image)",
                    "SOC2 & Compliance Audit Ready",
                    "Guaranteed Zero Hallucination SLA",
                    "Dedicated AI Research Engineer"
                ]
            }
        ]
    },
    {
        "filename": "machine_learning.html",
        "title": "Machine & Deep Learning",
        "icon": "🔬",
        "flow_id": "flow-ml",
        "about": "Advanced predictive modeling, computer vision, natural language processing, and real-time classification systems deployed at scale. We turn raw datasets into predictive engines that forecast trends and detect anomalies.",
        "image": "https://images.unsplash.com/photo-1518932945647-7a3c96943e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "pipeline_nodes": [
            ("Raw Data", "📦"),
            ("Preprocessing", "🧹"),
            ("Model Training", "🖥️"),
            ("Evaluation", "📊"),
            ("Real-time Inference", "🎯")
        ],
        "build_list": [
            "Sales, Inventory & Demand Forecasting Engines",
            "Real-Time Transactional Fraud Detection Systems",
            "Manufacturing Defect Detection via Computer Vision (60 FPS)",
            "Predictive Customer Churn & Retention Analytics"
        ],
        "capabilities": [
            ("Predictive Analytics", "Forecast sales, predict customer churn, and optimize supply chains using advanced statistical and time-series modeling."),
            ("Computer Vision (60 FPS)", "Real-time object detection, facial recognition, and automated quality control for manufacturing pipelines at 60 FPS."),
            ("NLP & Entity Extraction", "Sentiment analysis, automated document classification, and Named Entity Recognition (NER) from unstructured text."),
            ("Production MLOps Pipeline", "Robust CI/CD pipelines to train, evaluate, deploy, and monitor machine learning models in production environments via MLflow."),
            ("Feature Store Architecture", "Deep data engineering to curate highly predictive features from raw noise, massively boosting model precision."),
            ("Edge AI Optimization", "Optimize and deploy lightweight machine learning models directly onto IoT devices, mobile apps, or edge servers for zero latency.")
        ],
        "transformations": [("+45%", "Accuracy Increase"), ("-30%", "Fraud Losses"), ("24/7", "Real-Time Monitoring")],
        "pricing_tiers": [
            {
                "name": "Launch (MVP)",
                "price": "₹50K+",
                "features": [
                    "Custom Predictive ML Model",
                    "Data Cleaning & Feature Selection",
                    "Accuracy Backtesting Report",
                    "FastAPI Inference Endpoint",
                    "Cloud Deployment Setup"
                ]
            },
            {
                "name": "Build (Pro)",
                "price": "₹1.5L+",
                "features": [
                    "Deep Learning Neural Architecture",
                    "Automated MLOps Pipeline (MLflow)",
                    "Continuous Model Retraining Setup",
                    "Sub-50ms Real-Time Inference",
                    "Monitoring & Drift Detection",
                    "Full Source Code Transfer"
                ]
            },
            {
                "name": "Scale (Enterprise)",
                "price": "₹3.0L+",
                "features": [
                    "Computer Vision / Time-Series System",
                    "NVIDIA TensorRT GPU Acceleration",
                    "Edge Device Deployment & Optimization",
                    "Multi-Node Distributed Training",
                    "24/7 SLA & Maintenance Support",
                    "Custom Model Architecture R&D"
                ]
            }
        ]
    },
    {
        "filename": "data_engineering.html",
        "title": "Data Engineering",
        "icon": "🗄️",
        "flow_id": "flow-data",
        "about": "Robust ETL pipelines, scalable cloud data warehousing, and interactive visualization dashboards. We untangle messy, distributed data architectures into clean, unified, and strategic assets for your entire organization.",
        "image": "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "pipeline_nodes": [
            ("Data Sources", "🌐"),
            ("ETL Pipeline", "⚙️"),
            ("Data Warehouse", "🏢"),
            ("Analytics Engine", "📈"),
            ("Business Intelligence", "💡")
        ],
        "build_list": [
            "Automated Cloud Data Warehouses (Snowflake / BigQuery)",
            "Real-Time Event Streaming Pipelines (Kafka / Spark)",
            "Custom Apache Airflow ETL/ELT DAG Workflows",
            "Executive Business Intelligence & Looker Dashboards"
        ],
        "capabilities": [
            ("Automated ETL/ELT DAGs", "Extract, transform, and load massive datasets from diverse sources with zero downtime or data loss using Airflow and dbt."),
            ("Cloud Data Warehousing", "Architect highly scalable data lakes and warehouses using modern columnar databases like Snowflake, BigQuery, or Redshift."),
            ("Real-Time Stream Processing", "Process millions of events per second for real-time analytics, fraud detection, and dynamic pricing using Apache Kafka."),
            ("Data Governance & Security", "Implement strict role-based access controls, data anonymization/masking, and comprehensive audit logs for compliance."),
            ("Executive BI Dashboarding", "Connect warehouses to Looker, Tableau, or PowerBI to build interactive, real-time dashboards for executive decision-making."),
            ("Automated Data Quality Testing", "Automate data quality testing using dbt to catch nulls, duplicates, and schema changes before they break downstream ML models.")
        ],
        "transformations": [("100TB+", "Scale Capable"), ("99.99%", "Uptime SLAs"), ("Real-Time", "Data Sync")],
        "pricing_tiers": [
            {
                "name": "Launch (MVP)",
                "price": "₹45K+",
                "features": [
                    "Single ETL Pipeline Setup",
                    "3 Data Sources Connected",
                    "Cleaned SQL Schema Output",
                    "Basic BI Dashboard",
                    "Automated Nightly Sync"
                ]
            },
            {
                "name": "Build (Pro)",
                "price": "₹1.4L+",
                "features": [
                    "Cloud Data Warehouse (Snowflake)",
                    "Automated dbt Transformation Suite",
                    "Real-Time Kafka Stream Pipeline",
                    "Automated Error Alerting & Retries",
                    "Data Schema Documentation",
                    "Executive BI Suite Setup"
                ]
            },
            {
                "name": "Scale (Enterprise)",
                "price": "₹2.9L+",
                "features": [
                    "Multi-Region Enterprise Data Lakehouse",
                    "Databricks Big Data Engine Setup",
                    "SOC2 Data Anonymization & Masking",
                    "Zero-Downtime Data Migration",
                    "24/7 Data Monitoring & SLAs",
                    "Dedicated Chief Data Architect"
                ]
            }
        ]
    },
    {
        "filename": "website_development.html",
        "title": "Web Development",
        "icon": "⚡",
        "flow_id": "flow-web",
        "about": "High-performance web applications, stunning landing pages, and complex admin dashboards built with modern frameworks and deeply integrated AI backends. We build Silicon Valley-grade digital products.",
        "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "pipeline_nodes": [
            ("User Interface", "💻"),
            ("API Gateway", "🚪"),
            ("Microservices", "🧩"),
            ("Cloud Database", "☁️"),
            ("CDN Delivery", "🌍")
        ],
        "build_list": [
            "Full-Stack Multi-Tenant SaaS Platforms",
            "High-Converting Animated Product Landing Pages",
            "Internal Enterprise Operations & Analytics Dashboards",
            "AI-Integrated Dynamic Web Applications"
        ],
        "capabilities": [
            ("Full-Stack Web Applications", "End-to-end development of dynamic SaaS platforms with secure authentication, relational databases, and responsive UI."),
            ("AI-Integrated Interfaces", "Seamlessly embed AI chatbots, intelligent semantic search bars, and dynamic content generation directly into your frontend."),
            ("Sub-1s Speed & 99+ Lighthouse", "Server-side rendering, CDN edge caching, and optimized assets ensuring 99+ Lighthouse scores and sub-second loads."),
            ("Bespoke Glassmorphic UI/UX", "Silicon Valley-grade aesthetics featuring glassmorphism, smooth GSAP animations, and intuitive user flows."),
            ("High-Performance FastAPI Backend", "High-performance, RESTful or GraphQL APIs built with Python FastAPI, featuring automatic swagger docs and strict validation."),
            ("Secure Stripe Payment Gateways", "Flawless integration of Stripe, Razorpay, or custom payment gateways to handle subscriptions and one-off payments securely.")
        ],
        "transformations": [("99+", "Lighthouse Score"), ("Global", "CDN Edge Delivery"), ("Sub-1s", "Load Times")],
        "pricing_tiers": [
            {
                "name": "Launch (MVP)",
                "price": "₹35K+",
                "features": [
                    "High-Converting Product Landing Page",
                    "Bespoke Glassmorphic UI/UX Design",
                    "Responsive Mobile & Desktop Layout",
                    "FastAPI Contact Form Integration",
                    "Vercel Global Edge Deployment"
                ]
            },
            {
                "name": "Build (Pro)",
                "price": "₹1.0L+",
                "features": [
                    "Full-Stack SaaS Web Application",
                    "Next.js + FastAPI + Postgres Tech Stack",
                    "User Authentication & Admin Dashboard",
                    "Stripe / Razorpay Payment Gateway",
                    "Embedded AI Chatbot / Search",
                    "SEO & Speed Performance Optimization"
                ]
            },
            {
                "name": "Scale (Enterprise)",
                "price": "₹2.5L+",
                "features": [
                    "Enterprise Multi-Tenant SaaS Portal",
                    "Microservices Architecture Setup",
                    "Interactive 3D Three.js Visuals",
                    "Redis Caching & High-Scale Load Balancing",
                    "Dedicated SLA & Maintenance",
                    "Full Ownership & IP Transfer"
                ]
            }
        ]
    }
]

for service in services_data:
    filepath = os.path.join(SERVICES_DIR, service["filename"])
    content = generate_service_page(service)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

print("ENTERPRISE ARCHITECTURE EXACTLY MATCHED TO HOMEPAGE ON ALL SERVICE PAGES!")
