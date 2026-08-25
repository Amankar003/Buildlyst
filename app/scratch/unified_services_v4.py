import os

SERVICES_DIR = r"d:\End to End Projects\buildlyst\app\templates\services"
os.makedirs(SERVICES_DIR, exist_ok=True)

# 1. Write services_layout.html with complete CSS for Marquee, System Design, Tech Stack, and 3 Pricing Cards
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
    /* Service Navigation Buttons */
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

    /* Enterprise Architecture Marquee */
    @keyframes marqueeScroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
    }
    .marquee-container {
        overflow: hidden;
        white-space: nowrap;
        width: 100%;
        position: relative;
        padding: 10px 0;
        mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
    }
    .marquee-track {
        display: inline-flex;
        gap: 20px;
        animation: marqueeScroll 25s linear infinite;
    }
    .marquee-track:hover {
        animation-play-state: paused;
    }
    .marquee-item {
        display: inline-flex;
        align-items: center;
        gap: 12px;
        padding: 14px 28px;
        border-radius: 50px;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.08);
        color: #ffffff;
        font-family: var(--font-display);
        font-size: 15px;
        font-weight: 600;
        letter-spacing: 0.5px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
    }
    .marquee-item:hover {
        border-color: var(--c-accent-cyan);
        background: rgba(0, 210, 255, 0.08);
        box-shadow: 0 0 25px rgba(0, 210, 255, 0.2);
    }
    .marquee-item .tech-icon {
        color: var(--c-accent-cyan);
        font-size: 18px;
    }

    /* Tech Stack Badges Grid */
    .tech-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 16px;
        margin-top: 40px;
    }
    .tech-badge-card {
        padding: 20px;
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.06);
        text-align: center;
        transition: all 0.3s ease;
    }
    .tech-badge-card:hover {
        background: rgba(255, 255, 255, 0.05);
        border-color: var(--c-accent-cyan);
        transform: translateY(-4px);
    }
    .tech-badge-card h4 {
        margin: 0 0 6px 0;
        font-size: 16px;
        color: #fff;
    }
    .tech-badge-card span {
        font-size: 12px;
        color: var(--c-text-secondary);
        text-transform: uppercase;
        letter-spacing: 1px;
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

    /* System Design Redesign */
    .system-pipeline-wrapper {
        border-radius: 24px;
        border: 1px solid rgba(0, 210, 255, 0.2);
        background: rgba(5, 8, 18, 0.8);
        padding: 40px 30px;
        box-shadow: inset 0 0 50px rgba(0, 210, 255, 0.05), 0 20px 50px rgba(0,0,0,0.5);
        position: relative;
        overflow: hidden;
    }
    .system-status-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 24px;
        margin-bottom: 30px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        font-family: var(--font-display);
        font-size: 12px;
    }
    .status-indicator {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        color: #00d2ff;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1px;
    }
    .status-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #00d2ff;
        box-shadow: 0 0 10px #00d2ff;
        animation: pulseDot 2s infinite;
    }
    @keyframes pulseDot {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.4; transform: scale(0.8); }
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
            Select a specialized service category below to view technical specifications, system architecture designs, and transparent pricing models.
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


