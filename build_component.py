import os
import json

with open(r'C:\Users\ronak\.gemini\antigravity-ide\brain\950d54f4-b877-4c09-a2f1-55a10508f6c0\scratch\services_section_raw.html', 'r', encoding='utf-8') as f:
    services = f.read()

with open(r'C:\Users\ronak\.gemini\antigravity-ide\brain\950d54f4-b877-4c09-a2f1-55a10508f6c0\scratch\scroll_btn_raw.html', 'r', encoding='utf-8') as f:
    scroll = f.read()

os.makedirs(r'src\components\OriginalServicesSection', exist_ok=True)

js_content = f'''import React from "react";

export default function OriginalServicesSection() {{
  return (
    <>
      <div dangerouslySetInnerHTML={{{{ __html: {json.dumps(services)} }}}} />
      <div dangerouslySetInnerHTML={{{{ __html: {json.dumps(scroll)} }}}} />
    </>
  );
}}
'''

with open(r'src\components\OriginalServicesSection\index.tsx', 'w', encoding='utf-8') as f:
    f.write(js_content)
