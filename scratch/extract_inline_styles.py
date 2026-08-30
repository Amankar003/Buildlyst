import re
import os

base_html_path = r"d:\End to End Projects\buildlyst\app\templates\base.html"
services_layout_path = r"d:\End to End Projects\buildlyst\app\templates\services\services_layout.html"
globals_css_path = r"d:\End to End Projects\buildlyst\frontend\src\app\globals.css"

extracted_styles = []

# 1. Parse base.html
if os.path.exists(base_html_path):
    with open(base_html_path, "r", encoding="utf-8") as f:
        content = f.read()
    # Find style blocks
    matches = re.findall(r"<style>(.*?)</style>", content, re.DOTALL)
    for m in matches:
        extracted_styles.append(f"\n/* --- Extracted from base.html --- */\n" + m.strip())

# 2. Parse services_layout.html
if os.path.exists(services_layout_path):
    with open(services_layout_path, "r", encoding="utf-8") as f:
        content = f.read()
    matches = re.findall(r"<style>(.*?)</style>", content, re.DOTALL)
    for m in matches:
        extracted_styles.append(f"\n/* --- Extracted from services_layout.html --- */\n" + m.strip())

# 3. Append to globals.css
if extracted_styles and os.path.exists(globals_css_path):
    with open(globals_css_path, "a", encoding="utf-8") as f:
        f.write("\n\n" + "\n\n".join(extracted_styles) + "\n")
    print(f"Successfully appended {len(extracted_styles)} style blocks to globals.css!")
else:
    print("Failed to append styles: files not found or no styles extracted.")
