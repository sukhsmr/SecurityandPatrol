import { adminRoute, jsonResponse } from '@/lib/cms/http';
import { duplicatePage } from '@/lib/cms/services/admin';

type Context = { params: Promise<{ slug: string }> };

export const POST = adminRoute<Context>(async (_request, { params }) => {
  const { slug } = await params;
  const page = await duplicatePage(slug);
  return jsonResponse({ page, message: 'Page duplicated successfully.' }, 201);
});
