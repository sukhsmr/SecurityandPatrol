'use client';

import { useEffect, useState } from 'react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <a
      id="kt-scroll-up"
      href="#kt-scroll-up-reader"
      aria-label="Scroll to top"
      className={`kadence-scroll-to-top scroll-up-wrap scroll-ignore scroll-up-side-left scroll-up-style-filled vs-lg-true vs-md-true vs-sm-true ${
        isVisible ? 'scroll-up-visible' : ''
      }`}
      onClick={(e) => {
        e.preventDefault();
        scrollToTop();
      }}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        pointerEvents: isVisible ? 'auto' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <span className="kadence-svg-iconset">
        <svg
          aria-hidden="true"
          className="kadence-svg-icon kadence-arrow-up-svg"
          fill="currentColor"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M5.7 15.3l1.4 1.4 4.9-4.9 4.9 4.9 1.4-1.4-6.3-6.3z"></path>
        </svg>
      </span>
    </a>
  );
};

export default ScrollToTop;
