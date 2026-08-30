import os

root_dir = r"d:\End to End Projects\buildlyst"
old_app_dir = os.path.join(root_dir, "app")
new_backend_dir = os.path.join(root_dir, "backend")
api_dir = os.path.join(root_dir, "api")

# 1. Rename the directory
if os.path.exists(old_app_dir):
    os.rename(old_app_dir, new_backend_dir)
    print("Renamed app/ directory to backend/")
else:
    print("app/ directory already renamed or doesn't exist.")

# 2. Update python file contents
search_dirs = [new_backend_dir, api_dir]

for s_dir in search_dirs:
    if not os.path.exists(s_dir):
        continue
    for root, dirs, files in os.walk(s_dir):
        for file in files:
            if file.endswith(".py"):
                file_path = os.path.join(root, file)
                with open(file_path, "r", encoding="utf-8") as f:
                    content = f.read()
                
                # Perform replacements
                updated_content = content.replace("from app.", "from backend.")
                updated_content = updated_content.replace("from app import", "from backend import")
                updated_content = updated_content.replace("import app", "import backend")
                
                if updated_content != content:
                    with open(file_path, "w", encoding="utf-8") as f:
                        f.write(updated_content)
                    print(f"Updated imports in {os.path.relpath(file_path, root_dir)}")

print("Import restructuring complete!")
