import { adminRoute, jsonResponse, readJsonBody } from '@/lib/cms/http';
import { deleteSubmission, getSubmission, updateSubmissionStatus } from '@/lib/cms/services/admin';
import type { SubmissionStatus } from '@/lib/cms/types';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export const GET = adminRoute(async (_request, context: RouteContext) => {
  const { id } = await context.params;
  const submission = await getSubmission(id);
  if (!submission) {
    return jsonResponse({ error: 'Submission not found' }, 404);
  }
  return jsonResponse({ submission });
});

export const PATCH = adminRoute(async (request, context: RouteContext) => {
  const { id } = await context.params;
  const body = await readJsonBody<{ status: SubmissionStatus }>(request);
  if (!['new', 'read', 'contacted', 'archived'].includes(body.status)) {
    return jsonResponse({ error: 'Invalid submission status' }, 400);
  }
  await updateSubmissionStatus(id, body.status);
  return jsonResponse({ success: true, message: 'Status updated successfully' });
});

export const DELETE = adminRoute(async (_request, context: RouteContext) => {
  const { id } = await context.params;
  await deleteSubmission(id);
  return jsonResponse({ success: true, message: 'Submission deleted successfully' });
});
