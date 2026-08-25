import re
import os

file_path = r'd:\End to End Projects\buildlyst\app\scratch\rebuild_services_hero_exact_home_style.py'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix heading sizes (remove inline styles that override the clamp font-size)
content = re.sub(r'<h2 class=\"section-heading text-gradient\" style=\"[^\"]+\">', r'<h2 class=\"section-heading text-gradient\">', content)
content = re.sub(r'<h2 class=\"section-heading\" style=\"[^\"]+\">', r'<h2 class=\"section-heading\">', content)

# Fix the specific multiline text-gradient for Contact Us
contact_h2_pattern = re.compile(r'<h2 class=\"text-gradient\"[^>]*style=\"font-size:\s*clamp[^>]+>', re.MULTILINE | re.DOTALL)
content = contact_h2_pattern.sub(r'<h2 class="section-heading text-gradient">', content)

# Fix image size issue
content = content.replace(
    '<div class="glass-panel" style="border-radius: 16px; position: relative; overflow: hidden; border: 1px solid rgba(255,255,255,0.08); box-shadow: 0 15px 35px rgba(0,0,0,0.4);">',
    '<div class="glass-panel" style="border-radius: 16px; position: relative; overflow: hidden; border: 1px solid rgba(255,255,255,0.08); box-shadow: 0 15px 35px rgba(0,0,0,0.4); min-height: 400px; height: 100%;">'
)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed rebuild script.")
