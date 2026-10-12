import type { Metadata } from 'next';
import SubmissionsManager from '@/components/admin/submissions/SubmissionsManager';
import { listSubmissions } from '@/lib/cms/services/admin';

export const metadata: Metadata = { title: 'Inquiries & Quotes' };

export default async function SubmissionsPage() {
  const submissions = await listSubmissions();
  return <SubmissionsManager submissions={submissions} />;
}
