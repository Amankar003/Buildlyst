import os

SERVICES_DIR = r"d:\End to End Projects\buildlyst\app\templates\services"
os.makedirs(SERVICES_DIR, exist_ok=True)

# 1. Update services_layout.html (Fixed top-left Back to Home button that stays on screen during scroll)
layout_html = """{% extends 'base.html' %}

{% block back_button %}
<!-- FIXED STICKY TOP-LEFT BACK TO HOME BUTTON (STAYS VISIBLE ON SCREEN ON ALL SCROLL POSITIONS) -->
<div style="position: fixed; top: 22px; left: 24px; z-index: 99999;">
    <a href="/" class="btn glass-btn" style="padding: 10px 20px; font-size: 13px; font-weight: 700; display: inline-flex; align-items: center; gap: 8px; border-radius: 50px; border: 1.5px solid rgba(0, 210, 255, 0.4); background: rgba(5, 12, 28, 0.92); color: #fff; box-shadow: 0 8px 30px rgba(0,0,0,0.6), 0 0 20px rgba(0, 210, 255, 0.25); backdrop-filter: blur(12px); text-decoration: none; transition: all 0.3s ease;"
       onmouseover="this.style.transform='translateY(-2px) scale(1.05)'; this.style.borderColor='#00d2ff'; this.style.boxShadow='0 12px 35px rgba(0, 210, 255, 0.4)';"
       onmouseout="this.style.transform='translateY(0) scale(1)'; this.style.borderColor='rgba(0, 210, 255, 0.4)'; this.style.boxShadow='0 8px 30px rgba(0,0,0,0.6), 0 0 20px rgba(0, 210, 255, 0.25)';">
        <span style="color: var(--c-accent-cyan); font-size: 16px; font-weight: bold;">&larr;</span>
        <span>Back to Home</span>
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
        font-weight: 600;
        font-size: 13px;
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
        gap: 10px;
        flex-wrap: wrap;
        margin-top: 24px;
    }

    /* Project Architecture Blueprint Card */
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

<!-- EXACT HOME-STYLE SPLIT HERO SECTION (.hero-section + .hero-container + .hero-content + .hero-visual) -->
<section id="hero" class="hero-section reveal" style="padding-top: 110px;">
    <!-- Animated Gradient Waves (Identical to Home Page) -->
    <div class="wave-container">
        <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
            <defs>
                <path id="gentle-wave"
                    d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#00D2FF" />
                    <stop offset="50%" stop-color="#8A2387" />
                    <stop offset="100%" stop-color="#3A7BD5" />
                </linearGradient>
            </defs>
            <g class="parallax-waves">
                <use xlink:href="#gentle-wave" x="48" y="0" fill="url(#wave-gradient)" opacity="0.05" />
                <use xlink:href="#gentle-wave" x="48" y="3" fill="url(#wave-gradient)" opacity="0.1" />
                <use xlink:href="#gentle-wave" x="48" y="5" fill="url(#wave-gradient)" opacity="0.15" />
                <use xlink:href="#gentle-wave" x="48" y="7" fill="url(#wave-gradient)" opacity="0.25" />
            </g>
        </svg>
    </div>

    {% block service_hero %}{% endblock %}

</section>

{% block service_detail %}{% endblock %}

<!-- CONTACT US SECTION (CONVERSATIONAL UI FROM HOME PAGE) -->
<section id="contact" class="contact-section reveal" style="padding: 80px 0; border-top: 1px solid rgba(255,255,255,0.05); background: radial-gradient(circle at bottom center, rgba(0, 210, 255, 0.05) 0%, transparent 70%);">
    <div class="container">
        <div class="section-header text-center" style="margin-bottom: 24px;">
            <h2 class="text-gradient"
                style="font-size: clamp(32px, 5vw, 48px); margin-bottom: 16px; line-height: 1.1;">Ready to
                transform your data into leverage?</h2>
            <p class="subtext mx-auto text-center" style="margin: 0 auto;">Join elite companies building the
                future with Buildlyst.</p>
        </div>
        <div class="contact-grid">
            <div class="contact-form-wrapper glass-panel glow-border p-lg">
                <h2 class="section-heading" style="margin-bottom: 24px; font-size: 28px;">Initiate Project</h2>

                <div class="conversational-ui-container">
                    <div class="conv-messages" id="conv-messages">
                        <div class="conv-bubble system">
                            <div class="conv-avatar">B</div>
                            <div class="conv-text">Hello! I'm the Buildlyst assistant. I'll help you get your
                                project started. First, what is your name?</div>
                        </div>
                    </div>

                    <div class="conv-input-area" id="conv-input-area">
                        <input type="text" id="conv-input" class="glass-input" placeholder="Type your name..."
                            autocomplete="off">
                        <button id="conv-send" class="btn btn-primary glow-border-btn">Send</button>
                    </div>
                    <div class="conv-options-area hidden" id="conv-options-area">
                        <!-- Options injected by JS -->
                    </div>
                </div>
            </div>
            <div class="contact-info">
                <div class="info-block glass-panel">
                    <span class="overline highlight">Headquarters</span>
                    <p>Bangalore, India<br>Remote Worldwide</p>
                </div>
                <div class="info-block glass-panel">
                    <span class="overline highlight">Also Present In</span>
                    <p>Hyderabad<br>Noida</p>
                </div>
                <div class="info-block glass-panel">
                    <span class="overline highlight">Direct Inquiry</span>
                    <p><a href="mailto:info.buildlyst@gmail.com"
                            class="text-gradient">info.buildlyst@gmail.com</a></p>
                </div>
                <div class="info-block glass-panel">
                    <span class="overline highlight">Socials</span>
                    <div style="display: flex; gap: 16px; margin-top: 12px;">
                        <a href="#"
                            style="width: 44px; height: 44px; border-radius: 50%; background: rgba(255,255,255,0.03); border: 1px solid var(--c-border); display: flex; align-items: center; justify-content: center; color: #fff; transition: all 0.3s ease;"
                            onmouseover="this.style.background='rgba(0, 210, 255, 0.1)'; this.style.borderColor='var(--c-accent-cyan)'"
                            onmouseout="this.style.background='rgba(255,255,255,0.03)'; this.style.borderColor='var(--c-border)'">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                            </svg>
                        </a>
                        <a href="#"
                            style="width: 44px; height: 44px; border-radius: 50%; background: rgba(255,255,255,0.03); border: 1px solid var(--c-border); display: flex; align-items: center; justify-content: center; color: #fff; transition: all 0.3s ease;"
                            onmouseover="this.style.background='rgba(0, 210, 255, 0.1)'; this.style.borderColor='var(--c-accent-cyan)'"
                            onmouseout="this.style.background='rgba(255,255,255,0.03)'; this.style.borderColor='var(--c-border)'">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path
                                    d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z">
                                </path>
                                <rect x="2" y="9" width="4" height="12"></rect>
                                <circle cx="4" cy="4" r="2"></circle>
                            </svg>
                        </a>
                        <a href="#"
                            style="width: 44px; height: 44px; border-radius: 50%; background: rgba(255,255,255,0.03); border: 1px solid var(--c-border); display: flex; align-items: center; justify-content: center; color: #fff; transition: all 0.3s ease;"
                            onmouseover="this.style.background='rgba(0, 210, 255, 0.1)'; this.style.borderColor='var(--c-accent-cyan)'"
                            onmouseout="this.style.background='rgba(255,255,255,0.03)'; this.style.borderColor='var(--c-border)'">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path
                                    d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z">
                                </path>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

{% endblock %}
"""

with open(os.path.join(SERVICES_DIR, "services_layout.html"), "w", encoding="utf-8") as f:
    f.write(layout_html)

print("FIXED STICKY BACK TO HOME BUTTON DEPLOYED AT TOP-LEFT HIGH Z-INDEX PERFECTLY!")
