import { adminRoute, jsonResponse, readJsonBody } from '@/lib/cms/http';
import { createSection, getPage, reorderSections } from '@/lib/cms/services/admin';

type Context = { params: Promise<{ slug: string }> };

export const GET = adminRoute<Context>(async (_request, { params }) => {
  const { slug } = await params;
  return jsonResponse({ sections: (await getPage(slug)).sections });
});

/** Create a section. Body: `{ type, name, enabled, data, position? }`. */
export const POST = adminRoute<Context>(async (request, { params }) => {
  const { slug } = await params;
  const body = await readJsonBody<Record<string, unknown>>(request);
  const position = typeof body.position === 'number' ? body.position : undefined;
  const section = await createSection(slug, body, position);
  return jsonResponse({ section, message: 'Section created successfully.' }, 201);
});

/** Reorder sections. Body: `{ order: string[] }` listing every section id. */
export const PUT = adminRoute<Context>(async (request, { params }) => {
  const { slug } = await params;
  const body = await readJsonBody<{ order?: unknown }>(request);
  const page = await reorderSections(slug, body.order);
  return jsonResponse({ sections: page.sections, message: 'Section order updated successfully.' });
});
