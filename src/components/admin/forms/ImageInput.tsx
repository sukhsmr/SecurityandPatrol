'use client';

import React, { useState } from 'react';
import type { ImageValue } from '@/lib/cms/schema/fields';
import Icon from '../Icon';
import MediaPickerModal from '../media/MediaPickerModal';

interface ImageInputProps {
  id: string;
  value: ImageValue;
  onChange: (value: ImageValue) => void;
  withSrcSet?: boolean;
  error?: string;
}

/** Image path + alt text, with a picker over the existing media library. */
export default function ImageInput({ id, value, onChange, withSrcSet, error }: ImageInputProps) {
  const [picking, setPicking] = useState(false);

  return (
    <>
      <div className="cms-image-field">
        <div className="cms-image-preview">
          {value.src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value.src} alt="" />
          ) : (
            <Icon name="image" size={24} />
          )}
        </div>
        <div className="cms-image-inputs">
          <div className="cms-input-group">
            <input id={id} className="cms-input" placeholder="/wp-content/uploads/…" value={value.src} onChange={(event) => onChange({ ...value, src: event.target.value })} />
            <button
              type="button"
              className="cms-btn"
              onClick={() => setPicking(true)}
            >
              Browse
            </button>
            {value.src && (
              <button type="button" className="cms-btn cms-btn-ghost cms-btn-icon" onClick={() => onChange({ ...value, src: '' })} aria-label="Remove image" title="Remove image">
                <Icon name="x" size={16} />
              </button>
            )}
          </div>
          <input className="cms-input" placeholder="Alt text (describe the image)" value={value.alt ?? ''} onChange={(event) => onChange({ ...value, alt: event.target.value })} aria-label="Alt text" />
          {withSrcSet && (
            <input className="cms-input" placeholder="srcset (optional, e.g. /img.png 500w, /img-300.png 300w)" value={value.srcSet ?? ''} onChange={(event) => onChange({ ...value, srcSet: event.target.value })} aria-label="srcset" />
          )}
          {error && <span className="cms-error">{error}</span>}
        </div>
      </div>

      <MediaPickerModal
        open={picking}
        initial={value.src}
        onClose={() => setPicking(false)}
        // A new image's srcset would point at the old file's sizes, so clear it.
        onPick={(src) => onChange({ ...value, src, ...(withSrcSet && src !== value.src ? { srcSet: '' } : {}) })}
      />
    </>
  );
}
