import os

css_path = r"d:\End to End Projects\buildlyst\src\app\globals.css"

keywords = [".pill-nav"]

with open(css_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    for kw in keywords:
        if kw in line:
            print(f"Line {i+1}: {line.strip()}")
            for j in range(max(0, i-2), min(len(lines), i+8)):
                print(f"  {j+1}: {lines[j].strip()}")
            print()
            break
