import React from 'react';
import Icon, { type IconName } from '../Icon';

export function PageHeader({
  title,
  description,
  breadcrumb,
  actions,
}: {
  title: string;
  description?: React.ReactNode;
  breadcrumb?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <div className="cms-page-header">
      <div>
        {breadcrumb && <div className="cms-breadcrumb">{breadcrumb}</div>}
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {actions && <div className="cms-page-header-actions">{actions}</div>}
    </div>
  );
}

export function EmptyState({ icon, title, message, action }: { icon: IconName; title: string; message: string; action?: React.ReactNode }) {
  return (
    <div className="cms-empty">
      <div className="cms-empty-icon">
        <Icon name={icon} size={24} />
      </div>
      <h3>{title}</h3>
      <p>{message}</p>
      {action}
    </div>
  );
}

export function StatusBadge({ status }: { status: 'draft' | 'published' }) {
  return status === 'published' ? (
    <span className="cms-badge cms-badge-success">Published</span>
  ) : (
    <span className="cms-badge cms-badge-warning">Draft</span>
  );
}

export function Switch({ checked, onChange, disabled, label }: { checked: boolean; onChange: (value: boolean) => void; disabled?: boolean; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className="cms-switch"
      disabled={disabled}
      onClick={() => onChange(!checked)}
    />
  );
}

/** "3 hours ago" style formatting for timestamps. */
export function timeAgo(iso: string): string {
  const seconds = Math.round((Date.now() - new Date(iso).getTime()) / 1000);
  if (Number.isNaN(seconds)) return '';
  if (seconds < 60) return 'just now';
  const units: Array<[number, string]> = [
    [60, 'minute'],
    [3600, 'hour'],
    [86400, 'day'],
    [604800, 'week'],
    [2629800, 'month'],
    [31557600, 'year'],
  ];
  let label = '';
  for (let i = units.length - 1; i >= 0; i--) {
    const [size, unit] = units[i];
    if (seconds >= size) {
      const value = Math.floor(seconds / size);
      label = `${value} ${unit}${value === 1 ? '' : 's'} ago`;
      break;
    }
  }
  return label;
}
