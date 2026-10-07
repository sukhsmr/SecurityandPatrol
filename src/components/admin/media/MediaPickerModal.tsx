'use client';

import React, { useState } from 'react';
import Modal from '../ui/Modal';
import MediaBrowser from './MediaBrowser';

interface MediaPickerModalProps {
  open: boolean;
  /** Image selected when the picker opens. */
  initial?: string;
  title?: string;
  confirmText?: string;
  onClose: () => void;
  onPick: (path: string) => void;
}

/** Media library in a modal: pick an existing image or upload a new one. */
export default function MediaPickerModal({ open, initial = '', title = 'Select image', confirmText = 'Use selected image', onClose, onPick }: MediaPickerModalProps) {
  const [selected, setSelected] = useState(initial);
  const [wasOpen, setWasOpen] = useState(open);
  // Start from the current image each time the picker opens.
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) setSelected(initial);
  }

  return (
    <Modal
      open={open}
      title={title}
      description="Choose an existing image or upload a new one."
      size="xl"
      onClose={onClose}
      footer={
        <>
          <button type="button" className="cms-btn" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="cms-btn cms-btn-primary"
            disabled={!selected}
            onClick={() => {
              onPick(selected);
              onClose();
            }}
          >
            {confirmText}
          </button>
        </>
      }
    >
      <MediaBrowser selected={selected} onSelect={setSelected} />
    </Modal>
  );
}
