import { query } from '@/lib/db';

export interface PageContent {
  slug: string;
  title: string;
  metaDescription: string | null;
  contentHtml: string;
}

interface PageRow {
  slug: string;
  title: string;
  meta_description: string | null;
  content_html: string;
}

export async function getPageBySlug(slug: string): Promise<PageContent | null> {
  const rows = await query<PageRow[]>(
    'SELECT slug, title, meta_description, content_html FROM pages WHERE slug = ? LIMIT 1',
    [slug]
  );
  if (!rows.length) return null;
  const row = rows[0];
  return {
    slug: row.slug,
    title: row.title,
    metaDescription: row.meta_description,
    contentHtml: row.content_html,
  };
}
