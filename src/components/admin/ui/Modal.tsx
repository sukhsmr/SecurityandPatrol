'use client';

import React, { useEffect, useId } from 'react';
import { createPortal } from 'react-dom';
import Icon from '../Icon';

interface ModalProps {
  open: boolean;
  title: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onClose: () => void;
  /** Prevents closing (e.g. while saving). */
  locked?: boolean;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

export default function Modal({ open, title, description, size = 'md', onClose, locked = false, footer, children }: ModalProps) {
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !locked) onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, locked, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="cms-modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !locked) onClose();
      }}
    >
      <div className={`cms-modal size-${size}`} role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <div className="cms-modal-header">
          <div>
            <h2 id={titleId}>{title}</h2>
            {description && <p>{description}</p>}
          </div>
          <button type="button" className="cms-btn cms-btn-ghost cms-btn-icon" onClick={onClose} disabled={locked} aria-label="Close">
            <Icon name="x" />
          </button>
        </div>
        <div className="cms-modal-body">{children}</div>
        {footer && <div className="cms-modal-footer">{footer}</div>}
      </div>
    </div>,
    document.body,
  );
}
