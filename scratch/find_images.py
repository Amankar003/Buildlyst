import os

root_dir = r"d:\End to End Projects\buildlyst"
components_dir = os.path.join(root_dir, "src", "components")

for root, dirs, files in os.walk(components_dir):
    for file in files:
        if file.endswith(".tsx"):
            file_path = os.path.join(root, file)
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()
            if "next/image" in content or "<Image" in content:
                print(f"Found in: {os.path.relpath(file_path, root_dir)}")
