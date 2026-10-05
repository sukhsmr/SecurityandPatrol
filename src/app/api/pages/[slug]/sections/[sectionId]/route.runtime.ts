import { NotFoundError } from '@/lib/cms/errors';
import { adminRoute, jsonResponse, readJsonBody } from '@/lib/cms/http';
import { deleteSection, getPage, updateSection } from '@/lib/cms/services/admin';

type Context = { params: Promise<{ slug: string; sectionId: string }> };

export const GET = adminRoute<Context>(async (_request, { params }) => {
  const { slug, sectionId } = await params;
  const section = (await getPage(slug)).sections.find((item) => item.id === sectionId);
  if (!section) throw new NotFoundError('Section not found.');
  return jsonResponse({ section });
});

/** Update a section. Body may include `name`, `enabled` and `data`. */
export const PUT = adminRoute<Context>(async (request, { params }) => {
  const { slug, sectionId } = await params;
  const section = await updateSection(slug, sectionId, await readJsonBody(request));
  return jsonResponse({ section, message: 'Section updated successfully.' });
});

export const DELETE = adminRoute<Context>(async (_request, { params }) => {
  const { slug, sectionId } = await params;
  await deleteSection(slug, sectionId);
  return jsonResponse({ message: 'Section deleted successfully.' });
});
