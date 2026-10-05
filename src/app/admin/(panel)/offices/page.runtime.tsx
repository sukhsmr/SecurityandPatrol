import type { Metadata } from 'next';
import DocumentEditor from '@/components/admin/DocumentEditor';
import { officesDocumentFields } from '@/lib/cms/schema/documents';
import { getOffices } from '@/lib/cms/services/admin';

export const metadata: Metadata = { title: 'Offices' };

export default async function OfficesPage() {
  const offices = await getOffices();
  return (
    <DocumentEditor
      title="Offices"
      description="Office locations shown on the Offices page, the home page and the header menus."
      fields={officesDocumentFields}
      initial={{ offices }}
      endpoint="/api/offices"
    />
  );
}
