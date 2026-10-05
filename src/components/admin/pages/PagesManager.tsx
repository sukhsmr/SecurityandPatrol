'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { FieldErrors } from '@/lib/cms/errors';
import { emptyPageSettingsForm, slugify, type PageSettingsForm } from '@/lib/cms/pages';
import { pageSettingsFields } from '@/lib/cms/schema/documents';
import { validateFields } from '@/lib/cms/schema/validate';
import type { PageGroup, PageStatus } from '@/lib/cms/types';
import { apiRequest, ApiError } from '../api';
import SchemaForm from '../forms/SchemaForm';
import Icon from '../Icon';
import { EmptyState, PageHeader, StatusBadge, timeAgo } from '../ui/common';
import ConfirmDialog from '../ui/ConfirmDialog';
import Modal from '../ui/Modal';
import Spinner from '../ui/Spinner';
import { useToast } from '../ui/Toast';

export interface PageSummary {
  slug: string;
  title: string;
  path: string;
  status: PageStatus;
  group: PageGroup;
  sectionCount: number;
  updatedAt: string;
}

const CREATE_FIELDS = pageSettingsFields.filter((field) => ['title', 'slug', 'status', 'group'].includes(field.name));

export default function PagesManager({ pages }: { pages: PageSummary[] }) {
  const router = useRouter();
  const toast = useToast();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'' | PageStatus>('');
  const [group, setGroup] = useState<'' | PageGroup>('');
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<PageSettingsForm>(emptyPageSettingsForm());
  const [slugTouched, setSlugTouched] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [saving, setSaving] = useState(false);
  const [busySlug, setBusySlug] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<PageSummary | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return pages.filter(
      (page) =>
        (!q || page.title.toLowerCase().includes(q) || page.path.includes(q)) &&
        (!status || page.status === status) &&
        (!group || page.group === group),
    );
  }, [pages, query, status, group]);

  const openCreate = () => {
    setForm(emptyPageSettingsForm());
    setSlugTouched(false);
    setErrors({});
    setCreating(true);
  };

  const updateForm = (value: Record<string, unknown>) => {
    const next = value as unknown as PageSettingsForm;
    if (next.slug !== form.slug) setSlugTouched(true);
    else if (!slugTouched && next.title !== form.title) next.slug = slugify(next.title);
    setForm(next);
  };

  const create = async () => {
    const result = validateFields(pageSettingsFields, form);
    if (!result.valid) {
      setErrors(result.errors);
      return;
    }
    setSaving(true);
    try {
      const { page, message } = await apiRequest<{ page: { slug: string }; message: string }>('POST', '/api/pages', form);
      toast.success(message);
      setCreating(false);
      router.push(`/admin/pages/${page.slug}`);
    } catch (error) {
      if (error instanceof ApiError) setErrors(error.fieldErrors);
      toast.error(error instanceof ApiError ? error.message : 'Unable to create page.');
    } finally {
      setSaving(false);
    }
  };

  const duplicate = async (page: PageSummary) => {
    setBusySlug(page.slug);
    try {
      const { message } = await apiRequest<{ message: string }>('POST', `/api/pages/${page.slug}/duplicate`);
      toast.success(message);
      router.refresh();
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : 'Unable to duplicate page.');
    } finally {
      setBusySlug(null);
    }
  };

  const remove = async () => {
    if (!deleting) return;
    setBusySlug(deleting.slug);
    try {
      const { message } = await apiRequest<{ message: string }>('DELETE', `/api/pages/${deleting.slug}`);
      toast.success(message);
      setDeleting(null);
      router.refresh();
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : 'Unable to delete page.');
    } finally {
      setBusySlug(null);
    }
  };

  return (
    <>
      <PageHeader
        title="Pages"
        description="Manage every page on the website and the sections they contain."
        actions={
          <button type="button" className="cms-btn cms-btn-primary" onClick={openCreate}>
            <Icon name="plus" size={16} /> New page
          </button>
        }
      />

      <div className="cms-card">
        <div className="cms-toolbar">
          <div className="cms-search">
            <Icon name="search" size={16} />
            <input className="cms-input" placeholder="Search pages…" value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Search pages" />
          </div>
          <select className="cms-select" value={status} onChange={(event) => setStatus(event.target.value as '' | PageStatus)} aria-label="Filter by status">
            <option value="">All statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
          <select className="cms-select" value={group} onChange={(event) => setGroup(event.target.value as '' | PageGroup)} aria-label="Filter by type">
            <option value="">All types</option>
            <option value="page">Standard pages</option>
            <option value="service">Service pages</option>
          </select>
          <span className="cms-toolbar-meta">
            {filtered.length} of {pages.length} pages
          </span>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon="pages"
            title={pages.length ? 'No pages match your filters' : 'No pages yet'}
            message={pages.length ? 'Try a different search or filter.' : 'Create your first page to get started.'}
            action={!pages.length && <button type="button" className="cms-btn cms-btn-primary" onClick={openCreate}>New page</button>}
          />
        ) : (
          <div className="cms-table-wrap">
            <table className="cms-table">
              <thead>
                <tr>
                  <th>Page</th>
                  <th>URL</th>
                  <th>Type</th>
                  <th>Sections</th>
                  <th>Status</th>
                  <th>Updated</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((page) => (
                  <tr key={page.slug}>
                    <td data-label="Page">
                      <div className="cms-cell-title">
                        <Link href={`/admin/pages/${page.slug}`}>{page.title}</Link>
                      </div>
                    </td>
                    <td data-label="URL"><code>{page.path}</code></td>
                    <td data-label="Type">
                      <span className={`cms-badge cms-badge-plain ${page.group === 'service' ? 'cms-badge-info' : 'cms-badge-muted'}`}>{page.group === 'service' ? 'Service' : 'Page'}</span>
                    </td>
                    <td data-label="Sections">{page.sectionCount}</td>
                    <td data-label="Status"><StatusBadge status={page.status} /></td>
                    <td data-label="Updated" title={new Date(page.updatedAt).toLocaleString()}>{timeAgo(page.updatedAt)}</td>
                    <td>
                      <div className="cms-actions">
                        <a className="cms-btn cms-btn-ghost cms-btn-icon" href={page.status === 'published' ? page.path : `/preview/${page.slug}/`} target="_blank" rel="noreferrer" title={page.status === 'published' ? 'View' : 'Preview draft'} aria-label="View">
                          <Icon name="eye" size={16} />
                        </a>
                        <Link className="cms-btn cms-btn-sm" href={`/admin/pages/${page.slug}`}>
                          <Icon name="layers" size={14} /> Sections
                        </Link>
                        <Link className="cms-btn cms-btn-ghost cms-btn-icon" href={`/admin/pages/${page.slug}?tab=settings`} title="Edit settings" aria-label="Edit settings">
                          <Icon name="edit" size={16} />
                        </Link>
                        <button type="button" className="cms-btn cms-btn-ghost cms-btn-icon" onClick={() => duplicate(page)} disabled={busySlug === page.slug} title="Duplicate" aria-label="Duplicate">
                          {busySlug === page.slug && !deleting ? <Spinner /> : <Icon name="copy" size={16} />}
                        </button>
                        <button type="button" className="cms-btn cms-btn-ghost cms-btn-icon" onClick={() => setDeleting(page)} disabled={page.slug === 'home'} title={page.slug === 'home' ? 'The home page cannot be deleted' : 'Delete'} aria-label="Delete">
                          <Icon name="trash" size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal
        open={creating}
        title="Add new page"
        description="The page is created empty — add sections after saving."
        onClose={() => setCreating(false)}
        locked={saving}
        footer={
          <>
            <button type="button" className="cms-btn" onClick={() => setCreating(false)} disabled={saving}>Cancel</button>
            <button type="button" className="cms-btn cms-btn-primary" onClick={create} disabled={saving}>
              {saving && <Spinner />}
              {saving ? 'Saving…' : 'Create page'}
            </button>
          </>
        }
      >
        <SchemaForm fields={CREATE_FIELDS} value={form as unknown as Record<string, unknown>} onChange={updateForm} errors={errors} />
      </Modal>

      <ConfirmDialog
        open={deleting !== null}
        title="Delete page?"
        message={<>Are you sure you want to delete <strong>&ldquo;{deleting?.title}&rdquo;</strong> and all of its sections?</>}
        busy={busySlug !== null && deleting !== null}
        onConfirm={remove}
        onCancel={() => setDeleting(null)}
      />
    </>
  );
}
