import 'server-only';
import { cache } from 'react';
import { repositories } from '../repositories';
import { HOME_SLUG } from '../schema/documents';
import { isSafeSegment } from '../storage/json-store';
import type { Office, Page, Post, ServiceMenuItem, SiteDocumentKey, SiteDocuments } from '../types';

/**
 * Read-only content API for the public website. Only published pages/posts
 * and enabled sections are ever returned from here. Wrapped in React
 * `cache()` so repeated lookups within one render hit storage once.
 */

export const getSiteDocument = cache(<K extends SiteDocumentKey>(key: K): Promise<SiteDocuments[K]> =>
  repositories.site.get(key),
);

export const getSettings = () => getSiteDocument('settings');
export const getHeader = () => getSiteDocument('header');
export const getFooter = () => getSiteDocument('footer');

export const getOffices = cache((): Promise<Office[]> => repositories.offices.list());

const getAllPages = cache((): Promise<Page[]> => repositories.pages.list());

function toPublicPage(page: Page): Page {
  return { ...page, sections: page.sections.filter((section) => section.enabled) };
}

/** Published page with only its enabled sections, or null. */
export const getPublishedPage = cache(async (slug: string): Promise<Page | null> => {
  if (!isSafeSegment(slug)) return null; // not a storable slug, so no such page
  const page = await repositories.pages.get(slug);
  return page && page.status === 'published' ? toPublicPage(page) : null;
});

/** Any page regardless of status, for authenticated previews. */
export const getPreviewPage = cache(async (slug: string): Promise<Page | null> => {
  if (!isSafeSegment(slug)) return null; // not a storable slug, so no such page
  const page = await repositories.pages.get(slug);
  return page ? toPublicPage(page) : null;
});

/** Published service pages, ordered for the header Services menus. */
export const getServiceMenu = cache(async (): Promise<ServiceMenuItem[]> => {
  const pages = await getAllPages();
  return pages
    .filter((page) => page.group === 'service' && page.status === 'published')
    .sort((a, b) => (a.menuOrder ?? 0) - (b.menuOrder ?? 0) || a.title.localeCompare(b.title))
    .map((page) => ({ slug: page.slug, title: page.title, summary: page.summary }));
});

/** Published posts, newest first. */
export const getPublishedPosts = cache(async (): Promise<Post[]> => {
  const posts = await repositories.posts.list();
  return posts
    .filter((post) => post.status === 'published')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
});

export const getPublishedPost = cache(async (slug: string): Promise<Post | null> => {
  if (!isSafeSegment(slug)) return null;
  const post = await repositories.posts.get(slug);
  return post && post.status === 'published' ? post : null;
});

/** Every slug served by the `[slug]` route (published pages except home, and posts). */
export async function getPublicSlugs(): Promise<string[]> {
  const [pages, posts] = await Promise.all([getAllPages(), getPublishedPosts()]);
  return [
    ...pages.filter((page) => page.status === 'published' && page.slug !== HOME_SLUG).map((page) => page.slug),
    ...posts.map((post) => post.slug),
  ];
}
