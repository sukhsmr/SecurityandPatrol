'use client';

import React, { useState } from 'react';
import Icon from './Icon';
import Spinner from './ui/Spinner';

export default function LoginForm({ siteName, logo, next }: { siteName: string; logo: string; next: string }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!username.trim() || !password) {
      setError('Username and password are required.');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const response = await fetch('/api/auth/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) {
        setError(data.error ?? 'Unable to sign in.');
        setSubmitting(false);
        return;
      }
      window.location.href = next;
    } catch {
      setError('Unable to reach the server. Check your connection and try again.');
      setSubmitting(false);
    }
  };

  return (
    <div className="cms-login">
      <div className="cms-card cms-login-card">
        <div className="cms-login-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} alt="" />
          <h1>{siteName}</h1>
          <p>Sign in to manage website content</p>
        </div>
        <form className="cms-form" onSubmit={submit} noValidate>
          {error && (
            <div className="cms-alert cms-alert-error" role="alert">
              <Icon name="alert" size={16} /> {error}
            </div>
          )}
          <div className="cms-field">
            <label className="cms-label" htmlFor="username">Username</label>
            <input id="username" className="cms-input" autoComplete="username" value={username} onChange={(event) => setUsername(event.target.value)} autoFocus />
          </div>
          <div className="cms-field">
            <label className="cms-label" htmlFor="password">Password</label>
            <input id="password" className="cms-input" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} />
          </div>
          <button type="submit" className="cms-btn cms-btn-primary cms-btn-block" style={{ height: 40 }} disabled={submitting}>
            {submitting && <Spinner />}
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
