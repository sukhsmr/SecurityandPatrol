/**
 * Helpers for sections that render original Elementor markup as an HTML
 * string. Plain-text CMS values must always pass through `esc`; values from
 * `html` fields are trusted admin input and are inserted as-is.
 */

const ESCAPES: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

export function esc(value: string | undefined | null): string {
  return (value ?? '').replace(/[&<>"']/g, (char) => ESCAPES[char]);
}

/** Picks the original element id for position `index`, reusing the last one for extra items. */
export function idAt(ids: readonly string[], index: number): string {
  return ids[Math.min(index, ids.length - 1)];
}

/** Elementor widget wrapper: `<div class="elementor-element elementor-element-<id> …">`. */
export function widget(id: string, widgetType: string, inner: string, extraClass = ''): string {
  const classes = ['elementor-element', `elementor-element-${id}`, extraClass, 'elementor-widget', `elementor-widget-${widgetType}`]
    .filter(Boolean)
    .join(' ');
  return `<div class="${classes}" data-id="${id}" data-element_type="widget" data-e-type="widget" data-widget_type="${widgetType}.default"><div class="elementor-widget-container">${inner}</div></div>`;
}

export function heading(id: string, inner: string): string {
  return widget(id, 'heading', `<h2 class="elementor-heading-title elementor-size-default">${inner}</h2>`);
}

export function button(id: string, text: string, url: string, size = 'sm', extraClass = ''): string {
  return widget(
    id,
    'button',
    `<div class="elementor-button-wrapper"><a class="elementor-button elementor-button-link elementor-size-${size}" href="${esc(url || '#')}"><span class="elementor-button-content-wrapper"><span class="elementor-button-text">${esc(text)}</span></span></a></div>`,
    extraClass,
  );
}

export function img(image: { src: string; alt?: string; srcSet?: string }, attrs: string): string {
  const srcSet = image.srcSet ? ` srcset="${esc(image.srcSet)}"` : '';
  return `<img ${attrs} src="${esc(image.src)}" alt="${esc(image.alt)}"${srcSet} />`;
}
