import json
import os

json_path = r"d:\End to End Projects\buildlyst\scratch\services_parsed.json"
ts_path = r"d:\End to End Projects\buildlyst\frontend\src\data\servicesData.ts"
os.makedirs(os.path.dirname(ts_path), exist_ok=True)

with open(json_path, "r", encoding="utf-8") as f:
    data = json.load(f)

# Define full content for all categories (including missing values if any)
# Let's write a TS file with full types
ts_content = f"""export interface Node3D {{
  name: string;
  tech: string;
  icon: string;
  latency: string;
  plain: string;
  desc: string;
  ha: string;
}}

export interface SpecRow {{
  parameter: string;
  tier1: string;
  tier2: string;
  tier3: string;
}}

export interface FaqItem {{
  question: string;
  answer: string;
}}

export interface ServiceData {{
  headline: string;
  subtext: string;
  deliverables: string[];
  faqs: FaqItem[];
  specs: SpecRow[];
  nodes3d: Node3D[];
}}

export const SERVICES_DATA: Record<string, ServiceData> = {json.dumps(data, indent=2)};
"""

with open(ts_path, "w", encoding="utf-8") as f:
    f.write(ts_content)

print("TypeScript conversion successful!")
