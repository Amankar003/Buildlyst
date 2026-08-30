import os
import re

root_dir = r"d:\End to End Projects\buildlyst"
src_dir = os.path.join(root_dir, "src")

img_pattern = re.compile(r"<img[^>]+src=[\"']([^\"']+)[\"']", re.IGNORECASE)

for root, dirs, files in os.walk(src_dir):
    for file in files:
        if file.endswith((".tsx", ".ts")):
            file_path = os.path.join(root, file)
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()
            matches = img_pattern.findall(content)
            for m in matches:
                print(f"File: {os.path.relpath(file_path, root_dir)} -> img src: {m}")
