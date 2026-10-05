'use client';

import React, { useMemo, useState } from 'react';
import type { FieldErrors } from '@/lib/cms/errors';
import { validateFields } from '@/lib/cms/schema/validate';
import { defaultSectionData, getSectionDefinition, sectionDefinitions, type SectionDefinition } from '@/lib/cms/sections/definitions';
import type { Section } from '@/lib/cms/types';
import { scopeErrors } from '../api';
import SchemaForm from '../forms/SchemaForm';
import Icon from '../Icon';
import { Switch } from '../ui/common';
import Modal from '../ui/Modal';
import Spinner from '../ui/Spinner';

export interface SectionDraft {
  type: string;
  name: string;
  enabled: boolean;
  data: Record<string, unknown>;
}

interface SectionModalProps {
  mode: 'create' | 'edit';
  section?: Section;
  saving: boolean;
  serverErrors: FieldErrors;
  onSave: (draft: SectionDraft) => void;
  onClose: () => void;
}

const CATEGORIES = Array.from(new Set(sectionDefinitions.map((definition) => definition.category)));

/** Create/edit modal. The form is generated from the section type's schema. */
export default function SectionModal({ mode, section, saving, serverErrors, onSave, onClose }: SectionModalProps) {
  const [definition, setDefinition] = useState<SectionDefinition | undefined>(section ? getSectionDefinition(section.type) : undefined);
  const [draft, setDraft] = useState<SectionDraft | null>(
    section ? { type: section.type, name: section.name, enabled: section.enabled, data: structuredClone(section.data) } : null,
  );
  const [clientErrors, setClientErrors] = useState<FieldErrors>({});
  const [typeQuery, setTypeQuery] = useState('');

  const errors = { ...serverErrors, ...clientErrors };
  const dataErrors = scopeErrors(errors, 'data');

  const pickType = (picked: SectionDefinition) => {
    setDefinition(picked);
    setDraft({ type: picked.type, name: picked.label, enabled: true, data: defaultSectionData(picked) });
    setClientErrors({});
  };

  const matchingTypes = useMemo(() => {
    const q = typeQuery.trim().toLowerCase();
    return sectionDefinitions.filter((d) => !q || d.label.toLowerCase().includes(q) || d.description.toLowerCase().includes(q));
  }, [typeQuery]);

  const submit = () => {
    if (!draft || !definition) return;
    const nextErrors: FieldErrors = {};
    if (!draft.name.trim()) nextErrors.name = 'Section name is required.';
    const result = validateFields(definition.fields, draft.data);
    for (const [path, message] of Object.entries(result.errors)) nextErrors[`data.${path}`] = message;
    setClientErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) onSave(draft);
  };

  const choosing = mode === 'create' && !draft;
  const isCode = definition?.fields.some((field) => field.type === 'code');

  return (
    <Modal
      open
      title={choosing ? 'Add new section' : mode === 'create' ? `Add ${definition?.label} section` : `Edit section`}
      description={choosing ? 'Choose a section type.' : definition?.description}
      size={choosing || isCode ? 'xl' : 'lg'}
      onClose={onClose}
      locked={saving}
      footer={
        choosing ? (
          <button type="button" className="cms-btn" onClick={onClose}>Cancel</button>
        ) : (
          <>
            {mode === 'create' && (
              <button type="button" className="cms-btn cms-btn-ghost" style={{ marginRight: 'auto' }} onClick={() => setDraft(null)} disabled={saving}>
                ← Change type
              </button>
            )}
            <button type="button" className="cms-btn" onClick={onClose} disabled={saving}>Cancel</button>
            <button type="button" className="cms-btn cms-btn-primary" onClick={submit} disabled={saving || !definition}>
              {saving && <Spinner />}
              {saving ? 'Saving…' : 'Save section'}
            </button>
          </>
        )
      }
    >
      {choosing ? (
        <>
          <div className="cms-search" style={{ maxWidth: 'none', marginBottom: 6 }}>
            <Icon name="search" size={16} />
            <input className="cms-input" placeholder="Search section types…" value={typeQuery} onChange={(event) => setTypeQuery(event.target.value)} autoFocus />
          </div>
          {CATEGORIES.map((category) => {
            const items = matchingTypes.filter((d) => d.category === category);
            if (!items.length) return null;
            return (
              <div key={category}>
                <div className="cms-type-category">{category}</div>
                <div className="cms-type-grid">
                  {items.map((item) => (
                    <button key={item.type} type="button" className="cms-type-card" onClick={() => pickType(item)}>
                      <strong>{item.label}</strong>
                      <span>{item.description}</span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </>
      ) : !definition ? (
        <div className="cms-alert cms-alert-error">
          <Icon name="alert" size={16} /> Unknown section type &ldquo;{section?.type}&rdquo;. It cannot be edited here.
        </div>
      ) : (
        draft && (
          <div className="cms-form">
            {errors.type && <div className="cms-alert cms-alert-error">{errors.type}</div>}
            <div className="cms-row">
              <div className={`cms-field${errors.name ? ' has-error' : ''}`}>
                <label className="cms-label" htmlFor="section-name">
                  Section name <span className="cms-required">*</span>
                </label>
                <input id="section-name" className="cms-input" value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} />
                <span className="cms-help">Only shown in the admin.</span>
                {errors.name && <span className="cms-error">{errors.name}</span>}
              </div>
              <div className="cms-field">
                <span className="cms-label">Visibility</span>
                <label className="cms-check" style={{ height: 38 }}>
                  <Switch checked={draft.enabled} onChange={(enabled) => setDraft({ ...draft, enabled })} label="Section enabled" />
                  {draft.enabled ? 'Visible on the website' : 'Hidden from the website'}
                </label>
              </div>
            </div>
            {definition.fields.length === 0 ? (
              <div className="cms-alert cms-alert-info">
                <Icon name="alert" size={16} /> This section has no editable fields. {definition.description}
              </div>
            ) : (
              <SchemaForm fields={definition.fields} value={draft.data} onChange={(data) => setDraft({ ...draft, data })} errors={dataErrors} />
            )}
          </div>
        )
      )}
    </Modal>
  );
}
