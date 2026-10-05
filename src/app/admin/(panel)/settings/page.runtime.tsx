import type { Metadata } from 'next';
import DocumentEditor from '@/components/admin/DocumentEditor';
import { settingsFields } from '@/lib/cms/schema/documents';
import { getSiteDocument } from '@/lib/cms/services/admin';

export const metadata: Metadata = { title: 'Settings & SEO' };

export default async function SettingsPage() {
  const settings = await getSiteDocument('settings');
  return (
    <DocumentEditor
      title="Settings & SEO"
      description="Site-wide details and the default SEO title and description. Page-specific SEO is set on each page."
      fields={settingsFields}
      initial={settings as unknown as Record<string, unknown>}
      endpoint="/api/site/settings"
    />
  );
}
