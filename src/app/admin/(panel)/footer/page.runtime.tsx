import type { Metadata } from 'next';
import DocumentEditor from '@/components/admin/DocumentEditor';
import { footerFields } from '@/lib/cms/schema/documents';
import { getSiteDocument } from '@/lib/cms/services/admin';

export const metadata: Metadata = { title: 'Footer' };

export default async function FooterPage() {
  const footer = await getSiteDocument('footer');
  return (
    <DocumentEditor
      title="Footer"
      description="Call to action, link columns, contact details and newsletter."
      fields={footerFields}
      initial={footer as unknown as Record<string, unknown>}
      endpoint="/api/site/footer"
    />
  );
}
