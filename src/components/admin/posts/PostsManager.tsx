'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { FieldErrors } from '@/lib/cms/errors';
import { slugify } from '@/lib/cms/pages';
import { postFields } from '@/lib/cms/schema/documents';
import { validateFields } from '@/lib/cms/schema/validate';
import type { PageStatus, Post } from '@/lib/cms/types';
import { apiRequest, ApiError } from '../api';
import { EditorSurfaceProvider, type EditorSurface } from '../forms/EditorContext';
import SchemaForm from '../forms/SchemaForm';
import Icon from '../Icon';
import { EmptyState, PageHeader, StatusBadge } from '../ui/common';
import ConfirmDialog from '../ui/ConfirmDialog';
import Modal from '../ui/Modal';
import Spinner from '../ui/Spinner';
import { useToast } from '../ui/Toast';

export interface PostSummary {
  slug: string;
  title: string;
  status: PageStatus;
  date: string;
  image?: string;
}

type PostForm = Record<string, unknown>;

function toForm(post?: Post): PostForm {
  return {
    title: post?.title ?? '',
    slug: post?.slug ?? '',
    status: post?.status ?? 'draft',
    date: post?.date ?? new Date().toISOString().slice(0, 19),
    author: post?.author ?? '',
    excerpt: post?.excerpt ?? '',
    featuredImage: { url: post?.featuredImage?.url ?? '', alt: post?.featuredImage?.alt ?? '' },
    categories: post?.categories ?? [],
    audioUrl: post?.audioUrl ?? '',
    seo: { title: post?.seo?.title ?? '', description: post?.seo?.description ?? '' },
    contentHtml: post?.contentHtml ?? '',
  };
}

const POST_SURFACE: EditorSurface = { variant: 'post' };

const plainTitle = (title: string) => title.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&#8217;/g, '’');

export default function PostsManager({ posts }: { posts: PostSummary[] }) {
  const router = useRouter();
  const toast = useToast();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'' | PageStatus>('');
  const [editing, setEditing] = useState<{ slug: string | null } | null>(null);
  const [form, setForm] = useState<PostForm | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [loadingPost, setLoadingPost] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<PostSummary | null>(null);
  const [busy, setBusy] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => (!q || plainTitle(post.title).toLowerCase().includes(q) || post.slug.includes(q)) && (!status || post.status === status));
  }, [posts, query, status]);

  const openCreate = () => {
    setErrors({});
    setForm(toForm());
    setEditing({ slug: null });
  };

  const openEdit = async (slug: string) => {
    setErrors({});
    setForm(null);
    setEditing({ slug });
    setLoadingPost(true);
    try {
      const { post } = await apiRequest<{ post: Post }>('GET', `/api/posts/${slug}`);
      setForm(toForm(post));
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : 'Unable to load post.');
      setEditing(null);
    } finally {
      setLoadingPost(false);
    }
  };

  const updateForm = (next: PostForm) => {
    if (editing?.slug === null && next.title !== form?.title && form?.slug === slugify(String(form?.title ?? ''))) {
      next = { ...next, slug: slugify(String(next.title)) };
    }
    setForm(next);
  };

  const save = async () => {
    if (!form || !editing) return;
    const result = validateFields(postFields, form);
    if (!result.valid) {
      setErrors(result.errors);
      return;
    }
    setSaving(true);
    try {
      const { message } = editing.slug
        ? await apiRequest<{ message: string }>('PUT', `/api/posts/${editing.slug}`, form)
        : await apiRequest<{ message: string }>('POST', '/api/posts', form);
      toast.success(message);
      setEditing(null);
      router.refresh();
    } catch (error) {
      if (error instanceof ApiError) setErrors(error.fieldErrors);
      toast.error(error instanceof ApiError ? error.message : 'Unable to save post.');
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!deleting) return;
    setBusy(true);
    try {
      const { message } = await apiRequest<{ message: string }>('DELETE', `/api/posts/${deleting.slug}`);
      toast.success(message);
      setDeleting(null);
      router.refresh();
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : 'Unable to delete post.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Blog Posts"
        description="Posts appear on the Blog page and at their own URL."
        actions={
          <button type="button" className="cms-btn cms-btn-primary" onClick={openCreate}>
            <Icon name="plus" size={16} /> New post
          </button>
        }
      />
      <div className="cms-card">
        <div className="cms-toolbar">
          <div className="cms-search">
            <Icon name="search" size={16} />
            <input className="cms-input" placeholder="Search posts…" value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Search posts" />
          </div>
          <select className="cms-select" value={status} onChange={(event) => setStatus(event.target.value as '' | PageStatus)} aria-label="Filter by status">
            <option value="">All statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
          <span className="cms-toolbar-meta">{filtered.length} of {posts.length} posts</span>
        </div>
        {filtered.length === 0 ? (
          <EmptyState icon="posts" title={posts.length ? 'No posts match your filters' : 'No posts yet'} message={posts.length ? 'Try a different search.' : 'Write your first post.'} />
        ) : (
          <div className="cms-table-wrap">
            <table className="cms-table">
              <thead>
                <tr>
                  <th>Post</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((post) => (
                  <tr key={post.slug}>
                    <td data-label="Post">
                      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                        {post.image && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={post.image} alt="" style={{ width: 56, height: 40, objectFit: 'cover', borderRadius: 6, flexShrink: 0 }} loading="lazy" />
                        )}
                        <div style={{ minWidth: 0 }}>
                          <div className="cms-cell-title">{plainTitle(post.title)}</div>
                          <div className="cms-cell-sub">/{post.slug}/</div>
                        </div>
                      </div>
                    </td>
                    <td data-label="Date">{new Date(post.date).toLocaleDateString()}</td>
                    <td data-label="Status"><StatusBadge status={post.status} /></td>
                    <td>
                      <div className="cms-actions">
                        {post.status === 'published' && (
                          <a className="cms-btn cms-btn-ghost cms-btn-icon" href={`/${post.slug}/`} target="_blank" rel="noreferrer" title="View" aria-label="View">
                            <Icon name="eye" size={16} />
                          </a>
                        )}
                        <button type="button" className="cms-btn cms-btn-sm" onClick={() => openEdit(post.slug)}>
                          <Icon name="edit" size={14} /> Edit
                        </button>
                        <button type="button" className="cms-btn cms-btn-ghost cms-btn-icon" onClick={() => setDeleting(post)} title="Delete" aria-label="Delete">
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
        open={editing !== null}
        title={editing?.slug ? 'Edit post' : 'New post'}
        size="xl"
        onClose={() => setEditing(null)}
        locked={saving}
        footer={
          <>
            <button type="button" className="cms-btn" onClick={() => setEditing(null)} disabled={saving}>Cancel</button>
            <button type="button" className="cms-btn cms-btn-primary" onClick={save} disabled={saving || !form}>
              {saving && <Spinner />}
              {saving ? 'Saving…' : 'Save post'}
            </button>
          </>
        }
      >
        {loadingPost || !form ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--text-2)', padding: 24 }}>
            <Spinner /> Loading post…
          </div>
        ) : (
          <EditorSurfaceProvider value={POST_SURFACE}>
            <SchemaForm fields={postFields} value={form} onChange={updateForm} errors={errors} />
          </EditorSurfaceProvider>
        )}
      </Modal>

      <ConfirmDialog
        open={deleting !== null}
        title="Delete post?"
        message={<>Are you sure you want to delete <strong>&ldquo;{deleting && plainTitle(deleting.title)}&rdquo;</strong>?</>}
        busy={busy}
        onConfirm={remove}
        onCancel={() => setDeleting(null)}
      />
    </>
  );
}
