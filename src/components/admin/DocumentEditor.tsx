'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { FieldErrors } from '@/lib/cms/errors';
import type { Field } from '@/lib/cms/schema/fields';
import { validateFields } from '@/lib/cms/schema/validate';
import { apiRequest, ApiError } from './api';
import SchemaForm from './forms/SchemaForm';
import { PageHeader } from './ui/common';
import Spinner from './ui/Spinner';
import { useToast } from './ui/Toast';

interface DocumentEditorProps {
  title: string;
  description: string;
  fields: Field[];
  initial: Record<string, unknown>;
  endpoint: string;
  notice?: React.ReactNode;
}

/** Generic schema-driven editor for a single JSON document (header, footer, settings, offices). */
export default function DocumentEditor({ title, description, fields, initial, endpoint, notice }: DocumentEditorProps) {
  const router = useRouter();
  const toast = useToast();
  const [saved, setSaved] = useState(initial);
  const [value, setValue] = useState(initial);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [saving, setSaving] = useState(false);
  const dirty = JSON.stringify(value) !== JSON.stringify(saved);

  const save = async () => {
    const result = validateFields(fields, value);
    if (!result.valid) {
      setErrors(result.errors);
      toast.error('Please correct the highlighted fields.');
      return;
    }
    setSaving(true);
    setErrors({});
    try {
      const response = await apiRequest<{ message: string }>('PUT', endpoint, result.value);
      setSaved(result.value as Record<string, unknown>);
      setValue(result.value as Record<string, unknown>);
      toast.success(response.message);
      router.refresh();
    } catch (error) {
      if (error instanceof ApiError) setErrors(error.fieldErrors);
      toast.error(error instanceof ApiError ? error.message : 'Unable to save changes.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageHeader title={title} description={description} />
      {notice && <div style={{ marginBottom: 16 }}>{notice}</div>}
      <div className="cms-card">
        <div className="cms-card-body">
          <SchemaForm fields={fields} value={value} onChange={setValue} errors={errors} />
        </div>
        <div className="cms-sticky-actions">
          {dirty && <span style={{ marginRight: 'auto', alignSelf: 'center', color: 'var(--warning)', fontSize: 13, fontWeight: 600 }}>Unsaved changes</span>}
          <button type="button" className="cms-btn" onClick={() => { setValue(saved); setErrors({}); }} disabled={saving || !dirty}>
            Discard
          </button>
          <button type="button" className="cms-btn cms-btn-primary" onClick={save} disabled={saving || !dirty}>
            {saving && <Spinner />}
            {saving ? 'Saving…' : 'Save changes'}
          </button>
        </div>
      </div>
    </>
  );
}
