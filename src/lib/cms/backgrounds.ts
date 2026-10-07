import type { BackgroundField, BackgroundValue, Breakpoint, Field } from './schema/fields';
import DEFAULTS from './sections/backgroundDefaults.json';

/**
 * Background images of Elementor elements. The design CSS sets them; an admin
 * override is emitted as a small CSS rule that wins over the design rule. A
 * section without overrides renders exactly as before.
 * Safe to import from client components.
 */

interface BackgroundDefault {
  desktop?: string;
  mobile?: string;
  /** Columns paint their background on the `.elementor-widget-wrap` child. */
  target?: 'widget-wrap';
}

const BACKGROUND_DEFAULTS = DEFAULTS as Record<string, BackgroundDefault>;
const ELEMENT_ID = /^[0-9a-f]{6,8}$/;

export function getBackgroundDefault(elementId: string | undefined): BackgroundDefault {
  return (elementId && BACKGROUND_DEFAULTS[elementId]) || {};
}

/** Elementor id of the first element in imported HTML (`data-id="…"`). */
export function firstElementId(html: unknown): string | undefined {
  if (typeof html !== 'string') return undefined;
  return /\bdata-id="([0-9a-f]{6,8})"/.exec(html)?.[1];
}

/** The element a background field controls, given the values of its sibling fields. */
export function backgroundElementId(field: BackgroundField, siblings: Record<string, unknown>): string | undefined {
  const id = field.elementId ?? (field.elementIdFromField ? firstElementId(siblings[field.elementIdFromField]) : undefined);
  return id && ELEMENT_ID.test(id) ? id : undefined;
}

/** Breakpoints the field offers: those configured, else those the design has an image for. */
export function backgroundBreakpoints(field: BackgroundField, elementId: string | undefined): Breakpoint[] {
  if (field.breakpoints) return field.breakpoints;
  const defaults = getBackgroundDefault(elementId);
  const found = (['desktop', 'mobile'] as const).filter((breakpoint) => defaults[breakpoint]);
  return found.length ? found : ['desktop'];
}

/** Characters that could end a CSS url("…") or a <style> element are rejected by validation; this is defence in depth. */
function cssUrl(src: string): string {
  return `url("${src.replace(/[\\"'()<>\s]/g, (ch) => `\\${ch.charCodeAt(0).toString(16)} `)}")`;
}

function selectorsFor(elementId: string): string {
  const element = `.elementor-element.elementor-element-${elementId}`;
  if (getBackgroundDefault(elementId).target === 'widget-wrap') {
    return `${element}>.elementor-widget-wrap`;
  }
  return `${element}:not(.elementor-motion-effects-element-type-background),${element}>.elementor-motion-effects-container>.elementor-motion-effects-layer`;
}

/** CSS overriding one element's background, or '' when it uses the design images. */
export function backgroundCss(elementId: string | undefined, value: Partial<BackgroundValue> | undefined): string {
  if (!elementId || !ELEMENT_ID.test(elementId) || !value) return '';
  const defaults = getBackgroundDefault(elementId);
  const selectors = selectorsFor(elementId);
  let css = '';
  const desktop = value.desktop?.trim();
  const mobile = value.mobile?.trim();
  if (desktop && desktop !== defaults.desktop) {
    css += `${selectors}{background-image:${cssUrl(desktop)}!important}`;
  }
  // A new desktop image also replaces the design's mobile image, unless a mobile image is chosen.
  const mobileImage = mobile || (desktop && desktop !== defaults.desktop && defaults.mobile ? desktop : '');
  if (mobileImage && mobileImage !== defaults.mobile) {
    css += `@media(max-width:767px){${selectors}{background-image:${cssUrl(mobileImage)}!important}}`;
  }
  return css;
}

/** CSS for every background field in a schema (top level and nested groups/lists). */
export function backgroundCssForFields(fields: Field[], data: unknown): string {
  if (!data || typeof data !== 'object') return '';
  const values = data as Record<string, unknown>;
  let css = '';
  for (const field of fields) {
    const value = values[field.name];
    if (field.type === 'background') {
      css += backgroundCss(backgroundElementId(field, values), value as BackgroundValue | undefined);
    } else if (field.type === 'group') {
      css += backgroundCssForFields(field.fields, value);
    } else if (field.type === 'list' && Array.isArray(value)) {
      for (const item of value) css += backgroundCssForFields(field.fields, item);
    }
  }
  return css;
}
