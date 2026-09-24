import fs from 'fs';
import path from 'path';

export interface PageContent {
  slug: string;
  title: string;
  metaDescription: string | null;
  contentHtml: string;
}

export async function getPageBySlug(slug: string): Promise<PageContent | null> {
  try {
    const dataModule = await import(`@/data/${slug}.json`);
    const data = dataModule.default || dataModule;
    return {
      slug,
      title: data.title || '',
      metaDescription: data.seo?.description || data.metaDescription || null,
      contentHtml: data.contentHtml || '',
    };
  } catch (error) {
    console.error(`Error reading ${slug}.json`, error);
    return null;
  }
}
