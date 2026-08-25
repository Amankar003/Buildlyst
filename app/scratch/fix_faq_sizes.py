import os

file_path = r'd:\End to End Projects\buildlyst\app\scratch\rebuild_services_hero_exact_home_style.py'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace .faq-accordion-header
old_header = """    .faq-accordion-header {
        padding: 18px 24px;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: 700;
        font-size: 15px;
        color: #fff;
    }"""
new_header = """    .faq-accordion-header {
        padding: 24px;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: 600;
        font-family: var(--font-display);
        font-size: 20px;
        color: #fff;
    }"""
content = content.replace(old_header, new_header)

# Replace .faq-accordion-body
old_body = """    .faq-accordion-body {
        padding: 0 24px 18px 24px;
        color: var(--c-text-secondary);
        font-size: 14px;
        line-height: 1.6;
        display: none;
    }"""
new_body = """    .faq-accordion-body {
        padding: 0 24px 24px 24px;
        color: var(--c-text-secondary);
        font-size: 16px;
        line-height: 1.6;
        display: none;
    }"""
content = content.replace(old_body, new_body)

# Replace the icon font-size
content = content.replace(
    '<span style="color: var(--c-accent-cyan); font-size: 18px;">+</span>',
    '<span style="color: var(--c-accent-cyan); font-size: 24px; font-weight: 400;">+</span>'
)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("FAQ styles updated successfully.")
