import type { Metadata } from 'next';
import DocumentEditor from '@/components/admin/DocumentEditor';
import SmtpStatusCard from '@/components/admin/SmtpStatusCard';
import { settingsFields } from '@/lib/cms/schema/documents';
import { getSiteDocument } from '@/lib/cms/services/admin';
import { isSmtpConfigured } from '@/lib/email';

export const metadata: Metadata = { title: 'Settings & SEO' };

export default async function SettingsPage() {
  const settings = await getSiteDocument('settings');
  const configured = isSmtpConfigured(settings);

  return (
    <DocumentEditor
      title="Settings & SEO"
      description="Site-wide details, notification email routing, SMTP server settings, and default SEO."
      fields={settingsFields}
      initial={settings as unknown as Record<string, unknown>}
      endpoint="/api/site/settings"
      notice={
        <SmtpStatusCard
          isConfigured={configured}
          notificationEmail={settings?.notificationEmail || settings?.email || 'info@securityandpatrol.com'}
        />
      }
    />
  );
}
