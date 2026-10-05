import type { Metadata } from 'next';
import PostsManager, { type PostSummary } from '@/components/admin/posts/PostsManager';
import { listPosts } from '@/lib/cms/services/admin';

export const metadata: Metadata = { title: 'Blog Posts' };

export default async function PostsPage() {
  const posts = await listPosts();
  // Post bodies are loaded on demand when a post is opened.
  const summaries: PostSummary[] = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    status: post.status,
    date: post.date,
    image: post.featuredImage?.url,
  }));
  return <PostsManager posts={summaries} />;
}
