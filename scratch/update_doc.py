doc_path = r"d:\End to End Projects\buildlyst\website_design.md"

with open(doc_path, "r", encoding="utf-8") as f:
    content = f.read()

updated_content = content.replace("app/main.py", "backend/main.py")
updated_content = updated_content.replace("/app ", "/backend ")
updated_content = updated_content.replace("/app\n", "/backend\n")
updated_content = updated_content.replace("app\n", "backend\n")
updated_content = updated_content.replace("app directory", "backend directory")

if updated_content != content:
    with open(doc_path, "w", encoding="utf-8") as f:
        f.write(updated_content)
    print("Updated website_design.md references successfully!")
else:
    print("No references to update in website_design.md.")
