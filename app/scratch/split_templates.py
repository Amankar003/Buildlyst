import os

BASE_DIR = r"d:\End to End Projects\buildlyst\app\templates"
INDEX_PATH = os.path.join(BASE_DIR, "index.html")
BASE_PATH = os.path.join(BASE_DIR, "base.html")

with open(INDEX_PATH, "r", encoding="utf-8") as f:
    lines = f.readlines()

# Find markers
hero_start = -1
mobile_menu_start = -1
mobile_menu_end = -1
about_start = -1
footer_start = -1

for i, line in enumerate(lines):
    if "<!-- Hero Section -->" in line:
        hero_start = i
    elif "<!-- Mobile Navigation Overlay / Drawer -->" in line:
        mobile_menu_start = i
    elif "<!-- The Buildlyst Philosophy (About) Section -->" in line:
        about_start = i
    elif "<!-- Footer (Redesigned) -->" in line:
        footer_start = i

# The mobile menu ends right before the about section.
# Actually, let's find the exact end of mobile menu.
for i in range(mobile_menu_start, about_start):
    if "</div>" in lines[i] and "<!-- The Buildlyst" in lines[i+2]: # Approximation
        pass
# Let's just find the empty line before about_start
mobile_menu_end = about_start - 1
while not lines[mobile_menu_end-1].strip():
    mobile_menu_end -= 1

# Header lines: from start to hero_start
header_lines = lines[:hero_start]

# Mobile menu lines: from mobile_menu_start to about_start (excluding blank lines)
mobile_menu_lines = lines[mobile_menu_start:about_start]

# Footer lines: from footer_start to end
footer_lines = lines[footer_start:]

# Content lines: 
# Hero (hero_start to mobile_menu_start) + About to Footer (about_start to footer_start)
content_lines = lines[hero_start:mobile_menu_start] + lines[about_start:footer_start]

# Construct base.html
base_content = "".join(header_lines) + "\n" + "".join(mobile_menu_lines) + "\n        {% block content %}\n        {% endblock %}\n\n" + "".join(footer_lines)

with open(BASE_PATH, "w", encoding="utf-8") as f:
    f.write(base_content)

# Construct new index.html
new_index_content = "{% extends 'base.html' %}\n\n{% block content %}\n" + "".join(content_lines) + "{% endblock %}\n"

with open(INDEX_PATH, "w", encoding="utf-8") as f:
    f.write(new_index_content)

print("Template refactoring completed successfully.")
