import os

SERVICES_DIR = r"d:\End to End Projects\buildlyst\app\templates\services"
os.makedirs(SERVICES_DIR, exist_ok=True)

# 1. Update services_layout.html
layout_html = """{% extends 'base.html' %}

{% block back_button %}
<div style="position: absolute; top: 20px; left: 24px; z-index: 1000;">
    <a href="/" class="btn glass-btn" style="padding: 6px 14px; font-size: 13px; display: inline-flex; align-items: center; gap: 6px; border-radius: 50px;">
        <span>&larr;</span> Back to Home
    </a>
</div>
{% endblock %}

{% block content %}
<style>
    /* Service Navigation Buttons Header */
    .service-nav-btn {
        padding: 10px 20px;
        border-radius: 50px;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: var(--c-text-secondary);
        font-weight: 500;
        font-size: 13px;
        transition: all 0.3s ease;
        text-decoration: none;
        white-space: nowrap;
        display: inline-flex;
        align-items: center;
        gap: 6px;
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
        gap: 10px;
        justify-content: center;
        flex-wrap: wrap;
        margin-top: 20px;
    }

    /* Project Case Study Architecture Blueprint Card */
    .project-blueprint-card {
        padding: 24px 26px;
        border-radius: 18px;
        background: rgba(5, 10, 22, 0.94);
        border: 1px solid rgba(0, 210, 255, 0.25);
        box-shadow: 0 10px 40px rgba(0,0,0,0.6), inset 0 0 25px rgba(0, 210, 255, 0.04);
        position: relative;
    }
    .blueprint-step-node {
        padding: 12px 16px;
        border-radius: 12px;
        background: rgba(255,255,255,0.025);
        border: 1px solid rgba(255,255,255,0.07);
        display: flex;
        align-items: center;
        gap: 14px;
        transition: all 0.25s ease;
    }
    .blueprint-step-node:hover {
        border-color: var(--c-accent-cyan);
        background: rgba(0, 210, 255, 0.08);
        transform: translateX(4px);
    }
    .blueprint-step-icon {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: rgba(0, 210, 255, 0.1);
        border: 1px solid var(--c-accent-cyan);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        flex-shrink: 0;
    }
    .blueprint-connector {
        width: 2px;
        height: 12px;
        background: linear-gradient(180deg, var(--c-accent-cyan), rgba(138, 35, 137, 0.8));
        margin: 0 auto;
        opacity: 0.7;
    }

    /* Backend Step Execution Tracker */
    .execution-tracker-box {
        margin-top: 24px;
        padding: 20px;
        border-radius: 16px;
        background: rgba(4, 8, 20, 0.85);
        border: 1px solid rgba(0, 210, 255, 0.25);
        box-shadow: 0 0 25px rgba(0, 210, 255, 0.08);
    }
    .tracker-step-item {
        display: flex;
        align-items: flex-start;
        gap: 14px;
        padding: 10px 14px;
        border-radius: 8px;
        margin-bottom: 6px;
        background: rgba(255,255,255,0.015);
        border: 1px solid rgba(255,255,255,0.03);
        transition: all 0.3s ease;
    }
    .tracker-step-item.active-step {
        background: rgba(0, 210, 255, 0.08);
        border-color: var(--c-accent-cyan);
        box-shadow: 0 0 15px rgba(0, 210, 255, 0.15);
    }
    .tracker-step-badge {
        padding: 3px 8px;
        border-radius: 20px;
        background: rgba(255,255,255,0.08);
        color: #aaa;
        font-family: monospace;
        font-size: 10px;
        font-weight: bold;
        flex-shrink: 0;
    }
    .tracker-step-item.active-step .tracker-step-badge {
        background: var(--c-accent-cyan);
        color: #000;
    }

    /* 3 Pricing Cards Grid */
    .pricing-grid-3 {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 24px;
        align-items: stretch;
        margin-top: 40px;
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
        padding: 32px 24px;
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
        font-size: 18px;
        font-weight: 700;
        margin-bottom: 6px;
    }
    .pricing-tier-price {
        font-size: 34px;
        font-weight: 800;
        color: #fff;
        margin-bottom: 20px;
    }
    .pricing-feature-list {
        list-style: none;
        padding: 0;
        margin: 0 0 28px 0;
        flex-grow: 1;
    }
    .pricing-feature-list li {
        margin-bottom: 10px;
        font-size: 13px;
        color: #ccc;
        display: flex;
        align-items: flex-start;
        gap: 8px;
        line-height: 1.4;
    }
    .pricing-feature-list li span {
        color: var(--c-accent-cyan);
        font-weight: bold;
    }

    /* Specs Matrix Table */
    .specs-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 24px;
        font-size: 13px;
    }
    .specs-table th, .specs-table td {
        padding: 14px 18px;
        text-align: left;
        border-bottom: 1px solid rgba(255,255,255,0.06);
    }
    .specs-table th {
        background: rgba(255,255,255,0.03);
        color: #fff;
        font-weight: 700;
        text-transform: uppercase;
        font-size: 11px;
        letter-spacing: 1px;
    }
    .specs-table td {
        color: var(--c-text-secondary);
    }
    .specs-table tr:hover td {
        background: rgba(0, 210, 255, 0.02);
        color: #fff;
    }
</style>

<!-- Common Hero Section (Compact Above-The-Fold Layout) -->
<section class="reveal" style="padding: 110px 0 30px 0; background: radial-gradient(circle at top center, rgba(0, 210, 255, 0.06) 0%, transparent 70%); text-align: center; border-bottom: 1px solid rgba(255,255,255,0.05);">
    <div class="container">
        <span class="overline highlight" style="font-size: 11px;">Buildlyst Capabilities</span>
        <h1 class="text-gradient-hero" style="font-size: clamp(30px, 4vw, 46px); line-height: 1.1; margin-bottom: 10px;">
            Enterprise Architecture & Services
        </h1>
        <p class="subtext mx-auto" style="font-size: 14px; max-width: 580px; margin-bottom: 0;">
            Select a service category below to inspect specs, real project system architecture designs, and transparent pricing.
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
    build_items_html = "".join([f'<li style="margin-bottom:14px; font-size:14px; color:#e0e0e0; display:flex; align-items:center; gap:10px;"><span style="color:var(--c-accent-cyan); font-size:16px;">✓</span> {item}</li>' for item in service["build_list"]])
    
    # 6 Core Capabilities Grid
    caps_html = "".join([f'<div class="glass-panel tilt-card" data-tilt style="padding:28px; border-radius:var(--radius-lg); border:1px solid rgba(255,255,255,0.04); background:rgba(255,255,255,0.015);"><h3 style="color:#fff;font-size:18px;margin-bottom:10px;font-weight:700;">{t}</h3><p style="color:var(--c-text-secondary);font-size:13px;line-height:1.6;">{d}</p></div>' for t, d in service["capabilities"]])

    # Transformations
    transform_html = "".join([f'<div class="glass-panel text-center tilt-card" data-tilt style="padding:28px; border-radius:var(--radius-lg); border:1px solid rgba(255,255,255,0.04); background:rgba(255,255,255,0.015);"><h3 class="text-gradient" style="font-size:42px; font-weight:800; margin-bottom:6px;">{val}</h3><p style="color:var(--c-text-secondary); font-size:14px;">{desc}</p></div>' for val, desc in service["transformations"]])

    # Pipeline Nodes HTML
    nodes_html = ""
    for idx, (label, icon) in enumerate(service["pipeline_nodes"]):
        nodes_html += f'''
        <div class="pipe-node" data-label="{label}">
            <div class="pipe-icon">{icon}</div>
        </div>'''
        if idx < len(service["pipeline_nodes"]) - 1:
            nodes_html += '\n        <div class="pipe-arrow"></div>'

    # Project Case Study Blueprint Nodes HTML (For Overview Right Side)
    bp_nodes_html = ""
    for idx, (bp_stage, bp_tech, bp_desc, bp_icon) in enumerate(service["blueprint_nodes"]):
        bp_nodes_html += f'''
        <div class="blueprint-step-node">
            <div class="blueprint-step-icon">{bp_icon}</div>
            <div style="flex-grow: 1;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 13px; font-weight: 700; color: #fff;">{bp_stage}</span>
                    <span style="font-size: 10px; font-family: monospace; color: var(--c-accent-cyan); background: rgba(0,210,255,0.1); padding: 2px 6px; border-radius: 4px;">{bp_tech}</span>
                </div>
                <div style="font-size: 11px; color: var(--c-text-secondary); margin-top: 2px;">{bp_desc}</div>
            </div>
        </div>'''
        if idx < len(service["blueprint_nodes"]) - 1:
            bp_nodes_html += '\n        <div class="blueprint-connector"></div>'

    # Backend Step Tracker Items HTML
    tracker_items_html = ""
    for idx, (step_num, step_title, step_desc) in enumerate(service["backend_steps"]):
        active_cls = "active-step" if idx == 0 else ""
        tracker_items_html += f'''
        <div class="tracker-step-item {active_cls}" id="step-item-{idx}">
            <span class="tracker-step-badge">{step_num}</span>
            <div>
                <div style="font-size: 13px; font-weight: 700; color: #fff; margin-bottom: 2px;">{step_title}</div>
                <div style="font-size: 12px; color: var(--c-text-secondary); line-height: 1.4;">{step_desc}</div>
            </div>
        </div>'''

    # Technical Specs Matrix Rows
    specs_rows_html = "".join([f'''
    <tr>
        <td style="font-weight: 600; color: #fff;">{feature}</td>
        <td>{mvp}</td>
        <td style="color: var(--c-accent-cyan); font-weight: 600;">{pro}</td>
        <td>{ent}</td>
    </tr>
    ''' for feature, mvp, pro, ent in service["specs_table"]])

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
            <a href="/#contact" class="btn glass-btn w-100" style="padding: 12px; text-align: center; font-size: 14px;">Get Started</a>
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
            <a href="/#contact" class="btn glow-border-btn w-100" style="padding: 12px; text-align: center; font-size: 14px;">Select Pro</a>
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
            <a href="/#contact" class="btn glass-btn w-100" style="padding: 12px; text-align: center; font-size: 14px;">Contact Sales</a>
        </div>
    </div>
    """

    html = f"""{{% extends 'services/services_layout.html' %}}

{{% block service_detail %}}
<div style="min-height: 100vh;">

    <!-- 1. ULTRA-COMPACT ABOVE-THE-FOLD SERVICE OVERVIEW WITH REAL PROJECT SYSTEM DESIGN BLUEPRINT -->
    <section class="reveal" style="padding: 40px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
        <div class="container">
            <div style="display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 36px; align-items: center;">
                
                <!-- LEFT SIDE (PROJECT CASE STUDY TITLE + CONCISE OVERVIEW + TECH BADGES) -->
                <div>
                    <div style="margin-bottom: 14px;">
                        <span class="overline highlight" style="font-size: 11px;">Production Case Study Blueprint</span>
                        <div style="display: flex; align-items: center; gap: 12px; margin-top: 6px;">
                            <span style="font-size: 36px;">{service["icon"]}</span>
                            <h2 class="text-gradient" style="font-size: clamp(26px, 3.2vw, 36px); font-weight: 800; margin: 0; line-height: 1.15;">
                                {service["title"]}
                            </h2>
                        </div>
                    </div>

                    <!-- REAL PROJECT CASE STUDY NAME -->
                    <div style="margin-bottom: 14px; padding: 10px 14px; border-radius: 10px; background: rgba(0,210,255,0.05); border: 1px solid rgba(0,210,255,0.2); display: flex; align-items: center; justify-content: space-between;">
                        <span style="font-size: 12px; font-weight: bold; color: #fff;">CASE STUDY: <span style="color: var(--c-accent-cyan);">{service["project_name"]}</span></span>
                        <span style="font-size: 10px; font-family: monospace; color: #aaa;">{service["project_domain"]}</span>
                    </div>

                    <p style="color: var(--c-text-secondary); font-size: 14.5px; line-height: 1.6; margin-bottom: 18px;">
                        {service["about"]}
                    </p>

                    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                        <span style="padding: 4px 10px; border-radius: 20px; background: rgba(0, 210, 255, 0.08); border: 1px solid rgba(0, 210, 255, 0.2); color: #00d2ff; font-size: 11px; font-weight: 600;">⚡ Async Production</span>
                        <span style="padding: 4px 10px; border-radius: 20px; background: rgba(138, 35, 137, 0.08); border: 1px solid rgba(138, 35, 137, 0.2); color: #c07bc5; font-size: 11px; font-weight: 600;">🛡️ SOC2 Compliant</span>
                        <span style="padding: 4px 10px; border-radius: 20px; background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.1); color: #fff; font-size: 11px; font-weight: 600;">🧠 Stateful Context</span>
                    </div>
                </div>

                <!-- RIGHT SIDE: REAL PROJECT SYSTEM DESIGN DIAGRAM BLUEPRINT -->
                <div class="project-blueprint-card">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 8px;">
                        <span style="font-family: var(--font-display); font-size: 10px; font-weight: 800; color: var(--c-accent-cyan); text-transform: uppercase; letter-spacing: 1.5px;">
                            PROJECT SYSTEM ARCHITECTURE
                        </span>
                        <span style="font-size: 10px; font-family: monospace; color: #27c93f;">LIVE BLUEPRINT</span>
                    </div>
                    
                    {bp_nodes_html}
                </div>

            </div>
        </div>
    </section>

    <!-- 2. EXACT HOMEPAGE ENTERPRISE ARCHITECTURE + BACKEND EXECUTION EXPLANATION TRACKER -->
    <section id="architecture" class="architecture-section reveal" style="padding: 70px 0;">
        <div class="container">
            <div class="section-header text-center">
                <span class="overline highlight">Engineering Core</span>
                <h2 class="section-heading text-gradient" style="font-size: 30px;">Enterprise Architecture</h2>
                <p class="subtext text-center mx-auto" style="font-size: 14px;">Built on a foundation of elite frameworks, tailored for specific enterprise use-cases.</p>
            </div>

            <!-- Infinite Tech Marquee (Exact Homepage Marquee) -->
            <div class="marquee-container" style="margin-bottom: 36px; border-radius: var(--radius-lg);">
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
                <a href="/services/ai-agents" class="arch-tab-btn {{% if request.url.path == '/services/ai-agents' %}}active{{% endif %}}" data-target="flow-agents">AI Agents</a>
                <a href="/services/gen-ai" class="arch-tab-btn {{% if request.url.path == '/services/gen-ai' %}}active{{% endif %}}" data-target="flow-genai">Gen AI</a>
                <a href="/services/machine-learning" class="arch-tab-btn {{% if request.url.path == '/services/machine-learning' %}}active{{% endif %}}" data-target="flow-ml">Machine Learning</a>
                <a href="/services/data-engineering" class="arch-tab-btn {{% if request.url.path == '/services/data-engineering' %}}active{{% endif %}}" data-target="flow-data">Data Engineering</a>
                <a href="/services/web-development" class="arch-tab-btn {{% if request.url.path == '/services/web-development' %}}active{{% endif %}}" data-target="flow-web">Web Development</a>
            </div>

            <!-- Dynamic Pipeline Container (Exact Homepage Design) -->
            <div class="pipeline-container glass-panel glow-border p-lg" style="margin-top: 24px;">
                <div class="pipeline-flow active" id="{service['flow_id']}">
                    {nodes_html}
                </div>
            </div>

            <!-- BACKEND EXECUTION TRACKER ("WHAT IS HAPPENING IN THE BACKEND?") -->
            <div class="execution-tracker-box">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 10px;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="font-size: 16px;">⚙️</span>
                        <h4 style="margin: 0; font-size: 15px; color: #fff; font-weight: 700;">Backend Execution Breakdown</h4>
                    </div>
                    <span style="font-size: 10px; font-family: monospace; color: var(--c-accent-cyan); text-transform: uppercase; letter-spacing: 1px;">REAL-TIME SYNCHRONIZED EXECUTION</span>
                </div>
                {tracker_items_html}
            </div>

        </div>
    </section>

    <!-- 3. What We Build (Deliverables) -->
    <section class="reveal" style="padding: 70px 0; border-top: 1px solid rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.05);">
        <div class="container">
            <div class="split-layout" style="display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center;">
                <div>
                    <span class="overline highlight" style="font-size: 11px;">Production Deliverables</span>
                    <h2 class="section-heading text-gradient" style="margin-bottom: 20px; font-size: 30px;">Exactly what we build.</h2>
                    <p style="color: var(--c-text-secondary); font-size: 15px; margin-bottom: 24px; line-height:1.6;">We don't sell generic advice; we deliver production-ready codebases. Our standard engineering deployments include:</p>
                    <ul style="list-style: none; padding: 0;">
                        {build_items_html}
                    </ul>
                </div>
                <div class="glass-panel" style="border-radius: 16px; position: relative; overflow: hidden; border: 1px solid rgba(255,255,255,0.08); box-shadow: 0 15px 35px rgba(0,0,0,0.4);">
                    <div style="position: absolute; top: 0; left: 0; width: 100%; height: 4px; background: linear-gradient(90deg, #00D2FF, #8A2387);"></div>
                    <img src="{service["image"]}" alt="{service['title']}" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.85; filter: contrast(1.1); display: block;">
                </div>
            </div>
        </div>
    </section>

    <!-- 4. Interactive Live Code Telemetry Simulator -->
    <section class="reveal" style="padding: 70px 0; border-bottom: 1px solid rgba(255,255,255,0.05); background: rgba(0,0,0,0.2);">
        <div class="container">
            <div class="section-header text-center" style="margin-bottom: 36px;">
                <span class="overline highlight" style="font-size: 11px;">Developer Sandbox</span>
                <h2 class="section-heading text-gradient" style="font-size: 30px;">Live Execution Telemetry</h2>
                <p class="subtext text-center mx-auto" style="font-size: 14px;">Inspect simulated runtime code snippets and terminal log streams for {service['title']}.</p>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: stretch;">
                <div class="glass-panel" style="padding: 20px; border-radius: 14px; border: 1px solid rgba(255,255,255,0.08); background: #080c14;">
                    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 10px; margin-bottom: 14px;">
                        <span style="color: #fff; font-family: monospace; font-size: 12px;">{service['code_file']}</span>
                        <span style="color: #00d2ff; font-family: monospace; font-size: 10px; font-weight: bold;">{service['code_lang']}</span>
                    </div>
                    <pre style="margin: 0; color: #a5d6ff; font-family: 'Fira Code', monospace; font-size: 12px; line-height: 1.5; white-space: pre-wrap;">{service['code_snippet']}</pre>
                </div>

                <div class="glass-panel" style="padding: 20px; border-radius: 14px; border: 1px solid rgba(0,210,255,0.2); background: #03060c; display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 10px; margin-bottom: 14px;">
                            <span style="color: #27c93f; font-family: monospace; font-size: 11px; font-weight: bold;">● TERMINAL LOG STREAM</span>
                            <span style="color: #aaa; font-family: monospace; font-size: 10px;">STATUS: ACTIVE</span>
                        </div>
                        <div style="font-family: monospace; font-size: 11px; line-height: 1.7; color: #d0d0d0;">
                            {service['terminal_logs']}
                        </div>
                    </div>
                    <div style="margin-top: 16px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.05); display: flex; justify-content: space-between; align-items: center; font-family: monospace; font-size: 10px; color: #888;">
                        <span>LATENCY: 12ms</span>
                        <span>SOC2 VERIFIED</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 5. 6 Core Capabilities Grid -->
    <section class="reveal" style="padding: 70px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
        <div class="container">
            <div class="section-header text-center" style="margin-bottom: 36px;">
                <span class="overline highlight" style="font-size: 11px;">Core Specs</span>
                <h2 class="section-heading text-gradient" style="font-size: 30px;">6 Core Capabilities</h2>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
                {caps_html}
            </div>
        </div>
    </section>

    <!-- 6. Technical Specifications Comparison Matrix -->
    <section class="reveal" style="padding: 70px 0; border-bottom: 1px solid rgba(255,255,255,0.05); background: rgba(255,255,255,0.01);">
        <div class="container">
            <div class="section-header text-center" style="margin-bottom: 28px;">
                <span class="overline highlight" style="font-size: 11px;">Comparison Matrix</span>
                <h2 class="section-heading text-gradient" style="font-size: 30px;">Technical Specifications</h2>
                <p class="subtext text-center mx-auto" style="font-size: 14px;">Compare technical benchmarks across Launch, Build, and Scale engagement tiers.</p>
            </div>

            <div class="glass-panel" style="border-radius: 14px; overflow: hidden; border: 1px solid rgba(255,255,255,0.06);">
                <table class="specs-table">
                    <thead>
                        <tr>
                            <th>Specification Parameter</th>
                            <th>Launch (MVP)</th>
                            <th style="color: var(--c-accent-cyan);">Build (Pro)</th>
                            <th>Scale (Enterprise)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {specs_rows_html}
                    </tbody>
                </table>
            </div>
        </div>
    </section>

    <!-- 7. Business Transformations (ROI) -->
    <section class="reveal" style="padding: 70px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
        <div class="container">
            <div class="section-header text-center" style="margin-bottom: 36px;">
                <span class="overline highlight" style="font-size: 11px;">Business Outcomes</span>
                <h2 class="section-heading text-gradient" style="font-size: 30px;">Measurable Impact</h2>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
                {transform_html}
            </div>
        </div>
    </section>

    <!-- 8. 3 Tier Pricing Section -->
    <section class="reveal" style="padding: 80px 0 100px 0;">
        <div class="container">
            <div class="section-header text-center">
                <span class="overline highlight" style="font-size: 11px;">Transparent Investment</span>
                <h2 class="section-heading text-gradient" style="font-size: 30px;">Tailored Pricing Tiers</h2>
                <p class="subtext text-center mx-auto" style="font-size: 14px;">Select the engagement level that fits your business scale for {service['title']}.</p>
            </div>
            
            {pricing_grid_html}
            
        </div>
    </section>

</div>

<!-- GUARANTEED PIPELINE ANIMATION + SYNCHRONIZED BACKEND EXECUTION TRACKER SCRIPT -->
<script>
(function() {{
    function animatePipeline() {{
        const flowContainer = document.getElementById('{service['flow_id']}');
        if (!flowContainer) return;

        const arrows = flowContainer.querySelectorAll('.pipe-arrow');
        const nodes = flowContainer.querySelectorAll('.pipe-node');
        const trackerItems = document.querySelectorAll('.tracker-step-item');

        if (!nodes.length) return;

        let currentStep = 0;
        setInterval(function() {{
            arrows.forEach(function(a) {{ a.classList.remove('active-flow'); }});
            nodes.forEach(function(n) {{ n.classList.remove('active-glow'); }});
            trackerItems.forEach(function(item) {{ item.classList.remove('active-step'); }});

            if (currentStep < arrows.length) {{
                arrows[currentStep].classList.add('active-flow');
                nodes[currentStep].classList.add('active-glow');
                nodes[currentStep + 1].classList.add('active-glow');
                
                const stepEl = document.getElementById('step-item-' + currentStep);
                if (stepEl) stepEl.classList.add('active-step');
            }} else if (nodes.length > 0) {{
                nodes[nodes.length - 1].classList.add('active-glow');
                const stepEl = document.getElementById('step-item-' + (nodes.length - 1));
                if (stepEl) stepEl.classList.add('active-step');
            }}

            currentStep = (currentStep + 1) % (arrows.length + 1);
        }}, 1400);
    }}

    if (document.readyState === 'loading') {{
        document.addEventListener('DOMContentLoaded', animatePipeline);
    }} else {{
        animatePipeline();
    }}
}})();
</script>
{{% endblock %}}
"""
    return html

