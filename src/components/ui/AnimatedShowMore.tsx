"use client";

import React, { useState, useRef, useEffect } from 'react';

interface AnimatedShowMoreProps {
  children: React.ReactNode;
  buttonAlignment?: 'left' | 'center' | 'right';
  className?: string;
}

const AnimatedShowMore: React.FC<AnimatedShowMoreProps> = ({ children, buttonAlignment = 'center', className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState('0px');
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // We observe window resize to recalculate height if expanded
    const calculateHeight = () => {
      if (contentRef.current) {
        setContentHeight(isExpanded ? `${contentRef.current.scrollHeight}px` : '0px');
      }
    };
    
    calculateHeight();
    
    window.addEventListener('resize', calculateHeight);
    return () => window.removeEventListener('resize', calculateHeight);
  }, [isExpanded, children]);

  const toggleExpand = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsExpanded(!isExpanded);
  };

  const alignClass = buttonAlignment === 'left' ? 'elementor-align-left' : 
                     buttonAlignment === 'right' ? 'elementor-align-right' : 'elementor-align-center';

  return (
    <div className={className} style={{ width: '100%' }}>
      <div
        ref={contentRef}
        style={{
          maxHeight: contentHeight,
          overflow: 'hidden',
          transition: 'max-height 0.4s ease-in-out',
        }}
      >
        {children}
      </div>

      <div className={`elementor-element ${alignClass} elementor-widget elementor-widget-button`} style={{ marginTop: '10px' }}>
        <div className="elementor-widget-container">
          <div className="elementor-button-wrapper">
            <a 
              className="elementor-button elementor-button-link elementor-size-sm" 
              href="#" 
              onClick={toggleExpand}
            >
              <span className="elementor-button-content-wrapper">
                <span className="elementor-button-text">
                  {isExpanded ? 'Show Less' : 'Show More'}
                </span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedShowMore;
