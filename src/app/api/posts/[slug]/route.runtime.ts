import { adminRoute, jsonResponse, readJsonBody } from '@/lib/cms/http';
import { deletePost, getPost, updatePost } from '@/lib/cms/services/admin';

type Context = { params: Promise<{ slug: string }> };

export const GET = adminRoute<Context>(async (_request, { params }) => {
  const { slug } = await params;
  return jsonResponse({ post: await getPost(slug) });
});

export const PUT = adminRoute<Context>(async (request, { params }) => {
  const { slug } = await params;
  const post = await updatePost(slug, await readJsonBody(request));
  return jsonResponse({ post, message: 'Post updated successfully.' });
});

export const DELETE = adminRoute<Context>(async (_request, { params }) => {
  const { slug } = await params;
  await deletePost(slug);
  return jsonResponse({ message: 'Post deleted successfully.' });
});
