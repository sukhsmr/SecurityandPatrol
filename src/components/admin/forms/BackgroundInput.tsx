'use client';

import React, { useState } from 'react';
import { getBackgroundDefault } from '@/lib/cms/backgrounds';
import type { BackgroundValue, Breakpoint } from '@/lib/cms/schema/fields';
import Icon from '../Icon';
import MediaPickerModal from '../media/MediaPickerModal';

interface BackgroundInputProps {
  id: string;
  elementId: string | undefined;
  breakpoints: Breakpoint[];
  value: BackgroundValue;
  onChange: (value: BackgroundValue) => void;
  errors: Partial<Record<Breakpoint, string>>;
}

const LABELS: Record<Breakpoint, string> = { desktop: 'Desktop & tablet', mobile: 'Mobile (up to 767px)' };

/**
 * Background image per breakpoint. Empty means "original design image", which
 * is shown as the current image so admins always see what the site displays.
 */
export default function BackgroundInput({ id, elementId, breakpoints, value, onChange, errors }: BackgroundInputProps) {
  const [picking, setPicking] = useState<Breakpoint | null>(null);
  const defaults = getBackgroundDefault(elementId);

  // What the site shows for a breakpoint (see backgroundCss: a new desktop image also replaces the design's mobile image).
  const effective = (breakpoint: Breakpoint): { src: string; custom: boolean } => {
    if (value[breakpoint]) return { src: value[breakpoint], custom: value[breakpoint] !== defaults[breakpoint] };
    if (breakpoint === 'mobile' && value.desktop && value.desktop !== defaults.desktop && defaults.mobile) {
      return { src: value.desktop, custom: true };
    }
    return { src: defaults[breakpoint] ?? (breakpoint === 'mobile' ? effective('desktop').src : ''), custom: false };
  };

  return (
    <div className="cms-bg-field">
      {breakpoints.map((breakpoint) => {
        const current = effective(breakpoint);
        const inputId = `${id}.${breakpoint}`;
        return (
          <div key={breakpoint} className="cms-bg-row">
            <button type="button" className="cms-bg-preview" onClick={() => setPicking(breakpoint)} title="Change image">
              {current.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={current.src} alt="" />
              ) : (
                <Icon name="image" size={24} />
              )}
            </button>
            <div className="cms-image-inputs">
              <div className="cms-bg-head">
                {breakpoints.length > 1 && <label htmlFor={inputId} className="cms-bg-label">{LABELS[breakpoint]}</label>}
                {current.custom ? <span className="cms-badge cms-badge-info">Custom image</span> : <span className="cms-badge cms-badge-muted">Original design</span>}
              </div>
              <div className="cms-input-group">
                <input
                  id={inputId}
                  className="cms-input"
                  placeholder={defaults[breakpoint] ?? '/wp-content/uploads/…'}
                  value={value[breakpoint]}
                  onChange={(event) => onChange({ ...value, [breakpoint]: event.target.value })}
                />
                <button type="button" className="cms-btn" onClick={() => setPicking(breakpoint)}>
                  Change
                </button>
                {value[breakpoint] && (
                  <button type="button" className="cms-btn cms-btn-ghost cms-btn-icon" onClick={() => onChange({ ...value, [breakpoint]: '' })} aria-label="Use the original image" title="Use the original image">
                    <Icon name="x" size={16} />
                  </button>
                )}
              </div>
              {errors[breakpoint] && <span className="cms-error">{errors[breakpoint]}</span>}
            </div>
          </div>
        );
      })}

      <MediaPickerModal
        open={picking !== null}
        initial={picking ? effective(picking).src : ''}
        title="Select background image"
        onClose={() => setPicking(null)}
        onPick={(src) => picking && onChange({ ...value, [picking]: src })}
      />
    </div>
  );
}
