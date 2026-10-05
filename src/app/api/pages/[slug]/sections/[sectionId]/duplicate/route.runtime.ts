import { adminRoute, jsonResponse } from '@/lib/cms/http';
import { duplicateSection } from '@/lib/cms/services/admin';

type Context = { params: Promise<{ slug: string; sectionId: string }> };

export const POST = adminRoute<Context>(async (_request, { params }) => {
  const { slug, sectionId } = await params;
  const section = await duplicateSection(slug, sectionId);
  return jsonResponse({ section, message: 'Section duplicated successfully.' }, 201);
});