# 5 Detailed Services Data with REAL PROJECT CASE STUDY ARCHITECTURE BLUEPRINTS
services_data = [
    {
        "filename": "ai_agents.html",
        "title": "Autonomous AI Agents",
        "icon": "🤖",
        "flow_id": "flow-agents",
        "project_name": "Apex Property Triage AI Swarm",
        "project_domain": "REAL ESTATE TECH",
        "about": "Case Study Project Architecture: Built for Shivay Realty to automate lead triage, property matching, and automated scheduling via an orchestrated autonomous multi-agent swarm.",
        "image": "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "blueprint_nodes": [
            ("Lead Ingress & Webhook Payload", "FASTAPI / REST", "WhatsApp lead prompt or Webhook triggers payload", "👤"),
            ("Agent Triage & Intent Classifier", "LANGGRAPH / GPT-4o", "Classifies lead criteria, budget, & intent score", "🧠"),
            ("Pinecone Vector Property Search", "PINECONE / PGVECTOR", "Queries 10,000+ listings via vector similarity", "🗄️"),
            ("CRM Dispatch & Calendar Booking", "TWILIO / STRIPE API", "Dispatches WhatsApp booking link & updates CRM", "⚡")
        ],
        "backend_steps": [
            ("STEP 1", "Lead Payload Ingress", "FastAPI endpoint receives lead payload and initializes intent classifier."),
            ("STEP 2", "LangGraph Swarm Routing", "Triage agent delegates criteria parsing to Property Matcher Agent."),
            ("STEP 3", "Vector Similarity Search", "Matches lead requirements against 10k+ listing embeddings in Pinecone."),
            ("STEP 4", "CRM Record Synchronization", "Agent dispatches REST API call to update CRM records in real-time."),
            ("STEP 5", "Automated Booking Dispatch", "Twilio API sends personalized WhatsApp property card and calendar link.")
        ],
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
        "code_file": "apex_agent_swarm.py",
        "code_lang": "PYTHON / LANGGRAPH",
        "code_snippet": '''from langgraph.graph import StateGraph, END
from buildlyst.agents import TriageAgent, PropertyMatcherAgent

# Apex Realty Multi-Agent Blueprint
workflow = StateGraph(PropertyLeadState)
workflow.add_node("triage", TriageAgent.classify_intent)
workflow.add_node("matcher", PropertyMatcherAgent.search_pinecone)

workflow.add_edge("triage", "matcher")
workflow.add_conditional_edges("matcher", verify_lead_qualification, {
    "qualified": "dispatch_crm",
    "unqualified": END
})
app = workflow.compile()''',
        "terminal_logs": '''<span style="color:#00d2ff">[APEX_AGENT]</span> Ingesting WhatsApp Lead Payload...<br>
<span style="color:#27c93f">[MATCH]</span> Found 3 Matching Property Vectors (Pinecone Similarity: 0.96)<br>
<span style="color:#00d2ff">[CRM]</span> Updating Salesforce Record #9042...<br>
<span style="color:#27c93f">[SUCCESS]</span> Dispatched Booking Link to Client Phone (+91-9876543210)<br>
<span style="color:#27c93f">[OK]</span> Total Workflow Execution Time: 138ms''',
        "specs_table": [
            ("Agent Architecture", "Single-Task Agent", "Multi-Agent Swarm", "Custom Orchestrated Graph"),
            ("Memory Vector Store", "In-Memory / Redis", "Pinecone / Postgres", "Dedicated Private Qdrant"),
            ("Human-in-the-Loop", "Manual Confirmation", "Configurable UI Guardrail", "Granular RBAC + Audit Logs"),
            ("Target SLA Uptime", "99.0%", "99.9%", "99.99% Guaranteed SLA"),
            ("Deployment Environment", "Shared Cloud Edge", "Isolated Docker Container", "Private VPC / On-Prem")
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
        "project_name": "LegalAssist Enterprise Audit RAG",
        "project_domain": "LEGAL & COMPLIANCE",
        "about": "Case Study Project Architecture: Engineered for Nexus AI to audit complex legal agreements, check compliance clauses, and retrieve context from 100,000+ PDFs with zero hallucination.",
        "image": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "blueprint_nodes": [
            ("Unstructured Legal Doc Ingest", "LLAMAINDEX PARSER", "Parses PDFs, NDAs, & vendor contracts", "📄"),
            ("text-embedding-3 Hybrid Index", "BM25 + DENSE RAG", "Converts chunks to 3072-dim embeddings", "📉"),
            ("Pinecone Vector Store & Re-Ranker", "COHERE RERANK V3", "Retrieves top 5 contract clauses", "🗄️"),
            ("Fine-Tuned Llama 3 Audit LLM", "VLLM / AWS BEDROCK", "Synthesizes risk report with page citations", "💬")
        ],
        "backend_steps": [
            ("STEP 1", "Contract PDF Parsing", "LlamaIndex document loader recursively parses 500-page legal agreements into clause chunks."),
            ("STEP 2", "3072-Dim Vector Generation", "text-embedding-3-large model computes vector embeddings for each contract section."),
            ("STEP 3", "Cohere Re-Ranker Processing", "Hybrid search engine filters dense vector results using sparse BM25 keyword matching."),
            ("STEP 4", "Compliance Risk Scoring", "Fine-tuned Llama 3 model audits clauses against regulatory compliance rules."),
            ("STEP 5", "Grounded Report Output", "System returns audited risk report with exact clause numbers and page citations.")
        ],
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
        "code_file": "legal_audit_rag.py",
        "code_lang": "PYTHON / LLAMAINDEX",
        "code_snippet": '''from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
from llama_index.postprocessor.cohere_rerank import CohereRerank

# LegalAssist Audit Architecture
documents = SimpleDirectoryReader("./legal_silos").load_data()
reranker = CohereRerank(top_n=5, model="rerank-english-v3.0")

index = VectorStoreIndex.from_documents(documents)
query_engine = index.as_query_engine(
    node_postprocessors=[reranker], streaming=True
)''',
        "terminal_logs": '''<span style="color:#00d2ff">[LEGAL_RAG]</span> Ingesting Vendor Master Agreement.pdf...<br>
<span style="color:#27c93f">[RERANK]</span> Cohere v3 Re-ranked Top 5 Risk Clauses<br>
<span style="color:#ffbd2e">[RISK]</span> Clause #14.2 Exceeds Standard Liability Cap<br>
<span style="color:#27c93f">[SUCCESS]</span> Grounded Audit Report Generated with Page Citations''',
        "specs_table": [
            ("Retrieval Architecture", "Naive RAG", "Hybrid RAG (BM25 + Dense)", "Multi-Stage Re-Ranked RAG"),
            ("Document Scale", "Up to 1,000 PDFs", "Up to 100,000 Documents", "Unlimited Enterprise Silos"),
            ("Model Customization", "Prompt Engineering", "Domain Fine-Tuned Llama 3", "Quantized Self-Hosted Model"),
            ("Hallucination Mitigation", "Basic Grounding", "Strict Citation Verification", "Automated Fact-Checking Guard"),
            ("Hosting Model", "Public API Gateway", "Private Cloud VPC", "Air-Gapped On-Premises")
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
        "project_name": "OmniVision 60 FPS Industrial Defect AI",
        "project_domain": "MANUFACTURING TECH",
        "about": "Case Study Project Architecture: Built for industrial manufacturing lines to analyze 60 FPS 4K camera streams in real-time and trigger automated defect ejection in under 5 milliseconds.",
        "image": "https://images.unsplash.com/photo-1518932945647-7a3c96943e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "blueprint_nodes": [
            ("60 FPS 4K Industrial Camera Feed", "RTSP STREAM / OPENCV", "Captures high-resolution conveyor belt frames", "📦"),
            ("Feature Tensor Normalization", "CUDA FEATURE STORE", "Preprocesses & normalizes image tensors", "🧹"),
            ("NVIDIA TensorRT YOLOv8 Engine", "CUDA / TENSORRT", "Runs deep neural network inference @ 60 FPS", "🖥️"),
            ("PLC Conveyor Ejection Trigger", "REST / MLFLOW API", "Dispatches <4ms defect ejection signal", "🎯")
        ],
        "backend_steps": [
            ("STEP 1", "Camera Frame Ingestion", "OpenCV captures 4K camera frames via RTSP protocol at 60 frames per second."),
            ("STEP 2", "CUDA Tensor Batching", "Feature store resizes and normalizes frame pixels directly on GPU memory."),
            ("STEP 3", "TensorRT Neural Network Pass", "YOLOv8 deep learning model computes bounding box predictions in 3.8 milliseconds."),
            ("STEP 4", "Defect Threshold Evaluation", "MLflow anomaly evaluator confirms defect confidence score exceeds 99.5%."),
            ("STEP 5", "Conveyor Ejection Signal", "System dispatches hardware PLC trigger to eject defective item from assembly line.")
        ],
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
        "code_file": "omnivision_engine.py",
        "code_lang": "PYTHON / TENSORRT",
        "code_snippet": '''import torch
import tensorrt as trt

# OmniVision TensorRT 60 FPS Engine
engine_path = "models/omnivision_v8.engine"
with open(engine_path, "rb") as f, trt.Runtime(TRT_LOGGER) as runtime:
    engine = runtime.deserialize_cuda_engine(f.read())

# Low-Latency Inference Stream
output = tensorrt_infer(engine, frame_tensor)
if output['defect_score'] > 0.99:
    plc_eject_trigger.send_signal()''',
        "terminal_logs": '''<span style="color:#00d2ff">[OMNIVISION]</span> RTSP Video Stream Ingested (60 FPS)<br>
<span style="color:#27c93f">[TENSORRT]</span> GPU Latency: 3.8ms per frame<br>
<span style="color:#ffbd2e">[DEFECT]</span> Surface Anomaly Detected on Item #1042<br>
<span style="color:#27c93f">[SUCCESS]</span> PLC Hardware Signal Fired in 1.1ms''',
        "specs_table": [
            ("Model Architecture", "Scikit-Learn / XGBoost", "PyTorch / TensorFlow Neural Net", "Custom TensorRT GPU Model"),
            ("Inference Latency", "&lt; 200ms", "&lt; 50ms Real-Time", "&lt; 5ms Micro-Latency"),
            ("MLOps Pipeline", "Manual Script Run", "MLflow Tracked Pipeline", "Automated CI/CD Kubeflow"),
            ("Edge AI Support", "Not Supported", "Mobile ONNX Export", "NVIDIA Jetson / Edge TensorRT"),
            ("Monitoring & Drift", "Periodic Reports", "Automated Data Drift Alerting", "Continuous Real-Time Retraining")
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
        "project_name": "FinScale Transaction Data Lakehouse",
        "project_domain": "FINTECH & STREAMING",
        "about": "Case Study Project Architecture: Built for FinScale to process 5,000 transaction events/sec through Kafka streaming into Snowflake with dbt quality testing and Tableau BI dashboards.",
        "image": "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "vertical_nodes": [
            ("Kafka Event Stream & API Ingress", "KAFKA / FIVETRAN", "Captures 5,000 transaction events/sec", "🌐"),
            ("Apache Airflow DAG & dbt Transforms", "AIRFLOW / DBT", "Runs hourly SQL models & data quality tests", "⚙️"),
            ("Snowflake Columnar Lakehouse", "SNOWFLAKE DB", "ACID compliant transaction data storage", "🏢"),
            ("Executive Tableau & Feature Store", "TABLEAU / LOOKER", "Feeds real-time executive BI dashboards", "💡")
        ],
        "backend_steps": [
            ("STEP 1", "Kafka Streaming Event Ingest", "Apache Kafka consumers ingest 5,000 transaction events/sec from microservices."),
            ("STEP 2", "Snowflake S3 Landing Ingestion", "Staging DAG loads raw JSON payloads into Snowflake S3 variant tables."),
            ("STEP 3", "dbt Model Transformations", "dbt executes SQL transformations to clean, aggregate, and normalize transaction metrics."),
            ("STEP 4", "Automated Data Quality Audit", "dbt test suite verifies zero null values, foreign key integrity, and column bounds."),
            ("STEP 5", "Materialized Tableau BI Sync", "Snowflake analytics schema updates Looker and Tableau dashboards automatically.")
        ],
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
        "code_file": "finscale_etl_dag.py",
        "code_lang": "PYTHON / AIRFLOW",
        "code_snippet": '''from airflow import DAG
from airflow.providers.snowflake.operators.snowflake import SnowflakeOperator

# FinScale Lakehouse Pipeline
with DAG('finscale_analytics_pipeline', schedule_interval='@hourly') as dag:
    
    ingest_kafka = SnowflakeOperator(
        task_id='stream_kafka_to_landing',
        sql='CALL SP_INGEST_KAFKA_STREAM()'
    )
    dbt_transform = SnowflakeOperator(
        task_id='dbt_run_financial_models',
        sql='CALL SP_DBT_TRANSFORM_FINANCE()'
    )
    ingest_kafka >> dbt_transform''',
        "terminal_logs": '''<span style="color:#00d2ff">[FINSCALE]</span> Ingested 5,000 Kafka Events/sec<br>
<span style="color:#27c93f">[DBT]</span> Executed 18 dbt Analytical Models<br>
<span style="color:#27c93f">[PASS]</span> 100% Data Integrity Tests Passed (Zero Duplicate Records)<br>
<span style="color:#27c93f">[OK]</span> Snowflake Data Warehouse & Tableau Metrics Refreshed''',
        "specs_table": [
            ("Pipeline Architecture", "Single Script Batch Sync", "Apache Airflow DAG Suite", "Kafka Real-Time Event Stream"),
            ("Data Warehouse Target", "PostgreSQL / MySQL", "Snowflake / Redshift", "Databricks Lakehouse Delta"),
            ("Data Quality Testing", "Manual Schema Check", "Automated dbt Tests", "Continuous Great Expectations"),
            ("Throughput Capacity", "Up to 10GB / Day", "Up to 5TB / Day", "100TB+ Scalable Lakehouse"),
            ("Data Anonymization", "Basic Hash Masking", "Role-Based Masking (RBAC)", "SOC2 Compliant Tokenization")
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
        "project_name": "CloudMatrix Multi-Tenant Enterprise SaaS",
        "project_domain": "SAAS WEB PORTAL",
        "about": "Case Study Project Architecture: Built for CloudMatrix to serve 50,000 daily active users with sub-second Next.js 19 SSR rendering, FastAPI backends, and Stripe subscription billing.",
        "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "vertical_nodes": [
            ("Next.js 19 React Client Frontend", "NEXT.JS / TAILWIND", "SSR rendering & GSAP smooth animations", "💻"),
            ("FastAPI Backend Microservices", "PYTHON / FASTAPI", "Async endpoints with JWT auth middleware", "🚪"),
            ("PostgreSQL & Redis Cache Layer", "POSTGRES / REDIS", "ACID database & warm Redis query caching", "☁️"),
            ("Vercel Global Edge CDN", "VERCEL EDGE CDN", "Sub-10ms global edge HTML & JSON rendering", "🌍")
        ],
        "backend_steps": [
            ("STEP 1", "Vercel Edge Ingress", "Vercel Edge CDN intercepts user request and serves cached Next.js static assets."),
            ("STEP 2", "FastAPI JWT Session Auth", "Backend middleware validates bearer token and rate-limits API requests."),
            ("STEP 3", "Async Worker Execution", "Celery async workers process heavy business logic and API payloads."),
            ("STEP 4", "Postgres DB & Redis Sync", "PostgreSQL updates transactional tables while Redis warms active cache keys."),
            ("STEP 5", "Sub-Second Response", "FastAPI returns JSON payload with sub-10ms server execution latency.")
        ],
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
        "code_file": "cloudmatrix_server.py",
        "code_lang": "PYTHON / FASTAPI",
        "code_snippet": '''from fastapi import FastAPI, Depends
from cloudmatrix.auth import verify_jwt_session

app = FastAPI(title="CloudMatrix SaaS Core", version="3.0")

@app.get("/api/v1/tenant/analytics")
async def get_analytics(user=Depends(verify_jwt_session)):
    # Redis Warm Query Cache
    cached_data = await redis_cache.get(f"tenant:{user.tenant_id}")
    if cached_data:
        return cached_data
    return await db.fetch_tenant_analytics(user.tenant_id)''',
        "terminal_logs": '''<span style="color:#00d2ff">[CLOUDMATRIX]</span> FastAPI Server Running on Port 8000<br>
<span style="color:#27c93f">[REDIS]</span> Cache Hit for Tenant #402 (Latency: 1.2ms)<br>
<span style="color:#27c93f">[LIGHTHOUSE]</span> Performance: 99 // Accessibility: 100 // SEO: 100<br>
<span style="color:#27c93f">[SUCCESS]</span> Deployed to Vercel Global Edge CDN''',
        "specs_table": [
            ("Frontend Stack", "Single Page React", "Next.js SSR / SSG", "Next.js + Three.js 3D WebGL"),
            ("Backend Architecture", "Simple REST Server", "FastAPI Async Microservices", "Distributed Redis Microservices"),
            ("Lighthouse Speed Score", "90+", "98+", "99 - 100 Perfect Score"),
            ("Payment Integration", "Basic Stripe Checkout", "Stripe Subscription & Webhooks", "Custom Multi-Currency Gateways"),
            ("Deployment Edge", "Vercel Hobby", "Vercel Pro CDN Edge", "AWS CloudFront + Global Edge")
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

print("REAL-WORLD PROJECT CASE STUDY SYSTEM DESIGN BLUEPRINTS DEPLOYED PERFECTLY!")
