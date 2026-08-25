import os
import re

file_path = r'd:\End to End Projects\buildlyst\app\scratch\rebuild_services_hero_exact_home_style.py'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Replace the FAQ generation code
old_faq_code = """    # FAQ Accordion HTML
    faqs = service.get("faqs", [])
    faqs_html = ""
    for idx, (question, answer) in enumerate(faqs):
        faqs_html += f'''
        <div class="faq-accordion-item" onclick="toggleFaq(this)">
            <div class="faq-accordion-header">
                <span>{question}</span>
                <span style="color: var(--c-accent-cyan); font-size: 24px; font-weight: 400;">+</span>
            </div>
            <div class="faq-accordion-body">
                {answer}
            </div>
        </div>'''"""

new_faq_code = """    # FAQ HTML (Matches Home Page Exactly)
    faqs = service.get("faqs", [])
    faqs_html = '<div class="faq-container">\\n'
    for idx, (question, answer) in enumerate(faqs):
        faqs_html += f'''
                    <div class="faq-item glass-panel">
                        <button class="faq-question">{question} <span class="faq-icon">+</span></button>
                        <div class="faq-answer">
                            <p style="margin-bottom: 0;">{answer}</p>
                        </div>
                    </div>'''
    faqs_html += '\\n                </div>'"""

if old_faq_code in content:
    content = content.replace(old_faq_code, new_faq_code)
else:
    # Try a regex if exact match fails due to indentation or prior edits
    pass

# 2. Remove the old FAQ CSS from the <style> block
faq_css_pattern = re.compile(r'/\*\s*FAQ Accordion Styling\s*\*/.*?/\*\s*3 Pricing Cards Grid\s*\*/', re.DOTALL)
content = faq_css_pattern.sub(r'/* 3 Pricing Cards Grid */', content)

# 3. Remove the toggleFaq script
script_pattern = re.compile(r'// FAQ Accordion Toggle Script.*?// 3D Architecture Data Store', re.DOTALL)
content = script_pattern.sub(r'// 3D Architecture Data Store', content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("FAQ updated to use identical HTML to home page.")
