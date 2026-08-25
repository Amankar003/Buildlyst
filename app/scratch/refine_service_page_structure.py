import os

SERVICES_DIR = r"d:\End to End Projects\buildlyst\app\templates\services"
os.makedirs(SERVICES_DIR, exist_ok=True)

# 1. Update services_layout.html (Hero enlarged with genuine content, floating button removed)
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
        padding: 12px 24px;
        border-radius: 50px;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: var(--c-text-secondary);
        font-weight: 600;
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
        border-color: rgba(0, 210, 255, 0.4);
        transform: translateY(-2px);
    }
    .service-nav-btn.active {
        background: rgba(0, 210, 255, 0.14);
        border-color: var(--c-accent-cyan);
        color: #fff;
        box-shadow: 0 0 25px rgba(0, 210, 255, 0.3);
    }
    .service-nav-container {
        display: flex;
        gap: 12px;
        justify-content: center;
        flex-wrap: wrap;
        margin-top: 28px;
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

    /* 3D ISOMETRIC ANIMATED ARCHITECTURE STAGE STYLING */
    .arch-3d-wrapper {
        position: relative;
        width: 100%;
        min-height: 480px;
        perspective: 1200px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        border-radius: 24px;
        background: radial-gradient(circle at center, rgba(10, 25, 50, 0.9) 0%, rgba(2, 6, 16, 0.98) 100%);
        border: 1px solid rgba(0, 210, 255, 0.25);
        box-shadow: 0 20px 60px rgba(0,0,0,0.8), inset 0 0 40px rgba(0, 210, 255, 0.05);
    }

    .arch-3d-stage {
        width: 380px;
        height: 380px;
        position: relative;
        transform-style: preserve-3d;
        transform: rotateX(50deg) rotateZ(-30deg);
        transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    .arch-3d-wrapper.flat-view .arch-3d-stage {
        transform: rotateX(0deg) rotateZ(0deg);
    }

    .arch-3d-floor {
        position: absolute;
        width: 100%;
        height: 100%;
        background-image: 
            linear-gradient(rgba(0, 210, 255, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 210, 255, 0.15) 1px, transparent 1px);
        background-size: 38px 38px;
        border-radius: 20px;
        border: 2px solid rgba(0, 210, 255, 0.4);
        box-shadow: 0 0 30px rgba(0, 210, 255, 0.2);
        transform: translateZ(0px);
    }

    .node-3d-card {
        position: absolute;
        width: 160px;
        padding: 12px 14px;
        border-radius: 14px;
        background: rgba(8, 16, 36, 0.92);
        border: 1.5px solid rgba(0, 210, 255, 0.4);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.7), 0 0 15px rgba(0, 210, 255, 0.2);
        transform-style: preserve-3d;
        transition: all 0.4s ease;
        cursor: pointer;
    }
    .node-3d-card:hover, .node-3d-card.active-3d {
        border-color: #00d2ff;
        background: rgba(0, 210, 255, 0.18);
        box-shadow: 0 0 35px rgba(0, 210, 255, 0.5), 0 15px 30px rgba(0,0,0,0.8);
        transform: translateZ(40px) scale(1.08);
    }
    .node-3d-card.n3d-1 { top: 20px; left: 20px; transform: translateZ(30px); }
    .node-3d-card.n3d-2 { top: 20px; right: 20px; transform: translateZ(60px); }
    .node-3d-card.n3d-3 { bottom: 20px; left: 20px; transform: translateZ(90px); }
    .node-3d-card.n3d-4 { bottom: 20px; right: 20px; transform: translateZ(120px); }

    .laser-beam-3d {
        position: absolute;
        width: 2px;
        height: 120px;
        background: linear-gradient(180deg, var(--c-accent-cyan), #8A2387, transparent);
        box-shadow: 0 0 10px var(--c-accent-cyan);
        transform-style: preserve-3d;
        animation: beamPulse 2.5s infinite ease-in-out;
    }
    @keyframes beamPulse {
        0% { opacity: 0.2; height: 40px; }
        50% { opacity: 1; height: 140px; }
        100% { opacity: 0.2; height: 40px; }
    }

    /* FAQ Accordion Styling */
    .faq-accordion-item {
        border-radius: 14px;
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.06);
        margin-bottom: 12px;
        overflow: hidden;
        transition: all 0.3s ease;
    }
    .faq-accordion-header {
        padding: 18px 24px;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: 700;
        font-size: 15px;
        color: #fff;
    }
    .faq-accordion-header:hover {
        background: rgba(0, 210, 255, 0.05);
        color: var(--c-accent-cyan);
    }
    .faq-accordion-body {
        padding: 0 24px 18px 24px;
        color: var(--c-text-secondary);
        font-size: 14px;
        line-height: 1.6;
        display: none;
    }
    .faq-accordion-item.active .faq-accordion-body {
        display: block;
    }
    .faq-accordion-item.active {
        border-color: rgba(0, 210, 255, 0.3);
        background: rgba(0, 210, 255, 0.03);
    }

    /* 3 Pricing Cards Grid */
    .pricing-grid-3 {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 24px;
        align-items: stretch;
        margin-top: 36px;
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

<!-- ENLARGED HERO SECTION WITH GENUINE ENTERPRISE CONTENT -->
<section class="reveal" style="padding: 130px 0 50px 0; background: radial-gradient(circle at top center, rgba(0, 210, 255, 0.08) 0%, transparent 70%); text-align: center; border-bottom: 1px solid rgba(255,255,255,0.05);">
    <div class="container" style="max-width: 900px;">
        <span class="overline highlight" style="font-size: 12px; letter-spacing: 2px;">Buildlyst Engineering Capabilities</span>
        
        <h1 class="text-gradient-hero" style="font-size: clamp(34px, 4.5vw, 54px); line-height: 1.12; margin: 12px 0 16px 0; font-weight: 800;">
            Silicon Valley-Grade Enterprise Architectures & Production Services
        </h1>
        
        <p class="subtext mx-auto" style="font-size: 16px; max-width: 720px; line-height: 1.65; color: var(--c-text-secondary); margin-bottom: 24px;">
            We don't build generic prototypes. Buildlyst engineers production-ready AI agents, private LLM RAG pipelines, sub-5ms machine learning models, and high-scale cloud data lakehouses — delivered with 100% IP ownership and SOC2 security verification.
        </p>

        <!-- Genuine Trust Badges Bar -->
        <div style="display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; margin-bottom: 28px;">
            <span style="padding: 6px 14px; border-radius: 20px; background: rgba(0, 210, 255, 0.08); border: 1px solid rgba(0, 210, 255, 0.25); color: #00d2ff; font-size: 12px; font-weight: 600;">🔒 100% IP Source Code Ownership</span>
            <span style="padding: 6px 14px; border-radius: 20px; background: rgba(138, 35, 137, 0.08); border: 1px solid rgba(138, 35, 137, 0.25); color: #c07bc5; font-size: 12px; font-weight: 600;">🛡️ SOC2 Compliant Security</span>
            <span style="padding: 6px 14px; border-radius: 20px; background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.1); color: #fff; font-size: 12px; font-weight: 600;">⚡ &lt; 14-Day Delivery SLA</span>
        </div>
        
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

    # Project Case Study Blueprint Nodes HTML (For Overview Right Side)
    blueprint_nodes = service.get("blueprint_nodes", [])
    bp_nodes_html = ""
    for idx, (bp_stage, bp_tech, bp_desc, bp_icon) in enumerate(blueprint_nodes):
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
        if idx < len(blueprint_nodes) - 1:
            bp_nodes_html += '\n        <div class="blueprint-connector"></div>'

    # 3D Node Cards HTML (For 3D Stage)
    cto_nodes = service.get("cto_architecture_nodes", [])
    n3d_classes = ["n3d-1", "n3d-2", "n3d-3", "n3d-4"]
    nodes_3d_html = ""
    for idx, node in enumerate(cto_nodes[:4]):
        cls_3d = n3d_classes[idx]
        active_cls = "active-3d" if idx == 0 else ""
        nodes_3d_html += f'''
        <div class="node-3d-card {cls_3d} {active_cls}" id="node3d-{idx}" onclick="select3dNode({idx})">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                <span style="font-size: 18px;">{node["icon"]}</span>
                <span style="font-size: 11px; font-weight: bold; color: #fff;">{node["name"]}</span>
            </div>
            <div style="font-size: 9px; font-family: monospace; color: var(--c-accent-cyan);">{node["tech"]}</div>
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

    # FAQ Accordion HTML
    faqs = service.get("faqs", [])
    faqs_html = ""
    for idx, (question, answer) in enumerate(faqs):
        faqs_html += f'''
        <div class="faq-accordion-item" onclick="toggleFaq(this)">
            <div class="faq-accordion-header">
                <span>{question}</span>
                <span style="color: var(--c-accent-cyan); font-size: 18px;">+</span>
            </div>
            <div class="faq-accordion-body">
                {answer}
            </div>
        </div>'''

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

    <!-- 2. What We Build (Deliverables) -->
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

    <!-- 3. DYNAMIC LIVE EXECUTION TELEMETRY SIMULATOR -->
    <section class="reveal" style="padding: 70px 0; border-bottom: 1px solid rgba(255,255,255,0.05); background: rgba(0,0,0,0.25);">
        <div class="container">
            <div class="section-header text-center" style="margin-bottom: 28px;">
                <span class="overline highlight" style="font-size: 11px;">Developer Sandbox</span>
                <h2 class="section-heading text-gradient" style="font-size: 30px;">Live Execution Telemetry</h2>
                <p class="subtext text-center mx-auto" style="font-size: 14px;">Real-time code inspection, live log streaming, and dynamic metric counters for {service['title']}.</p>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: stretch;">
                
                <!-- CODE VIEW PORTAL -->
                <div class="glass-panel" style="padding: 20px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.08); background: #070b14; display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 10px; margin-bottom: 14px;">
                            <span style="color: #fff; font-family: monospace; font-size: 12px; font-weight: bold;">{service['code_file']}</span>
                            <span style="color: #00d2ff; font-family: monospace; font-size: 10px; font-weight: bold;">{service['code_lang']}</span>
                        </div>
                        <pre style="margin: 0; color: #a5d6ff; font-family: 'Fira Code', monospace; font-size: 12px; line-height: 1.5; white-space: pre-wrap; max-height: 240px; overflow-y: auto;">{service['code_snippet']}</pre>
                    </div>
                    <div style="margin-top: 14px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.06); display: flex; gap: 10px;">
                        <button onclick="triggerDynamicRun()" class="btn glass-btn" style="padding: 6px 14px; font-size: 12px; border-radius: 6px;">▶ Run Simulation</button>
                        <button onclick="clearTelemetryTerminal()" class="btn glass-btn" style="padding: 6px 14px; font-size: 12px; border-radius: 6px; color: #aaa;">Clear Logs</button>
                    </div>
                </div>

                <!-- DYNAMIC REAL-TIME TERMINAL STREAM -->
                <div class="glass-panel" style="padding: 20px; border-radius: 16px; border: 1px solid rgba(0,210,255,0.25); background: #03060c; display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 10px; margin-bottom: 14px;">
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #27c93f; box-shadow: 0 0 8px #27c93f;"></span>
                                <span style="color: #27c93f; font-family: monospace; font-size: 11px; font-weight: bold;">DYNAMIC TERMINAL LOG STREAM</span>
                            </div>
                            <span style="color: #00d2ff; font-family: monospace; font-size: 10px;" id="telemetry-status">STREAMING ACTIVE</span>
                        </div>
                        
                        <!-- SCROLLING REAL-TIME LOG CONTAINER -->
                        <div id="dynamic-log-stream" style="font-family: monospace; font-size: 11px; line-height: 1.7; color: #d0d0d0; height: 210px; overflow-y: auto; padding-right: 6px;">
                            <div style="color:#00d2ff;">[SYSTEM] Initializing live execution telemetry stream...</div>
                            <div style="color:#27c93f;">[READY] Connected to {service['title']} kernel node.</div>
                        </div>
                    </div>

                    <!-- REAL-TIME FLUCTUATING METRICS BAR -->
                    <div style="margin-top: 14px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.06); display: flex; justify-content: space-between; align-items: center; font-family: monospace; font-size: 10px; color: #888;">
                        <span>LATENCY: <strong id="live-latency-val" style="color: #00d2ff;">8.4ms</strong></span>
                        <span>MEMORY: <strong id="live-mem-val" style="color: #27c93f;">42.1 MB</strong></span>
                        <span>THROUGHPUT: <strong id="live-tps-val" style="color: #fff;">4,200 req/s</strong></span>
                    </div>
                </div>

            </div>
        </div>
    </section>

    <!-- 4. 3D GLASSMORPHIC ISOMETRIC ANIMATED SYSTEM DESIGN DIAGRAM -->
    <section class="reveal" style="padding: 80px 0; border-bottom: 1px solid rgba(255,255,255,0.05); background: radial-gradient(circle at center, rgba(0, 210, 255, 0.05) 0%, transparent 80%);">
        <div class="container">
            <div class="section-header text-center" style="margin-bottom: 24px;">
                <span class="overline highlight" style="font-size: 11px;">Interactive Blueprint</span>
                <h2 class="section-heading text-gradient" style="font-size: 32px;">3D System Architecture Model</h2>
                <p class="subtext text-center mx-auto" style="font-size: 14.5px; max-width: 640px;">
                    An interactive 3D blueprint built for both executive CTOs and business leaders. Click any floating 3D microservice node to inspect its real-world function and technical specs.
                </p>
                <div style="margin-top: 12px; display: flex; gap: 10px; justify-content: center;">
                    <button onclick="toggle3DViewMode()" id="btn-toggle-3d" class="btn glass-btn" style="padding: 6px 16px; font-size: 12px; border-radius: 30px;">🌐 Toggle 3D Isometric / 2D View</button>
                </div>
            </div>

            <!-- 3D GRID LAYOUT CONTAINER -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 36px; align-items: center; margin-top: 30px;">
                
                <!-- LEFT SIDE: 3D ISOMETRIC ANIMATED STAGE -->
                <div class="arch-3d-wrapper" id="arch-3d-wrapper">
                    
                    <div class="arch-3d-stage">
                        <!-- 3D Grid Floor -->
                        <div class="arch-3d-floor"></div>

                        <!-- 3D Laser Pulsing Lines -->
                        <div class="laser-beam-3d" style="top: 40px; left: 100px;"></div>
                        <div class="laser-beam-3d" style="bottom: 40px; right: 100px;"></div>

                        <!-- 4 Floating 3D Node Cards -->
                        {nodes_3d_html}
                    </div>

                </div>

                <!-- RIGHT SIDE: DUAL (PLAIN ENGLISH + TECH SPECS) INSPECTION PANEL -->
                <div class="glass-panel" id="cto-inspector-panel" style="padding: 30px; border-radius: 20px; border: 1px solid rgba(0,210,255,0.3); background: rgba(4, 8, 20, 0.95); box-shadow: 0 0 35px rgba(0, 210, 255, 0.12);">
                    
                    <!-- Header -->
                    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 14px; margin-bottom: 18px;">
                        <div>
                            <span style="font-size: 10px; font-family: monospace; color: var(--c-accent-cyan); text-transform: uppercase; letter-spacing: 1px;">SELECTED 3D NODE</span>
                            <h3 id="cto-spec-title" style="margin: 4px 0 0 0; color: #fff; font-size: 20px; font-weight: 800;">
                                {cto_nodes[0]['name'] if cto_nodes else 'Ingress Proxy Gateway'}
                            </h3>
                        </div>
                        <span id="cto-spec-icon" style="font-size: 36px;">{cto_nodes[0]['icon'] if cto_nodes else '🚪'}</span>
                    </div>

                    <!-- Non-Tech Plain English Explanation Card -->
                    <div style="padding: 14px 16px; border-radius: 12px; background: rgba(0, 210, 255, 0.06); border: 1px solid rgba(0, 210, 255, 0.2); margin-bottom: 18px;">
                        <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
                            <span style="font-size: 14px;">🌟</span>
                            <span style="font-size: 11px; font-weight: bold; color: #00d2ff; text-transform: uppercase; letter-spacing: 1px;">IN PLAIN ENGLISH (FOR BUSINESS)</span>
                        </div>
                        <p id="cto-spec-plain" style="color: #e0e0e0; font-size: 13px; line-height: 1.5; margin: 0;">
                            {cto_nodes[0].get('plain', 'Captures all user requests instantly, ensuring your app stays 100% fast even during huge traffic spikes.')}
                        </p>
                    </div>

                    <!-- Tech Specs Grid for Engineers & CTOs -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 18px;">
                        <div style="padding: 12px; border-radius: 10px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05);">
                            <span style="font-size: 10px; color: #888; display: block; font-weight: 600;">TECH STACK</span>
                            <span id="cto-spec-tech" style="font-size: 13px; color: #00d2ff; font-weight: bold;">{cto_nodes[0]['tech'] if cto_nodes else 'FastAPI / TLS'}</span>
                        </div>
                        <div style="padding: 12px; border-radius: 10px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05);">
                            <span style="font-size: 10px; color: #888; display: block; font-weight: 600;">LATENCY BUDGET</span>
                            <span id="cto-spec-latency" style="font-size: 13px; color: #27c93f; font-weight: bold;">{cto_nodes[0]['latency'] if cto_nodes else '< 2ms'}</span>
                        </div>
                    </div>

                    <!-- HA & Security Badge -->
                    <div style="padding: 12px; border-radius: 10px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05);">
                        <span style="font-size: 10px; font-family: monospace; color: var(--c-accent-cyan); display: block; font-weight: bold; margin-bottom: 2px;">REDUNDANCY & FAILOVER</span>
                        <span id="cto-spec-ha" style="font-size: 12px; color: #ccc;">{cto_nodes[0]['ha'] if cto_nodes else 'Multi-Region Load Balanced with Automatic Failover'}</span>
                    </div>

                </div>

            </div>
        </div>
    </section>

    <!-- 5. TAILORED 3 TIER PRICING SECTION (MOVED DIRECTLY AFTER INTERACTIVE BLUEPRINT) -->
    <section class="reveal" style="padding: 80px 0; border-bottom: 1px solid rgba(255,255,255,0.05); background: rgba(0, 210, 255, 0.015);">
        <div class="container">
            <div class="section-header text-center">
                <span class="overline highlight" style="font-size: 11px;">Transparent Investment</span>
                <h2 class="section-heading text-gradient" style="font-size: 32px;">Tailored Pricing Tiers</h2>
                <p class="subtext text-center mx-auto" style="font-size: 14.5px; max-width: 600px;">Select the engagement level that fits your business scale for {service['title']}.</p>
            </div>
            
            {pricing_grid_html}
            
        </div>
    </section>

    <!-- 6. REAL-WORLD CASE STUDY STORY SPOTLIGHT (PROBLEM -> SOLUTION -> MEASURABLE IMPACT) -->
    <section class="reveal" style="padding: 80px 0; border-bottom: 1px solid rgba(255,255,255,0.05); background: rgba(0,0,0,0.15);">
        <div class="container">
            <div style="display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 40px; align-items: center;">
                <div>
                    <span class="overline highlight" style="font-size: 11px;">Client Story Spotlight</span>
                    <h2 class="section-heading text-gradient" style="font-size: 32px; margin-bottom: 16px;">
                        {service["spotlight"]["client"]}
                    </h2>
                    <p style="color: var(--c-text-secondary); font-size: 15px; line-height: 1.6; margin-bottom: 20px;">
                        {service["spotlight"]["story"]}
                    </p>
                    <div style="display: flex; gap: 12px;">
                        <a href="/#contact" class="btn glow-border-btn" style="padding: 10px 20px; font-size: 13px;">Build Similar Blueprint</a>
                    </div>
                </div>

                <div class="glass-panel" style="padding: 30px; border-radius: 20px; border: 1px solid rgba(0,210,255,0.2); background: rgba(5,10,22,0.9);">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
                        <div style="padding: 16px; border-radius: 14px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05);">
                            <span style="font-size: 11px; color: #aaa; text-transform: uppercase; font-weight: 700;">BEFORE BUILDLYST</span>
                            <div style="color: #ff5252; font-size: 14px; font-weight: bold; margin-top: 6px;">{service["spotlight"]["before"]}</div>
                        </div>
                        <div style="padding: 16px; border-radius: 14px; background: rgba(0,210,255,0.06); border: 1px solid rgba(0,210,255,0.2);">
                            <span style="font-size: 11px; color: var(--c-accent-cyan); text-transform: uppercase; font-weight: 700;">AFTER DEPLOYMENT</span>
                            <div style="color: #27c93f; font-size: 14px; font-weight: bold; margin-top: 6px;">{service["spotlight"]["after"]}</div>
                        </div>
                    </div>

                    <div style="padding: 16px; border-radius: 14px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05);">
                        <span style="font-size: 11px; color: #888; font-weight: 700; text-transform: uppercase;">KEY MEASURABLE OUTCOME</span>
                        <div style="font-size: 18px; font-weight: 800; color: #fff; margin-top: 4px;">{service["spotlight"]["result"]}</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 7. 6 Core Capabilities Grid -->
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

    <!-- 8. Technical Specifications Comparison Matrix -->
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

    <!-- 9. SERVICE OBJECTIONS FAQ ACCORDION -->
    <section class="reveal" style="padding: 80px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
        <div class="container" style="max-width: 800px;">
            <div class="section-header text-center" style="margin-bottom: 36px;">
                <span class="overline highlight" style="font-size: 11px;">Got Questions?</span>
                <h2 class="section-heading text-gradient" style="font-size: 32px;">Frequently Asked Questions</h2>
                <p class="subtext text-center mx-auto" style="font-size: 14px;">Clear answers regarding deployment timelines, code IP ownership, and data privacy.</p>
            </div>

            {faqs_html}
        </div>
    </section>

    <!-- 10. Business Transformations (ROI) -->
    <section class="reveal" style="padding: 70px 0 100px 0;">
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

</div>

<!-- DYNAMIC SCRIPTS -->
<script>
// FAQ Accordion Toggle Script
function toggleFaq(item) {{
    const isActive = item.classList.contains('active');
    document.querySelectorAll('.faq-accordion-item').forEach(el => el.classList.remove('active'));
    if (!isActive) {{
        item.classList.add('active');
    }}
}}

// 3D Architecture Data Store
const ctoNodesData = {service.get("cto_nodes_json", "[]")};

function select3dNode(index) {{
    if (!ctoNodesData || !ctoNodesData[index]) return;
    const node = ctoNodesData[index];

    document.querySelectorAll('.node-3d-card').forEach(n => n.classList.remove('active-3d'));
    const selectedEl = document.getElementById('node3d-' + index);
    if (selectedEl) selectedEl.classList.add('active-3d');

    document.getElementById('cto-spec-title').innerText = node.name;
    document.getElementById('cto-spec-icon').innerText = node.icon;
    document.getElementById('cto-spec-tech').innerText = node.tech;
    document.getElementById('cto-spec-latency').innerText = node.latency;
    document.getElementById('cto-spec-plain').innerText = node.plain || node.desc;
    document.getElementById('cto-spec-ha').innerText = node.ha;
}}

function toggle3DViewMode() {{
    const wrapper = document.getElementById('arch-3d-wrapper');
    if (wrapper) {{
        wrapper.classList.toggle('flat-view');
    }}
}}

// Dynamic Telemetry Streamer Script
let telemetryInterval = null;
const sampleLogMessages = [
    "[INFO] Executing memory vector retrieval step...",
    "[PERF] Cache query resolved in 0.4ms.",
    "[SEC] TLS 1.3 handshake verified with client endpoint.",
    "[WORKER] Sub-thread #14 finished execution without error.",
    "[METRIC] CPU load stable @ 4.2% across 8 worker cores.",
    "[AUDIT] Event log written to SOC2 compliance vault."
];

function appendDynamicLog() {{
    const stream = document.getElementById('dynamic-log-stream');
    if (!stream) return;

    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0');
    const msg = sampleLogMessages[Math.floor(Math.random() * sampleLogMessages.length)];

    const div = document.createElement('div');
    div.innerHTML = `<span style="color:#888;">[${{timeStr}}]</span> ${{msg}}`;
    stream.appendChild(div);

    while (stream.children.length > 20) {{
        stream.removeChild(stream.firstChild);
    }}
    stream.scrollTop = stream.scrollHeight;

    const lat = (6 + Math.random() * 4).toFixed(1);
    const mem = (40 + Math.random() * 5).toFixed(1);
    const tps = Math.floor(4000 + Math.random() * 500);

    const elLat = document.getElementById('live-latency-val');
    const elMem = document.getElementById('live-mem-val');
    const elTps = document.getElementById('live-tps-val');

    if (elLat) elLat.innerText = lat + 'ms';
    if (elMem) elMem.innerText = mem + ' MB';
    if (elTps) elTps.innerText = tps.toLocaleString() + ' req/s';
}}

function triggerDynamicRun() {{
    const stream = document.getElementById('dynamic-log-stream');
    if (stream) {{
        const div = document.createElement('div');
        div.style.color = '#00d2ff';
        div.style.fontWeight = 'bold';
        div.innerHTML = `>>> SIMULATION RUN TRIGGERED AT ${{new Date().toLocaleTimeString()}} <<<`;
        stream.appendChild(div);
        stream.scrollTop = stream.scrollHeight;
    }}
    for (let i = 0; i < 3; i++) {{
        setTimeout(appendDynamicLog, i * 250);
    }}
}}

function clearTelemetryTerminal() {{
    const stream = document.getElementById('dynamic-log-stream');
    if (stream) {{
        stream.innerHTML = '<div style="color:#aaa;">[SYSTEM] Terminal logs cleared. Ready for new stream...</div>';
    }}
}}

if (document.readyState === 'loading') {{
    document.addEventListener('DOMContentLoaded', function() {{
        telemetryInterval = setInterval(appendDynamicLog, 1200);
    }});
}} else {{
    telemetryInterval = setInterval(appendDynamicLog, 1200);
}}
</script>
{{% endblock %}}
"""
    return html

# 5 Detailed Services Data with CASE STUDY SPOTLIGHT + OBJECTIONS FAQS
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
        "cto_nodes_json": '''[
            {"name": "FastAPI Ingress Gateway", "tech": "FastAPI / NGINX", "icon": "🚪", "latency": "< 2ms", "plain": "Captures all incoming customer messages instantly and prevents crashes even when thousands of users text at once.", "desc": "Intercepts incoming Webhooks, verifies TLS certificates, and dispatches requests to Redis async queue.", "ha": "Multi-AZ Auto-scaling (N+1 Redundancy)"},
            {"name": "LangGraph Agent Brain", "tech": "LangGraph / Python", "icon": "🧠", "latency": "< 120ms", "plain": "The intelligent brain that reads customer requirements and delegates work to AI specialized worker bots.", "desc": "Executes stateful multi-agent DAG task graph. Evaluates agent prompts and coordinates parallel agent steps.", "ha": "Stateless Container Pool with Redis Checkpoints"},
            {"name": "Pinecone Vector Memory", "tech": "Pinecone HNSW", "icon": "🗄️", "latency": "< 8ms", "plain": "Super-fast memory store that searches through 10,000+ properties in milliseconds to find perfect buyer matches.", "desc": "Stores 3072-dimensional vector embeddings for property listings and past conversation memory state.", "ha": "Distributed Replica Sharding (99.99% Uptime)"},
            {"name": "Action Dispatch Engine", "tech": "Twilio / Stripe API", "icon": "⚡", "latency": "< 45ms", "plain": "Automatically books property viewings on Google Calendar and sends WhatsApp property cards to buyers.", "desc": "Executes human-in-the-loop approved API webhooks, updates CRM tables, and sends WhatsApp messages.", "ha": "Circuit Breaker Pattern with Retry Queue"}
        ]''',
        "cto_architecture_nodes": [
            {"name": "FastAPI Ingress Gateway", "tech": "FastAPI / NGINX", "icon": "🚪", "latency": "< 2ms", "plain": "Captures all incoming customer messages instantly and prevents crashes even when thousands of users text at once.", "desc": "Intercepts incoming Webhooks, verifies TLS certificates, and dispatches requests to Redis async queue.", "ha": "Multi-AZ Auto-scaling (N+1 Redundancy)"},
            {"name": "LangGraph Agent Brain", "tech": "LangGraph / Python", "icon": "🧠", "latency": "< 120ms", "plain": "The intelligent brain that reads customer requirements and delegates work to AI specialized worker bots.", "desc": "Executes stateful multi-agent DAG task graph. Evaluates agent prompts and coordinates parallel agent steps.", "ha": "Stateless Container Pool with Redis Checkpoints"},
            {"name": "Pinecone Vector Memory", "tech": "Pinecone HNSW", "icon": "🗄️", "latency": "< 8ms", "plain": "Super-fast memory store that searches through 10,000+ properties in milliseconds to find perfect buyer matches.", "desc": "Stores 3072-dimensional vector embeddings for property listings and past conversation memory state.", "ha": "Distributed Replica Sharding (99.99% Uptime)"},
            {"name": "Action Dispatch Engine", "tech": "Twilio / Stripe API", "icon": "⚡", "latency": "< 45ms", "plain": "Automatically books property viewings on Google Calendar and sends WhatsApp property cards to buyers.", "desc": "Executes human-in-the-loop approved API webhooks, updates CRM tables, and sends WhatsApp messages.", "ha": "Circuit Breaker Pattern with Retry Queue"}
        ],
        "spotlight": {
            "client": "Shivay Realty Lead Automation",
            "story": "Shivay Realty was losing high-value buyers due to 4+ hour delays in manually qualifying incoming WhatsApp and web leads. Buildlyst deployed a multi-agent LangGraph swarm that triages incoming lead criteria, searches 10,000+ property listings in Pinecone, and dispatches automated calendar bookings in under 12 seconds.",
            "before": "4+ Hours Average Lead Response Delay",
            "after": "12 Seconds Instant Qualification & Booking",
            "result": "3.5x Increase in Qualified Site Visit Conversions"
        },
        "faqs": [
            ("Who owns the intellectual property (IP) and code?", "You own 100% of the IP, source code, and custom agent weights. We deliver clean, commented codebases directly to your GitHub repository."),
            ("Can AI Agents perform unauthorized or expensive API actions?", "No. We implement strict Human-in-the-Loop (HITL) guardrails. Any action exceeding predefined monetary or security thresholds pauses for human approval."),
            ("Can these agents connect to our existing internal SQL database and CRM?", "Yes. We build custom FastAPI REST connectors for PostgreSQL, MySQL, Salesforce, HubSpot, and custom REST webhooks."),
            ("How long does an autonomous AI agent deployment take?", "Launch MVPs deploy in 7-10 days. Complex multi-agent swarms with custom memory layers deploy in 2-3 weeks.")
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
        "cto_nodes_json": '''[
            {"name": "Doc Ingestion Engine", "tech": "LlamaIndex / Unstructured", "icon": "📄", "latency": "< 15ms", "plain": "Reads through thousands of complex 500-page legal PDFs and splits them into clean readable sections.", "desc": "Extracts raw text, table structures, and metadata from enterprise PDFs, DOCX, and Confluence pages.", "ha": "Parallel Celery Worker Pipeline"},
            {"name": "Hybrid Embedding Index", "tech": "text-embedding-3 / BM25", "icon": "📉", "latency": "< 25ms", "plain": "Translates legal text into mathematical codes so the system can understand deep context and legal concepts.", "desc": "Generates 3072-dimensional vector arrays combined with sparse BM25 keyword indices for high-recall precision.", "ha": "Distributed Batch Embedding Queue"},
            {"name": "Cohere v3 Re-Ranker", "tech": "Cohere Rerank API", "icon": "🗄️", "latency": "< 10ms", "plain": "Filters out irrelevant clauses and isolates the top 5 exact contract sections needed to answer your query.", "desc": "Re-ranks top 25 retrieved vector chunks down to the top 5 most relevant legal clauses using cross-encoder scoring.", "ha": "Redundant Regional API Endpoints"},
            {"name": "Grounded Llama 3 LLM", "tech": "vLLM / Llama 3 70B", "icon": "💬", "latency": "< 250ms", "plain": "Writes clear compliance summaries with exact page number citations so legal teams can verify every word.", "desc": "Synthesizes compliance audit report with exact page-level citations and zero hallucination risk.", "ha": "Air-Gapped Private GPU Cluster"}
        ]''',
        "cto_architecture_nodes": [
            {"name": "Doc Ingestion Engine", "tech": "LlamaIndex / Unstructured", "icon": "📄", "latency": "< 15ms", "plain": "Reads through thousands of complex 500-page legal PDFs and splits them into clean readable sections.", "desc": "Extracts raw text, table structures, and metadata from enterprise PDFs, DOCX, and Confluence pages.", "ha": "Parallel Celery Worker Pipeline"},
            {"name": "Hybrid Embedding Index", "tech": "text-embedding-3 / BM25", "icon": "📉", "latency": "< 25ms", "plain": "Translates legal text into mathematical codes so the system can understand deep context and legal concepts.", "desc": "Generates 3072-dimensional vector arrays combined with sparse BM25 keyword indices for high-recall precision.", "ha": "Distributed Batch Embedding Queue"},
            {"name": "Cohere v3 Re-Ranker", "tech": "Cohere Rerank API", "icon": "🗄️", "latency": "< 10ms", "plain": "Filters out irrelevant clauses and isolates the top 5 exact contract sections needed to answer your query.", "desc": "Re-ranks top 25 retrieved vector chunks down to the top 5 most relevant legal clauses using cross-encoder scoring.", "ha": "Redundant Regional API Endpoints"},
            {"name": "Grounded Llama 3 LLM", "tech": "vLLM / Llama 3 70B", "icon": "💬", "latency": "< 250ms", "plain": "Writes clear compliance summaries with exact page number citations so legal teams can verify every word.", "desc": "Synthesizes compliance audit report with exact page-level citations and zero hallucination risk.", "ha": "Air-Gapped Private GPU Cluster"}
        ],
        "spotlight": {
            "client": "Nexus Legal Contract Audit RAG",
            "story": "Nexus Legal needed to audit over 50,000 vendor agreements for regulatory compliance. Manual attorney reviews were taking 6 days per document. Buildlyst deployed a Hybrid RAG pipeline with Cohere Re-Ranking and fine-tuned Llama 3 that extracts risk clauses and generates audit reports in 45 seconds.",
            "before": "6 Days per Contract Audit",
            "after": "45 Seconds Automated RAG Audit Report",
            "result": "99.8% Accuracy with Zero Hallucination"
        },
        "faqs": [
            ("Is our sensitive company data sent to third-party public AI models?", "No. We build private RAG systems that can be hosted inside your own AWS/Azure VPC or air-gapped private servers so data never leaves your perimeter."),
            ("How do you guarantee the AI won't make up false facts (hallucinate)?", "We use strict Cohere semantic re-ranking and prompt constraint rules that enforce page-level citations. If context is not found in your PDFs, the AI returns an explicit 'not found' response."),
            ("Can this handle handwritten documents or complex table formats?", "Yes. We integrate Multimodal OCR engines (Unstructured / Azure Document Intelligence) that parse complex tables, charts, and scanned PDF forms."),
            ("Can we fine-tune open-source models like Llama 3 or Mistral?", "Yes. We quantize and fine-tune open-source 8B, 70B, or Mixtral models specifically on your industry syntax.")
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
        "cto_nodes_json": '''[
            {"name": "60 FPS RTSP Video Ingestion", "tech": "OpenCV / GStreamer", "icon": "📦", "latency": "< 1.2ms", "plain": "Captures 60 high-definition camera frames every second from factory assembly lines.", "desc": "Ingests 4K camera streams at 60 FPS directly into shared GPU memory buffers without CPU bottlenecks.", "ha": "Dual Redundant Camera Feeds"},
            {"name": "CUDA Tensor Normalizer", "tech": "PyTorch / CUDA C++", "icon": "🧹", "latency": "< 0.8ms", "plain": "Cleans and enhances image contrast on graphics chips so defects stand out clearly.", "desc": "Executes parallel pixel normalization, matrix cropping, and tensor batching directly on NVIDIA CUDA cores.", "ha": "Double-Buffered Frame Ring"},
            {"name": "NVIDIA TensorRT Neural Core", "tech": "TensorRT 10.0 / YOLOv8", "icon": "🖥️", "latency": "< 3.8ms", "plain": "AI computer vision engine that detects scratches, dents, or defects in 3.8 milliseconds.", "desc": "Runs FP16 quantized deep neural network inference to detect manufacturing defects in real-time.", "ha": "Dual NVIDIA RTX 4090 GPU Cluster"},
            {"name": "Hardware PLC Ejection Signal", "tech": "Industrial Modbus / REST", "icon": "🎯", "latency": "< 1.0ms", "plain": "Fires a physical robot arm to push defective items off the conveyor belt immediately.", "desc": "Sends high-speed hardware pulse signal to conveyor pneumatic arm to eject defective products.", "ha": "Fail-Safe Hardware Circuit"}
        ]''',
        "cto_architecture_nodes": [
            {"name": "60 FPS RTSP Video Ingestion", "tech": "OpenCV / GStreamer", "icon": "📦", "latency": "< 1.2ms", "plain": "Captures 60 high-definition camera frames every second from factory assembly lines.", "desc": "Ingests 4K camera streams at 60 FPS directly into shared GPU memory buffers without CPU bottlenecks.", "ha": "Dual Redundant Camera Feeds"},
            {"name": "CUDA Tensor Normalizer", "tech": "PyTorch / CUDA C++", "icon": "🧹", "latency": "< 0.8ms", "plain": "Cleans and enhances image contrast on graphics chips so defects stand out clearly.", "desc": "Executes parallel pixel normalization, matrix cropping, and tensor batching directly on NVIDIA CUDA cores.", "ha": "Double-Buffered Frame Ring"},
            {"name": "NVIDIA TensorRT Neural Core", "tech": "TensorRT 10.0 / YOLOv8", "icon": "🖥️", "latency": "< 3.8ms", "plain": "AI computer vision engine that detects scratches, dents, or defects in 3.8 milliseconds.", "desc": "Runs FP16 quantized deep neural network inference to detect manufacturing defects in real-time.", "ha": "Dual NVIDIA RTX 4090 GPU Cluster"},
            {"name": "Hardware PLC Ejection Signal", "tech": "Industrial Modbus / REST", "icon": "🎯", "latency": "< 1.0ms", "plain": "Fires a physical robot arm to push defective items off the conveyor belt immediately.", "desc": "Sends high-speed hardware pulse signal to conveyor pneumatic arm to eject defective products.", "ha": "Fail-Safe Hardware Circuit"}
        ],
        "spotlight": {
            "client": "OmniVision Industrial Defect AI",
            "story": "High-speed assembly lines were suffering 3.2% defect rates due to human inspection eye fatigue at 60 FPS. Buildlyst deployed an NVIDIA TensorRT computer vision pipeline connected to industrial PLC relays that inspects every item in 3.8ms and triggers automatic physical ejection.",
            "before": "3.2% Uncaught Conveyor Defect Rate",
            "after": "99.98% Automated Real-Time Detection",
            "result": "$420,000 Annual Savings in Scrapped Warranty Returns"
        },
        "faqs": [
            ("What is the real-time inference latency guaranteed by your models?", "Our NVIDIA TensorRT optimized computer vision models execute inference in < 5ms. REST ML models execute in < 50ms."),
            ("Can these models run on edge devices like NVIDIA Jetson or mobile devices?", "Yes. We optimize models using ONNX runtime, FP16/INT8 quantization, and TensorRT for low-power edge deployments."),
            ("How do you handle model accuracy decay (data drift) over time?", "We implement automated MLflow telemetry drift detectors that alert your team and trigger retraining DAGs when data distributions shift."),
            ("Do we get the full Python / PyTorch training scripts and weights?", "Yes. You receive full ownership of dataset preprocessing pipelines, PyTorch code, and trained weight files.")
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
        "blueprint_nodes": [
            ("Kafka Event Stream & API Ingress", "KAFKA / FIVETRAN", "Captures 5,000 transaction events/sec", "🌐"),
            ("Apache Airflow DAG & dbt Transforms", "AIRFLOW / DBT", "Runs hourly SQL models & data quality tests", "⚙️"),
            ("Snowflake Columnar Lakehouse", "SNOWFLAKE DB", "ACID compliant transaction data storage", "🏢"),
            ("Executive Tableau & Feature Store", "TABLEAU / LOOKER", "Feeds real-time executive BI dashboards", "💡")
        ],
        "cto_nodes_json": '''[
            {"name": "Kafka Streaming Ingress", "tech": "Apache Kafka / Confluent", "icon": "🌐", "latency": "< 4ms", "plain": "Handles 5,000 transaction events per second without dropping a single payment record.", "desc": "Handles 5,000 financial transaction events per second across multi-broker Kafka topics.", "ha": "3-Node Broker Cluster (Replication Factor 3)"},
            {"name": "Airflow & dbt Auto-Transforms", "tech": "Airflow 2.8 / dbt", "icon": "⚙️", "latency": "< 12s Batch", "plain": "Cleans, organizes, and checks financial data for errors before saving to executive reports.", "desc": "Orchestrates complex SQL data models, automated schema migrations, and zero-null data quality checks.", "ha": "Airflow Celery Executor on Kubernetes"},
            {"name": "Snowflake Cloud Lakehouse", "tech": "Snowflake Enterprise", "icon": "🏢", "latency": "< 15ms Query", "plain": "Secure cloud data warehouse that stores terabytes of financial history safely.", "desc": "Stores multi-terabyte transactional histories with automated micro-partitioning and role-based data masking.", "ha": "Multi-Region Cloud Replication"},
            {"name": "Tableau & Looker BI Sync", "tech": "Looker / Tableau", "icon": "💡", "latency": "Real-Time Sync", "plain": "Real-time charts and reports for CEOs and executives to track revenue live.", "desc": "Streams analytics data to executive dashboard portals and downstream machine learning feature stores.", "ha": "Cached BI Gateway Layers"}
        ]''',
        "cto_architecture_nodes": [
            {"name": "Kafka Streaming Ingress", "tech": "Apache Kafka / Confluent", "icon": "🌐", "latency": "< 4ms", "plain": "Handles 5,000 transaction events per second without dropping a single payment record.", "desc": "Handles 5,000 financial transaction events per second across multi-broker Kafka topics.", "ha": "3-Node Broker Cluster (Replication Factor 3)"},
            {"name": "Airflow & dbt Auto-Transforms", "tech": "Airflow 2.8 / dbt", "icon": "⚙️", "latency": "< 12s Batch", "plain": "Cleans, organizes, and checks financial data for errors before saving to executive reports.", "desc": "Orchestrates complex SQL data models, automated schema migrations, and zero-null data quality checks.", "ha": "Airflow Celery Executor on Kubernetes"},
            {"name": "Snowflake Cloud Lakehouse", "tech": "Snowflake Enterprise", "icon": "🏢", "latency": "< 15ms Query", "plain": "Secure cloud data warehouse that stores terabytes of financial history safely.", "desc": "Stores multi-terabyte transactional histories with automated micro-partitioning and role-based data masking.", "ha": "Multi-Region Cloud Replication"},
            {"name": "Tableau & Looker BI Sync", "tech": "Looker / Tableau", "icon": "💡", "latency": "Real-Time Sync", "plain": "Real-time charts and reports for CEOs and executives to track revenue live.", "desc": "Streams analytics data to executive dashboard portals and downstream machine learning feature stores.", "ha": "Cached BI Gateway Layers"}
        ],
        "spotlight": {
            "client": "FinScale Global Transaction Lakehouse",
            "story": "FinScale was experiencing data sync delays between SQL databases and executive BI dashboards. Buildlyst deployed a Kafka event streaming pipeline coupled with Airflow DAGs and a Snowflake cloud warehouse that processes 5,000 transactions/sec with automated dbt data quality checks.",
            "before": "24-Hour Stale Business Intelligence Reports",
            "after": "Real-Time Sub-Second Data Synchronization",
            "result": "100% Zero-Loss Financial Audit Reliability"
        },
        "faqs": [
            ("Which data warehouses do you support?", "We build for Snowflake, Google BigQuery, AWS Redshift, and Databricks Delta Lakehouses."),
            ("How do you ensure data quality and catch missing values?", "We embed automated dbt test suites into Airflow DAGs that test unique keys, non-null fields, and range validations before materializing views."),
            ("Is our financial or PII data anonymized?", "Yes. We implement SOC2 compliant data tokenization and role-based access control (RBAC) masking rules inside Snowflake."),
            ("Can you migrate legacy MySQL or SQL Server databases into cloud data warehouses?", "Yes. We execute zero-downtime ETL migration scripts that sync historical data and stream incremental CDC updates.")
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
        "blueprint_nodes": [
            ("Next.js 19 React Client Frontend", "NEXT.JS / TAILWIND", "SSR rendering & GSAP smooth animations", "💻"),
            ("FastAPI Backend Microservices", "PYTHON / FASTAPI", "Async endpoints with JWT auth middleware", "🚪"),
            ("PostgreSQL & Redis Cache Layer", "POSTGRES / REDIS", "ACID database & warm Redis query caching", "☁️"),
            ("Vercel Global Edge CDN", "VERCEL EDGE CDN", "Sub-10ms global edge HTML & JSON rendering", "🌍")
        ],
        "cto_nodes_json": '''[
            {"name": "Next.js 19 SSR Frontend Engine", "tech": "Next.js 19 / React", "icon": "💻", "latency": "< 80ms TTFB", "plain": "Delivers lightning-fast web pages to customers worldwide in under 1 second with smooth animations.", "desc": "Renders dynamic HTML on edge servers using React Server Components (RSC) and TailwindCSS.", "ha": "Global Vercel Edge Network"},
            {"name": "FastAPI Async API Gateway", "tech": "FastAPI / Python", "icon": "🚪", "latency": "< 4ms", "plain": "Secure doorway that logs users in safely and connects the web app to backend databases.", "desc": "Handles async REST routes, enforces CORS, and verifies JWT user session tokens.", "ha": "Containerized Gunicorn Pool"},
            {"name": "PostgreSQL & Redis Warm Cache", "tech": "PostgreSQL / Redis", "icon": "☁️", "latency": "< 1.5ms Cache", "plain": "Stores user accounts and billing data safely with instant memory caching.", "desc": "Stores multi-tenant data in PostgreSQL with warm Redis query caching to eliminate DB latency.", "ha": "Managed AWS RDS Multi-AZ + Redis Cluster"},
            {"name": "Vercel Global Edge CDN", "tech": "Edge Middleware", "icon": "🌍", "latency": "< 10ms", "plain": "Global server network that keeps your website active 24/7 anywhere on earth.", "desc": "Serves static assets and edge functions from 300+ global data centers with 99+ Lighthouse performance.", "ha": "Global CDN Anycast Routing"}
        ]''',
        "cto_architecture_nodes": [
            {"name": "Next.js 19 SSR Frontend Engine", "tech": "Next.js 19 / React", "icon": "💻", "latency": "< 80ms TTFB", "plain": "Delivers lightning-fast web pages to customers worldwide in under 1 second with smooth animations.", "desc": "Renders dynamic HTML on edge servers using React Server Components (RSC) and TailwindCSS.", "ha": "Global Vercel Edge Network"},
            {"name": "FastAPI Async API Gateway", "tech": "FastAPI / Python", "icon": "🚪", "latency": "< 4ms", "plain": "Secure doorway that logs users in safely and connects the web app to backend databases.", "desc": "Handles async REST routes, enforces CORS, and verifies JWT user session tokens.", "ha": "Containerized Gunicorn Pool"},
            {"name": "PostgreSQL & Redis Warm Cache", "tech": "PostgreSQL / Redis", "icon": "☁️", "latency": "< 1.5ms Cache", "plain": "Stores user accounts and billing data safely with instant memory caching.", "desc": "Stores multi-tenant data in PostgreSQL with warm Redis query caching to eliminate DB latency.", "ha": "Managed AWS RDS Multi-AZ + Redis Cluster"},
            {"name": "Vercel Global Edge CDN", "tech": "Edge Middleware", "icon": "🌍", "latency": "< 10ms", "plain": "Global server network that keeps your website active 24/7 anywhere on earth.", "desc": "Serves static assets and edge functions from 300+ global data centers with 99+ Lighthouse performance.", "ha": "Global CDN Anycast Routing"}
        ],
        "spotlight": {
            "client": "CloudMatrix Multi-Tenant SaaS Engine",
            "story": "CloudMatrix needed a multi-tenant SaaS portal to serve 50,000 active global subscribers with complex subscription billing and zero latency. Buildlyst engineered a Next.js 19 + FastAPI stack deployed on Vercel Global Edge CDN with Redis caching.",
            "before": "2.4s Slow Page Load Times & High Churn",
            "after": "0.4s Instant Page Loads (99 Lighthouse Score)",
            "result": "50,000+ Active Subscribers Processed Monthly"
        },
        "faqs": [
            ("Which modern web frameworks do you specialize in?", "We specialize in Next.js 19 (React), FastAPI (Python), Node.js, TailwindCSS, and Three.js 3D graphics."),
            ("How do you achieve 99+ Lighthouse speed scores?", "We use Server-Side Rendering (SSR), edge asset compression, WebP image optimization, and Vercel CDN caching."),
            ("Can you integrate payment gateways like Stripe or Razorpay?", "Yes. We build full multi-currency Stripe and Razorpay integrations including recurring subscription billing and webhook handlers."),
            ("Will our web application be responsive on mobile and tablet devices?", "Yes. All web applications are engineered with mobile-first responsive design paradigms across 100% of viewports.")
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

print("SERVICE PAGES REFINED: PRICING MOVED AFTER 3D BLUEPRINT, HERO ENLARGED, FLOATING CTA REMOVED PERFECTLY!")
