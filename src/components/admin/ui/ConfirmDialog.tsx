'use client';

import React from 'react';
import Icon from '../Icon';
import Modal from './Modal';
import Spinner from './Spinner';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: React.ReactNode;
  confirmLabel?: string;
  busyLabel?: string;
  busy?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

/** Destructive-action confirmation. Nothing is deleted until the user confirms. */
export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Delete',
  busyLabel = 'Deleting…',
  busy = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Modal
      open={open}
      title={title}
      size="sm"
      onClose={onCancel}
      locked={busy}
      footer={
        <>
          <button type="button" className="cms-btn" onClick={onCancel} disabled={busy}>
            Cancel
          </button>
          <button type="button" className="cms-btn cms-btn-danger" onClick={onConfirm} disabled={busy}>
            {busy && <Spinner />}
            {busy ? busyLabel : confirmLabel}
          </button>
        </>
      }
    >
      <div className="cms-confirm-icon">
        <Icon name="trash" size={22} />
      </div>
      <div style={{ color: 'var(--text-2)' }}>{message}</div>
      <p style={{ color: 'var(--text-3)', fontSize: 13, marginTop: 10 }}>This action cannot be undone.</p>
    </Modal>
  );
}
