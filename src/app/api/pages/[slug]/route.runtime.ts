import { adminRoute, jsonResponse, readJsonBody } from '@/lib/cms/http';
import { deletePage, getPage, updatePageSettings } from '@/lib/cms/services/admin';

type Context = { params: Promise<{ slug: string }> };

export const GET = adminRoute<Context>(async (_request, { params }) => {
  const { slug } = await params;
  return jsonResponse({ page: await getPage(slug) });
});

export const PUT = adminRoute<Context>(async (request, { params }) => {
  const { slug } = await params;
  const page = await updatePageSettings(slug, await readJsonBody(request));
  return jsonResponse({ page, message: 'Page updated successfully.' });
});

export const DELETE = adminRoute<Context>(async (_request, { params }) => {
  const { slug } = await params;
  await deletePage(slug);
  return jsonResponse({ message: 'Page deleted successfully.' });
});
