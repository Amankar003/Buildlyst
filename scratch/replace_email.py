import os

root_dir = r"d:\End to End Projects\buildlyst"

files_to_update = [
    os.path.join(root_dir, "src", "components", "ContactForm.tsx"),
    os.path.join(root_dir, "backend", "templates", "services", "services_layout.html"),
    os.path.join(root_dir, "backend", "templates", "index.html"),
    os.path.join(root_dir, "backend", "services", "chat_service.py"),
    os.path.join(root_dir, "backend", "knowledge", "buildlyst_knowledge.md")
]

old_email = "info.buildlyst@gmail.com"
new_email = "info@buildlyst.in"

for filepath in files_to_update:
    if os.path.exists(filepath):
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
            
        updated = content.replace(old_email, new_email)
        
        if updated != content:
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(updated)
            print(f"Updated email in {os.path.relpath(filepath, root_dir)}")
        else:
            print(f"No changes needed / email already updated in {os.path.relpath(filepath, root_dir)}")
    else:
        print(f"File not found: {os.path.relpath(filepath, root_dir)}")
