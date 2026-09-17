'use client';

import React, { useEffect, useRef } from 'react';

interface ElementorRawViewProps {
  contentHtml: string;
}

/**
 * Renders an Elementor page/post's original exported HTML verbatim. The
 * exported markup already includes its own `.elementor-<id>` wrapper div, so
 * this component only needs a plain ref container to hook up interactivity
 * (Elementor's own JS bundle was never captured in this migration's asset
 * export). A hand-rewritten React template can never carry every original
 * widget's unique element id, so its nested background/spacing rules
 * silently fail to match the real per-page CSS; rendering the source HTML
 * as-is guarantees every selector matches.
 */
export default function ElementorRawView({ contentHtml }: ElementorRawViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Browsers never execute <script> tags injected via innerHTML.
    const scripts = Array.from(container.querySelectorAll('script'));
    scripts.forEach((oldScript) => {
      const newScript = document.createElement('script');
      Array.from(oldScript.attributes).forEach((attr) => newScript.setAttribute(attr.name, attr.value));
      newScript.textContent = oldScript.textContent;
      oldScript.replaceWith(newScript);
    });

    // Re-implement Elementor's accordion widget toggle (its own JS bundle
    // was never captured in this migration's asset export).
    const titles = Array.from(container.querySelectorAll<HTMLElement>('.elementor-tab-title'));
    const cleanups: Array<() => void> = [];
    titles.forEach((title) => {
      const tab = title.dataset.tab;
      const content = tab
        ? container.querySelector<HTMLElement>(`.elementor-tab-content[data-tab="${tab}"]`)
        : null;
      const onClick = () => {
        const isActive = title.classList.contains('elementor-active');
        titles.forEach((t) => {
          t.classList.remove('elementor-active');
          t.setAttribute('aria-expanded', 'false');
        });
        container.querySelectorAll<HTMLElement>('.elementor-tab-content').forEach((c) => {
          c.style.display = 'none';
        });
        if (!isActive) {
          title.classList.add('elementor-active');
          title.setAttribute('aria-expanded', 'true');
          if (content) content.style.display = 'block';
        }
      };
      title.addEventListener('click', onClick);
      cleanups.push(() => title.removeEventListener('click', onClick));
    });

    return () => cleanups.forEach((fn) => fn());
  }, [contentHtml]);

  return <div ref={containerRef} dangerouslySetInnerHTML={{ __html: contentHtml }} />;
}
