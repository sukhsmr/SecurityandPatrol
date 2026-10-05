/**
 * Helpers for rendering stored HTML (Elementor sections, blog posts).
 * Pure functions, safe in server and client components. The client-side
 * counterpart is `useDeferredScripts` in ./use-deferred-scripts.
 */

const INTERNAL_PATH = /^\/(?!\/)([^?#]*)([?#].*)?$/;

/**
 * Adds the trailing slash the site's URLs use (`trailingSlash: true`), so
 * internal links go straight to the page instead of through a 308 redirect.
 * Leaves files (`/x.pdf`), anchors, external and already-canonical URLs alone.
 */
export function canonicalHref(href: string): string {
  const match = INTERNAL_PATH.exec(href);
  if (!match) return href;
  const [, path, suffix = ''] = match;
  if (path === '' || path.endsWith('/') || path.split('/').pop()!.includes('.')) return href;
  return `/${path}/${suffix}`;
}

/** Applies `canonicalHref` to every `<a href="/…">` in an HTML string. */
export function canonicalizeHtmlLinks(html: string): string {
  return html.replace(/(<a\b[^>]*?\shref=)(["'])(\/[^"']*)\2/gi, (_all, prefix: string, quote: string, url: string) => `${prefix}${quote}${canonicalHref(url)}${quote}`);
}

export const DEFERRED_ATTR = 'data-deferred-script';

/**
 * Makes `<script>` tags in stored HTML inert so the browser does not run them
 * while parsing the server-rendered page. `useDeferredScripts` then runs each
 * one exactly once after hydration. (Previously scripts ran during parsing
 * *and* again after hydration, binding every handler twice.)
 */
function deferScripts(html: string): string {
  return html.replace(/<script\b([^>]*)>/gi, (_tag, attrs: string) => {
    const typeMatch = /\stype\s*=\s*(["'])([^"']*)\1/i.exec(attrs);
    const rest = typeMatch ? attrs.replace(typeMatch[0], '') : attrs;
    const original = typeMatch ? ` data-type="${typeMatch[2]}"` : '';
    return `<script type="text/plain" ${DEFERRED_ATTR}${original}${rest}>`;
  });
}

/** Prepares stored HTML for rendering: canonical internal links and deferred scripts. */
export function prepareContentHtml(html: string): string {
  return deferScripts(canonicalizeHtmlLinks(html));
}
