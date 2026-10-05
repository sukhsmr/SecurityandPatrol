'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { apiRequest } from './api';
import Icon, { type IconName } from './Icon';
import Spinner from './ui/Spinner';
import { ToastProvider } from './ui/Toast';

const NAV: Array<{ label: string; items: Array<{ href: string; label: string; icon: IconName }> }> = [
  { label: 'Overview', items: [{ href: '/admin', label: 'Dashboard', icon: 'dashboard' }] },
  {
    label: 'Content',
    items: [
      { href: '/admin/pages', label: 'Pages', icon: 'pages' },
      { href: '/admin/posts', label: 'Blog Posts', icon: 'posts' },
      { href: '/admin/offices', label: 'Offices', icon: 'offices' },
      { href: '/admin/media', label: 'Media', icon: 'media' },
    ],
  },
  {
    label: 'Site',
    items: [
      { href: '/admin/header', label: 'Header & Menu', icon: 'header' },
      { href: '/admin/footer', label: 'Footer', icon: 'footer' },
      { href: '/admin/settings', label: 'Settings & SEO', icon: 'settings' },
    ],
  },
];

function isActive(pathname: string, href: string): boolean {
  return href === '/admin' ? pathname === '/admin' || pathname === '/admin/' : pathname.startsWith(href);
}

export default function AdminShell({ username, siteName, logo, children }: { username: string; siteName: string; logo: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const current = NAV.flatMap((group) => group.items).find((item) => isActive(pathname, item.href));

  const signOut = async () => {
    setSigningOut(true);
    try {
      await apiRequest('POST', '/api/auth/logout');
    } finally {
      window.location.href = '/admin/login';
    }
  };

  return (
    <ToastProvider>
      <div className={`cms-shell${navOpen ? ' nav-open' : ''}`}>
        <aside className="cms-sidebar">
          <div className="cms-brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo} alt="" />
            <div>
              <strong>{siteName}</strong>
              <span>Content Manager</span>
            </div>
          </div>
          <nav className="cms-nav" aria-label="Admin">
            {NAV.map((group) => (
              <React.Fragment key={group.label}>
                <div className="cms-nav-label">{group.label}</div>
                {group.items.map((item) => (
                  <Link key={item.href} href={item.href} className={isActive(pathname, item.href) ? 'active' : ''} onClick={() => setNavOpen(false)}>
                    <Icon name={item.icon} />
                    {item.label}
                  </Link>
                ))}
              </React.Fragment>
            ))}
          </nav>
          <div className="cms-sidebar-footer">
            <a href="/" target="_blank" rel="noreferrer" className="cms-btn cms-btn-dark cms-btn-block">
              <Icon name="external" size={16} /> View website
            </a>
          </div>
        </aside>
        <div className="cms-overlay" onClick={() => setNavOpen(false)} />

        <div className="cms-main">
          <header className="cms-topbar">
            <button type="button" className="cms-btn cms-btn-ghost cms-btn-icon cms-menu-toggle" onClick={() => setNavOpen(!navOpen)} aria-label="Toggle navigation">
              <Icon name="menu" />
            </button>
            <span className="cms-topbar-title">{current?.label ?? 'Admin'}</span>
            <div className="cms-topbar-actions">
              <div className="cms-user">
                <span className="cms-avatar">{username.slice(0, 1).toUpperCase()}</span>
                <span>{username}</span>
              </div>
              <button type="button" className="cms-btn cms-btn-ghost cms-btn-sm" onClick={signOut} disabled={signingOut}>
                {signingOut ? <Spinner /> : <Icon name="logout" size={16} />}
                Sign out
              </button>
            </div>
          </header>
          <main className="cms-content">{children}</main>
        </div>
      </div>
    </ToastProvider>
  );
}
