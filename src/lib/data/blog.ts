import type { BlogPost } from '@/components/BlogPostView';
import blogDataRaw from '@/data/blog.json';

const blogData = blogDataRaw as BlogPost[];

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  return blogData;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  return blogData.find((p) => p.slug === slug) || null;
}
