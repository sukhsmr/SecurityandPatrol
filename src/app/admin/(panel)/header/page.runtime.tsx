import type { Metadata } from 'next';
import DocumentEditor from '@/components/admin/DocumentEditor';
import { headerFields } from '@/lib/cms/schema/documents';
import { getSiteDocument } from '@/lib/cms/services/admin';

export const metadata: Metadata = { title: 'Header & Menu' };

export default async function HeaderPage() {
  const header = await getSiteDocument('header');
  return (
    <DocumentEditor
      title="Header & Menu"
      description="Top bar, logo, navigation menus and the Request a Quote popup."
      fields={headerFields}
      initial={header as unknown as Record<string, unknown>}
      endpoint="/api/site/header"
      notice={
        <div className="cms-alert cms-alert-info">
          The Services dropdown lists published service pages automatically, and the Offices dropdown lists the offices managed under Offices.
        </div>
      }
    />
  );
}
