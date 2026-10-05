import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import PageView from '@/components/site/PageView';
import { getSession } from '@/lib/cms/auth/session';
import { getPreviewPage } from '@/lib/cms/services/content';

/** Admin-only preview of a page in any status (drafts included). */
export const dynamic = 'force-dynamic';

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function PreviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!(await getSession())) redirect(`/admin/login?next=${encodeURIComponent(`/admin/pages/${slug}`)}`);
  const page = await getPreviewPage(slug);
  if (!page) notFound();
  return <PageView page={page} />;
}
