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

    /* Vertical Node Diagram Styling */
    .vertical-diagram-card {
        padding: 28px 24px;
        border-radius: 20px;
        background: rgba(5, 10, 25, 0.9);
        border: 1px solid rgba(0, 210, 255, 0.2);
        box-shadow: 0 10px 40px rgba(0,0,0,0.5), inset 0 0 30px rgba(0, 210, 255, 0.03);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        position: relative;
    }
    .v-node {
        width: 100%;
        padding: 14px 20px;
        border-radius: 12px;
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(255,255,255,0.08);
        display: flex;
        align-items: center;
        gap: 16px;
        transition: all 0.3s ease;
    }
    .v-node:hover {
        border-color: var(--c-accent-cyan);
        background: rgba(0, 210, 255, 0.06);
        transform: scale(1.02);
    }
    .v-node-icon {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(0, 210, 255, 0.1);
        border: 1px solid var(--c-accent-cyan);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        flex-shrink: 0;
    }
    .v-arrow {
        width: 2px;
        height: 20px;
        background: linear-gradient(180deg, var(--c-accent-cyan), rgba(138, 35, 137, 0.8));
        position: relative;
        box-shadow: 0 0 8px var(--c-accent-cyan);
    }
    .v-arrow::after {
        content: '▼';
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 9px;
        color: #8a2387;
    }

    /* Backend Step Execution Tracker */
    .execution-tracker-box {
        margin-top: 32px;
        padding: 24px;
        border-radius: 16px;
        background: rgba(4, 8, 20, 0.85);
        border: 1px solid rgba(0, 210, 255, 0.25);
        box-shadow: 0 0 30px rgba(0, 210, 255, 0.08);
    }
    .tracker-step-item {
        display: flex;
        align-items: flex-start;
        gap: 16px;
        padding: 12px 16px;
        border-radius: 10px;
        margin-bottom: 8px;
        background: rgba(255,255,255,0.015);
        border: 1px solid rgba(255,255,255,0.03);
        transition: all 0.3s ease;
    }
    .tracker-step-item.active-step {
        background: rgba(0, 210, 255, 0.08);
        border-color: var(--c-accent-cyan);
        box-shadow: 0 0 20px rgba(0, 210, 255, 0.15);
    }
    .tracker-step-badge {
        padding: 4px 10px;
        border-radius: 20px;
        background: rgba(255,255,255,0.08);
        color: #aaa;
        font-family: monospace;
        font-size: 11px;
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

    /* Specs Matrix Table */
    .specs-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 32px;
        font-size: 14px;
    }
    .specs-table th, .specs-table td {
        padding: 16px 20px;
        text-align: left;
        border-bottom: 1px solid rgba(255,255,255,0.06);
    }
    .specs-table th {
        background: rgba(255,255,255,0.03);
        color: #fff;
        font-weight: 700;
        text-transform: uppercase;
        font-size: 12px;
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

<!-- Common Hero Section -->
<section class="reveal" style="padding: 140px 0 50px 0; background: radial-gradient(circle at top center, rgba(0, 210, 255, 0.06) 0%, transparent 70%); text-align: center; border-bottom: 1px solid rgba(255,255,255,0.05);">
    <div class="container">
        <span class="overline highlight">Buildlyst Engineering Capabilities</span>
        <h1 class="text-gradient-hero" style="font-size: clamp(36px, 5vw, 56px); line-height: 1.1; margin-bottom: 16px;">
            Enterprise Architecture & Services
        </h1>
        <p class="subtext mx-auto" style="font-size: 16px; max-width: 640px; margin-bottom: 0;">
            Select a specialized service category below to view technical specifications, enterprise architecture, interactive playground, and transparent pricing.
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

    # Vertical Nodes Diagram HTML (For Overview Right Side)
    v_nodes_html = ""
    for idx, (v_title, v_desc, v_icon) in enumerate(service["vertical_nodes"]):
        v_nodes_html += f'''
        <div class="v-node">
            <div class="v-node-icon">{v_icon}</div>
            <div>
                <div style="font-size: 15px; font-weight: 700; color: #fff;">{v_title}</div>
                <div style="font-size: 12px; color: var(--c-text-secondary);">{v_desc}</div>
            </div>
        </div>'''
        if idx < len(service["vertical_nodes"]) - 1:
            v_nodes_html += '\n        <div class="v-arrow"></div>'

    # Backend Step Tracker Items HTML
    tracker_items_html = ""
    for idx, (step_num, step_title, step_desc) in enumerate(service["backend_steps"]):
        active_cls = "active-step" if idx == 0 else ""
        tracker_items_html += f'''
        <div class="tracker-step-item {active_cls}" id="step-item-{idx}">
            <span class="tracker-step-badge">{step_num}</span>
            <div>
                <div style="font-size: 14px; font-weight: 700; color: #fff; margin-bottom: 2px;">{step_title}</div>
                <div style="font-size: 13px; color: var(--c-text-secondary); line-height: 1.4;">{step_desc}</div>
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

    <!-- 1. REDESIGNED 3-PART SERVICE OVERVIEW SPLIT LAYOUT WITH VERTICAL DIAGRAM -->
    <section class="reveal" style="padding: 80px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
        <div class="container">
            <div style="display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 56px; align-items: center;">
                
                <!-- LEFT SIDE (2 PARTS: UPPER HEADING + LOWER CONTENT) -->
                <div>
                    <!-- UPPER PART: HEADING & BADGES -->
                    <div style="margin-bottom: 24px;">
                        <span class="overline highlight">Service Detail & Overview</span>
                        <div style="display: flex; align-items: center; gap: 16px; margin-top: 12px;">
                            <span style="font-size: 48px;">{service["icon"]}</span>
                            <h2 class="text-gradient" style="font-size: clamp(32px, 4vw, 44px); font-weight: 800; margin: 0; line-height: 1.15;">
                                {service["title"]}
                            </h2>
                        </div>
                    </div>

                    <!-- LOWER PART: IN-DEPTH CONTENT & KEY PILLARS -->
                    <div>
                        <p style="color: var(--c-text-secondary); font-size: 17px; line-height: 1.7; margin-bottom: 28px;">
                            {service["about"]}
                        </p>
                        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                            <span style="padding: 6px 14px; border-radius: 20px; background: rgba(0, 210, 255, 0.08); border: 1px solid rgba(0, 210, 255, 0.2); color: #00d2ff; font-size: 12px; font-weight: 600;">⚡ Asynchronous Processing</span>
                            <span style="padding: 6px 14px; border-radius: 20px; background: rgba(138, 35, 137, 0.08); border: 1px solid rgba(138, 35, 137, 0.2); color: #c07bc5; font-size: 12px; font-weight: 600;">🛡️ SOC2 Security Blueprint</span>
                            <span style="padding: 6px 14px; border-radius: 20px; background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.1); color: #fff; font-size: 12px; font-weight: 600;">🧠 Stateful Context Store</span>
                        </div>
                    </div>
                </div>

                <!-- RIGHT SIDE: VERTICAL NODE DIAGRAM -->
                <div class="vertical-diagram-card">
                    <div style="font-family: var(--font-display); font-size: 11px; font-weight: 700; color: var(--c-accent-cyan); text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 8px; text-align: center; width: 100%;">
                        VERTICAL ARCHITECTURE FLOW
                    </div>
                    {v_nodes_html}
                </div>

            </div>
        </div>
    </section>

    <!-- 2. EXACT HOMEPAGE ENTERPRISE ARCHITECTURE + BACKEND EXECUTION EXPLANATION TRACKER -->
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
                <a href="/services/ai-agents" class="arch-tab-btn {{% if request.url.path == '/services/ai-agents' %}}active{{% endif %}}" data-target="flow-agents">AI Agents</a>
                <a href="/services/gen-ai" class="arch-tab-btn {{% if request.url.path == '/services/gen-ai' %}}active{{% endif %}}" data-target="flow-genai">Gen AI</a>
                <a href="/services/machine-learning" class="arch-tab-btn {{% if request.url.path == '/services/machine-learning' %}}active{{% endif %}}" data-target="flow-ml">Machine Learning</a>
                <a href="/services/data-engineering" class="arch-tab-btn {{% if request.url.path == '/services/data-engineering' %}}active{{% endif %}}" data-target="flow-data">Data Engineering</a>
                <a href="/services/web-development" class="arch-tab-btn {{% if request.url.path == '/services/web-development' %}}active{{% endif %}}" data-target="flow-web">Web Development</a>
            </div>

            <!-- Dynamic Pipeline Container (Exact Homepage Design) -->
            <div class="pipeline-container glass-panel glow-border p-lg" style="margin-top: 32px;">
                <div class="pipeline-flow active" id="{service['flow_id']}">
                    {nodes_html}
                </div>
            </div>

            <!-- NEW: DYNAMIC BACKEND EXECUTION TRACKER ("WHAT IS HAPPENING IN THE BACKEND?") -->
            <div class="execution-tracker-box">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 12px;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 18px;">⚙️</span>
                        <h4 style="margin: 0; font-size: 16px; color: #fff; font-weight: 700;">Backend Execution Breakdown</h4>
                    </div>
                    <span style="font-size: 11px; font-family: monospace; color: var(--c-accent-cyan); text-transform: uppercase; letter-spacing: 1px;">REAL-TIME SYNCHRONIZED EXECUTION</span>
                </div>
                {tracker_items_html}
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

    <!-- 4. Interactive Live Code Telemetry Simulator -->
    <section class="reveal" style="padding: 90px 0; border-bottom: 1px solid rgba(255,255,255,0.05); background: rgba(0,0,0,0.2);">
        <div class="container">
            <div class="section-header text-center" style="margin-bottom: 48px;">
                <span class="overline highlight">Developer Sandbox</span>
                <h2 class="section-heading text-gradient" style="font-size: 34px;">Live Execution Telemetry</h2>
                <p class="subtext text-center mx-auto">Inspect simulated runtime code snippets and terminal log streams for {service['title']}.</p>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px; align-items: stretch;">
                <div class="glass-panel" style="padding: 24px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.08); background: #080c14;">
                    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 12px; margin-bottom: 16px;">
                        <span style="color: #fff; font-family: monospace; font-size: 13px;">{service['code_file']}</span>
                        <span style="color: #00d2ff; font-family: monospace; font-size: 11px; font-weight: bold;">{service['code_lang']}</span>
                    </div>
                    <pre style="margin: 0; color: #a5d6ff; font-family: 'Fira Code', monospace; font-size: 13px; line-height: 1.6; white-space: pre-wrap;">{service['code_snippet']}</pre>
                </div>

                <div class="glass-panel" style="padding: 24px; border-radius: 16px; border: 1px solid rgba(0,210,255,0.2); background: #03060c; display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 12px; margin-bottom: 16px;">
                            <span style="color: #27c93f; font-family: monospace; font-size: 12px; font-weight: bold;">● TERMINAL LOG STREAM</span>
                            <span style="color: #aaa; font-family: monospace; font-size: 11px;">STATUS: ACTIVE</span>
                        </div>
                        <div style="font-family: monospace; font-size: 12px; line-height: 1.8; color: #d0d0d0;">
                            {service['terminal_logs']}
                        </div>
                    </div>
                    <div style="margin-top: 20px; padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.05); display: flex; justify-content: space-between; align-items: center; font-family: monospace; font-size: 11px; color: #888;">
                        <span>LATENCY: 12ms</span>
                        <span>SOC2 VERIFIED</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 5. 6 Core Capabilities Grid -->
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

    <!-- 6. Technical Specifications Comparison Matrix -->
    <section class="reveal" style="padding: 90px 0; border-bottom: 1px solid rgba(255,255,255,0.05); background: rgba(255,255,255,0.01);">
        <div class="container">
            <div class="section-header text-center" style="margin-bottom: 32px;">
                <span class="overline highlight">Comparison Matrix</span>
                <h2 class="section-heading text-gradient" style="font-size: 34px;">Technical Specifications</h2>
                <p class="subtext text-center mx-auto">Compare technical benchmarks across Launch, Build, and Scale engagement tiers.</p>
            </div>

            <div class="glass-panel" style="border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.06);">
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
    <section class="reveal" style="padding: 90px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
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

    <!-- 8. 3 Tier Pricing Section -->
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

# 5 Detailed Services Data with Vertical Nodes and Backend Execution Steps
services_data = [
    {
        "filename": "ai_agents.html",
        "title": "Autonomous AI Agents",
        "icon": "🤖",
        "flow_id": "flow-agents",
        "about": "We architect autonomous multi-agent systems that execute complex reasoning, run asynchronous workflows, and integrate directly into your enterprise tools and SQL databases with strict human-in-the-loop guardrails.",
        "image": "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "vertical_nodes": [
            ("Client Trigger / Prompt Ingress", "User sends natural language query or webhook payload", "👤"),
            ("Agent Task Planner & State Machine", "LangGraph decomposes prompt into multi-step execution DAG", "🧠"),
            ("Long-Term Vector State Store", "Pinecone/Postgres reads user history & context state", "🗄️"),
            ("Action Dispatch & Human Guardrail", "Agent dispatches API calls or pauses for approval", "⚡")
        ],
        "backend_steps": [
            ("STEP 1", "Prompt Ingress & Intent Parsing", "FastAPI receives query payload and initializes LLM semantic intent classifier."),
            ("STEP 2", "LangGraph State Machine Planning", "Orchestration engine decomposes task into specialized sub-agent subroutines."),
            ("STEP 3", "Autonomous Tool Function Execution", "Agents invoke REST APIs, CRM webhooks, and SQL read/write operations in parallel."),
            ("STEP 4", "State Vector Memory Synchronization", "Agent persists conversation state and retrieved knowledge into Pinecone vector storage."),
            ("STEP 5", "Human Guardrail Validation & Output", "Safety guardrail verifies response compliance before dispatching output to client interface.")
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
        "code_file": "agent_orchestrator.py",
        "code_lang": "PYTHON / LANGGRAPH",
        "code_snippet": '''from langgraph.graph import StateGraph, END
from buildlyst.agents import ResearchAgent, ActionAgent

# Initialize Multi-Agent Graph
workflow = StateGraph(AgentState)
workflow.add_node("planner", ResearchAgent.plan_task)
workflow.add_node("executor", ActionAgent.execute_tool)

# Connect Conditional Guardrails
workflow.add_edge("planner", "executor")
workflow.add_conditional_edges("executor", human_approval_check, {
    "approved": END,
    "rejected": "planner"
})
app = workflow.compile()''',
        "terminal_logs": '''<span style="color:#00d2ff">[INFO]</span> Initializing Multi-Agent State Machine...<br>
<span style="color:#27c93f">[SUCCESS]</span> Vector Memory (Pinecone) Connected.<br>
<span style="color:#ffbd2e">[WARN]</span> Human Approval Required for Action: 'Dispatch Email'<br>
<span style="color:#27c93f">[OK]</span> Human Approval Received (User #402)<br>
<span style="color:#00d2ff">[EXEC]</span> Action Executed in 142ms. Output written to Postgres DB.''',
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
        "about": "Deploy private, highly-secure Retrieval-Augmented Generation (RAG) architectures and custom LLMs. We connect cutting-edge language models directly to your proprietary enterprise data silos without exposing data to public servers.",
        "image": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "vertical_nodes": [
            ("Unstructured Data Silo Ingestion", "PDFs, Confluence, & SQL text chunking pipeline", "📄"),
            ("High-Dimensional Vector Embeddings", "text-embedding-3-large model processes chunks", "📉"),
            ("Pinecone / Weaviate Vector Store", "HNSW cosine similarity indexing & caching", "🗄️"),
            ("Grounded Generative LLM Response", "Llama 3 / GPT-4o synthesizes answer with citations", "💬")
        ],
        "backend_steps": [
            ("STEP 1", "Unstructured Document Chunking", "LlamaIndex parses incoming PDFs, DOCX, and Confluence pages into semantic text chunks."),
            ("STEP 2", "Vector Embedding Generation", "OpenAI / HuggingFace embedding models convert chunks into 3072-dimensional vector arrays."),
            ("STEP 3", "Pinecone Index Store & Cache", "Dense vectors indexed with HNSW parameters for sub-10ms similarity queries."),
            ("STEP 4", "BM25 + Dense Hybrid Retrieval", "Semantic search engine retrieves top 5 relevant document chunks with strict confidence scores."),
            ("STEP 5", "Grounded Response Generation", "LLM synthesizes exact contextual answer backed by clear page and document citations.")
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
        "code_file": "rag_pipeline.py",
        "code_lang": "PYTHON / LLAMAINDEX",
        "code_snippet": '''from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
from llama_index.vector_stores.pinecone import PineconeVectorStore

# Load Proprietary Enterprise Silo
documents = SimpleDirectoryReader("./silo_docs").load_data()
vector_store = PineconeVectorStore(index_name="enterprise-rag")

# Hybrid Re-Ranking Index Setup
index = VectorStoreIndex.from_documents(
    documents, vector_store=vector_store, similarity_top_k=5
)
query_engine = index.as_query_engine(streaming=True)''',
        "terminal_logs": '''<span style="color:#00d2ff">[RAG]</span> Chunking 1,450 Enterprise PDFs...<br>
<span style="color:#27c93f">[SUCCESS]</span> Embeddings Generated (text-embedding-3-large)<br>
<span style="color:#00d2ff">[HYBRID]</span> Executing BM25 + Dense Vector Re-ranking...<br>
<span style="color:#27c93f">[OK]</span> Top 5 Context Chunks Retrieved (Cosine Score: 0.942)<br>
<span style="color:#27c93f">[STREAM]</span> Streaming Grounded Answer to Client (Zero Hallucination)''',
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
        "about": "Advanced predictive modeling, computer vision, natural language processing, and real-time classification systems deployed at scale. We turn raw datasets into predictive engines that forecast trends and detect anomalies.",
        "image": "https://images.unsplash.com/photo-1518932945647-7a3c96943e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "vertical_nodes": [
            ("Telemetry & Streaming Data Ingest", "High-frequency logs, video streams, & sensor feeds", "📦"),
            ("Feature Store Preprocessing", "Data normalization, cleaning, & tensor formatting", "🧹"),
            ("PyTorch / TensorRT GPU Engine", "Neural network forward pass & GPU acceleration", "🖥️"),
            ("Real-Time Inference Output", "Fraud alerts, demand forecasts, & anomaly flags", "🎯")
        ],
        "backend_steps": [
            ("STEP 1", "High-Frequency Data Ingestion", "Ingestion pipeline captures financial transactions, IoT telemetry, and 60 FPS video streams."),
            ("STEP 2", "Feature Store Extraction & Normalization", "Feature engine imputes missing values and formats raw values into tensor batches."),
            ("STEP 3", "PyTorch Neural Forward Pass", "Deep neural network evaluates input tensor matrix against pre-trained weight parameters."),
            ("STEP 4", "Loss Evaluation & Drift Detection", "MLflow tracking server evaluates prediction confidence bounds and monitors data drift."),
            ("STEP 5", "TensorRT Low-Latency Inference", "NVIDIA TensorRT GPU engine dispatches prediction alert to API endpoint in <5ms.")
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
        "code_file": "pytorch_inference.py",
        "code_lang": "PYTHON / TENSORRT",
        "code_snippet": '''import torch
import tensorrt as trt

# Load NVIDIA TensorRT Optimized Model
engine_path = "models/vision_defect.engine"
with open(engine_path, "rb") as f, trt.Runtime(TRT_LOGGER) as runtime:
    engine = runtime.deserialize_cuda_engine(f.read())

# Run Real-time 60 FPS Inference
stream = torch.cuda.Stream()
output = model_inference(engine, input_frame_tensor, stream)
confidence_score = torch.sigmoid(output).item()''',
        "terminal_logs": '''<span style="color:#00d2ff">[CUDA]</span> NVIDIA TensorRT Context Loaded.<br>
<span style="color:#27c93f">[PERF]</span> Batch Size 32 Inferred in 4.2ms<br>
<span style="color:#27c93f">[SUCCESS]</span> Defect Detected at Frame #894 (Conf: 99.8%)<br>
<span style="color:#00d2ff">[MLFLOW]</span> Telemetry Metrics Streamed to Dashboard<br>
<span style="color:#27c93f">[OK]</span> Zero Model Drift Detected in 24-Hour Cycle''',
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
        "about": "Robust ETL pipelines, scalable cloud data warehousing, and interactive visualization dashboards. We untangle messy, distributed data architectures into clean, unified, and strategic assets for your entire organization.",
        "image": "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "vertical_nodes": [
            ("Heterogeneous Source Ingress", "APIs, SQL DBs, Kafka streams, & IoT logs", "🌐"),
            ("Apache Airflow & dbt DAG Core", "Distributed orchestration & ELT data transforms", "⚙️"),
            ("Snowflake / Redshift Warehouse", "Columnar enterprise data lakehouse storage", "🏢"),
            ("Real-Time BI & Executive Analytics", "Tableau, Looker, & ML Feature Store feed", "💡")
        ],
        "backend_steps": [
            ("STEP 1", "Heterogeneous Source Polling", "Airflow DAG triggers Fivetran and API connectors to pull raw SaaS and database logs."),
            ("STEP 2", "Staging Landing & Schema Extraction", "Raw payloads stored in Snowflake S3 landing bucket with automated schema validation."),
            ("STEP 3", "dbt Analytical Transformations", "dbt compiles and runs SQL data models to clean, deduplicate, and join table metrics."),
            ("STEP 4", "Automated Data Quality Audit", "dbt test framework executes null, unique, and foreign key integrity constraints."),
            ("STEP 5", "Materialized BI Dashboard Refresh", "Updated analytics data pushed to Snowflake reporting schemas and Looker BI dashboards.")
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
        "code_file": "airflow_dag.py",
        "code_lang": "PYTHON / APACHE AIRFLOW",
        "code_snippet": '''from airflow import DAG
from airflow.providers.snowflake.operators.snowflake import SnowflakeOperator
from datetime import datetime

with DAG('enterprise_etl_pipeline', schedule_interval='@hourly', start_date=datetime(2026, 1, 1)) as dag:
    
    extract_task = SnowflakeOperator(
        task_id='extract_raw_telemetry',
        sql='CALL SP_EXTRACT_S3_LANDING()'
    )
    dbt_transform = SnowflakeOperator(
        task_id='dbt_run_transformations',
        sql='CALL SP_DBT_RUN_ANALYTICS()'
    )
    extract_task >> dbt_transform''',
        "terminal_logs": '''<span style="color:#00d2ff">[AIRFLOW]</span> Executing DAG: enterprise_etl_pipeline...<br>
<span style="color:#27c93f">[SUCCESS]</span> 4.2 Million S3 Records Ingested into Landing Schema<br>
<span style="color:#00d2ff">[DBT]</span> Executing 24 Model Transformations...<br>
<span style="color:#27c93f">[PASS]</span> 100% dbt Data Quality Tests Passed (0 Nulls Found)<br>
<span style="color:#27c93f">[OK]</span> Snowflake Data Warehouse Updated. BI Dashboard Refreshed.''',
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
        "about": "High-performance web applications, stunning landing pages, and complex admin dashboards built with modern frameworks and deeply integrated AI backends. We build Silicon Valley-grade digital products.",
        "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "vertical_nodes": [
            ("Responsive Next.js Frontend UI", "React 19 SSR, TailwindCSS, & GSAP animations", "💻"),
            ("FastAPI Backend Microservices", "Async Python endpoints with CORS & Pydantic", "🚪"),
            ("PostgreSQL & Redis Cache Layer", "ACID transactional database & Redis caching", "☁️"),
            ("Vercel Edge Global CDN Delivery", "Sub-10ms global edge HTML & JSON rendering", "🌍")
        ],
        "backend_steps": [
            ("STEP 1", "Client Request & Edge Ingress", "Vercel Global Edge CDN receives client HTTP request and serves cached HTML/JS assets."),
            ("STEP 2", "JWT Auth & API Middleware", "FastAPI backend validates authorization headers and verifies user session token."),
            ("STEP 3", "Async Worker Execution", "Celery / Redis background workers execute async tasks and database queries."),
            ("STEP 4", "PostgreSQL Transaction & Cache Write", "Database executes ACID transactions while Redis updates warm cache keys."),
            ("STEP 5", "Sub-Second JSON Payload Response", "FastAPI dispatches compressed JSON response back to frontend in <10ms.")
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
        "code_file": "fastapi_server.py",
        "code_lang": "PYTHON / FASTAPI",
        "code_snippet": '''from fastapi import FastAPI, Depends, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from buildlyst.auth import verify_jwt_token

app = FastAPI(title="Buildlyst Enterprise API", version="2.0")

@app.post("/api/v1/process")
async def process_payload(payload: DataSchema, user=Depends(verify_jwt_token)):
    # Asynchronous Edge Processing
    task_id = await async_worker_pool.submit(payload)
    return {"status": "processing", "task_id": task_id}''',
        "terminal_logs": '''<span style="color:#00d2ff">[FASTAPI]</span> Uvicorn running on http://0.0.0.0:8000 (Gunicorn workers: 4)<br>
<span style="color:#27c93f">[SUCCESS]</span> JWT Authentication Middleware Verified<br>
<span style="color:#00d2ff">[PERF]</span> Server Response Time: 8.4ms<br>
<span style="color:#27c93f">[LIGHTHOUSE]</span> Performance: 99 // Accessibility: 100 // SEO: 100<br>
<span style="color:#27c93f">[OK]</span> Deployed to Vercel Global Edge CDN''',
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

print("SERVICE OVERVIEW SPLIT LAYOUT + VERTICAL DIAGRAM + BACKEND EXECUTION EXPLANATION TRACKER DEPLOYED PERFECTLY!")
