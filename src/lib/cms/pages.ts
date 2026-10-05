import { HOME_SLUG } from './schema/documents';
import type { Page, PageGroup, PageLayout, PageStatus, SeoFields } from './types';

/** Client-safe helpers shared by the website and the admin. */

export function pagePath(slug: string): string {
  return slug === HOME_SLUG ? '/' : `/${slug}/`;
}

export const DEFAULT_ARTICLE_CLASS = 'entry single-entry page type-page status-publish hentry';

/** Flat, form-friendly representation of a page's settings. */
export interface PageSettingsForm {
  title: string;
  slug: string;
  status: PageStatus;
  group: PageGroup;
  summary: string;
  menuOrder: number;
  seo: Required<SeoFields>;
  layout: { type: PageLayout['type']; articleId: string; articleClassName: string; elementorId: number };
}

export function toPageSettingsForm(page: Page): PageSettingsForm {
  const layout = page.layout;
  return {
    title: page.title,
    slug: page.slug,
    status: page.status,
    group: page.group,
    summary: page.summary ?? '',
    menuOrder: page.menuOrder ?? 0,
    seo: {
      title: page.seo.title ?? '',
      description: page.seo.description ?? '',
      keywords: page.seo.keywords ?? '',
      canonical: page.seo.canonical ?? '',
      ogImage: page.seo.ogImage ?? '',
    },
    layout: {
      type: layout.type,
      articleId: layout.type === 'article' ? layout.articleId ?? '' : '',
      articleClassName: layout.type === 'article' ? layout.articleClassName : DEFAULT_ARTICLE_CLASS,
      elementorId: layout.type === 'article' ? layout.elementorId ?? 0 : 0,
    },
  };
}

export function emptyPageSettingsForm(): PageSettingsForm {
  return {
    title: '',
    slug: '',
    status: 'draft',
    group: 'page',
    summary: '',
    menuOrder: 0,
    seo: { title: '', description: '', keywords: '', canonical: '', ogImage: '' },
    layout: { type: 'article', articleId: '', articleClassName: DEFAULT_ARTICLE_CLASS, elementorId: 0 },
  };
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 100);
}
