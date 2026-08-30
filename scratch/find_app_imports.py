import os

root_dir = r"d:\End to End Projects\buildlyst"
app_dir = os.path.join(root_dir, "app")
api_dir = os.path.join(root_dir, "api")

search_dirs = [app_dir, api_dir]
import_patterns = ["from app", "import app"]

for s_dir in search_dirs:
    if not os.path.exists(s_dir):
        continue
    for root, dirs, files in os.walk(s_dir):
        for file in files:
            if file.endswith(".py"):
                file_path = os.path.join(root, file)
                with open(file_path, "r", encoding="utf-8") as f:
                    lines = f.readlines()
                for i, line in enumerate(lines):
                    for pat in import_patterns:
                        if pat in line:
                            print(f"{os.path.relpath(file_path, root_dir)} (Line {i+1}): {line.strip()}")
