import os

BASE_FILE = r"d:\End to End Projects\buildlyst\app\templates\base.html"
SERVICES_DIR = r"d:\End to End Projects\buildlyst\app\templates\services"
os.makedirs(SERVICES_DIR, exist_ok=True)

# 1. Update base.html with Service-Specific Compact Navbar Styles and correct links
base_html = """<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Buildlyst | Premium AI & Data Engineering</title>

    <!-- Fonts: Space Grotesk (Display) & DM Sans (Body) -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Space+Grotesk:wght@500;600;700&display=swap"
        rel="stylesheet">

    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/static/img/favicon.svg">

    <!-- Advanced SEO & Search Engine Optimization Tags -->
    <meta name="keywords"
        content="AI Agency, Data Engineering Studio, Custom AI Agents, GenAI Development, Machine Learning Pipelines, Python FastAPI Developers, RAG Systems, Enterprise AI Solutions India, AI Agency Bhopal Delhi Bangalore">
    <meta name="author" content="Buildlyst Studio">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <link rel="canonical" href="https://buildlyst.in/">

    <!-- Geo Targeting Meta Tags -->
    <meta name="geo.region" content="IN">
    <meta name="geo.placename" content="India">

    <!-- Schema.org JSON-LD Structured Data for Google Rich Snippets -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Buildlyst",
      "image": "https://buildlyst.in/static/img/og-preview.svg",
      "@id": "https://buildlyst.in/#organization",
      "url": "https://buildlyst.in/",
      "telephone": "+91-0000000000",
      "priceRange": "₹35,000 - ₹2,50,000+",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IN"
      },
      "knowsAbout": [
        "AI Agents",
        "Generative AI",
        "Data Engineering Pipelines",
        "Machine Learning",
        "RAG Architectures",
        "Full-Stack Web Engineering"
      ],
      "description": "Buildlyst is an elite AI & Data Engineering studio architecting custom AI agents, machine learning pipelines, and scalable enterprise data systems."
    }
    </script>

    <!-- Primary Meta Tags -->
    <meta name="title" content="Buildlyst | Premium AI & Data Engineering Studio">
    <meta name="description"
        content="We build high-performance AI agents, machine learning pipelines, and custom data systems that transform how businesses operate.">

    <!-- Open Graph / Facebook / WhatsApp / LinkedIn Card Preview -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://buildlyst.in/">
    <meta property="og:title" content="Buildlyst | Premium AI & Data Engineering Studio">
    <meta property="og:description"
        content="We build high-performance AI agents, machine learning pipelines, and custom data systems that transform how businesses operate.">
    <meta property="og:image" content="https://buildlyst.vercel.app/static/img/og-preview.svg">

    <!-- Twitter / X Card Preview -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="https://buildlyst.in/">
    <meta name="twitter:title" content="Buildlyst | Premium AI & Data Engineering Studio">
    <meta name="twitter:description"
        content="We build high-performance AI agents, machine learning pipelines, and custom data systems that transform how businesses operate.">
    <meta name="twitter:image" content="https://buildlyst.vercel.app/static/img/og-preview.svg">

    <!-- Styles -->
    <link rel="stylesheet" href="/static/css/style.css?v=1.9">

    <style>
        /* Compact Responsive Header/Navbar specifically for the 5 Service Sections */
        .service-nav-pill {
            gap: 16px !important;
            padding: 6px 12px 6px 24px !important;
            max-width: 95% !important;
        }
        .service-nav-pill .pill-links {
            gap: 8px !important;
        }
        .service-nav-pill .pill-links a {
            font-size: 11px !important;
            font-weight: 700 !important;
            padding: 6px 10px !important;
            letter-spacing: 0.2px !important;
            border-radius: 30px !important;
            transition: all 0.25s ease !important;
        }
        .service-nav-pill .pill-links a:hover, 
        .service-nav-pill .pill-links a.active {
            background: rgba(0, 210, 255, 0.08) !important;
            color: #00d2ff !important;
            box-shadow: inset 0 0 10px rgba(0, 210, 255, 0.1) !important;
        }
        .service-nav-pill .nav-right .pill-cta {
            padding: 8px 14px !important;
            font-size: 11px !important;
            font-weight: 700 !important;
        }

        /* Responsive Mobile adjustment for service nav inside pill-nav */
        @media (max-width: 992px) {
            .service-nav-pill .pill-links {
                display: none !important; /* Hide links on tablet/mobile and let mobile drawer handle it */
            }
        }
    </style>
</head>

<body class="dark-theme">

    {% block back_button %}{% endblock %}

    <!-- Main Content Wrapper -->
    <div id="main-content">

        <!-- Ambient Background Effects -->
        <div class="ambient-glow glow-1"></div>
        <div class="ambient-glow glow-2"></div>

        <!-- Pill Navigation (Uses conditional .service-nav-pill class to dynamically rescale elements) -->
        <nav class="pill-nav {% if request.url.path.startswith('/services/') %}service-nav-pill{% endif %}">
            <a href="/" class="logo text-gradient">Buildlyst</a>
            
            <div class="pill-links">
                {% if request.url.path.startswith('/services/') %}
                    <a href="/services/ai-agents" class="{% if request.url.path == '/services/ai-agents' %}active{% endif %}">🤖 AI Agents</a>
                    <a href="/services/gen-ai" class="{% if request.url.path == '/services/gen-ai' %}active{% endif %}">🧠 Gen AI</a>
                    <a href="/services/machine-learning" class="{% if request.url.path == '/services/machine-learning' %}active{% endif %}">🔬 ML</a>
                    <a href="/services/data-engineering" class="{% if request.url.path == '/services/data-engineering' %}active{% endif %}">🗄️ Data Eng</a>
                    <a href="/services/web-development" class="{% if request.url.path == '/services/web-development' %}active{% endif %}">⚡ Web Dev</a>
                {% else %}
                    <a href="#about">About</a>
                    <a href="#services">Capabilities</a>
                    <a href="#playground">Playground</a>
                    <a href="#pricing">Pricing</a>
                    <a href="#faq">FAQ</a>
                {% endif %}
            </div>

            <div class="nav-right">
                {% if request.url.path.startswith('/services/') %}
                    <a href="/" class="btn btn-primary glow-border-btn pill-cta">&larr; Home</a>
                {% else %}
                    <a href="#contact" class="btn btn-primary glow-border-btn pill-cta">Let's Talk</a>
                {% endif %}
                <button class="mobile-menu-btn" id="mobile-menu-toggle" aria-label="Toggle Mobile Navigation">
                    <span class="hamburger-bar"></span>
                    <span class="hamburger-bar"></span>
                    <span class="hamburger-bar"></span>
                </button>
            </div>
        </nav>

        <!-- Mobile Navigation Overlay / Drawer -->
        <div class="mobile-menu-overlay" id="mobile-menu-overlay">
            <div class="mobile-menu-drawer glass-panel">
                <div class="mobile-menu-header">
                    <span class="logo text-gradient">Buildlyst</span>
                    <button class="mobile-menu-close" id="mobile-menu-close">&times;</button>
                </div>
                <div class="mobile-menu-links">
                    {% if request.url.path.startswith('/services/') %}
                        <a href="/" class="mobile-nav-link" style="color: var(--c-accent-cyan); font-weight: bold;">&larr; Back to Home Page</a>
                        <a href="/services/ai-agents" class="mobile-nav-link {% if request.url.path == '/services/ai-agents' %}active{% endif %}">🤖 AI Agents</a>
                        <a href="/services/gen-ai" class="mobile-nav-link {% if request.url.path == '/services/gen-ai' %}active{% endif %}">🧠 Gen AI</a>
                        <a href="/services/machine-learning" class="mobile-nav-link {% if request.url.path == '/services/machine-learning' %}active{% endif %}">🔬 Machine Learning</a>
                        <a href="/services/data-engineering" class="mobile-nav-link {% if request.url.path == '/services/data-engineering' %}active{% endif %}">🗄️ Data Engineering</a>
                        <a href="/services/web-development" class="mobile-nav-link {% if request.url.path == '/services/web-development' %}active{% endif %}">⚡ Web Development</a>
                    {% else %}
                        <a href="#about" class="mobile-nav-link">About</a>
                        <a href="#services" class="mobile-nav-link">Capabilities</a>
                        <a href="#playground" class="mobile-nav-link">Live Playground</a>
                        <a href="#architecture" class="mobile-nav-link">Architecture</a>
                        <a href="#pricing" class="mobile-nav-link">Pricing & Predictor</a>
                        <a href="#faq" class="mobile-nav-link">FAQ</a>
                    {% endif %}
                </div>
            </div>
        </div>

        {% block content %}{% endblock %}

        <!-- Footer -->
        <footer class="footer">
            <div class="container">
                <div class="footer-content" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px; padding: 40px 0; border-top: 1px solid rgba(255,255,255,0.06);">
                    <div>
                        <a href="/" class="logo text-gradient" style="font-size: 24px; font-weight: 700;">Buildlyst</a>
                        <p style="color: var(--c-text-secondary); font-size: 13px; margin-top: 6px;">Enterprise AI & Data Engineering Studio. 100% Custom Architecture.</p>
                    </div>
                    <div style="font-size: 13px; color: var(--c-text-secondary);">
                        &copy; 2026 Buildlyst. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>

    </div>

    <!-- Scripts -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/postprocessing/EffectComposer.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/postprocessing/RenderPass.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/postprocessing/ShaderPass.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/shaders/CopyShader.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/shaders/LuminosityHighPassShader.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/postprocessing/UnrealBloomPass.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.12/dist/gsap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.12/dist/ScrollTrigger.min.js"></script>
    <script src="/static/js/main.js"></script>
</body>
</html>
"""

with open(BASE_FILE, "w", encoding="utf-8") as f:
    f.write(base_html)

# 2. Update services_layout.html (Adjust container to fit header changes)
services_layout_html = """{% extends 'base.html' %}

{% block back_button %}
<!-- Floating back button removed. Sticky Back CTA is cleanly placed in the main pill-nav bar. -->
{% endblock %}

{% block content %}
<style>
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
<section id="hero" class="hero-section reveal">
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
    f.write(services_layout_html)

print("COMPACT SERVICE NAVBAR & NO FLOATING BUTTON INTEGRATED SUCCESSFULLY!")
