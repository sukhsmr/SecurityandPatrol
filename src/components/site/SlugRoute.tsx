import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogPostView from '@/components/BlogPostView';
import { pageMetadata, postMetadata } from '@/lib/cms/metadata';
import { HOME_SLUG } from '@/lib/cms/schema/documents';
import { getPublicSlugs, getPublishedPage, getPublishedPost, getSettings } from '@/lib/cms/services/content';
import PageView from './PageView';
import SiteShell from './SiteShell';

/**
 * Shared implementation of the `/[slug]` route: CMS pages first, then blog
 * posts. Re-exported by `page.runtime.tsx` (server builds) and
 * `page.export.tsx` (static export), which differ only in route config.
 */

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getPublicSlugs()).map((slug) => ({ slug }));
}

async function resolve(slug: string) {
  if (slug === HOME_SLUG) return {};
  const page = await getPublishedPage(slug);
  if (page) return { page };
  const post = await getPublishedPost(slug);
  return post ? { post } : {};
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const [{ page, post }, settings] = await Promise.all([resolve(slug), getSettings()]);
  if (page) return pageMetadata(page, settings);
  if (post) return postMetadata(post, settings);
  return {};
}

export default async function SlugPage({ params }: Params) {
  const { slug } = await params;
  const { page, post } = await resolve(slug);

  if (page) return <PageView page={page} />;
  if (!post) notFound();

  return (
    <SiteShell>
      <BlogPostView post={post} />
    </SiteShell>
  );
}
