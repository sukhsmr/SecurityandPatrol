'use client';

import { useEffect, type RefObject } from 'react';
import { DEFERRED_ATTR } from './content-html';

/** Executes the deferred scripts inside `ref` once, in document order. */
export function useDeferredScripts(ref: RefObject<HTMLElement | null>, html: string): void {
  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    container.querySelectorAll<HTMLScriptElement>(`script[${DEFERRED_ATTR}]`).forEach((inert) => {
      const script = document.createElement('script');
      for (const attr of Array.from(inert.attributes)) {
        if (attr.name === 'type' || attr.name === DEFERRED_ATTR || attr.name === 'data-type') continue;
        script.setAttribute(attr.name, attr.value);
      }
      const originalType = inert.getAttribute('data-type');
      if (originalType) script.type = originalType;
      script.async = false; // keep external scripts in document order
      script.textContent = inert.textContent;
      // The replacement has no marker, so a re-run of this effect (e.g. React
      // StrictMode in development) cannot execute it again.
      inert.replaceWith(script);
    });
  }, [ref, html]);
}
