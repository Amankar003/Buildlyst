import os
import re

script_path = r'd:\End to End Projects\buildlyst\app\scratch\rebuild_services_hero_exact_home_style.py'
with open(script_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace or upgrade the CSS block inside rebuild_services_hero_exact_home_style.py
css_injection = """
    /* ==========================================
       Comprehensive Responsive Grid & Layout Rules
       ========================================== */
    .responsive-grid { display: grid; }
    .grid-overview { grid-template-columns: 1.15fr 0.85fr; gap: 36px; align-items: center; }
    .grid-deliverables { grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }
    .grid-telemetry { grid-template-columns: 1fr 1fr; gap: 24px; align-items: stretch; }
    .grid-3d { grid-template-columns: 1fr 1fr; gap: 36px; align-items: center; margin-top: 30px; }

    /* Overview Highlights Grid */
    .overview-highlights-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
        margin-bottom: 20px;
    }

    /* Deliverables Glass Panel Image Wrapper */
    .deliverables-img-card {
        border-radius: 16px;
        position: relative;
        overflow: hidden;
        border: 1px solid rgba(255,255,255,0.08);
        box-shadow: 0 15px 35px rgba(0,0,0,0.4);
        min-height: 400px;
        height: 100%;
    }

    /* Telemetry Metrics Container */
    .telemetry-metrics-bar {
        margin-top: 14px;
        padding-top: 10px;
        border-top: 1px solid rgba(255,255,255,0.06);
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-family: monospace;
        font-size: 10px;
        color: #888;
        flex-wrap: wrap;
        gap: 8px;
    }

    /* 3D CTO Inspector Tech Grid */
    .cto-tech-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 14px;
        margin-bottom: 18px;
    }

    /* Technical Specs Table Overflow */
    .specs-table-wrapper {
        overflow-x: auto;
        width: 100%;
        -webkit-overflow-scrolling: touch;
    }
    .specs-table {
        min-width: 640px;
    }

    /* Service Navigation Bar */
    .service-nav-container {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        margin-top: 24px;
        justify-content: center;
    }

    /* Tablet & Mobile Media Queries (< 992px) */
    @media (max-width: 992px) {
        .grid-overview, .grid-deliverables, .grid-telemetry, .grid-3d {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
        }
        
        /* Proper Mobile Reading Order: Text first (Order 1), Diagram second (Order 2) */
        .grid-overview > div:first-child { order: 1 !important; margin-top: 0 !important; }
        .grid-overview > div:last-child { order: 2 !important; margin-top: 16px !important; }
        
        .deliverables-img-card {
            min-height: 240px !important;
            height: 280px !important;
        }
        
        .arch-3d-wrapper {
            min-height: 320px !important;
            padding: 10px 0 !important;
        }
        .arch-3d-stage {
            transform: scale(0.6) rotateX(50deg) rotateZ(-30deg) !important;
        }
        .arch-3d-wrapper.flat-view .arch-3d-stage {
            transform: scale(0.75) rotateX(0deg) rotateZ(0deg) !important;
        }

        .hero-actions {
            justify-content: center;
            flex-wrap: wrap;
            display: flex;
            gap: 12px;
        }
        .overview-buttons-container {
            flex-direction: column;
            width: 100%;
            display: flex;
            gap: 12px;
        }
        .overview-buttons-container a {
            width: 100%;
            text-align: center;
        }
    }

    /* Small Mobile Media Queries (< 576px) */
    @media (max-width: 576px) {
        .overview-highlights-grid {
            grid-template-columns: 1fr !important;
        }
        .cto-tech-grid {
            grid-template-columns: 1fr !important;
        }
        .telemetry-metrics-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: 6px;
        }
        .arch-3d-stage {
            transform: scale(0.5) rotateX(50deg) rotateZ(-30deg) !important;
        }
        .arch-3d-wrapper {
            min-height: 280px !important;
        }
    }
</style>
"""

# Check if responsive CSS block exists and replace up to </style>
if "/* Responsive Grids */" in content:
    pattern = re.compile(r'/\*\s*Responsive Grids\s*\*/.*?</style>', re.DOTALL)
    content = pattern.sub(css_injection.strip(), content)
elif "</style>" in content:
    content = content.replace("</style>", css_injection.strip())

# 2. Update HTML markup to use responsive classes
# Overview Highlights Grid
content = content.replace(
    'style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px;"',
    'class="overview-highlights-grid"'
)

# Deliverables Image Card
content = content.replace(
    '<div class="glass-panel" style="border-radius: 16px; position: relative; overflow: hidden; border: 1px solid rgba(255,255,255,0.08); box-shadow: 0 15px 35px rgba(0,0,0,0.4); min-height: 400px; height: 100%;">',
    '<div class="glass-panel deliverables-img-card">'
)

# Telemetry Metrics Bar
content = content.replace(
    'style="margin-top: 14px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.06); display: flex; justify-content: space-between; align-items: center; font-family: monospace; font-size: 10px; color: #888;"',
    'class="telemetry-metrics-bar"'
)

# CTO Tech Grid
content = content.replace(
    'style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 18px;"',
    'class="cto-tech-grid"'
)

with open(script_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Comprehensive responsive styles & classes updated in rebuild script.")
