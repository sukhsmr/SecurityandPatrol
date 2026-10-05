'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { FieldErrors } from '@/lib/cms/errors';
import { pagePath, toPageSettingsForm, type PageSettingsForm } from '@/lib/cms/pages';
import { pageSettingsFields } from '@/lib/cms/schema/documents';
import { validateFields } from '@/lib/cms/schema/validate';
import { getSectionDefinition, sectionDefinitions } from '@/lib/cms/sections/definitions';
import type { Page, Section } from '@/lib/cms/types';
import { apiRequest, ApiError } from '../api';
import SchemaForm from '../forms/SchemaForm';
import Icon from '../Icon';
import { EmptyState, PageHeader, StatusBadge, Switch, timeAgo } from '../ui/common';
import ConfirmDialog from '../ui/ConfirmDialog';
import Spinner from '../ui/Spinner';
import { useToast } from '../ui/Toast';
import SectionModal, { type SectionDraft } from './SectionModal';

type ModalState = { mode: 'create' } | { mode: 'edit'; section: Section } | null;

export default function PageEditor({ page: initialPage, initialTab = 'sections' }: { page: Page; initialTab?: 'sections' | 'settings' }) {
  const router = useRouter();
  const toast = useToast();
  const [page, setPage] = useState(initialPage);
  const [sections, setSections] = useState(initialPage.sections);
  const [tab, setTab] = useState<'sections' | 'settings'>(initialTab);
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [modal, setModal] = useState<ModalState>(null);
  const [modalErrors, setModalErrors] = useState<FieldErrors>({});
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<Section | null>(null);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);
  const [settings, setSettings] = useState<PageSettingsForm>(toPageSettingsForm(initialPage));
  const [settingsErrors, setSettingsErrors] = useState<FieldErrors>({});
  const [savingSettings, setSavingSettings] = useState(false);

  const base = `/api/pages/${page.slug}`;
  const filtering = query.trim() !== '' || typeFilter !== '';
  const usedTypes = useMemo(() => Array.from(new Set(sections.map((section) => section.type))), [sections]);
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sections
      .map((section, index) => ({ section, index }))
      .filter(({ section }) => (!q || section.name.toLowerCase().includes(q)) && (!typeFilter || section.type === typeFilter));
  }, [sections, query, typeFilter]);

  const fail = (error: unknown, fallback: string) => toast.error(error instanceof ApiError ? error.message : fallback);

  // ------------------------------------------------------------ sections

  const saveSection = async (draft: SectionDraft) => {
    setSaving(true);
    setModalErrors({});
    try {
      if (modal?.mode === 'edit') {
        const { section, message } = await apiRequest<{ section: Section; message: string }>('PUT', `${base}/sections/${modal.section.id}`, draft);
        setSections((current) => current.map((item) => (item.id === section.id ? section : item)));
        toast.success(message);
      } else {
        const { section, message } = await apiRequest<{ section: Section; message: string }>('POST', `${base}/sections`, draft);
        setSections((current) => [...current, section]);
        toast.success(message);
      }
      setModal(null);
      router.refresh();
    } catch (error) {
      if (error instanceof ApiError) setModalErrors(error.fieldErrors);
      fail(error, 'Unable to save section.');
    } finally {
      setSaving(false);
    }
  };

  const toggle = async (section: Section, enabled: boolean) => {
    setBusyId(section.id);
    setSections((current) => current.map((item) => (item.id === section.id ? { ...item, enabled } : item)));
    try {
      await apiRequest('PUT', `${base}/sections/${section.id}`, { enabled });
      toast.success(`${section.name} ${enabled ? 'enabled' : 'disabled'}.`);
      router.refresh();
    } catch (error) {
      setSections((current) => current.map((item) => (item.id === section.id ? { ...item, enabled: !enabled } : item)));
      fail(error, 'Unable to update section.');
    } finally {
      setBusyId(null);
    }
  };

  const duplicate = async (section: Section) => {
    setBusyId(section.id);
    try {
      const { section: copy, message } = await apiRequest<{ section: Section; message: string }>('POST', `${base}/sections/${section.id}/duplicate`);
      setSections((current) => {
        const index = current.findIndex((item) => item.id === section.id);
        return [...current.slice(0, index + 1), copy, ...current.slice(index + 1)];
      });
      toast.success(message);
      router.refresh();
    } catch (error) {
      fail(error, 'Unable to duplicate section.');
    } finally {
      setBusyId(null);
    }
  };

  const remove = async () => {
    if (!deleting) return;
    setBusyId(deleting.id);
    try {
      const { message } = await apiRequest<{ message: string }>('DELETE', `${base}/sections/${deleting.id}`);
      setSections((current) => current.filter((item) => item.id !== deleting.id));
      toast.success(message);
      setDeleting(null);
      router.refresh();
    } catch (error) {
      fail(error, 'Unable to delete section.');
    } finally {
      setBusyId(null);
    }
  };

  const reorder = async (from: number, to: number) => {
    if (from === to || to < 0 || to >= sections.length) return;
    const previous = sections;
    const next = [...sections];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    setSections(next);
    setBusyId(moved.id);
    try {
      const { message } = await apiRequest<{ message: string }>('PUT', `${base}/sections`, { order: next.map((section) => section.id) });
      toast.success(message);
      router.refresh();
    } catch (error) {
      setSections(previous);
      fail(error, 'Unable to update section order.');
    } finally {
      setBusyId(null);
    }
  };

  // ------------------------------------------------------------ settings

  const saveSettings = async (override?: Partial<PageSettingsForm>) => {
    const form = { ...settings, ...override };
    const result = validateFields(pageSettingsFields, form);
    if (!result.valid) {
      setSettingsErrors(result.errors);
      setTab('settings');
      toast.error('Please correct the highlighted fields.');
      return;
    }
    setSavingSettings(true);
    setSettingsErrors({});
    try {
      const { page: updated, message } = await apiRequest<{ page: Page; message: string }>('PUT', base, form);
      setPage(updated);
      setSettings(toPageSettingsForm(updated));
      toast.success(message);
      if (updated.slug !== page.slug) router.replace(`/admin/pages/${updated.slug}?tab=${tab}`);
      else router.refresh();
    } catch (error) {
      if (error instanceof ApiError) setSettingsErrors(error.fieldErrors);
      fail(error, 'Unable to save page settings.');
    } finally {
      setSavingSettings(false);
    }
  };

  const publicUrl = page.status === 'published' ? pagePath(page.slug) : `/preview/${page.slug}/`;

  return (
    <>
      <PageHeader
        breadcrumb={<><Link href="/admin/pages">Pages</Link> <span>/</span> <span>{page.title}</span></>}
        title={page.title}
        description={
          <span style={{ display: 'inline-flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <StatusBadge status={page.status} />
            <code>{pagePath(page.slug)}</code>
            <span style={{ color: 'var(--text-3)' }}>Updated {timeAgo(page.updatedAt)}</span>
          </span>
        }
        actions={
          <>
            <a className="cms-btn" href={publicUrl} target="_blank" rel="noreferrer">
              <Icon name={page.status === 'published' ? 'external' : 'eye'} size={16} />
              {page.status === 'published' ? 'View page' : 'Preview'}
            </a>
            <button
              type="button"
              className={`cms-btn ${page.status === 'published' ? '' : 'cms-btn-primary'}`}
              disabled={savingSettings}
              onClick={() => saveSettings({ status: page.status === 'published' ? 'draft' : 'published' })}
            >
              {savingSettings ? <Spinner /> : <Icon name={page.status === 'published' ? 'draft' : 'globe'} size={16} />}
              {page.status === 'published' ? 'Unpublish' : 'Publish'}
            </button>
          </>
        }
      />

      <div className="cms-tabs" role="tablist">
        <button type="button" role="tab" aria-selected={tab === 'sections'} className={`cms-tab${tab === 'sections' ? ' active' : ''}`} onClick={() => setTab('sections')}>
          Sections <span className="cms-tab-count">{sections.length}</span>
        </button>
        <button type="button" role="tab" aria-selected={tab === 'settings'} className={`cms-tab${tab === 'settings' ? ' active' : ''}`} onClick={() => setTab('settings')}>
          Settings &amp; SEO
        </button>
      </div>

      {tab === 'sections' ? (
        <div className="cms-card">
          <div className="cms-toolbar">
            <div className="cms-search">
              <Icon name="search" size={16} />
              <input className="cms-input" placeholder="Search sections…" value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Search sections" />
            </div>
            <select className="cms-select" value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)} aria-label="Filter by section type">
              <option value="">All types</option>
              {usedTypes.map((type) => (
                <option key={type} value={type}>{getSectionDefinition(type)?.label ?? type}</option>
              ))}
            </select>
            <span className="cms-toolbar-meta">{filtering ? 'Clear filters to reorder' : 'Drag rows to reorder'}</span>
            <button type="button" className="cms-btn cms-btn-primary" onClick={() => { setModalErrors({}); setModal({ mode: 'create' }); }}>
              <Icon name="plus" size={16} /> Add section
            </button>
          </div>

          {visible.length === 0 ? (
            <EmptyState
              icon="layers"
              title={sections.length ? 'No sections match your filters' : 'This page has no sections yet'}
              message={sections.length ? 'Try a different search or type.' : `Choose from ${sectionDefinitions.length} section types to build the page.`}
              action={!sections.length && <button type="button" className="cms-btn cms-btn-primary" onClick={() => setModal({ mode: 'create' })}>Add section</button>}
            />
          ) : (
            <div className="cms-table-wrap">
              <table className="cms-table">
                <thead>
                  <tr>
                    <th style={{ width: 80 }}>Order</th>
                    <th>Section</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map(({ section, index }) => {
                    const definition = getSectionDefinition(section.type);
                    const busy = busyId === section.id;
                    return (
                      <tr
                        key={section.id}
                        className={[dragIndex === index && 'is-dragging', overIndex === index && dragIndex !== index && 'is-drop-target', !section.enabled && 'is-disabled'].filter(Boolean).join(' ')}
                        draggable={!filtering && busyId === null}
                        onDragStart={(event) => { setDragIndex(index); event.dataTransfer.effectAllowed = 'move'; }}
                        onDragOver={(event) => { if (dragIndex !== null) { event.preventDefault(); setOverIndex(index); } }}
                        onDragEnd={() => { setDragIndex(null); setOverIndex(null); }}
                        onDrop={(event) => {
                          event.preventDefault();
                          if (dragIndex !== null) reorder(dragIndex, index);
                          setDragIndex(null);
                          setOverIndex(null);
                        }}
                      >
                        <td data-label="Order">
                          <span className="cms-order">
                            {!filtering && <span className="cms-drag" title="Drag to reorder"><Icon name="grip" size={16} /></span>}
                            {index + 1}
                          </span>
                        </td>
                        <td data-label="Section">
                          <div className="cms-cell-title">
                            <button type="button" onClick={() => { setModalErrors({}); setModal({ mode: 'edit', section }); }} style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', cursor: 'pointer', textAlign: 'left' }}>
                              {section.name}
                            </button>
                          </div>
                        </td>
                        <td data-label="Type">
                          <span className="cms-badge cms-badge-plain cms-badge-muted">{definition?.label ?? section.type}</span>
                        </td>
                        <td data-label="Status">
                          <span style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
                            <Switch checked={section.enabled} disabled={busy} onChange={(enabled) => toggle(section, enabled)} label={`${section.enabled ? 'Disable' : 'Enable'} ${section.name}`} />
                            <span style={{ color: 'var(--text-2)', fontSize: 13 }}>{section.enabled ? 'Active' : 'Hidden'}</span>
                          </span>
                        </td>
                        <td>
                          <div className="cms-actions">
                            <button type="button" className="cms-btn cms-btn-sm" onClick={() => { setModalErrors({}); setModal({ mode: 'edit', section }); }}>
                              <Icon name="edit" size={14} /> Edit
                            </button>
                            <button type="button" className="cms-btn cms-btn-ghost cms-btn-icon" onClick={() => reorder(index, index - 1)} disabled={filtering || index === 0 || busyId !== null} title="Move up" aria-label="Move up">
                              <Icon name="up" size={16} />
                            </button>
                            <button type="button" className="cms-btn cms-btn-ghost cms-btn-icon" onClick={() => reorder(index, index + 1)} disabled={filtering || index === sections.length - 1 || busyId !== null} title="Move down" aria-label="Move down">
                              <Icon name="down" size={16} />
                            </button>
                            <button type="button" className="cms-btn cms-btn-ghost cms-btn-icon" onClick={() => duplicate(section)} disabled={busyId !== null} title="Duplicate" aria-label="Duplicate">
                              {busy && !deleting ? <Spinner /> : <Icon name="copy" size={16} />}
                            </button>
                            <button type="button" className="cms-btn cms-btn-ghost cms-btn-icon" onClick={() => setDeleting(section)} disabled={busyId !== null} title="Delete" aria-label="Delete">
                              <Icon name="trash" size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <div className="cms-card">
          <div className="cms-card-body">
            <SchemaForm fields={pageSettingsFields} value={settings as unknown as Record<string, unknown>} onChange={(value) => setSettings(value as unknown as PageSettingsForm)} errors={settingsErrors} />
          </div>
          <div className="cms-sticky-actions">
            <button type="button" className="cms-btn" onClick={() => { setSettings(toPageSettingsForm(page)); setSettingsErrors({}); }} disabled={savingSettings}>
              Reset
            </button>
            <button type="button" className="cms-btn cms-btn-primary" onClick={() => saveSettings()} disabled={savingSettings}>
              {savingSettings && <Spinner />}
              {savingSettings ? 'Saving…' : 'Save settings'}
            </button>
          </div>
        </div>
      )}

      {modal && (
        <SectionModal
          key={modal.mode === 'edit' ? modal.section.id : 'create'}
          mode={modal.mode}
          section={modal.mode === 'edit' ? modal.section : undefined}
          saving={saving}
          serverErrors={modalErrors}
          onSave={saveSection}
          onClose={() => setModal(null)}
        />
      )}

      <ConfirmDialog
        open={deleting !== null}
        title="Delete section?"
        message={<>Are you sure you want to delete <strong>&ldquo;{deleting?.name}&rdquo;</strong>?</>}
        busy={busyId !== null && deleting !== null}
        onConfirm={remove}
        onCancel={() => setDeleting(null)}
      />
    </>
  );
}
