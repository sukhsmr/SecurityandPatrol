import os
import json

with open(r'C:\Users\ronak\.gemini\antigravity-ide\brain\950d54f4-b877-4c09-a2f1-55a10508f6c0\scratch\services_section_raw.html', 'r', encoding='utf-8') as f:
    services = f.read()

with open(r'C:\Users\ronak\.gemini\antigravity-ide\brain\950d54f4-b877-4c09-a2f1-55a10508f6c0\scratch\scroll_btn_raw.html', 'r', encoding='utf-8') as f:
    scroll = f.read()

services_json = json.dumps(services)
scroll_json = json.dumps(scroll)

js_content = f'''"use client";
import React, {{ useEffect }} from "react";

export default function OriginalServicesSection() {{
  useEffect(() => {{
    const handleScroll = () => {{
      const btn = document.getElementById('kt-scroll-up');
      if (btn) {{
        if (window.scrollY > 300) {{
          btn.style.opacity = '1';
          btn.style.transform = 'translateY(0)';
          btn.style.transition = 'all 0.3s ease';
        }} else {{
          btn.style.opacity = '0';
          btn.style.transform = 'translateY(40px)';
        }}
      }}
    }};
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }}, []);

  return (
    <>
      <div dangerouslySetInnerHTML={{{{ __html: {services_json} }}}} />
      <div dangerouslySetInnerHTML={{{{ __html: {scroll_json} }}}} />
    </>
  );
}}
'''

with open(r'src\components\OriginalServicesSection\index.tsx', 'w', encoding='utf-8') as f:
    f.write(js_content)
