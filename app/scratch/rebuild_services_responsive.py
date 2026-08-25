import os

SERVICES_DIR = r"d:\End to End Projects\buildlyst\app\templates\services"
os.makedirs(SERVICES_DIR, exist_ok=True)

def generate_service_page(service):
    # Deliverables
    build_items_html = "".join([f'<li style="margin-bottom:14px; font-size:14px; color:#e0e0e0; display:flex; align-items:center; gap:10px;"><span style="color:var(--c-accent-cyan); font-size:16px;">✓</span> {item}</li>' for item in service["build_list"]])
    
    # 6 Core Capabilities Grid
    caps_html = "".join([f'<div class="glass-panel tilt-card" data-tilt style="padding:28px; border-radius:var(--radius-lg); border:1px solid rgba(255,255,255,0.04); background:rgba(255,255,255,0.015);"><h3 style="color:#fff;font-size:18px;margin-bottom:10px;font-weight:700;">{t}</h3><p style="color:var(--c-text-secondary);font-size:13px;line-height:1.6;">{d}</p></div>' for t, d in service["capabilities"]])

    # Transformations
    transform_html = "".join([f'<div class="glass-panel text-center tilt-card" data-tilt style="padding:28px; border-radius:var(--radius-lg); border:1px solid rgba(255,255,255,0.04); background:rgba(255,255,255,0.015);"><h3 class="text-gradient" style="font-size:42px; font-weight:800; margin-bottom:6px;">{val}</h3><p style="color:var(--c-text-secondary); font-size:14px;">{desc}</p></div>' for val, desc in service["transformations"]])

    # Detailed Overview Focus Badges
    overview_highlights = service.get("overview_highlights", [
        ("⚡ High-Scale Production", "Engineered for high-concurrency enterprise workloads with sub-millisecond latencies."),
        ("🛡️ SOC2 Compliant Security", "End-to-end data encryption, VPC isolation, and strict role-based access control."),
        ("🧠 Autonomous Reasoning", "Stateful memory and intelligent decision-making logic built directly into the kernel."),
        ("🔒 100% IP Ownership", "You receive full, unrestricted ownership of all source code, weights, and schemas.")
    ])
    
    highlights_html = "".join([f'''
    <div style="padding: 12px 14px; border-radius: 12px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); display: flex; flex-direction: column; gap: 4px;">
        <span style="font-size: 13px; font-weight: 700; color: #fff;">{title}</span>
        <span style="font-size: 11px; color: var(--c-text-secondary); line-height: 1.4;">{desc}</span>
    </div>
    ''' for title, desc in overview_highlights])

    # Project Architecture Blueprint Nodes HTML (For Overview Right Side)
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

    hero_html = f"""
    <div class="hero-container">
        <!-- LEFT SIDE: HERO CONTENT (EXACT HOME PAGE STYLE & FONT SIZES) -->
        <div class="hero-content">
            <span class="overline highlight">Buildlyst Engineering Studio</span>
            <h1 class="text-gradient-hero">
                {service['hero_headline']}
            </h1>
            <p class="subtext">
                {service['hero_subtext']}
            </p>

            <div class="hero-actions">
                <a href="/#contact" class="btn btn-primary glow-border-btn">Start a Project</a>
                <a href="#telemetry" class="btn btn-secondary glass-btn">Explore Live Sandbox</a>
            </div>
        </div>

        <!-- RIGHT SIDE: HERO VISUAL (GLASS CARD PREVIEW) -->
        <div class="hero-visual">
            <div class="chat-simulation-container glass-panel tilt-card" data-tilt style="border: 1px solid rgba(0, 210, 255, 0.3); box-shadow: 0 0 35px rgba(0, 210, 255, 0.15);">
                <div class="sim-header">
                    <div class="sim-dots"><span></span><span></span><span></span></div>
                    <span class="sim-title" style="color: var(--c-accent-cyan); font-weight: bold;">Buildlyst // {service['title']}</span>
                </div>
                <div style="padding: 24px; color: #fff; font-family: monospace; font-size: 13px; line-height: 1.8;">
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 8px;">
                        <span style="color: #27c93f;">● PRODUCTION READY</span>
                        <span style="color: #888;">LATENCY: {service.get('hero_stat_latency', '< 4ms')}</span>
                    </div>
                    <div style="margin-bottom: 12px; color: #e0e0e0;">
                        <span style="color: var(--c-accent-cyan);">&gt; ARCHITECTURE:</span> {service.get('hero_stat_arch', 'Stateful Multi-Agent DAG')}
                    </div>
                    <div style="margin-bottom: 12px; color: #e0e0e0;">
                        <span style="color: var(--c-accent-cyan);">&gt; SECURITY:</span> SOC2 Compliant / Private VPC
                    </div>
                    <div style="margin-bottom: 14px; color: #e0e0e0;">
                        <span style="color: var(--c-accent-cyan);">&gt; CODE IP:</span> 100% Client Source Code Transfer
                    </div>
                    <div style="padding: 10px 14px; border-radius: 8px; background: rgba(0, 210, 255, 0.08); border: 1px solid rgba(0, 210, 255, 0.2); font-size: 11px; color: #00d2ff;">
                        ⚡ Delivered with sub-14 day production SLA guarantee.
                    </div>
                </div>
            </div>
        </div>
    </div>
    """

    html = f"""{{% extends 'services/services_layout.html' %}}

{{% block service_hero %}}
{hero_html}
{{% endblock %}}

{{% block service_detail %}}
<div style="min-height: 100vh;">
<style>
/* Responsive Grid Classes for Services Pages */
.responsive-service-grid {{ display: grid; }}
.responsive-service-grid-overview {{ grid-template-columns: 1.15fr 0.85fr; gap: 36px; align-items: center; }}
.responsive-service-grid-deliverables {{ grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }}
.responsive-service-grid-telemetry {{ grid-template-columns: 1fr 1fr; gap: 24px; align-items: stretch; }}
.responsive-service-grid-3d {{ grid-template-columns: 1fr 1fr; gap: 36px; align-items: center; margin-top: 30px; }}
.specs-table-wrapper {{ width: 100%; overflow-x: auto; }}
.overview-buttons-container {{ display: flex; gap: 10px; align-items: center; }}

@media (max-width: 900px) {{
    .overview-buttons-container {{
        flex-direction: column;
        width: 100%;
        gap: 12px !important;
    }}
    .overview-buttons-container a {{
        width: 100%;
        text-align: center;
        padding: 12px !important;
    }}
    .responsive-service-grid {{
        grid-template-columns: 1fr !important;
        gap: 40px !important;
    }}
    .responsive-service-grid-overview > div:first-child {{ order: 2; margin-top: 20px; }}
    .responsive-service-grid-overview > div:last-child {{ order: 1; }}
    
    .pricing-grid-3 {{
        grid-template-columns: 1fr !important;
    }}
    
    .hero-container {{
        grid-template-columns: 1fr !important;
        text-align: center;
        padding-top: 20px;
    }}
    
    .hero-actions {{
        justify-content: center;
        flex-wrap: wrap;
    }}
    
    .chat-simulation-container {{
        margin: 0 auto;
        width: 100%;
    }}
    
    .split-layout {{
        grid-template-columns: 1fr !important;
        gap: 32px !important;
    }}
    
    /* Fix Pricing Badge overlapping issues on mobile */
    .service-pricing-card .popular-badge {{
        position: relative !important;
        top: 0 !important;
        left: 0 !important;
        transform: none !important;
        display: inline-block !important;
        align-self: center !important;
        margin: 0 auto 16px auto !important;
    }}
    .service-pricing-card.featured {{
        padding-top: 24px !important;
    }}
    
    /* 3D Blueprint Mobile Fixes */
    .arch-3d-wrapper {{
        min-height: 380px !important;
        padding: 20px 0;
    }}
    .arch-3d-stage {{
        transform: scale(0.65) rotateX(50deg) rotateZ(-30deg) !important;
    }}
    .arch-3d-wrapper.flat-view .arch-3d-stage {{
        transform: scale(0.8) rotateX(0deg) rotateZ(0deg) !important;
    }}
}}
</style>


    <!-- 1. COMPACT ABOVE-THE-FOLD DETAILED SERVICE OVERVIEW WITH VERTICAL SYSTEM ARCHITECTURE BLUEPRINT -->
    <section class="reveal" style="padding: 60px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
        <div class="container">
            <div class="responsive-service-grid responsive-service-grid-overview">
                
                <!-- LEFT SIDE: RICH SERVICE OVERVIEW CONTENT -->
                <div>
                    <div style="margin-bottom: 14px;">
                        <span class="overline highlight" style="font-size: 11px;">Service Overview</span>
                        <div style="display: flex; align-items: center; gap: 12px; margin-top: 6px;">
                            <span style="font-size: 38px;">{service["icon"]}</span>
                            <h2 class="text-gradient" style="font-size: clamp(28px, 3.4vw, 40px); font-weight: 800; margin: 0; line-height: 1.15;">
                                {service["title"]}
                            </h2>
                        </div>
                    </div>

                    <!-- DEEP EXPLANATORY OVERVIEW CONTENT -->
                    <p style="color: #fff; font-size: 15.5px; font-weight: 500; line-height: 1.6; margin-bottom: 12px;">
                        {service["detailed_summary"]}
                    </p>
                    
                    <p style="color: var(--c-text-secondary); font-size: 14px; line-height: 1.6; margin-bottom: 20px;">
                        {service["detailed_explanation"]}
                    </p>

                    <!-- 4 RICH SERVICE HIGHLIGHT BADGES -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px;">
                        {highlights_html}
                    </div>

                    <div class="overview-buttons-container">
                        <a href="/#contact" class="btn glow-border-btn" style="padding: 10px 22px; font-size: 13px;">Build Custom Solution</a>
                        <a href="#telemetry" class="btn glass-btn" style="padding: 10px 20px; font-size: 13px;">View Live Telemetry ↓</a>
                    </div>
                </div>

                <!-- RIGHT SIDE: VERTICAL SERVICE SYSTEM ARCHITECTURE DIAGRAM -->
                <div class="project-blueprint-card">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 10px;">
                        <span style="font-family: var(--font-display); font-size: 11px; font-weight: 800; color: var(--c-accent-cyan); text-transform: uppercase; letter-spacing: 1.5px;">
                            VERTICAL SYSTEM ARCHITECTURE
                        </span>
                        <span style="font-size: 10px; font-family: monospace; color: #27c93f;">ACTIVE PIPELINE</span>
                    </div>
                    
                    {bp_nodes_html}
                </div>

            </div>
        </div>
    </section>

    <!-- 2. What We Build (Deliverables) -->
    <section class="reveal" style="padding: 70px 0; border-top: 1px solid rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.05);">
        <div class="container">
            <div class="split-layout" class="responsive-service-grid responsive-service-grid-deliverables">
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
    <section id="telemetry" class="reveal" style="padding: 70px 0; border-bottom: 1px solid rgba(255,255,255,0.05); background: rgba(0,0,0,0.25);">
        <div class="container">
            <div class="section-header text-center" style="margin-bottom: 28px;">
                <span class="overline highlight" style="font-size: 11px;">Developer Sandbox</span>
                <h2 class="section-heading text-gradient" style="font-size: 30px;">Live Execution Telemetry</h2>
                <p class="subtext text-center mx-auto" style="font-size: 14px;">Real-time code inspection, live log streaming, and dynamic metric counters for {service['title']}.</p>
            </div>

            <div class="responsive-service-grid responsive-service-grid-telemetry">
                
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
            <div class="responsive-service-grid responsive-service-grid-3d">
                
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

    <!-- 5. TAILORED 3 TIER PRICING SECTION -->
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

    <!-- 6. 6 Core Capabilities Grid -->
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

    <!-- 7. Technical Specifications Comparison Matrix -->
    <section class="reveal" style="padding: 70px 0; border-bottom: 1px solid rgba(255,255,255,0.05); background: rgba(255,255,255,0.01);">
        <div class="container">
            <div class="section-header text-center" style="margin-bottom: 28px;">
                <span class="overline highlight" style="font-size: 11px;">Comparison Matrix</span>
                <h2 class="section-heading text-gradient" style="font-size: 30px;">Technical Specifications</h2>
                <p class="subtext text-center mx-auto" style="font-size: 14px;">Compare technical benchmarks across Launch, Build, and Scale engagement tiers.</p>
            </div>

            <div class="glass-panel" style="border-radius: 14px; overflow: hidden; border: 1px solid rgba(255,255,255,0.06);">
                <div class="specs-table-wrapper"><table class="specs-table">
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
                </table></div>
            </div>
        </div>
    </section>

    <!-- 8. SERVICE OBJECTIONS FAQ ACCORDION -->
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

    <!-- 9. Business Transformations (ROI) -->
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

# 5 Detailed Services Data
services_data = [
    {
        "filename": "ai_agents.html",
        "title": "Autonomous AI Agents",
        "icon": "🤖",
        "flow_id": "flow-agents",
        "hero_headline": "Autonomous<br>AI Agents.",
        "hero_subtext": "We build multi-agent autonomous swarms that reason, delegate complex tasks, and execute real-world business decisions directly across your enterprise APIs.",
        "hero_stat_latency": "< 2ms",
        "hero_stat_arch": "LangGraph Stateful Swarm",
        "detailed_summary": "Autonomous AI Agents are intelligent software systems capable of independent reasoning, multi-step task delegation, and executing real-world actions across your existing enterprise tools and APIs.",
        "detailed_explanation": "Unlike basic chatbots that simply answer text prompts, Buildlyst autonomous AI agents operate with stateful memory, long-term context retention, and strict guardrails. They plan complex multi-stage workflows, parse unstructured customer requests, query databases, and execute actions with zero human fatigue.",
        "overview_highlights": [
            ("⚡ Stateful Reasoning Graph", "Powered by LangGraph to orchestrate complex multi-agent reasoning DAGs with persistent state checkpoints."),
            ("🛡️ Human-in-the-Loop Safeguards", "Configurable safety bounds where high-value or risky API transactions pause for human approval."),
            ("🗄️ Long-Term Vector Memory", "Pinecone and Qdrant integration to remember past conversations, buyer preferences, and operational context."),
            ("🔒 100% Source Code Ownership", "You receive clean Python/FastAPI codebases with 100% IP rights and no vendor lock-in.")
        ],
        "image": "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "blueprint_nodes": [
            ("User Ingress & Webhook Gateway", "FASTAPI / REST", "Receives user request, WhatsApp prompt, or API trigger", "👤"),
            ("Stateful Reasoning & Router", "LANGGRAPH / GPT-4o", "Parses user intent, checks memory, & routes sub-tasks", "🧠"),
            ("Vector Similarity Memory Search", "PINECONE / PGVECTOR", "Queries 100,000+ vector embeddings for contextual memory", "🗄️"),
            ("Action Dispatch & Tool Execution", "TWILIO / STRIPE API", "Executes tool actions, updates CRM, & triggers webhooks", "⚡")
        ],
        "cto_nodes_json": '''[
            {"name": "FastAPI Ingress Gateway", "tech": "FastAPI / NGINX", "icon": "🚪", "latency": "< 2ms", "plain": "Captures all incoming customer messages instantly and prevents crashes even when thousands of users text at once.", "desc": "Intercepts incoming Webhooks, verifies TLS certificates, and dispatches requests to Redis async queue.", "ha": "Multi-AZ Auto-scaling (N+1 Redundancy)"},
            {"name": "LangGraph Agent Brain", "tech": "LangGraph / Python", "icon": "🧠", "latency": "< 120ms", "plain": "The intelligent brain that reads customer requirements and delegates work to AI specialized worker bots.", "desc": "Executes stateful multi-agent DAG task graph. Evaluates agent prompts and coordinates parallel agent steps.", "ha": "Stateless Container Pool with Redis Checkpoints"},
            {"name": "Pinecone Vector Memory", "tech": "Pinecone HNSW", "icon": "🗄️", "latency": "< 8ms", "plain": "Super-fast memory store that searches through 10,000+ records in milliseconds to find perfect context matches.", "desc": "Stores 3072-dimensional vector embeddings for listing data and past conversation memory state.", "ha": "Distributed Replica Sharding (99.99% Uptime)"},
            {"name": "Action Dispatch Engine", "tech": "Twilio / Stripe API", "icon": "⚡", "latency": "< 45ms", "plain": "Automatically triggers real-world actions like booking calendars, processing payments, and updating CRMs.", "desc": "Executes human-in-the-loop approved API webhooks, updates CRM tables, and sends WhatsApp messages.", "ha": "Circuit Breaker Pattern with Retry Queue"}
        ]''',
        "cto_architecture_nodes": [
            {"name": "FastAPI Ingress Gateway", "tech": "FastAPI / NGINX", "icon": "🚪", "latency": "< 2ms", "plain": "Captures all incoming customer messages instantly and prevents crashes even when thousands of users text at once.", "desc": "Intercepts incoming Webhooks, verifies TLS certificates, and dispatches requests to Redis async queue.", "ha": "Multi-AZ Auto-scaling (N+1 Redundancy)"},
            {"name": "LangGraph Agent Brain", "tech": "LangGraph / Python", "icon": "🧠", "latency": "< 120ms", "plain": "The intelligent brain that reads customer requirements and delegates work to AI specialized worker bots.", "desc": "Executes stateful multi-agent DAG task graph. Evaluates agent prompts and coordinates parallel agent steps.", "ha": "Stateless Container Pool with Redis Checkpoints"},
            {"name": "Pinecone Vector Memory", "tech": "Pinecone HNSW", "icon": "🗄️", "latency": "< 8ms", "plain": "Super-fast memory store that searches through 10,000+ records in milliseconds to find perfect context matches.", "desc": "Stores 3072-dimensional vector embeddings for listing data and past conversation memory state.", "ha": "Distributed Replica Sharding (99.99% Uptime)"},
            {"name": "Action Dispatch Engine", "tech": "Twilio / Stripe API", "icon": "⚡", "latency": "< 45ms", "plain": "Automatically triggers real-world actions like booking calendars, processing payments, and updating CRMs.", "desc": "Executes human-in-the-loop approved API webhooks, updates CRM tables, and sends WhatsApp messages.", "ha": "Circuit Breaker Pattern with Retry Queue"}
        ],
        "faqs": [
            ("Who owns the intellectual property (IP) and code?", "You own 100% of the IP, source code, and custom agent weights. We deliver clean, commented codebases directly to your GitHub repository."),
            ("Can AI Agents perform unauthorized or expensive API actions?", "No. We implement strict Human-in-the-Loop (HITL) guardrails. Any action exceeding predefined monetary or security thresholds pauses for human approval."),
            ("Can these agents connect to our existing internal SQL database and CRM?", "Yes. We build custom FastAPI REST connectors for PostgreSQL, MySQL, Salesforce, HubSpot, and custom REST webhooks."),
            ("How long does an autonomous AI agent deployment take?", "Launch MVPs deploy in 7-10 days. Complex multi-agent swarms with custom memory layers deploy in 2-3 weeks.")
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

# Buildlyst Multi-Agent Architecture
workflow = StateGraph(PropertyLeadState)
workflow.add_node("triage", TriageAgent.classify_intent)
workflow.add_node("matcher", PropertyMatcherAgent.search_pinecone)

workflow.add_edge("triage", "matcher")
workflow.add_conditional_edges("matcher", verify_lead_qualification, {
    "qualified": "dispatch_crm",
    "unqualified": END
})
app = workflow.compile()''',
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
        "hero_headline": "Generative AI<br>Systems.",
        "hero_subtext": "We deploy private, zero-hallucination RAG pipelines and custom fine-tuned LLMs that turn 100,000+ enterprise documents into actionable knowledge.",
        "hero_stat_latency": "< 15ms",
        "hero_stat_arch": "Hybrid RAG + Cohere Re-Ranker",
        "detailed_summary": "Generative AI Systems combine private Retrieval-Augmented Generation (RAG) pipelines with domain fine-tuned LLMs to extract insights from 100,000+ enterprise documents with zero hallucination.",
        "detailed_explanation": "Standard public LLMs suffer from data privacy risks and hallucinated facts. Buildlyst constructs private, grounded RAG architectures using hybrid dense vector search (BM25 + text-embedding-3) and Cohere re-rankers. Your team can chat with proprietary PDFs, contracts, and knowledge bases with page-level citations.",
        "overview_highlights": [
            ("📄 Hybrid RAG Indexing", "Parses complex multi-page PDFs, tables, and scanned forms into structured semantic embeddings."),
            ("🔍 Cohere v3 Re-Ranker", "Cross-encoder re-ranking guarantees only the top 5 most accurate context chunks feed the LLM."),
            ("🛡️ Private VPC Isolation", "Deploy inside your air-gapped AWS/Azure VPC so sensitive company data never leaks to public endpoints."),
            ("💬 Page-Level Citations", "Every generated response includes click-to-verify citations linked directly to original source documents.")
        ],
        "image": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "blueprint_nodes": [
            ("Unstructured PDF & Doc Ingestion", "LLAMAINDEX PARSER", "Parses enterprise PDFs, DOCX, & contract files", "📄"),
            ("3072-Dim Hybrid Embedding Index", "BM25 + DENSE RAG", "Computes vector embeddings with sparse keyword index", "📉"),
            ("Cohere v3 Semantic Re-Ranker", "COHERE RERANK V3", "Re-ranks top 25 chunks down to top 5 context clauses", "🗄️"),
            ("Fine-Tuned Llama 3 Audit LLM", "VLLM / AWS BEDROCK", "Generates grounded answers with exact page citations", "💬")
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
        "faqs": [
            ("Is our sensitive company data sent to third-party public AI models?", "No. We build private RAG systems that can be hosted inside your own AWS/Azure VPC or air-gapped private servers so data never leaves your perimeter."),
            ("How do you guarantee the AI won't make up false facts (hallucinate)?", "We use strict Cohere semantic re-ranking and prompt constraint rules that enforce page-level citations. If context is not found in your PDFs, the AI returns an explicit 'not found' response."),
            ("Can this handle handwritten documents or complex table formats?", "Yes. We integrate Multimodal OCR engines (Unstructured / Azure Document Intelligence) that parse complex tables, charts, and scanned PDF forms."),
            ("Can we fine-tune open-source models like Llama 3 or Mistral?", "Yes. We quantize and fine-tune open-source 8B, 70B, or Mixtral models specifically on your industry syntax.")
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

# Buildlyst RAG Architecture
documents = SimpleDirectoryReader("./legal_silos").load_data()
reranker = CohereRerank(top_n=5, model="rerank-english-v3.0")

index = VectorStoreIndex.from_documents(documents)
query_engine = index.as_query_engine(
    node_postprocessors=[reranker], streaming=True
)''',
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
        "hero_headline": "Machine & Deep<br>Learning.",
        "hero_subtext": "We train custom deep learning models and 60 FPS computer vision pipelines accelerated with NVIDIA TensorRT for sub-5ms real-time inference.",
        "hero_stat_latency": "< 3.8ms",
        "hero_stat_arch": "NVIDIA TensorRT 10.0 Engine",
        "detailed_summary": "Machine & Deep Learning systems deliver real-time predictive analytics, 60 FPS computer vision defect detection, and automated anomaly scoring with sub-5ms GPU inference latencies.",
        "detailed_explanation": "From manufacturing quality control to financial fraud detection, Buildlyst trains PyTorch and YOLO deep neural networks optimized via NVIDIA TensorRT 10. We package models into automated MLOps pipelines (MLflow / Kubeflow) featuring continuous retraining DAGs to prevent model accuracy drift.",
        "overview_highlights": [
            ("⚡ Sub-5ms GPU Inference", "NVIDIA TensorRT FP16 quantization for microsecond computer vision and predictive scoring."),
            ("📷 60 FPS Computer Vision", "Real-time RTSP 4K camera stream processing for manufacturing line defect ejection."),
            ("📊 MLOps & Drift Tracking", "Automated MLflow telemetry tracking metric drift and triggering continuous retraining."),
            ("📱 Edge AI Optimization", "Quantized ONNX models optimized for low-power NVIDIA Jetson edge hardware.")
        ],
        "image": "https://images.unsplash.com/photo-1518932945647-7a3c96943e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "blueprint_nodes": [
            ("60 FPS 4K Industrial RTSP Camera Feed", "RTSP / OPENCV", "Captures high-resolution assembly line frames", "📦"),
            ("CUDA Feature Normalization Store", "CUDA FEATURE STORE", "Preprocesses & normalizes image tensors in GPU VRAM", "🧹"),
            ("NVIDIA TensorRT YOLO Neural Engine", "CUDA / TENSORRT", "Runs deep neural network inference in 3.8ms", "🖥️"),
            ("PLC Hardware Conveyor Ejection Signal", "REST / MLFLOW API", "Dispatches hardware signal to eject defective items", "🎯")
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

# Buildlyst TensorRT 60 FPS Engine
engine_path = "models/omnivision_v8.engine"
with open(engine_path, "rb") as f, trt.Runtime(TRT_LOGGER) as runtime:
    engine = runtime.deserialize_cuda_engine(f.read())

# Low-Latency Inference Stream
output = tensorrt_infer(engine, frame_tensor)
if output['defect_score'] > 0.99:
    plc_eject_trigger.send_signal()''',
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
        "hero_headline": "Data<br>Engineering.",
        "hero_subtext": "We construct 5,000+ event/sec Kafka streaming pipelines, Airflow DAGs, and Snowflake cloud lakehouses with automated dbt data quality verification.",
        "hero_stat_latency": "< 4ms",
        "hero_stat_arch": "Kafka Stream + Snowflake Lakehouse",
        "detailed_summary": "Data Engineering services build high-throughput Apache Kafka event streaming pipelines, Apache Airflow ETL DAGs, and Snowflake cloud data lakehouses that handle 5,000+ events/sec.",
        "detailed_explanation": "Raw, scattered data creates business bottlenecks. Buildlyst consolidates transactional databases, logs, and APIs into clean, ACID-compliant cloud warehouses (Snowflake / BigQuery). We embed automated dbt data testing suites into Airflow to eliminate corrupt or missing records before feeding Looker BI dashboards.",
        "overview_highlights": [
            ("🌐 5,000 Events/sec Streaming", "Apache Kafka multi-broker clusters for real-time event streaming and ingestion."),
            ("⚙️ Apache Airflow & dbt DAGs", "Automated SQL transformations with zero-null schema data quality testing."),
            ("🏢 Snowflake Cloud Lakehouse", "Scalable, micro-partitioned columnar storage with role-based data masking."),
            ("💡 Executive BI Dashboards", "Real-time sync to Looker, Tableau, and downstream machine learning feature stores.")
        ],
        "image": "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "blueprint_nodes": [
            ("Kafka Event Stream & Ingress Gateway", "KAFKA / FIVETRAN", "Captures 5,000 transaction events/sec", "🌐"),
            ("Apache Airflow DAG & dbt Transforms", "AIRFLOW / DBT", "Runs hourly SQL models & data quality tests", "⚙️"),
            ("Snowflake Columnar Data Lakehouse", "SNOWFLAKE DB", "ACID compliant transaction data storage", "🏢"),
            ("Executive Tableau BI & Feature Store", "TABLEAU / LOOKER", "Feeds real-time executive BI dashboards", "💡")
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

# Buildlyst Data Pipeline
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
        "hero_headline": "Website<br>Development.",
        "hero_subtext": "We engineer sub-second Next.js 19 multi-tenant SaaS applications and high-converting glassmorphic portals deeply integrated with Python FastAPI backends.",
        "hero_stat_latency": "< 80ms TTFB",
        "hero_stat_arch": "Next.js 19 SSR + Vercel Edge",
        "detailed_summary": "Web Development services deliver high-performance, full-stack multi-tenant SaaS platforms built with Next.js 19, Python FastAPI backends, and sub-1s Vercel Global Edge CDN rendering.",
        "detailed_explanation": "Slow websites lose revenue. Buildlyst builds bespoke glassmorphic web applications featuring Server-Side Rendering (SSR), warm Redis query caching, and mobile-first responsive architecture. All web portals feature built-in Stripe subscription billing, JWT session authentication, and embedded AI chatbots.",
        "overview_highlights": [
            ("⚡ 99+ Lighthouse Score", "Next.js 19 React Server Components (RSC) for sub-second global page loads."),
            ("🚪 FastAPI Async Microservices", "High-concurrency Python backend APIs with automated Pydantic schema validation."),
            ("☁️ Redis Warm Query Cache", "In-memory caching layer that eliminates database read latency under high traffic."),
            ("💳 Stripe Subscription Billing", "Flawless multi-currency Stripe and Razorpay recurring payment gateway integration.")
        ],
        "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "blueprint_nodes": [
            ("Next.js 19 React Client Frontend", "NEXT.JS / TAILWIND", "SSR rendering & GSAP smooth glassmorphic UI", "💻"),
            ("FastAPI Async API Gateway", "PYTHON / FASTAPI", "Async endpoints with JWT auth middleware", "🚪"),
            ("PostgreSQL & Redis Warm Cache", "POSTGRES / REDIS", "ACID database & warm Redis query caching", "☁️"),
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

app = FastAPI(title="Buildlyst Web Core", version="3.0")

@app.get("/api/v1/tenant/analytics")
async def get_analytics(user=Depends(verify_jwt_session)):
    # Redis Warm Query Cache
    cached_data = await redis_cache.get(f"tenant:{user.tenant_id}")
    if cached_data:
        return cached_data
    return await db.fetch_tenant_analytics(user.tenant_id)''',
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

print("SERVICE PAGES REGENERATED WITH FONT SIZES FULLY INSPIRED BY HOME PAGE!")
