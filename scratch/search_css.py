import re

js_path = r"d:\End to End Projects\buildlyst\app\static\js\main.js"
keywords = ["lenis", "hash", "scroll"]

with open(js_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    for kw in keywords:
        if kw in line.lower():
            print(f"Line {i+1}: {line.strip()}")
            break
