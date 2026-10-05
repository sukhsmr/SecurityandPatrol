'use client';

import React, { useEffect, useRef, useState } from 'react';
import { apiRequest, ApiError } from '../api';
import Icon from '../Icon';
import { EmptyState } from '../ui/common';
import Spinner from '../ui/Spinner';
import { useToast } from '../ui/Toast';

interface MediaItem {
  path: string;
  name: string;
  size: number;
  modified: string;
}

interface MediaPage {
  items: MediaItem[];
  total: number;
  page: number;
  pageSize: number;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

/**
 * Searchable, paginated grid of site images with upload. Used by the Media
 * page and by the image picker in forms (`onSelect`).
 */
export default function MediaBrowser({ onSelect, selected }: { onSelect?: (path: string) => void; selected?: string }) {
  const toast = useToast();
  const [query, setQuery] = useState('');
  const [debounced, setDebounced] = useState('');
  const [page, setPage] = useState(1);
  const [result, setResult] = useState<{ key: string; data?: MediaPage; error?: string } | null>(null);
  const [reloadToken, setReloadToken] = useState(0);
  const [uploading, setUploading] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(query);
      setPage(1);
    }, 250);
    return () => clearTimeout(timer);
  }, [query]);

  // Each request is identified by its parameters; `loading` is derived from
  // whether the latest result belongs to the current request.
  const requestKey = `${debounced}|${page}|${reloadToken}`;
  const loading = result?.key !== requestKey;
  const data = result?.data ?? null;
  const error = result?.key === requestKey ? result.error ?? null : null;

  useEffect(() => {
    let cancelled = false;
    const params = new URLSearchParams({ q: debounced, page: String(page), pageSize: '36' });
    apiRequest<MediaPage>('GET', `/api/media?${params}`)
      .then((loaded) => !cancelled && setResult({ key: requestKey, data: loaded }))
      .catch((err) => !cancelled && setResult((previous) => ({ key: requestKey, data: previous?.data, error: err instanceof ApiError ? err.message : 'Unable to load images.' })));
    return () => {
      cancelled = true;
    };
  }, [debounced, page, requestKey]);

  const load = () => setReloadToken((token) => token + 1);

  const upload = async (file: File) => {
    const form = new FormData();
    form.append('file', file);
    setUploading(true);
    try {
      const uploaded = await apiRequest<{ item: MediaItem; message: string }>('POST', '/api/media', form);
      toast.success(uploaded.message);
      setQuery('');
      setPage(1);
      load();
      onSelect?.(uploaded.item.path);
    } catch (err) {
      const message = err instanceof ApiError ? Object.values(err.fieldErrors)[0] ?? err.message : 'Upload failed.';
      toast.error(message);
    } finally {
      setUploading(false);
      if (fileInput.current) fileInput.current.value = '';
    }
  };

  const totalPages = data ? Math.max(1, Math.ceil(data.total / data.pageSize)) : 1;

  return (
    <div>
      <div className="cms-toolbar" style={{ padding: '0 0 14px', borderBottom: 'none' }}>
        <div className="cms-search">
          <Icon name="search" size={16} />
          <input className="cms-input" placeholder="Search images by path or name…" value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Search images" />
        </div>
        <span className="cms-toolbar-meta">{data ? `${data.total} image${data.total === 1 ? '' : 's'}` : ''}</span>
        <input
          ref={fileInput}
          type="file"
          accept="image/png,image/jpeg,image/gif,image/webp"
          hidden
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) upload(file);
          }}
        />
        <button type="button" className="cms-btn cms-btn-primary" onClick={() => fileInput.current?.click()} disabled={uploading}>
          {uploading ? <Spinner /> : <Icon name="upload" size={16} />}
          {uploading ? 'Uploading…' : 'Upload image'}
        </button>
      </div>

      {error ? (
        <div className="cms-alert cms-alert-error">
          <Icon name="alert" size={16} /> {error}
          <button type="button" className="cms-btn cms-btn-sm" style={{ marginLeft: 'auto' }} onClick={load}>
            Retry
          </button>
        </div>
      ) : loading && !data ? (
        <div className="cms-media-grid">
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className="cms-skeleton" style={{ aspectRatio: '4 / 3.6' }} />
          ))}
        </div>
      ) : data && data.items.length === 0 ? (
        <EmptyState icon="media" title="No images found" message={debounced ? 'Try a different search term.' : 'Upload an image to get started.'} />
      ) : (
        <div className="cms-media-grid" style={{ opacity: loading ? 0.6 : 1 }}>
          {data?.items.map((item) => (
            <button
              key={item.path}
              type="button"
              className={`cms-media-item${selected === item.path ? ' selected' : ''}`}
              onClick={() => onSelect?.(item.path)}
              title={`${item.path} · ${formatSize(item.size)}`}
            >
              <div className="cms-media-thumb">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.path} alt="" loading="lazy" />
              </div>
              <div className="cms-media-name">{item.path}</div>
            </button>
          ))}
        </div>
      )}

      {data && totalPages > 1 && (
        <div className="cms-pagination">
          <button type="button" className="cms-btn cms-btn-sm" onClick={() => setPage(page - 1)} disabled={page <= 1 || loading}>
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button type="button" className="cms-btn cms-btn-sm" onClick={() => setPage(page + 1)} disabled={page >= totalPages || loading}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}
