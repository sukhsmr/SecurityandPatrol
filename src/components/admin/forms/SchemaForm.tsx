'use client';

import React, { useState } from 'react';
import type { FieldErrors } from '@/lib/cms/errors';
import { emptyObjectFor, type Field, type ImageValue, type ListField, type StringListField } from '@/lib/cms/schema/fields';
import Icon from '../Icon';
import ImageInput from './ImageInput';

/**
 * Renders an editable form for any field schema (see lib/cms/schema/fields).
 * Values are plain objects; errors are keyed by dotted path, e.g. `items.0.title`.
 */

type Value = Record<string, unknown>;

interface SchemaFormProps {
  fields: Field[];
  value: Value;
  onChange: (value: Value) => void;
  errors?: FieldErrors;
  path?: string;
}

function join(path: string, key: string | number): string {
  return path ? `${path}.${key}` : String(key);
}

function move<T>(items: T[], from: number, to: number): T[] {
  if (to < 0 || to >= items.length) return items;
  const next = [...items];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

export default function SchemaForm({ fields, value, onChange, errors = {}, path = '' }: SchemaFormProps) {
  const basic = fields.filter((field) => !field.advanced);
  const advanced = fields.filter((field) => field.advanced);
  const set = (name: string, fieldValue: unknown) => onChange({ ...value, [name]: fieldValue });

  const render = (field: Field) => (
    <FieldControl
      key={field.name}
      field={field}
      value={value[field.name]}
      onChange={(next) => set(field.name, next)}
      errors={errors}
      path={join(path, field.name)}
    />
  );

  return (
    <div className="cms-form">
      {basic.map(render)}
      {advanced.length > 0 && (
        <details className="cms-group">
          <summary>Advanced</summary>
          <div className="cms-group-body">{advanced.map(render)}</div>
        </details>
      )}
    </div>
  );
}

function FieldShell({ field, path, errors, children }: { field: Field; path: string; errors: FieldErrors; children: React.ReactNode }) {
  const error = errors[path];
  return (
    <div className={`cms-field${error ? ' has-error' : ''}`}>
      {field.type !== 'boolean' && (
        <label className="cms-label" htmlFor={path}>
          {field.label}
          {field.required && <span className="cms-required">*</span>}
        </label>
      )}
      {children}
      {field.help && <span className="cms-help">{field.help}</span>}
      {error && <span className="cms-error">{error}</span>}
    </div>
  );
}

interface ControlProps {
  field: Field;
  value: unknown;
  onChange: (value: unknown) => void;
  errors: FieldErrors;
  path: string;
}

function FieldControl({ field, value, onChange, errors, path }: ControlProps) {
  const text = typeof value === 'string' ? value : value == null ? '' : String(value);

  switch (field.type) {
    case 'text':
    case 'email':
    case 'url':
      return (
        <FieldShell field={field} path={path} errors={errors}>
          <input
            id={path}
            className="cms-input"
            type={field.type === 'email' ? 'email' : 'text'}
            value={text}
            placeholder={field.placeholder ?? (field.type === 'url' ? '/page or https://…' : undefined)}
            onChange={(event) => onChange(event.target.value)}
          />
        </FieldShell>
      );
    case 'textarea':
      return (
        <FieldShell field={field} path={path} errors={errors}>
          <textarea id={path} className="cms-textarea" rows={3} value={text} placeholder={field.placeholder} onChange={(event) => onChange(event.target.value)} />
        </FieldShell>
      );
    case 'html':
      return (
        <FieldShell field={{ ...field, help: field.help ?? 'HTML is allowed (e.g. <strong>, <br>, <a href="…">).' }} path={path} errors={errors}>
          <textarea id={path} className="cms-textarea" rows={field.rows ?? 4} value={text} onChange={(event) => onChange(event.target.value)} spellCheck={false} />
        </FieldShell>
      );
    case 'code':
      return (
        <FieldShell field={field} path={path} errors={errors}>
          <textarea id={path} className="cms-textarea is-code" value={text} onChange={(event) => onChange(event.target.value)} spellCheck={false} wrap="off" />
        </FieldShell>
      );
    case 'number':
      return (
        <FieldShell field={field} path={path} errors={errors}>
          <input
            id={path}
            className="cms-input"
            type="number"
            min={field.min}
            max={field.max}
            step={field.integer ? 1 : 'any'}
            value={value === undefined || value === null ? '' : String(value)}
            onChange={(event) => onChange(event.target.value === '' ? '' : Number(event.target.value))}
          />
        </FieldShell>
      );
    case 'boolean':
      return (
        <FieldShell field={field} path={path} errors={errors}>
          <label className="cms-check">
            <input id={path} type="checkbox" checked={value === true} onChange={(event) => onChange(event.target.checked)} />
            {field.label}
          </label>
        </FieldShell>
      );
    case 'select':
      return (
        <FieldShell field={field} path={path} errors={errors}>
          <select id={path} className="cms-select" value={text} onChange={(event) => onChange(event.target.value)}>
            {!field.required && <option value="">—</option>}
            {field.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </FieldShell>
      );
    case 'image':
      return (
        <FieldShell field={field} path={path} errors={errors}>
          <ImageInput
            id={path}
            value={(value as ImageValue) ?? { src: '', alt: '' }}
            onChange={onChange}
            withSrcSet={field.withSrcSet}
            error={errors[join(path, 'src')]}
          />
        </FieldShell>
      );
    case 'group':
      return (
        <details className="cms-group" open={!field.advanced}>
          <summary>{field.label}</summary>
          <div className="cms-group-body">
            <SchemaForm fields={field.fields} value={(value as Value) ?? emptyObjectFor(field.fields)} onChange={onChange} errors={errors} path={path} />
          </div>
        </details>
      );
    case 'stringList':
      return <StringListControl field={field} value={Array.isArray(value) ? (value as string[]) : []} onChange={onChange} errors={errors} path={path} />;
    case 'list':
      return <ListControl field={field} value={Array.isArray(value) ? (value as Value[]) : []} onChange={onChange} errors={errors} path={path} />;
  }
}

function ItemButtons({ index, count, onMove, onRemove, onDuplicate }: { index: number; count: number; onMove: (to: number) => void; onRemove: () => void; onDuplicate?: () => void }) {
  return (
    <>
      <button type="button" className="cms-btn cms-btn-ghost cms-btn-icon" onClick={() => onMove(index - 1)} disabled={index === 0} aria-label="Move up" title="Move up">
        <Icon name="up" size={16} />
      </button>
      <button type="button" className="cms-btn cms-btn-ghost cms-btn-icon" onClick={() => onMove(index + 1)} disabled={index === count - 1} aria-label="Move down" title="Move down">
        <Icon name="down" size={16} />
      </button>
      {onDuplicate && (
        <button type="button" className="cms-btn cms-btn-ghost cms-btn-icon" onClick={onDuplicate} aria-label="Duplicate" title="Duplicate">
          <Icon name="copy" size={16} />
        </button>
      )}
      <button type="button" className="cms-btn cms-btn-ghost cms-btn-icon" onClick={onRemove} aria-label="Remove" title="Remove">
        <Icon name="trash" size={16} />
      </button>
    </>
  );
}

function StringListControl({ field, value, onChange, errors, path }: { field: StringListField; value: string[]; onChange: (value: unknown) => void; errors: FieldErrors; path: string }) {
  const atMax = field.maxItems !== undefined && value.length >= field.maxItems;
  const update = (index: number, text: string) => onChange(value.map((item, i) => (i === index ? text : item)));
  const multiline = field.itemType === 'html' || value.some((item) => item.length > 90);

  return (
    <FieldShell field={field} path={path} errors={errors}>
      <div className="cms-list">
        {value.map((item, index) => (
          <div key={index}>
            <div className="cms-string-row">
              {multiline ? (
                <textarea className="cms-textarea" rows={3} value={item} onChange={(event) => update(index, event.target.value)} aria-label={`${field.itemLabel ?? 'Item'} ${index + 1}`} />
              ) : (
                <input className="cms-input" value={item} onChange={(event) => update(index, event.target.value)} aria-label={`${field.itemLabel ?? 'Item'} ${index + 1}`} />
              )}
              <ItemButtons index={index} count={value.length} onMove={(to) => onChange(move(value, index, to))} onRemove={() => onChange(value.filter((_, i) => i !== index))} />
            </div>
            {errors[join(path, index)] && <span className="cms-error">{errors[join(path, index)]}</span>}
          </div>
        ))}
        <div>
          <button type="button" className="cms-btn cms-btn-sm" onClick={() => onChange([...value, ''])} disabled={atMax}>
            <Icon name="plus" size={14} /> Add {(field.itemLabel ?? 'item').toLowerCase()}
          </button>
        </div>
      </div>
    </FieldShell>
  );
}

function ListControl({ field, value, onChange, errors, path }: { field: ListField; value: Value[]; onChange: (value: unknown) => void; errors: FieldErrors; path: string }) {
  const [open, setOpen] = useState<Record<number, boolean>>({});
  const atMax = field.maxItems !== undefined && value.length >= field.maxItems;
  const itemLabel = field.itemLabel ?? 'Item';
  const hasItemErrors = (index: number) => Object.keys(errors).some((key) => key.startsWith(`${join(path, index)}.`));

  const titleOf = (item: Value, index: number) => {
    const raw = field.titleField ? item[field.titleField] : undefined;
    const title = typeof raw === 'string' ? raw.replace(/<[^>]+>/g, '').trim() : '';
    return title || `${itemLabel} ${index + 1}`;
  };

  return (
    <FieldShell field={field} path={path} errors={errors}>
      <div className="cms-list">
        {value.map((item, index) => {
          const expanded = open[index] ?? hasItemErrors(index);
          return (
            <div key={index} className="cms-list-item">
              <div className="cms-list-item-head">
                <span className="cms-list-item-index">{index + 1}</span>
                <button type="button" className="cms-list-toggle" onClick={() => setOpen({ ...open, [index]: !expanded })} aria-expanded={expanded}>
                  {titleOf(item, index)}
                  {hasItemErrors(index) && <span className="cms-error"> · has errors</span>}
                </button>
                <ItemButtons
                  index={index}
                  count={value.length}
                  onMove={(to) => {
                    onChange(move(value, index, to));
                    setOpen({});
                  }}
                  onDuplicate={atMax ? undefined : () => onChange([...value.slice(0, index + 1), structuredClone(item), ...value.slice(index + 1)])}
                  onRemove={() => {
                    onChange(value.filter((_, i) => i !== index));
                    setOpen({});
                  }}
                />
              </div>
              {expanded && (
                <div className="cms-list-item-body">
                  <SchemaForm fields={field.fields} value={item} onChange={(next) => onChange(value.map((entry, i) => (i === index ? next : entry)))} errors={errors} path={join(path, index)} />
                </div>
              )}
            </div>
          );
        })}
        <div>
          <button
            type="button"
            className="cms-btn cms-btn-sm"
            disabled={atMax}
            onClick={() => {
              onChange([...value, emptyObjectFor(field.fields)]);
              setOpen({ ...open, [value.length]: true });
            }}
          >
            <Icon name="plus" size={14} /> Add {itemLabel.toLowerCase()}
          </button>
        </div>
      </div>
    </FieldShell>
  );
}

