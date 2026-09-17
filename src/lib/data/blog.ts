import { query } from '@/lib/db';
import type { BlogPost } from '@/components/BlogPostView';

interface BlogPostRow {
  wp_id: number | null;
  slug: string;
  title: string;
  published_at: string | null;
  modified_at: string | null;
  content_html: string;
  excerpt: string | null;
  featured_image_url: string | null;
  featured_image_alt: string | null;
  author: string | null;
  categories: string | string[] | null;
  seo_title: string | null;
  seo_description: string | null;
  audio_url: string | null;
}

function toBlogPost(row: BlogPostRow): BlogPost {
  const categories = Array.isArray(row.categories)
    ? row.categories
    : row.categories
    ? (JSON.parse(row.categories) as string[])
    : undefined;

  return {
    id: row.wp_id ?? 0,
    slug: row.slug,
    title: row.title,
    date: row.published_at || '',
    modified: row.modified_at || undefined,
    contentHtml: row.content_html,
    excerpt: row.excerpt || undefined,
    featuredImage: row.featured_image_url
      ? { url: row.featured_image_url, alt: row.featured_image_alt || undefined }
      : undefined,
    author: row.author || undefined,
    categories,
    seo: { title: row.seo_title || undefined, description: row.seo_description || undefined },
    audioUrl: row.audio_url || undefined,
  };
}

const SELECT_FIELDS =
  'wp_id, slug, title, published_at, modified_at, content_html, excerpt, featured_image_url, featured_image_alt, author, categories, seo_title, seo_description, audio_url';

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const rows = await query<BlogPostRow[]>(
    `SELECT ${SELECT_FIELDS} FROM blog_posts ORDER BY published_at DESC, id DESC`
  );
  return rows.map(toBlogPost);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const rows = await query<BlogPostRow[]>(
    `SELECT ${SELECT_FIELDS} FROM blog_posts WHERE slug = ? LIMIT 1`,
    [slug]
  );
  return rows.length ? toBlogPost(rows[0]) : null;
}