def build_3d_pipeline(left_nodes, center_title, right_nodes):
    left_items = "".join([f'''
        <div class="compact-node glass-panel tilt-card" data-tilt style="padding:14px 18px; font-size:13px; font-weight:600; border:1px solid rgba(0,210,255,0.25); border-radius:10px; background:rgba(0,0,0,0.85); box-shadow: 0 4px 15px rgba(0,210,255,0.08); display:flex; align-items:center; justify-content:space-between;">
            <span style="color:#fff;">{node}</span>
            <span style="color:var(--c-accent-cyan); font-weight:bold;">IN →</span>
        </div>
    ''' for node in left_nodes])

    right_items = "".join([f'''
        <div class="compact-node glass-panel tilt-card" data-tilt style="padding:14px 18px; font-size:13px; font-weight:600; border:1px solid rgba(138, 35, 137, 0.25); border-radius:10px; background:rgba(0,0,0,0.85); box-shadow: 0 4px 15px rgba(138,35,137,0.08); display:flex; align-items:center; justify-content:space-between;">
            <span style="color:#8a2387; font-weight:bold;">→ OUT</span>
            <span style="color:#fff;">{node}</span>
        </div>
    ''' for node in right_nodes])

    svg = f"""
    <div class="system-pipeline-wrapper">
        <!-- Top Status Telemetry Bar -->
        <div class="system-status-bar">
            <div class="status-indicator">
                <span class="status-dot"></span> SYSTEM PIPELINE ONLINE
            </div>
            <div style="color: var(--c-text-secondary); font-family: monospace; font-size: 11px;">
                PROTOCOL: ASYNC_ORCHESTRATION_V4 // LATENCY: &lt;15ms
            </div>
        </div>

        <div class="bridge-viz-container" style="position: relative; width: 100%; min-height: 440px; display: flex; justify-content: space-between; align-items: center; padding: 10px 0;">
            <svg class="bridge-svg" preserveAspectRatio="none" viewBox="0 0 100 100" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0;">
                <defs>
                    <filter id="pipeGlowUpgraded" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="1.2" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <linearGradient id="pipeGradLeft" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stop-color="#00D2FF" stop-opacity="0.2"/>
                        <stop offset="100%" stop-color="#00D2FF" stop-opacity="0.8"/>
                    </linearGradient>
                    <linearGradient id="pipeGradRight" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stop-color="#8A2387" stop-opacity="0.8"/>
                        <stop offset="100%" stop-color="#8A2387" stop-opacity="0.2"/>
                    </linearGradient>
                </defs>
                <!-- Tracks -->
                <path d="M 22 12 C 37 12, 37 50, 50 50" style="fill:none; stroke:url(#pipeGradLeft); stroke-width:0.8;"/>
                <path d="M 22 37 C 37 37, 37 50, 50 50" style="fill:none; stroke:url(#pipeGradLeft); stroke-width:0.8;"/>
                <path d="M 22 63 C 37 63, 37 50, 50 50" style="fill:none; stroke:url(#pipeGradLeft); stroke-width:0.8;"/>
                <path d="M 22 88 C 37 88, 37 50, 50 50" style="fill:none; stroke:url(#pipeGradLeft); stroke-width:0.8;"/>
                <path d="M 50 50 C 63 50, 63 12, 78 12" style="fill:none; stroke:url(#pipeGradRight); stroke-width:0.8;"/>
                <path d="M 50 50 C 63 50, 63 37, 78 37" style="fill:none; stroke:url(#pipeGradRight); stroke-width:0.8;"/>
                <path d="M 50 50 C 63 50, 63 63, 78 63" style="fill:none; stroke:url(#pipeGradRight); stroke-width:0.8;"/>
                <path d="M 50 50 C 63 50, 63 88, 78 88" style="fill:none; stroke:url(#pipeGradRight); stroke-width:0.8;"/>
                
                <!-- Animated Glowing Light Pulses -->
                <path filter="url(#pipeGlowUpgraded)" d="M 22 12 C 37 12, 37 50, 50 50" style="fill:none; stroke:#00d2ff; stroke-width:1.5; stroke-dasharray:6 70; animation: dash 2s linear infinite; animation-delay: 0s;" />
                <path filter="url(#pipeGlowUpgraded)" d="M 22 37 C 37 37, 37 50, 50 50" style="fill:none; stroke:#00d2ff; stroke-width:1.5; stroke-dasharray:6 70; animation: dash 2s linear infinite; animation-delay: -0.6s;" />
                <path filter="url(#pipeGlowUpgraded)" d="M 22 63 C 37 63, 37 50, 50 50" style="fill:none; stroke:#00d2ff; stroke-width:1.5; stroke-dasharray:6 70; animation: dash 2s linear infinite; animation-delay: -1.2s;" />
                <path filter="url(#pipeGlowUpgraded)" d="M 22 88 C 37 88, 37 50, 50 50" style="fill:none; stroke:#00d2ff; stroke-width:1.5; stroke-dasharray:6 70; animation: dash 2s linear infinite; animation-delay: -1.8s;" />
                
                <path filter="url(#pipeGlowUpgraded)" d="M 50 50 C 63 50, 63 12, 78 12" style="fill:none; stroke:#8a2387; stroke-width:1.5; stroke-dasharray:6 70; animation: dash 2s linear infinite; animation-delay: -0.3s;" />
                <path filter="url(#pipeGlowUpgraded)" d="M 50 50 C 63 50, 63 37, 78 37" style="fill:none; stroke:#8a2387; stroke-width:1.5; stroke-dasharray:6 70; animation: dash 2s linear infinite; animation-delay: -0.9s;" />
                <path filter="url(#pipeGlowUpgraded)" d="M 50 50 C 63 50, 63 63, 78 63" style="fill:none; stroke:#8a2387; stroke-width:1.5; stroke-dasharray:6 70; animation: dash 2s linear infinite; animation-delay: -1.5s;" />
                <path filter="url(#pipeGlowUpgraded)" d="M 50 50 C 63 50, 63 88, 78 88" style="fill:none; stroke:#8a2387; stroke-width:1.5; stroke-dasharray:6 70; animation: dash 2s linear infinite; animation-delay: -2.1s;" />
                
                <circle cx="22" cy="12" r="1.5" style="fill:#00d2ff;" filter="url(#pipeGlowUpgraded)"/>
                <circle cx="22" cy="37" r="1.5" style="fill:#00d2ff;" filter="url(#pipeGlowUpgraded)"/>
                <circle cx="22" cy="63" r="1.5" style="fill:#00d2ff;" filter="url(#pipeGlowUpgraded)"/>
                <circle cx="22" cy="88" r="1.5" style="fill:#00d2ff;" filter="url(#pipeGlowUpgraded)"/>
                
                <circle cx="50" cy="50" r="3.5" style="fill:#00d2ff;" filter="url(#pipeGlowUpgraded)" />
                <circle cx="50" cy="50" r="1.8" style="fill:#ffffff;" />
                
                <circle cx="78" cy="12" r="1.5" style="fill:#8a2387;" filter="url(#pipeGlowUpgraded)"/>
                <circle cx="78" cy="37" r="1.5" style="fill:#8a2387;" filter="url(#pipeGlowUpgraded)"/>
                <circle cx="78" cy="63" r="1.5" style="fill:#8a2387;" filter="url(#pipeGlowUpgraded)"/>
                <circle cx="78" cy="88" r="1.5" style="fill:#8a2387;" filter="url(#pipeGlowUpgraded)"/>
            </svg>
            
            <div class="bridge-col" style="z-index:1; width:220px; display:flex; flex-direction:column; gap:45px; text-align:left;">
                {left_items}
            </div>
            
            <div class="bridge-col" style="z-index:1; display:flex; justify-content:center; align-items:center;">
                <div class="bridge-center-node tilt-card glass-panel" data-tilt style="padding: 36px 44px; text-align: center; border: 1px solid var(--c-accent-cyan); box-shadow: 0 0 50px rgba(0, 210, 255, 0.25); background: rgba(5, 10, 25, 0.95); border-radius: 20px;">
                    <span style="font-size: 32px; display: block; margin-bottom: 8px;">⚙️</span>
                    <h3 class="text-gradient" style="margin: 0; font-size: 24px; letter-spacing: -0.5px; font-weight: 800;">{center_title}</h3>
                    <div style="margin-top: 10px; display: inline-block; padding: 4px 12px; border-radius: 20px; background: rgba(0, 210, 255, 0.1); border: 1px solid rgba(0, 210, 255, 0.3); color: #00d2ff; font-size: 11px; font-weight: 700; letter-spacing: 1px;">
                        REAL-TIME CORE
                    </div>
                </div>
            </div>
            
            <div class="bridge-col" style="z-index:1; width:220px; display:flex; flex-direction:column; gap:45px; text-align:right;">
                {right_items}
            </div>
        </div>
    </div>
    """
    return svg

