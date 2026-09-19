import fs from 'fs';
import path from 'path';
import type { BlogPost } from '@/components/BlogPostView';

function getBlogData(): BlogPost[] {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'blog.json');
    if (!fs.existsSync(filePath)) {
      return [];
    }
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error reading blog.json', error);
    return [];
  }
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  return getBlogData();
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = getBlogData();
  return posts.find((p) => p.slug === slug) || null;
}
