/**
 * Declarative field schemas. A schema drives both the admin form UI and
 * server-side validation, so every editable content shape is described once.
 * This module is safe to import from client components.
 */

interface BaseField {
  name: string;
  label: string;
  help?: string;
  required?: boolean;
  placeholder?: string;
  /** Collapsed under "Advanced" in the admin form. */
  advanced?: boolean;
}

/** Plain text. Rendered escaped. */
export interface TextField extends BaseField {
  type: 'text' | 'textarea' | 'email';
  maxLength?: number;
}

/** Trusted inline HTML (e.g. `<strong>`, `<br>`). Rendered unescaped. */
export interface HtmlField extends BaseField {
  type: 'html';
  rows?: number;
}

/** Large HTML document body, edited in a code editor. Rendered unescaped. */
export interface CodeField extends BaseField {
  type: 'code';
}

/** Relative path (`/about`), anchor (`#`), http(s), `mailto:` or `tel:`. */
export interface UrlField extends BaseField {
  type: 'url';
}

export interface ImageValue {
  src: string;
  alt?: string;
  srcSet?: string;
}

/** Image picker producing an `ImageValue`. */
export interface ImageField extends BaseField {
  type: 'image';
  withSrcSet?: boolean;
}

export interface NumberField extends BaseField {
  type: 'number';
  min?: number;
  max?: number;
  integer?: boolean;
}

export interface BooleanField extends BaseField {
  type: 'boolean';
}

export interface SelectField extends BaseField {
  type: 'select';
  options: Array<{ value: string; label: string }>;
}

/** An ordered list of strings. */
export interface StringListField extends BaseField {
  type: 'stringList';
  itemLabel?: string;
  itemType?: 'text' | 'html';
  minItems?: number;
  maxItems?: number;
}

/** An ordered list of objects. */
export interface ListField extends BaseField {
  type: 'list';
  fields: Field[];
  itemLabel?: string;
  /** Sub-field used as the collapsed item title in the admin. */
  titleField?: string;
  minItems?: number;
  maxItems?: number;
}

/** A nested object. */
export interface GroupField extends BaseField {
  type: 'group';
  fields: Field[];
}

export type Field =
  | TextField
  | HtmlField
  | CodeField
  | UrlField
  | ImageField
  | NumberField
  | BooleanField
  | SelectField
  | StringListField
  | ListField
  | GroupField;

/** Returns an empty value of the right shape for a field. */
export function emptyValueFor(field: Field): unknown {
  switch (field.type) {
    case 'number':
      return field.min ?? 0;
    case 'boolean':
      return false;
    case 'image':
      return { src: '', alt: '' };
    case 'select':
      return field.options[0]?.value ?? '';
    case 'stringList':
      return Array.from({ length: field.minItems ?? 0 }, () => '');
    case 'list':
      return Array.from({ length: field.minItems ?? 0 }, () => emptyObjectFor(field.fields));
    case 'group':
      return emptyObjectFor(field.fields);
    default:
      return '';
  }
}

export function emptyObjectFor(fields: Field[]): Record<string, unknown> {
  return Object.fromEntries(fields.map((field) => [field.name, emptyValueFor(field)]));
}