def generate_isolated_page(service):
    # Deliverables
    build_items_html = "".join([f'<li style="margin-bottom:16px; font-size:15px; color:#e0e0e0; display:flex; align-items:center; gap:12px;"><span style="color:var(--c-accent-cyan); font-size:18px;">✓</span> {item}</li>' for item in service["build_list"]])
    
    # 6 Core Capabilities
    caps_html = "".join([f'<div class="glass-panel tilt-card" data-tilt style="padding:32px; border-radius:var(--radius-lg); border:1px solid rgba(255,255,255,0.04); background:rgba(255,255,255,0.015);"><h3 style="color:#fff;font-size:19px;margin-bottom:12px;font-weight:700;">{t}</h3><p style="color:var(--c-text-secondary);font-size:14px;line-height:1.6;">{d}</p></div>' for t, d in service["capabilities"]])

    # Transformations
    transform_html = "".join([f'<div class="glass-panel text-center tilt-card" data-tilt style="padding:32px; border-radius:var(--radius-lg); border:1px solid rgba(255,255,255,0.04); background:rgba(255,255,255,0.015);"><h3 class="text-gradient" style="font-size:48px; font-weight:800; margin-bottom:8px;">{val}</h3><p style="color:var(--c-text-secondary); font-size:15px;">{desc}</p></div>' for val, desc in service["transformations"]])

    # Enterprise Architecture Marquee (Duplicated 4x for continuous scroll)
    marquee_items = "".join([f'<div class="marquee-item"><span class="tech-icon">⚡</span> {t}</div>' for t in service["ent_arch_tech"]] * 4)

    # Tech Stack Badges Grid
    tech_badges = "".join([f'<div class="tech-badge-card"><h4>{t}</h4><span>{cat}</span></div>' for t, cat in service["tech_badges"]])

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

    <!-- 1. Service Overview & Banner -->
    <section class="reveal" style="padding: 70px 0 60px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
        <div class="container text-center" style="max-width: 840px;">
            <div style="font-size: 54px; margin-bottom: 20px;">{service["icon"]}</div>
            <span class="overline highlight">Service Overview</span>
            <h2 class="text-gradient" style="font-size: 38px; margin-bottom: 20px; font-weight: 700;">{service["title"]}</h2>
            <p style="color: var(--c-text-secondary); font-size: 17px; line-height: 1.7; margin-bottom: 0;">
                {service["about"]}
            </p>
        </div>
    </section>

    <!-- 2. Enterprise Architecture Section (Continuous Marquee & Tech Grid) -->
    <section class="architecture-section reveal" style="padding: 80px 0; border-bottom: 1px solid rgba(255,255,255,0.05); background: rgba(0,0,0,0.3);">
        <div class="container">
            <div class="section-header text-center">
                <span class="overline highlight">Technology Foundation</span>
                <h2 class="section-heading text-gradient" style="font-size: 32px;">Enterprise Architecture</h2>
                <p class="subtext text-center mx-auto">Built on a foundation of battle-tested frameworks, engineered for enterprise reliability.</p>
            </div>
            
            <!-- Infinite Tech Marquee -->
            <div class="marquee-container" style="margin-top: 40px;">
                <div class="marquee-track">
                    {marquee_items}
                </div>
            </div>

            <!-- Structured Tech Stack Categories Grid -->
            <div class="tech-grid">
                {tech_badges}
            </div>
        </div>
    </section>

    <!-- 3. What We Build (Deliverables) -->
    <section class="reveal" style="padding: 90px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
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

    <!-- 4. System Design Section (Redesigned Cybernetic Pipeline) -->
    <section class="reveal" style="padding: 90px 0; border-bottom: 1px solid rgba(255,255,255,0.05); background: radial-gradient(circle at center, rgba(0,210,255,0.03) 0%, transparent 70%);">
        <div class="container">
            <div class="section-header text-center" style="margin-bottom: 40px;">
                <span class="overline highlight">Architecture Workflow</span>
                <h2 class="section-heading text-gradient" style="font-size: 34px;">System Design &amp; Data Pipeline</h2>
                <p class="subtext text-center mx-auto">Interactive visualization of data flow through our high-performance processing engine.</p>
            </div>
            
            {build_3d_pipeline(service["pipe_left"], service["pipe_center"], service["pipe_right"])}
            
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

    <!-- 6. Business Transformations (ROI) -->
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

    <!-- 7. 3 Tier Pricing Section (PRIORITY: Exact Match to Homepage 3 Cards) -->
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
{{% endblock %}}
"""
    return html


# Service Definitions with 3 Pricing Tiers Each & 6 Capabilities Each
services_data = [
    {
        "filename": "ai_agents.html",
        "title": "Autonomous AI Agents",
        "icon": "🤖",
        "about": "We architect autonomous multi-agent systems that execute complex reasoning, run asynchronous workflows, and integrate directly into your enterprise tools and SQL databases with strict human-in-the-loop guardrails.",
        "image": "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "ent_arch_tech": ["LangGraph", "CrewAI", "AutoGPT", "FastAPI", "OpenAI GPT-4o", "Anthropic Claude", "PostgreSQL", "Docker", "AWS ECS", "Celery"],
        "tech_badges": [
            ("LangGraph", "Orchestration"),
            ("CrewAI", "Multi-Agent"),
            ("FastAPI", "Async Backend"),
            ("PostgreSQL", "Vector Memory"),
            ("Docker", "Sandbox"),
            ("Celery", "Task Queue")
        ],
        "build_list": [
            "Customer Support Autonomous Agents with Ticket Escalation",
            "Automated Market Research & Lead Scraping Agents",
            "Multi-Agent Code Review & Security Auditing Bots",
            "Internal HR & IT Operational Workflow Automation"
        ],
        "pipe_left": ["User Prompt", "CRM Data", "Web Search", "SQL DBs"],
        "pipe_center": "MULTI-AGENT REASONING CORE",
        "pipe_right": ["Send Email", "Update CRM", "Generate PDF", "Trigger API"],
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
        "about": "Deploy private, highly-secure Retrieval-Augmented Generation (RAG) architectures and custom LLMs. We connect cutting-edge language models directly to your proprietary enterprise data silos without exposing data to public servers.",
        "image": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "ent_arch_tech": ["LlamaIndex", "Pinecone", "HuggingFace", "AWS Bedrock", "vLLM", "Weaviate", "Qdrant", "Ray", "Triton Server", "LangChain"],
        "tech_badges": [
            ("LlamaIndex", "RAG Pipeline"),
            ("Pinecone", "Vector DB"),
            ("vLLM", "High-Throughput"),
            ("AWS Bedrock", "Enterprise AI"),
            ("Qdrant", "Hybrid Search"),
            ("HuggingFace", "Model Zoo")
        ],
        "build_list": [
            "Enterprise Document Search & Knowledge Base Chatbots (RAG)",
            "Legal & Compliance Contract Auditing LLMs",
            "Custom Fine-Tuned Llama 3 & Mistral Domain Models",
            "Automated Multi-Format Content Generation Pipelines"
        ],
        "pipe_left": ["PDFs / Docs", "Confluence", "Jira Logs", "SQL Silos"],
        "pipe_center": "PRIVATE RAG & HYBRID ENGINE",
        "pipe_right": ["Vector Embeds", "Context Answers", "Citations", "Secure Sandbox"],
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
        "about": "Advanced predictive modeling, computer vision, natural language processing, and real-time classification systems deployed at scale. We turn raw datasets into predictive engines that forecast trends and detect anomalies.",
        "image": "https://images.unsplash.com/photo-1518932945647-7a3c96943e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "ent_arch_tech": ["PyTorch", "TensorFlow", "Scikit-Learn", "MLflow", "CUDA", "NVIDIA TensorRT", "Kubeflow", "Apache Spark", "XGBoost", "OpenCV"],
        "tech_badges": [
            ("PyTorch", "Deep Learning"),
            ("TensorRT", "GPU Acceleration"),
            ("MLflow", "MLOps Pipeline"),
            ("OpenCV", "Computer Vision"),
            ("XGBoost", "Predictive ML"),
            ("Kubeflow", "Kubernetes AI")
        ],
        "build_list": [
            "Sales, Inventory & Demand Forecasting Engines",
            "Real-Time Transactional Fraud Detection Systems",
            "Manufacturing Defect Detection via Computer Vision (60 FPS)",
            "Predictive Customer Churn & Retention Analytics"
        ],
        "pipe_left": ["Telemetry", "Transactions", "Video Streams", "User Behavior"],
        "pipe_center": "TENSORRT INFERENCE ENGINE",
        "pipe_right": ["Fraud Alerts", "Demand Forecast", "Quality Flags", "Churn Score"],
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
        "about": "Robust ETL pipelines, scalable cloud data warehousing, and interactive visualization dashboards. We untangle messy, distributed data architectures into clean, unified, and strategic assets for your entire organization.",
        "image": "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "ent_arch_tech": ["Apache Airflow", "Snowflake", "dbt", "Apache Kafka", "AWS Redshift", "PostgreSQL", "Fivetran", "Databricks", "Tableau", "Polars"],
        "tech_badges": [
            ("Apache Airflow", "Orchestration"),
            ("Snowflake", "Data Warehouse"),
            ("dbt", "Transformation"),
            ("Apache Kafka", "Streaming"),
            ("Databricks", "Lakehouse"),
            ("PostgreSQL", "OLTP Database")
        ],
        "build_list": [
            "Automated Cloud Data Warehouses (Snowflake / BigQuery)",
            "Real-Time Event Streaming Pipelines (Kafka / Spark)",
            "Custom Apache Airflow ETL/ELT DAG Workflows",
            "Executive Business Intelligence & Looker Dashboards"
        ],
        "pipe_left": ["SaaS APIs", "Legacy DBs", "IoT Streams", "Flat Files"],
        "pipe_center": "STREAMING & ETL ENGINE",
        "pipe_right": ["Snowflake DB", "BI Dashboards", "ML Features", "Alert Triggers"],
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
        "about": "High-performance web applications, stunning landing pages, and complex admin dashboards built with modern frameworks and deeply integrated AI backends. We build Silicon Valley-grade digital products.",
        "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "ent_arch_tech": ["React / Next.js", "Vue / Nuxt", "FastAPI", "TailwindCSS", "GSAP", "Vercel", "PostgreSQL", "Redis", "Framer Motion", "Stripe"],
        "tech_badges": [
            ("Next.js", "React Framework"),
            ("FastAPI", "Python Async API"),
            ("TailwindCSS", "Modern Styling"),
            ("PostgreSQL", "Database"),
            ("Redis", "Cache Layer"),
            ("Vercel", "Global Edge")
        ],
        "build_list": [
            "Full-Stack Multi-Tenant SaaS Platforms",
            "High-Converting Animated Product Landing Pages",
            "Internal Enterprise Operations & Analytics Dashboards",
            "AI-Integrated Dynamic Web Applications"
        ],
        "pipe_left": ["Figma Designs", "User Flows", "Brand Assets", "Backend APIs"],
        "pipe_center": "FULL-STACK WEB ENGINE",
        "pipe_right": ["Next.js App", "FastAPI Core", "CDN Edge", "Stripe Auth"],
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
    content = generate_isolated_page(service)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

print("ALL 5 SERVICE PAGES RE-ENGINEERED PERFECTLY!")
