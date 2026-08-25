import os

INDEX_PATH = r"d:\End to End Projects\buildlyst\app\templates\index.html"

with open(INDEX_PATH, "r", encoding="utf-8") as f:
    content = f.read()

# 1. AI Agents Accordion
old_ai = """<p>Autonomous systems capable of executing complex multi-step reasoning, integrating with
                                your existing tools, and making autonomous decisions based on real-time data
                                constraints.</p>"""
new_ai = old_ai + '\n                            <a href="/services/ai-agents" class="btn btn-secondary glass-btn" style="margin-top: 16px; font-size: 14px; display: inline-block;">Explore Deep Dive &rarr;</a>'
content = content.replace(old_ai, new_ai)

# 2. Gen AI Accordion
old_gen = """<p>Custom LLM deployments, fine-tuning, and highly secure RAG architectures tailored
                                entirely to your proprietary enterprise data.</p>"""
new_gen = old_gen + '\n                            <a href="/services/gen-ai" class="btn btn-secondary glass-btn" style="margin-top: 16px; font-size: 14px; display: inline-block;">Explore Deep Dive &rarr;</a>'
content = content.replace(old_gen, new_gen)

# 3. ML Accordion
old_ml = """<p>Advanced predictive modeling, neural networks for computer vision, NLP, and real-time
                                classification systems deployed at scale.</p>"""
new_ml = old_ml + '\n                            <a href="/services/machine-learning" class="btn btn-secondary glass-btn" style="margin-top: 16px; font-size: 14px; display: inline-block;">Explore Deep Dive &rarr;</a>'
content = content.replace(old_ml, new_ml)

# 4. Data Eng Accordion
old_data = """<p>Robust ETL pipelines, data warehousing, and interactive visualization dashboards that
                                turn raw data into strategic assets.</p>"""
new_data = old_data + '\n                            <a href="/services/data-engineering" class="btn btn-secondary glass-btn" style="margin-top: 16px; font-size: 14px; display: inline-block;">Explore Deep Dive &rarr;</a>'
content = content.replace(old_data, new_data)

# 5. Web Dev Accordion
old_web = """<p>Premium, high-performance web applications and landing pages built with modern
                                frameworks, deeply integrated with custom AI backends.</p>"""
new_web = old_web + '\n                            <a href="/services/web-development" class="btn btn-secondary glass-btn" style="margin-top: 16px; font-size: 14px; display: inline-block;">Explore Deep Dive &rarr;</a>'
content = content.replace(old_web, new_web)

# 6. Architecture Button
old_arch = """<p class="subtext text-center mx-auto">Built on a foundation of elite frameworks, tailored for
                        specific autonomous use-cases.</p>
                </div>"""
new_arch = """<p class="subtext text-center mx-auto">Built on a foundation of elite frameworks, tailored for
                        specific autonomous use-cases.</p>
                    <div style="margin-top: 24px;">
                        <a href="#services" class="btn btn-secondary glass-btn">View Full Service Technical Specs &rarr;</a>
                    </div>
                </div>"""
content = content.replace(old_arch, new_arch)

with open(INDEX_PATH, "w", encoding="utf-8") as f:
    f.write(content)

print("index.html updated successfully with CTA buttons.")
