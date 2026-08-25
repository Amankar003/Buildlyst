import os

file_path = r'd:\End to End Projects\buildlyst\app\scratch\rebuild_services_hero_exact_home_style.py'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Inject responsive CSS classes into <style> block
responsive_css = """
    /* Responsive Grids */
    .responsive-grid { display: grid; }
    .grid-overview { grid-template-columns: 1.15fr 0.85fr; gap: 36px; align-items: center; }
    .grid-deliverables { grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }
    .grid-telemetry { grid-template-columns: 1fr 1fr; gap: 24px; align-items: stretch; }
    .grid-3d { grid-template-columns: 1fr 1fr; gap: 36px; align-items: center; margin-top: 30px; }

    @media (max-width: 992px) {
        .grid-overview, .grid-deliverables, .grid-telemetry, .grid-3d {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
        }
        .grid-overview > div:first-child { order: 2; margin-top: 20px; }
        .grid-overview > div:last-child { order: 1; }
        
        .arch-3d-wrapper { min-height: 350px !important; padding: 20px 0; }
        .arch-3d-stage { transform: scale(0.65) rotateX(50deg) rotateZ(-30deg) !important; }
        .arch-3d-wrapper.flat-view .arch-3d-stage { transform: scale(0.8) rotateX(0deg) rotateZ(0deg) !important; }
        
        .specs-table-wrapper { overflow-x: auto; width: 100%; }
        
        .hero-actions { justify-content: center; flex-wrap: wrap; display: flex; gap: 12px; }
        .overview-buttons-container { flex-direction: column; width: 100%; display: flex; gap: 12px; }
        .overview-buttons-container a { width: 100%; text-align: center; }
    }
</style>
"""

content = content.replace("</style>", responsive_css)

# 2. Replace inline styles with CSS classes
# Overview Grid
content = content.replace(
    'style="display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 36px; align-items: center;"',
    'class="responsive-grid grid-overview"'
)

# Deliverables Grid
content = content.replace(
    'class="split-layout" style="display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center;"',
    'class="responsive-grid grid-deliverables"'
)

# Telemetry Grid
content = content.replace(
    'style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: stretch;"',
    'class="responsive-grid grid-telemetry"'
)

# 3D Grid
content = content.replace(
    'style="display: grid; grid-template-columns: 1fr 1fr; gap: 36px; align-items: center; margin-top: 30px;"',
    'class="responsive-grid grid-3d"'
)

# Fix overview buttons container inline layout
content = content.replace(
    '<div style="display: flex; gap: 10px; align-items: center;">',
    '<div class="overview-buttons-container">'
)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Responsive classes injected and inline grids replaced.")
