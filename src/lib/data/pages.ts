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
    const filePath = path.join(process.cwd(), 'src', 'data', `${slug}.json`);
    if (!fs.existsSync(filePath)) {
      return null;
    }
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);
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
