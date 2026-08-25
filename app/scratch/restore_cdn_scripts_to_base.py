import os

BASE_FILE = r"d:\End to End Projects\buildlyst\app\templates\base.html"

# Update base.html to include all necessary GSAP and Three.js CDN scripts in the body
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
    <link rel="stylesheet" href="/static/css/style.css?v=1.7">
</head>

<body class="dark-theme">

    {% block back_button %}{% endblock %}

    <!-- Main Content Wrapper -->
    <div id="main-content">

        <!-- Ambient Background Effects -->
        <div class="ambient-glow glow-1"></div>
        <div class="ambient-glow glow-2"></div>

        <!-- Pill Navigation -->
        <nav class="pill-nav">
            <a href="/" class="logo text-gradient">Buildlyst</a>
            
            <div class="pill-links">
                {% if request.url.path.startswith('/services/') %}
                    <a href="/services/ai-agents" class="{% if request.url.path == '/services/ai-agents' %}active{% endif %}">🤖 AI Agents</a>
                    <a href="/services/gen-ai" class="{% if request.url.path == '/services/gen-ai' %}active{% endif %}">🧠 Gen AI</a>
                    <a href="/services/machine-learning" class="{% if request.url.path == '/services/machine-learning' %}active{% endif %}">🔬 Machine Learning</a>
                    <a href="/services/data-engineering" class="{% if request.url.path == '/services/data-engineering' %}active{% endif %}">🗄️ Data Engineering</a>
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
                    <a href="/" class="btn btn-primary glow-border-btn pill-cta">&larr; Back to Home</a>
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
                        <a href="/services/ai-agents" class="mobile-nav-link">🤖 AI Agents</a>
                        <a href="/services/gen-ai" class="mobile-nav-link">🧠 Gen AI</a>
                        <a href="/services/machine-learning" class="mobile-nav-link">🔬 Machine Learning</a>
                        <a href="/services/data-engineering" class="mobile-nav-link">🗄️ Data Engineering</a>
                        <a href="/services/web-development" class="mobile-nav-link">⚡ Web Development</a>
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

print("THREE.JS AND GSAP CDN SCRIPTS SUCCESSFULLY RESTORED to BASE.HTML!")
