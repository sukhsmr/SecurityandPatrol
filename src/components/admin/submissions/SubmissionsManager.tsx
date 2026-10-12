'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Submission, SubmissionStatus, SubmissionType } from '@/lib/cms/types';
import { apiRequest } from '../api';
import Icon from '../Icon';
import { EmptyState, PageHeader, timeAgo } from '../ui/common';
import ConfirmDialog from '../ui/ConfirmDialog';
import Modal from '../ui/Modal';
import Spinner from '../ui/Spinner';
import { useToast } from '../ui/Toast';

export default function SubmissionsManager({ submissions: initial }: { submissions: Submission[] }) {
  const router = useRouter();
  const toast = useToast();
  const [submissions, setSubmissions] = useState<Submission[]>(initial);
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'' | SubmissionType>('');
  const [statusFilter, setStatusFilter] = useState<'' | SubmissionStatus>('');
  const [viewing, setViewing] = useState<Submission | null>(null);
  const [deleting, setDeleting] = useState<Submission | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return submissions.filter((item) => {
      if (typeFilter && item.type !== typeFilter) return false;
      if (statusFilter && item.status !== statusFilter) return false;
      if (!query.trim()) return true;

      const q = query.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q) ||
        item.phone.toLowerCase().includes(q) ||
        (item.service && item.service.toLowerCase().includes(q)) ||
        (item.location && item.location.toLowerCase().includes(q)) ||
        (item.message && item.message.toLowerCase().includes(q))
      );
    });
  }, [submissions, query, typeFilter, statusFilter]);

  const handleStatusChange = async (id: string, newStatus: SubmissionStatus) => {
    setUpdatingId(id);
    try {
      await apiRequest('PATCH', `/api/submissions/${id}`, { status: newStatus });
      setSubmissions((prev) =>
        prev.map((sub) => (sub.id === id ? { ...sub, status: newStatus } : sub))
      );
      if (viewing && viewing.id === id) {
        setViewing((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
      toast.success('Status updated successfully.');
      router.refresh();
    } catch {
      toast.error('Failed to update status.');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async () => {
    if (!deleting) return;
    try {
      await apiRequest('DELETE', `/api/submissions/${deleting.id}`);
      setSubmissions((prev) => prev.filter((item) => item.id !== deleting.id));
      if (viewing && viewing.id === deleting.id) {
        setViewing(null);
      }
      toast.success('Submission deleted.');
      setDeleting(null);
      router.refresh();
    } catch {
      toast.error('Failed to delete submission.');
    }
  };

  const handleOpenDetail = (sub: Submission) => {
    setViewing(sub);
    // Auto-mark as read if new
    if (sub.status === 'new') {
      handleStatusChange(sub.id, 'read');
    }
  };

  const exportCsv = () => {
    if (!submissions.length) return;
    const headers = ['ID', 'Type', 'Status', 'Date', 'Name', 'Email', 'Phone', 'Service', 'Location', 'Message'];
    const rows = submissions.map((s) => [
      `"${s.id}"`,
      `"${s.type}"`,
      `"${s.status}"`,
      `"${new Date(s.createdAt).toISOString()}"`,
      `"${s.name.replace(/"/g, '""')}"`,
      `"${s.email.replace(/"/g, '""')}"`,
      `"${s.phone.replace(/"/g, '""')}"`,
      `"${(s.service || '').replace(/"/g, '""')}"`,
      `"${(s.location || '').replace(/"/g, '""')}"`,
      `"${(s.message || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `leads-submissions-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderStatusBadge = (status: SubmissionStatus) => {
    switch (status) {
      case 'new':
        return <span className="cms-badge" style={{ backgroundColor: '#22c55e', color: '#fff' }}>New</span>;
      case 'read':
        return <span className="cms-badge" style={{ backgroundColor: '#64748b', color: '#fff' }}>Read</span>;
      case 'contacted':
        return <span className="cms-badge" style={{ backgroundColor: '#3b82f6', color: '#fff' }}>Contacted</span>;
      case 'archived':
        return <span className="cms-badge" style={{ backgroundColor: '#94a3b8', color: '#fff' }}>Archived</span>;
      default:
        return <span className="cms-badge">{status}</span>;
    }
  };

  return (
    <>
      <PageHeader
        title="Inquiries & Quotes"
        description="Records received from the Contact Us page and Request a Quote popup."
        actions={
          submissions.length > 0 && (
            <button type="button" className="cms-btn cms-btn-secondary" onClick={exportCsv}>
              <Icon name="external" size={15} /> Export CSV
            </button>
          )
        }
      />

      <div className="cms-card">
        <div className="cms-filters" style={{ display: 'flex', gap: '12px', padding: '16px', flexWrap: 'wrap', borderBottom: '1px solid var(--border)' }}>
          <div className="cms-search" style={{ flex: '1 1 240px', position: 'relative' }}>
            <input
              type="text"
              placeholder="Search by name, email, phone..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="cms-input"
              style={{ width: '100%', paddingLeft: '32px' }}
            />
            <div style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5, pointerEvents: 'none' }}>
              <Icon name="search" size={16} />
            </div>
          </div>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as '' | SubmissionType)}
            className="cms-select"
            style={{ minWidth: '150px' }}
          >
            <option value="">All Form Types</option>
            <option value="contact">Contact Us Form</option>
            <option value="quote">Request a Quote</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as '' | SubmissionStatus)}
            className="cms-select"
            style={{ minWidth: '130px' }}
          >
            <option value="">All Statuses</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="contacted">Contacted</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon="mail"
            title="No inquiries found"
            message={query || typeFilter || statusFilter ? 'Try clearing your filters.' : 'Submissions from your website forms will be recorded here.'}
          />
        ) : (
          <div className="cms-table-wrap">
            <table className="cms-table">
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Service</th>
                  <th>Location</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item.id} style={{ fontWeight: item.status === 'new' ? '600' : 'normal' }}>
                    <td data-label="Status">
                      {renderStatusBadge(item.status)}
                    </td>
                    <td data-label="Type">
                      <span
                        style={{
                          fontSize: '11px',
                          textTransform: 'uppercase',
                          fontWeight: 'bold',
                          letterSpacing: '0.04em',
                          color: item.type === 'quote' ? '#0284c7' : '#16a34a',
                        }}
                      >
                        {item.type === 'quote' ? 'Quote' : 'Contact'}
                      </span>
                    </td>
                    <td data-label="Date" title={new Date(item.createdAt).toLocaleString()}>
                      <span style={{ fontSize: '13px', color: 'var(--text-2)' }}>{timeAgo(item.createdAt)}</span>
                    </td>
                    <td data-label="Name">
                      <button
                        type="button"
                        onClick={() => handleOpenDetail(item)}
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: 0,
                          color: '#f28e24',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          textAlign: 'left',
                          fontSize: '14px',
                        }}
                      >
                        {item.name}
                      </button>
                    </td>
                    <td data-label="Email">
                      <a href={`mailto:${item.email}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                        {item.email}
                      </a>
                    </td>
                    <td data-label="Phone">
                      <a href={`tel:${item.phone}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                        {item.phone}
                      </a>
                    </td>
                    <td data-label="Service">
                      <span style={{ fontSize: '13px' }}>{item.service || '—'}</span>
                    </td>
                    <td data-label="Location">
                      <span style={{ fontSize: '13px' }}>{item.location || '—'}</span>
                    </td>
                    <td data-label="Actions" style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '6px', alignItems: 'center' }}>
                        <button
                          type="button"
                          className="cms-btn cms-btn-ghost cms-btn-sm"
                          onClick={() => handleOpenDetail(item)}
                          title="View submission details"
                        >
                          <Icon name="eye" size={15} /> View
                        </button>

                        <button
                          type="button"
                          className="cms-btn cms-btn-ghost cms-btn-sm"
                          onClick={() => setDeleting(item)}
                          style={{ color: '#dc2626' }}
                          title="Delete submission"
                        >
                          <Icon name="trash" size={15} />
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

      {/* Details Modal */}
      {viewing && (
        <Modal
          title={`${viewing.type === 'quote' ? 'Request a Quote' : 'Contact Us Inquiry'} - Details`}
          open={!!viewing}
          onClose={() => setViewing(null)}
          size="md"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '12px 16px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
              <div>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Submitted At</span>
                <div style={{ fontWeight: '600', fontSize: '14px' }}>{new Date(viewing.createdAt).toLocaleString()}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '13px', color: '#64748b' }}>Status:</span>
                <select
                  value={viewing.status}
                  onChange={(e) => handleStatusChange(viewing.id, e.target.value as SubmissionStatus)}
                  disabled={updatingId === viewing.id}
                  className="cms-select cms-select-sm"
                >
                  <option value="new">New</option>
                  <option value="read">Read</option>
                  <option value="contacted">Contacted</option>
                  <option value="archived">Archived</option>
                </select>
                {updatingId === viewing.id && <Spinner />}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
              <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '2px' }}>Full Name</div>
                <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#0f172a' }}>{viewing.name}</div>
              </div>

              <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '2px' }}>Email Address</div>
                <div>
                  <a href={`mailto:${viewing.email}`} style={{ color: '#f28e24', fontWeight: '600', textDecoration: 'none' }}>
                    {viewing.email}
                  </a>
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '2px' }}>Phone Number</div>
                <div>
                  <a href={`tel:${viewing.phone}`} style={{ color: '#0f172a', fontWeight: '600', textDecoration: 'none' }}>
                    {viewing.phone}
                  </a>
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '2px' }}>Requested Service</div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a' }}>{viewing.service || 'Not specified'}</div>
              </div>

              <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '2px' }}>Location / Branch</div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a' }}>{viewing.location || 'Not specified'}</div>
              </div>

              <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '2px' }}>Form Source</div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a' }}>
                  {viewing.type === 'quote' ? 'Request a Quote Popup' : 'Contact Us Page'}
                </div>
              </div>
            </div>

            {viewing.message && (
              <div>
                <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#334155', marginBottom: '6px' }}>Message / Notes:</div>
                <div style={{ background: '#f8fafc', padding: '14px 16px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '14px', lineHeight: '1.6', whiteSpace: 'pre-wrap', color: '#1e293b' }}>
                  {viewing.message}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid var(--border)' }}>
              <a
                href={`mailto:${viewing.email}?subject=RE: ${viewing.type === 'quote' ? 'Quote Request' : 'Inquiry'} - Rayven Security Protection`}
                className="cms-btn cms-btn-primary"
              >
                <Icon name="mail" size={15} /> Reply via Email
              </a>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  className="cms-btn cms-btn-secondary"
                  onClick={() => setViewing(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={!!deleting}
        title="Delete submission"
        message={`Are you sure you want to delete the submission from "${deleting?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleting(null)}
      />
    </>
  );
}
