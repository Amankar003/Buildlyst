import os

# Read the latest generator script
with open('app/scratch/rebuild_services_without_inline_overrides.py', 'r', encoding='utf-8') as f:
    code = f.read()

# Replace inline grids with CSS classes
code = code.replace(
    'style="display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 36px; align-items: center;"',
    'class="responsive-service-grid responsive-service-grid-overview"'
)

code = code.replace(
    'style="display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center;"',
    'class="responsive-service-grid responsive-service-grid-deliverables"'
)

code = code.replace(
    'style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: stretch;"',
    'class="responsive-service-grid responsive-service-grid-telemetry"'
)

code = code.replace(
    'style="display: grid; grid-template-columns: 1fr 1fr; gap: 36px; align-items: center; margin-top: 30px;"',
    'class="responsive-service-grid responsive-service-grid-3d"'
)

# Fix overview buttons container
code = code.replace(
    '<div style="display: flex; gap: 10px; align-items: center;">',
    '<div class="overview-buttons-container">'
)

# Fix specs table
code = code.replace(
    '<table class="specs-table">',
    '<div class="specs-table-wrapper"><table class="specs-table">'
)
code = code.replace(
    '</table>\n            </div>',
    '</table></div>\n            </div>'
)

# Style block for responsiveness (Double curly braces to escape inside f-string)
style_block = """
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
"""

code = code.replace('<div style="min-height: 100vh;">', f'<div style="min-height: 100vh;">{style_block}')

with open('app/scratch/rebuild_services_responsive.py', 'w', encoding='utf-8') as f:
    f.write(code)

print("Script generated.")
