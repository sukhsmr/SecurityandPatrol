import { adminRoute, jsonResponse, readJsonBody } from '@/lib/cms/http';
import { createPage, listPages } from '@/lib/cms/services/admin';

export const GET = adminRoute(async () => jsonResponse({ pages: await listPages() }));

export const POST = adminRoute(async (request) => {
  const page = await createPage(await readJsonBody(request));
  return jsonResponse({ page, message: 'Page created successfully.' }, 201);
});
