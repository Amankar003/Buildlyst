import os
import shutil

root_dir = r"d:\End to End Projects\buildlyst"
frontend_dir = os.path.join(root_dir, "frontend")

# Move all files from frontend/ to root/, skipping node_modules
files_to_move = os.listdir(frontend_dir)
for item in files_to_move:
    if item == "node_modules":
        print("Skipping node_modules (currently locked by running dev server).")
        continue
        
    src_path = os.path.join(frontend_dir, item)
    dest_path = os.path.join(root_dir, item)
    
    # Handle .gitignore separately to merge
    if item == ".gitignore":
        root_gitignore = os.path.join(root_dir, ".gitignore")
        if os.path.exists(root_gitignore):
            with open(src_path, "r", encoding="utf-8") as f:
                fe_lines = f.read().splitlines()
            with open(root_gitignore, "r", encoding="utf-8") as f:
                root_lines = f.read().splitlines()
            
            merged_lines = set(root_lines + fe_lines)
            with open(root_gitignore, "w", encoding="utf-8") as f:
                f.write("\n".join(sorted(merged_lines)) + "\n")
            print("Merged .gitignore files successfully.")
            os.remove(src_path)
        else:
            shutil.move(src_path, dest_path)
        continue
        
    if os.path.exists(dest_path):
        if os.path.isdir(dest_path):
            shutil.rmtree(dest_path)
        else:
            os.remove(dest_path)
            
    shutil.move(src_path, dest_path)
    print(f"Moved {item} to root.")

print("\nRestructuring completed! Next.js configuration is now at the root level.")
print("Once you close the active npm run dev process in your terminal, you can safely delete the old 'frontend' directory.")
