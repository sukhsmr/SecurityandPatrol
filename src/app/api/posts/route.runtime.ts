import { adminRoute, jsonResponse, readJsonBody } from '@/lib/cms/http';
import { createPost, listPosts } from '@/lib/cms/services/admin';

export const GET = adminRoute(async () => jsonResponse({ posts: await listPosts() }));

export const POST = adminRoute(async (request) => {
  const post = await createPost(await readJsonBody(request));
  return jsonResponse({ post, message: 'Post created successfully.' }, 201);
});
