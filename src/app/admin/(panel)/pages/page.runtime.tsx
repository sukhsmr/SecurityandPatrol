import type { Metadata } from 'next';
import PagesManager, { type PageSummary } from '@/components/admin/pages/PagesManager';
import { pagePath } from '@/lib/cms/pages';
import { listPages } from '@/lib/cms/services/admin';

export const metadata: Metadata = { title: 'Pages' };

export default async function PagesPage() {
  const pages = await listPages();
  // Send summaries only; section content can be large.
  const summaries: PageSummary[] = pages.map((page) => ({
    slug: page.slug,
    title: page.title,
    path: pagePath(page.slug),
    status: page.status,
    group: page.group,
    sectionCount: page.sections.length,
    updatedAt: page.updatedAt,
  }));
  return <PagesManager pages={summaries} />;
}
