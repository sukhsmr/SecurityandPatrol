import os
import json
from bs4 import BeautifulSoup

with open(r'C:\Users\ronak\OneDrive\Desktop\projects\New folder (2)\adsguards\index.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

soup = BeautifulSoup(html_content, 'html.parser')
section1 = soup.find('section', {'data-id': '16c05f7'})
section2 = soup.find('section', {'data-id': 'd8a61f1'})

desktop_html = str(section1) if section1 else ''
mobile_html = str(section2) if section2 else ''

desktop_html = desktop_html.replace('elementor-invisible', '')
mobile_html = mobile_html.replace('elementor-invisible', '')

with open(r'C:\Users\ronak\.gemini\antigravity-ide\brain\950d54f4-b877-4c09-a2f1-55a10508f6c0\scratch\scroll_btn_raw.html', 'r', encoding='utf-8') as f:
    scroll = f.read()

desktop_json = json.dumps(desktop_html)
mobile_json = json.dumps(mobile_html)
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
      <div dangerouslySetInnerHTML={{{{ __html: {desktop_json} }}}} />
      <div dangerouslySetInnerHTML={{{{ __html: {mobile_json} }}}} />
      <div dangerouslySetInnerHTML={{{{ __html: {scroll_json} }}}} />
    </>
  );
}}
'''

with open(r'src\components\OriginalServicesSection\index.tsx', 'w', encoding='utf-8') as f:
    f.write(js_content)
print('Done!')
