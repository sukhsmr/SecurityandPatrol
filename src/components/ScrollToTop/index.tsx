'use client';

import React, { useEffect } from 'react';

export default function ScrollToTop() {
  useEffect(() => {
    const handleScroll = () => {
      const btn = document.getElementById('kt-scroll-up');
      if (btn) {
        if (window.scrollY > 300) {
          btn.style.opacity = '1';
          btn.style.transform = 'translateY(0)';
          btn.style.transition = 'all 0.3s ease';
          btn.style.pointerEvents = 'auto';
        } else {
          btn.style.opacity = '0';
          btn.style.transform = 'translateY(40px)';
          btn.style.pointerEvents = 'none';
        }
      }
    };
    
    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div dangerouslySetInnerHTML={{ __html: "<a aria-hidden=\"true\" aria-label=\"Scroll to top\" class=\"kadence-scroll-to-top scroll-up-wrap scroll-ignore scroll-up-side-left scroll-up-style-filled vs-lg-true vs-md-true vs-sm-true\" href=\"#wrapper\" id=\"kt-scroll-up\" tabindex=\"-1\" style=\"opacity: 0; pointer-events: none; transition: all 0.3s ease;\"><span class=\"kadence-svg-iconset\"><svg aria-hidden=\"true\" class=\"kadence-svg-icon kadence-arrow-up-svg\" fill=\"currentColor\" height=\"24\" version=\"1.1\" viewbox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\">\n<title>Scroll to top</title>\n<path d=\"M5.707 12.707l5.293-5.293v11.586c0 0.552 0.448 1 1 1s1-0.448 1-1v-11.586l5.293 5.293c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414l-7-7c-0.092-0.092-0.202-0.166-0.324-0.217s-0.253-0.076-0.383-0.076c-0.256 0-0.512 0.098-0.707 0.293l-7 7c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0z\">\n</path>\n</svg></span></a>" }} />
  );
}
