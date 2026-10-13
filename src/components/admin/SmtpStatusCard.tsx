'use client';

import React, { useState } from 'react';
import Icon from './Icon';
import Spinner from './ui/Spinner';
import { useToast } from './ui/Toast';
import { apiRequest } from './api';

interface SmtpStatusCardProps {
  isConfigured: boolean;
  notificationEmail: string;
}

export default function SmtpStatusCard({ isConfigured, notificationEmail }: SmtpStatusCardProps) {
  const toast = useToast();
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleTestEmail = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const res = await apiRequest<{ success: boolean; configured: boolean; message: string }>(
        'POST',
        '/api/site/test-email'
      );
      setTestResult({ success: res.success, message: res.message });
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to test email.';
      setTestResult({ success: false, message: msg });
      toast.error(msg);
    } finally {
      setTesting(false);
    }
  };

  return (
    <div
      style={{
        background: isConfigured ? '#f0fdf4' : '#fffbeb',
        border: `1px solid ${isConfigured ? '#bbf7d0' : '#fef3c7'}`,
        borderLeft: `5px solid ${isConfigured ? '#22c55e' : '#f59e0b'}`,
        borderRadius: '8px',
        padding: '16px 20px',
        marginBottom: '20px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span
              style={{
                display: 'inline-block',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: isConfigured ? '#22c55e' : '#f59e0b',
              }}
            />
            <strong style={{ color: isConfigured ? '#166534' : '#92400e', fontSize: '15px' }}>
              {isConfigured ? 'SMTP Email Delivery: Active (Connected)' : 'Email Mode: Simulation Mode (SMTP Not Configured)'}
            </strong>
          </div>
          <p style={{ margin: 0, fontSize: '13.5px', color: isConfigured ? '#15803d' : '#b45309' }}>
            {isConfigured ? (
              <>Form submissions will be actively sent via SMTP to: <strong>{notificationEmail || 'default email'}</strong></>
            ) : (
              <>
                Submissions are currently recorded in the <strong>admin database</strong>, but real emails won't reach Gmail inboxes until SMTP credentials (e.g. Gmail App Password or domain SMTP) are provided in the section below or in <code>.env.local</code>.
              </>
            )}
          </p>
        </div>

        <button
          type="button"
          onClick={handleTestEmail}
          disabled={testing}
          className="cms-btn"
          style={{
            background: isConfigured ? '#15803d' : '#b45309',
            color: '#ffffff',
            border: 'none',
            fontSize: '13px',
            padding: '8px 16px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          {testing ? <Spinner /> : <Icon name="mail" size={15} />}
          {testing ? 'Testing…' : 'Send Test Email'}
        </button>
      </div>

      {testResult && (
        <div
          style={{
            marginTop: '12px',
            padding: '10px 14px',
            borderRadius: '6px',
            fontSize: '13px',
            background: testResult.success ? '#dcfce7' : '#fee2e2',
            color: testResult.success ? '#166534' : '#991b1b',
            border: `1px solid ${testResult.success ? '#86efac' : '#fca5a5'}`,
          }}
        >
          {testResult.message}
        </div>
      )}
    </div>
  );
}
