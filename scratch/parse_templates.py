import os
import re
import json

templates_dir = r"d:\End to End Projects\buildlyst\app\templates\services"
files = {
    "ai-agents": "ai_agents.html",
    "gen-ai": "gen_ai.html",
    "machine-learning": "machine_learning.html",
    "data-engineering": "data_engineering.html",
    "web-development": "website_development.html"
}

data = {}

def clean_html(text):
    text = re.sub(r'\s+', ' ', text)
    text = text.replace('{% if request.url.path == \'/services/ai-agents\' %}active{% endif %}', '')
    text = text.strip()
    return text

for key, filename in files.items():
    path = os.path.join(templates_dir, filename)
    if not os.path.exists(path):
        print(f"Skipping {filename}")
        continue
        
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Extract Title / Headline
    headline_match = re.search(r'class="text-gradient-hero"[^>]*>(.*?)</h1>', content, re.DOTALL)
    headline = ""
    if headline_match:
        headline = clean_html(re.sub(r'<.*?>', ' ', headline_match.group(1)))
        
    # Extract Subtext
    subtext_match = re.search(r'<p class="subtext">(.*?)</p>', content, re.DOTALL)
    subtext = ""
    if subtext_match:
        subtext = clean_html(subtext_match.group(1))
        
    # Extract Deliverables List
    deliv_section = re.search(r'Exactly what we build.*?<ul[^>]*>(.*?)</ul>', content, re.DOTALL)
    deliverables = []
    if deliv_section:
        items = re.findall(r'<li[^>]*>(.*?)</li>', deliv_section.group(1), re.DOTALL)
        for item in items:
            cleaned = clean_html(re.sub(r'<.*?>', '', item)).replace('✓', '').strip()
            deliverables.append(cleaned)
            
    # Extract FAQs
    faq_section = re.search(r'id="faq".*?<div class="faq-container">(.*?)</div>', content, re.DOTALL)
    faqs = []
    if faq_section:
        items = re.findall(r'<div class="faq-item.*?<button[^>]*>(.*?)</button>.*?<div class="faq-answer">.*?<p[^>]*>(.*?)</p>', faq_section.group(1), re.DOTALL)
        for q, a in items:
            cleaned_q = clean_html(re.sub(r'<.*?>', '', q)).replace('+', '').strip()
            cleaned_a = clean_html(re.sub(r'<.*?>', '', a)).strip()
            faqs.append({"question": cleaned_q, "answer": cleaned_a})
            
    # Extract Comparison Table Rows
    table_section = re.search(r'<table class="specs-table">.*?<tbody>(.*?)</tbody>', content, re.DOTALL)
    specs = []
    if table_section:
        rows = re.findall(r'<tr>(.*?)</tr>', table_section.group(1), re.DOTALL)
        for row in rows:
            cols = re.findall(r'<td[^>]*>(.*?)</td>', row, re.DOTALL)
            if len(cols) >= 4:
                specs.append({
                    "parameter": clean_html(re.sub(r'<.*?>', '', cols[0])),
                    "tier1": clean_html(re.sub(r'<.*?>', '', cols[1])),
                    "tier2": clean_html(re.sub(r'<.*?>', '', cols[2])),
                    "tier3": clean_html(re.sub(r'<.*?>', '', cols[3]))
                })

    # Extract 3D Nodes
    nodes = []
    # Find all node-3d-card elements
    node_cards = re.findall(r'<div class="node-3d-card[^"]*"[^>]*>(.*?)</div>', content, re.DOTALL)
    
    # We can also parse from ctoNodesData script block directly if available
    cto_data_match = re.search(r'const ctoNodesData = \[(.*?)\];', content, re.DOTALL)
    if cto_data_match:
        try:
            # Tidy up to make it valid JSON
            raw_json = "[" + cto_data_match.group(1) + "]"
            raw_json = re.sub(r'\s+', ' ', raw_json)
            # Remove trailing commas inside array
            raw_json = re.sub(r',\s*\]', ']', raw_json)
            raw_json = re.sub(r',\s*\}', '}', raw_json)
            parsed_nodes = json.loads(raw_json)
            nodes = parsed_nodes
        except Exception as e:
            print(f"Error parsing json for {filename}: {e}")
            
    data[key] = {
        "headline": headline,
        "subtext": subtext,
        "deliverables": deliverables,
        "faqs": faqs,
        "specs": specs,
        "nodes3d": nodes
    }

print(json.dumps(data, indent=2))
with open(r"d:\End to End Projects\buildlyst\scratch\services_parsed.json", "w") as out:
    json.dump(data, out, indent=2)
