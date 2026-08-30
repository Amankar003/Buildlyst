import os
import re

root_dir = r"d:\End to End Projects\buildlyst"
src_dir = os.path.join(root_dir, "src")

img_extensions = [".png", ".jpg", ".jpeg", ".svg", ".gif"]

for root, dirs, files in os.walk(src_dir):
    for file in files:
        if file.endswith((".tsx", ".ts")):
            file_path = os.path.join(root, file)
            with open(file_path, "r", encoding="utf-8") as f:
                lines = f.readlines()
            for i, line in enumerate(lines):
                for ext in img_extensions:
                    if ext in line.lower() and not "import " in line:
                        print(f"File: {os.path.relpath(file_path, root_dir)} (Line {i+1}): {line.strip()}")
                        break
