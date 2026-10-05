import type { Metadata } from 'next';
import type { Page, Post, SeoFields, SiteSettings } from './types';

/**
 * Page-level metadata. Fields left empty fall back to the site defaults set
 * in the layout, so pages without SEO overrides behave exactly as before.
 */
function seoMetadata(seo: SeoFields, settings: SiteSettings): Metadata {
  const metadata: Metadata = {};
  if (seo.title) metadata.title = seo.title;
  if (seo.description) metadata.description = seo.description;
  if (seo.keywords) metadata.keywords = seo.keywords.split(',').map((keyword) => keyword.trim()).filter(Boolean);
  if (seo.canonical) {
    const base = settings.siteUrl?.replace(/\/$/, '');
    const canonical = seo.canonical.startsWith('/') && base ? `${base}${seo.canonical}` : seo.canonical;
    metadata.alternates = { canonical };
  }
  if (seo.ogImage) {
    metadata.openGraph = {
      ...(seo.title ? { title: seo.title } : {}),
      ...(seo.description ? { description: seo.description } : {}),
      images: [seo.ogImage],
    };
  }
  return metadata;
}

export function pageMetadata(page: Page, settings: SiteSettings): Metadata {
  const metadata = seoMetadata(page.seo, settings);
  // Service pages never inherited the generic site description: without their
  // own, they emit none (search engines then build a snippet from the page
  // content) rather than duplicating one description across every service.
  if (page.group === 'service' && !page.seo.description) metadata.description = null;
  return metadata;
}

export function postMetadata(post: Post, settings: SiteSettings): Metadata {
  return seoMetadata(
    {
      title: post.seo?.title || post.title,
      description: post.seo?.description || post.excerpt,
    },
    settings,
  );
}
