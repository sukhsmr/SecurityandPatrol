import type { FieldErrors } from '../errors';
import type { Field, ImageValue } from './fields';

/**
 * Validates and normalises input against a field schema. Unknown keys are
 * dropped, so stored JSON only ever contains fields the schema declares.
 * Shared by the admin forms (instant feedback) and the API (enforcement).
 */

const MAX_LENGTH: Record<string, number> = {
  text: 5_000,
  email: 320,
  url: 2_048,
  textarea: 50_000,
  html: 200_000,
  code: 3_000_000,
};

const URL_PATTERN = /^(\/(?!\/)|#|\?|https?:\/\/|mailto:|tel:)/i;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isSafeUrl(value: string): boolean {
  return value === '' || URL_PATTERN.test(value.trim());
}

/** Site-relative asset path (no traversal) or an absolute http(s) URL. */
export function isSafeImagePath(value: string): boolean {
  if (value === '') return true;
  if (/^https?:\/\/[^\s]+$/i.test(value)) return true;
  return /^\/(?!\/)[^\s\\]*$/.test(value) && !value.split(/[/?#]/).includes('..');
}

function isBlank(value: unknown): boolean {
  return value === undefined || value === null || (typeof value === 'string' && value.trim() === '');
}

function join(path: string, key: string | number): string {
  return path ? `${path}.${key}` : String(key);
}

function validateValue(field: Field, input: unknown, path: string, errors: FieldErrors): unknown {
  const label = field.label;

  switch (field.type) {
    case 'text':
    case 'textarea':
    case 'email':
    case 'html':
    case 'code':
    case 'url': {
      if (input !== undefined && input !== null && typeof input !== 'string') {
        errors[path] = `${label} must be text.`;
        return '';
      }
      const value = (input as string | null | undefined) ?? '';
      if (field.required && isBlank(value)) {
        errors[path] = `${label} is required.`;
      } else if (value.length > (('maxLength' in field && field.maxLength) || MAX_LENGTH[field.type])) {
        errors[path] = `${label} is too long.`;
      } else if (field.type === 'url' && !isSafeUrl(value)) {
        errors[path] = 'Please enter a valid URL (e.g. /about, https://…, mailto:, tel:).';
      } else if (field.type === 'email' && value !== '' && !EMAIL_PATTERN.test(value)) {
        errors[path] = 'Please enter a valid email address.';
      }
      return value;
    }

    case 'image': {
      const raw = (input && typeof input === 'object' ? input : {}) as Partial<ImageValue>;
      const src = typeof raw.src === 'string' ? raw.src.trim() : '';
      const value: ImageValue = { src, alt: typeof raw.alt === 'string' ? raw.alt : '' };
      if (field.withSrcSet) value.srcSet = typeof raw.srcSet === 'string' ? raw.srcSet : '';
      if (field.required && src === '') errors[join(path, 'src')] = `${label} is required.`;
      else if (!isSafeImagePath(src)) errors[join(path, 'src')] = 'Please enter a valid image path (e.g. /wp-content/uploads/…).';
      return value;
    }

    case 'number': {
      if (isBlank(input)) {
        if (field.required) errors[path] = `${label} is required.`;
        return field.min ?? 0;
      }
      const value = typeof input === 'number' ? input : Number(input);
      if (!Number.isFinite(value)) errors[path] = `${label} must be a number.`;
      else if (field.integer && !Number.isInteger(value)) errors[path] = `${label} must be a whole number.`;
      else if (field.min !== undefined && value < field.min) errors[path] = `${label} must be at least ${field.min}.`;
      else if (field.max !== undefined && value > field.max) errors[path] = `${label} must be at most ${field.max}.`;
      return Number.isFinite(value) ? value : 0;
    }

    case 'boolean':
      return input === true || input === 'true';

    case 'select': {
      const value = typeof input === 'string' ? input : '';
      if (!field.options.some((option) => option.value === value)) {
        if (field.required || value !== '') errors[path] = `Please choose a valid ${label.toLowerCase()}.`;
      }
      return value;
    }

    case 'stringList': {
      const items = Array.isArray(input) ? input : [];
      if (input !== undefined && !Array.isArray(input)) errors[path] = `${label} must be a list.`;
      checkCount(field, items.length, path, errors);
      return items.map((item, index) => {
        if (typeof item !== 'string') {
          errors[join(path, index)] = `${field.itemLabel ?? 'Item'} must be text.`;
          return '';
        }
        if (field.required && isBlank(item)) errors[join(path, index)] = `${field.itemLabel ?? 'Item'} cannot be empty.`;
        return item;
      });
    }

    case 'list': {
      const items = Array.isArray(input) ? input : [];
      if (input !== undefined && !Array.isArray(input)) errors[path] = `${label} must be a list.`;
      checkCount(field, items.length, path, errors);
      return items.map((item, index) => validateObject(field.fields, item, join(path, index), errors));
    }

    case 'group':
      return validateObject(field.fields, input, path, errors);
  }
}

function checkCount(
  field: { label: string; minItems?: number; maxItems?: number },
  count: number,
  path: string,
  errors: FieldErrors,
): void {
  if (field.minItems !== undefined && count < field.minItems) {
    errors[path] = `${field.label} needs at least ${field.minItems} item${field.minItems === 1 ? '' : 's'}.`;
  } else if (field.maxItems !== undefined && count > field.maxItems) {
    errors[path] = `${field.label} allows at most ${field.maxItems} items.`;
  }
}

function validateObject(fields: Field[], input: unknown, path: string, errors: FieldErrors): Record<string, unknown> {
  const source = input && typeof input === 'object' && !Array.isArray(input) ? (input as Record<string, unknown>) : {};
  const output: Record<string, unknown> = {};
  for (const field of fields) {
    output[field.name] = validateValue(field, source[field.name], join(path, field.name), errors);
  }
  return output;
}

export interface ValidationResult<T> {
  value: T;
  errors: FieldErrors;
  valid: boolean;
}

export function validateFields<T = Record<string, unknown>>(fields: Field[], input: unknown): ValidationResult<T> {
  const errors: FieldErrors = {};
  const value = validateObject(fields, input, '', errors) as T;
  return { value, errors, valid: Object.keys(errors).length === 0 };
}
