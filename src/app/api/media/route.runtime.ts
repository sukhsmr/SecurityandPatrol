import { ValidationError } from '@/lib/cms/errors';
import { adminRoute, jsonResponse } from '@/lib/cms/http';
import { recordActivity } from '@/lib/cms/services/admin';
import { listMedia, saveUpload } from '@/lib/cms/services/media';

/** List images. Query: `q` (search), `page`, `pageSize`. */
export const GET = adminRoute(async (request) => {
  const params = request.nextUrl.searchParams;
  return jsonResponse(
    await listMedia({
      query: params.get('q') ?? undefined,
      page: Number(params.get('page')) || 1,
      pageSize: Number(params.get('pageSize')) || 48,
    }),
  );
});

/** Upload an image as multipart form data (`file` field). */
export const POST = adminRoute(async (request) => {
  const form = await request.formData().catch(() => null);
  const file = form?.get('file');
  if (!(file instanceof File)) throw new ValidationError({ file: 'Please choose an image to upload.' });
  const item = await saveUpload(file);
  await recordActivity({ action: 'created', entity: 'media', label: `Image ${item.name} uploaded`, href: '/admin/media' });
  return jsonResponse({ item, message: 'Image uploaded successfully.' }, 201);
});
