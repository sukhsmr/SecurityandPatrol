import { adminRoute, jsonResponse, readJsonBody } from '@/lib/cms/http';
import { getOffices, updateOffices } from '@/lib/cms/services/admin';

export const GET = adminRoute(async () => jsonResponse({ offices: await getOffices() }));

/** Replace the office list. Body: `{ offices: Office[] }`. */
export const PUT = adminRoute(async (request) => {
  const offices = await updateOffices(await readJsonBody(request));
  return jsonResponse({ offices, message: 'Offices saved successfully.' });
});
