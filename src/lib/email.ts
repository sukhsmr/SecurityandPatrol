import 'server-only';
import nodemailer from 'nodemailer';
import type { Submission } from './cms/types';
import { readDocument, writeDocument, withLock } from './cms/storage/json-store';

export interface EmailResult {
  sent: boolean;
  simulated?: boolean;
  messageId?: string;
  error?: string;
}

interface SentEmailLog {
  id: string;
  to: string;
  from: string;
  subject: string;
  submissionId: string;
  sentAt: string;
  simulated: boolean;
}

/**
 * Creates nodemailer transporter if SMTP credentials are configured.
 */
function getTransporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
}

function formatHtmlEmail(submission: Submission, recipientEmail: string): string {
  const isQuote = submission.type === 'quote';
  const headingText = isQuote ? 'New Request a Quote' : 'New Contact Inquiry';
  const badgeColor = isQuote ? '#0284c7' : '#16a34a';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${headingText}</title>
</head>
<body style="margin:0;padding:20px;background-color:#f4f6f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#333;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.06);border:1px solid #e5e7eb;">
    <div style="background:#111827;padding:24px 30px;text-align:left;border-bottom:3px solid #f28e24;">
      <h1 style="color:#ffffff;margin:0;font-size:20px;font-weight:700;letter-spacing:0.5px;">RAYVEN SECURITY PROTECTION</h1>
      <p style="color:#9ca3af;margin:6px 0 0;font-size:13px;">Website Form Notification</p>
    </div>

    <div style="padding:30px;">
      <div style="display:flex;align-items:center;margin-bottom:20px;">
        <span style="background:${badgeColor};color:#fff;font-size:12px;font-weight:bold;padding:4px 10px;border-radius:4px;text-transform:uppercase;letter-spacing:0.5px;">
          ${isQuote ? 'Quote Request' : 'Contact Us Form'}
        </span>
        <span style="color:#6b7280;font-size:13px;margin-left:auto;">${new Date(submission.createdAt).toLocaleString()}</span>
      </div>

      <h2 style="color:#111827;font-size:18px;margin:0 0 16px;">You have received a new submission from <strong>${escapeHtml(submission.name)}</strong>:</h2>

      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        <tbody>
          <tr>
            <td style="padding:10px 12px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:600;width:35%;color:#4b5563;">Name</td>
            <td style="padding:10px 12px;border:1px solid #e5e7eb;color:#111827;">${escapeHtml(submission.name)}</td>
          </tr>
          <tr>
            <td style="padding:10px 12px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:600;color:#4b5563;">Email</td>
            <td style="padding:10px 12px;border:1px solid #e5e7eb;color:#111827;"><a href="mailto:${escapeHtml(submission.email)}" style="color:#f28e24;text-decoration:none;">${escapeHtml(submission.email)}</a></td>
          </tr>
          <tr>
            <td style="padding:10px 12px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:600;color:#4b5563;">Phone</td>
            <td style="padding:10px 12px;border:1px solid #e5e7eb;color:#111827;"><a href="tel:${escapeHtml(submission.phone)}" style="color:#111827;text-decoration:none;">${escapeHtml(submission.phone)}</a></td>
          </tr>
          ${submission.service ? `
          <tr>
            <td style="padding:10px 12px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:600;color:#4b5563;">Requested Service</td>
            <td style="padding:10px 12px;border:1px solid #e5e7eb;color:#111827;">${escapeHtml(submission.service)}</td>
          </tr>` : ''}
          ${submission.location ? `
          <tr>
            <td style="padding:10px 12px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:600;color:#4b5563;">Location</td>
            <td style="padding:10px 12px;border:1px solid #e5e7eb;color:#111827;">${escapeHtml(submission.location)}</td>
          </tr>` : ''}
          ${submission.message ? `
          <tr>
            <td style="padding:10px 12px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:600;color:#4b5563;vertical-align:top;">Message</td>
            <td style="padding:10px 12px;border:1px solid #e5e7eb;color:#111827;white-space:pre-wrap;">${escapeHtml(submission.message)}</td>
          </tr>` : ''}
          <tr>
            <td style="padding:10px 12px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:600;color:#4b5563;">Submission ID</td>
            <td style="padding:10px 12px;border:1px solid #e5e7eb;color:#6b7280;font-family:monospace;font-size:12px;">${submission.id}</td>
          </tr>
        </tbody>
      </table>

      <div style="background:#fffbeb;border:1px solid #fef3c7;border-left:4px solid #f59e0b;padding:12px 16px;border-radius:4px;margin-bottom:20px;">
        <p style="margin:0;font-size:13px;color:#92400e;">
          This record has been automatically saved in your website admin database. You can reply directly to the customer at <a href="mailto:${escapeHtml(submission.email)}" style="color:#b45309;font-weight:bold;">${escapeHtml(submission.email)}</a>.
        </p>
      </div>
    </div>

    <div style="background:#f9fafb;padding:16px 30px;border-top:1px solid #e5e7eb;font-size:12px;color:#9ca3af;text-align:center;">
      Sent to: ${escapeHtml(recipientEmail)} · Rayven Security Protection & Patrol System
    </div>
  </div>
</body>
</html>
  `.trim();
}

function escapeHtml(text: string): string {
  return String(text ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Sends notification email for a form submission.
 */
export async function sendSubmissionNotificationEmail(submission: Submission): Promise<EmailResult> {
  const recipient =
    process.env.NOTIFICATION_EMAIL ||
    process.env.SMTP_TO ||
    'info@securityandpatrol.com';

  const sender =
    process.env.SMTP_FROM ||
    `"Rayven Security Protection" <${process.env.SMTP_USER || 'no-reply@securityandpatrol.com'}>`;

  const isQuote = submission.type === 'quote';
  const subjectPrefix = isQuote ? '[New Quote Request]' : '[New Contact Inquiry]';
  const subject = `${subjectPrefix} from ${submission.name} (${submission.service || submission.location || 'Website'})`;

  const html = formatHtmlEmail(submission, recipient);

  const transporter = getTransporter();

  // If SMTP is not yet configured, log and record simulation
  if (!transporter) {
    console.log(`[email] (Simulated) Notification email to ${recipient}:`);
    console.log(`[email] Subject: ${subject}`);
    console.log(`[email] Name: ${submission.name}, Email: ${submission.email}, Phone: ${submission.phone}`);

    await logSentEmail({
      id: Math.random().toString(36).substring(2, 9),
      to: recipient,
      from: sender,
      subject,
      submissionId: submission.id,
      sentAt: new Date().toISOString(),
      simulated: true,
    });

    return { sent: true, simulated: true };
  }

  try {
    const info = await transporter.sendMail({
      from: sender,
      to: recipient,
      replyTo: submission.email,
      subject,
      html,
      text: `New ${isQuote ? 'Quote Request' : 'Contact Inquiry'} from ${submission.name} (${submission.email}, ${submission.phone})\n\nService: ${submission.service || 'N/A'}\nLocation: ${submission.location || 'N/A'}\nMessage: ${submission.message || 'N/A'}\n\nSubmitted at: ${submission.createdAt}`,
    });

    console.log(`[email] Email delivered successfully. Message ID: ${info.messageId}`);

    await logSentEmail({
      id: info.messageId || Math.random().toString(36).substring(2, 9),
      to: recipient,
      from: sender,
      subject,
      submissionId: submission.id,
      sentAt: new Date().toISOString(),
      simulated: false,
    });

    return { sent: true, messageId: info.messageId };
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error(`[email] Failed to send email via SMTP:`, errorMsg);
    return { sent: false, error: errorMsg };
  }
}

async function logSentEmail(entry: SentEmailLog): Promise<void> {
  try {
    await withLock('collections/sent-emails', async () => {
      const logs = (await readDocument<SentEmailLog[]>('collections', 'sent-emails')) ?? [];
      await writeDocument('collections', 'sent-emails', [entry, ...logs].slice(0, 100));
    });
  } catch {
    // Non-critical logging failure
  }
}
