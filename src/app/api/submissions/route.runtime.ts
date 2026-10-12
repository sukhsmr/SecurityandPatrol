import { randomUUID } from 'node:crypto';
import type { NextRequest } from 'next/server';
import { adminRoute, clientKey, errorResponse, jsonResponse, readJsonBody } from '@/lib/cms/http';
import { createSubmission, listSubmissions } from '@/lib/cms/services/admin';
import type { Submission, SubmissionType } from '@/lib/cms/types';
import { sendSubmissionNotificationEmail } from '@/lib/email';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
const PHONE_REGEX = /^[\d\s()+-]{7,25}$/;

/**
 * Public form submission endpoint for Contact Us and Request a Quote forms.
 */
export async function POST(request: NextRequest): Promise<Response> {
  try {
    const body = await readJsonBody<Record<string, unknown>>(request);

    // Honeypot spam check
    if (body.website || body.hp_field || body.url_check) {
      return jsonResponse({ success: true, message: 'Message received.' });
    }

    const fieldErrors: Record<string, string> = {};

    const name = typeof body.name === 'string' ? body.name.trim() : '';
    if (!name || name.length < 2) {
      fieldErrors.name = 'Please enter your full name (at least 2 characters).';
    } else if (name.length > 100) {
      fieldErrors.name = 'Name must be 100 characters or less.';
    }

    const email = typeof body.email === 'string' ? body.email.trim() : '';
    if (!email) {
      fieldErrors.email = 'Please enter your email address.';
    } else if (!EMAIL_REGEX.test(email)) {
      fieldErrors.email = 'Please enter a valid email address (e.g. name@example.com).';
    }

    const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
    if (!phone) {
      fieldErrors.phone = 'Please enter your phone number.';
    } else if (!PHONE_REGEX.test(phone)) {
      fieldErrors.phone = 'Please enter a valid phone number (at least 7 digits).';
    }

    const type: SubmissionType =
      body.type === 'quote' ? 'quote' :
      body.type === 'career' ? 'career' : 'contact';

    const service = typeof body.service === 'string' ? body.service.trim() : undefined;
    const location = typeof body.location === 'string' ? body.location.trim() : undefined;
    const message = typeof body.message === 'string' ? body.message.trim() : undefined;

    if (Object.keys(fieldErrors).length > 0) {
      return jsonResponse(
        { error: 'Please check the required fields.', fieldErrors },
        400
      );
    }

    const submission: Submission = {
      id: randomUUID(),
      type,
      name,
      email,
      phone,
      service,
      location,
      message,
      status: 'new',
      ip: clientKey(request),
      createdAt: new Date().toISOString(),
    };

    // 1. Insert record into database/table
    await createSubmission(submission);

    // 2. Send email notification (SMTP or simulated)
    const emailResult = await sendSubmissionNotificationEmail(submission);

    return jsonResponse({
      success: true,
      message: 'Thank you! Your information has been submitted successfully.',
      id: submission.id,
      emailSent: emailResult.sent,
    });
  } catch (error) {
    console.error('[submissions] Error processing submission:', error);
    return errorResponse(error);
  }
}

/**
 * Admin: List all form submissions.
 */
export const GET = adminRoute(async () => {
  const submissions = await listSubmissions();
  return jsonResponse({ submissions });
});
