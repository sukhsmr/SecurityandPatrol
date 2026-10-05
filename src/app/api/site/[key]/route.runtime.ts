import { NotFoundError } from '@/lib/cms/errors';
import { adminRoute, jsonResponse, readJsonBody } from '@/lib/cms/http';
import { getSiteDocument, isSiteDocumentKey, updateSiteDocument } from '@/lib/cms/services/admin';

type Context = { params: Promise<{ key: string }> };

async function resolveKey(params: Context['params']) {
  const { key } = await params;
  if (!isSiteDocumentKey(key)) throw new NotFoundError('Unknown settings document.');
  return key;
}

/** `key` is one of `settings`, `header` or `footer`. */
export const GET = adminRoute<Context>(async (_request, { params }) => {
  const key = await resolveKey(params);
  return jsonResponse({ [key]: await getSiteDocument(key) });
});

export const PUT = adminRoute<Context>(async (request, { params }) => {
  const key = await resolveKey(params);
  const value = await updateSiteDocument(key, await readJsonBody(request));
  return jsonResponse({ [key]: value, message: 'Changes saved successfully.' });
});
