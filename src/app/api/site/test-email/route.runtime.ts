import { adminRoute, jsonResponse } from '@/lib/cms/http';
import { readDocument } from '@/lib/cms/storage/json-store';
import type { SiteSettings } from '@/lib/cms/types';
import { getTransporter } from '@/lib/email';

export const POST = adminRoute(async () => {
  const siteSettings = await readDocument<SiteSettings>('site', 'settings');
  const recipient =
    siteSettings?.notificationEmail?.trim() ||
    process.env.NOTIFICATION_EMAIL ||
    process.env.SMTP_TO ||
    siteSettings?.email?.trim() ||
    'info@securityandpatrol.com';

  const transporter = getTransporter(siteSettings);

  if (!transporter) {
    return jsonResponse(
      {
        success: false,
        configured: false,
        recipient,
        message:
          'SMTP is not configured yet. Outgoing notifications are running in Simulation Mode (records are saved to database only). To deliver real emails to your inbox, configure your SMTP server settings in Settings & SEO or in .env.local.',
      },
      200
    );
  }

  const sender =
    process.env.SMTP_FROM ||
    siteSettings?.smtp?.from ||
    (siteSettings?.smtp?.user ? `"Rayven Security Protection" <${siteSettings.smtp.user}>` : undefined) ||
    `"Rayven Security Protection" <${process.env.SMTP_USER || 'no-reply@securityandpatrol.com'}>`;

  try {
    const info = await transporter.sendMail({
      from: sender,
      to: recipient,
      subject: '[Test] Rayven Security Protection - Email System Verification',
      text: `Hello,\n\nThis is a verified test email sent from the Rayven Security Protection Admin Portal.\n\nRecipient: ${recipient}\nTimestamp: ${new Date().toLocaleString()}\n\nIf you see this email, your SMTP configuration is 100% active and working!`,
      html: `
        <div style="font-family:sans-serif;max-width:550px;margin:20px auto;padding:24px;border:1px solid #e5e7eb;border-radius:8px;background:#ffffff;">
          <h2 style="color:#111827;margin-top:0;">✅ Rayven Security - Email Verification</h2>
          <p style="color:#4b5563;">This is a test notification email dispatched from your Admin Portal.</p>
          <div style="background:#f0fdf4;border-left:4px solid #22c55e;padding:12px;margin:16px 0;color:#166534;font-size:14px;">
            <strong>Success:</strong> Real email delivery via SMTP is functioning properly!
          </div>
          <table style="width:100%;font-size:13px;color:#374151;border-collapse:collapse;">
            <tr><td style="padding:6px 0;font-weight:600;">Recipient:</td><td>${recipient}</td></tr>
            <tr><td style="padding:6px 0;font-weight:600;">Sent at:</td><td>${new Date().toLocaleString()}</td></tr>
          </table>
        </div>
      `,
    });

    return jsonResponse({
      success: true,
      configured: true,
      recipient,
      messageId: info.messageId,
      message: `Test email successfully sent to ${recipient}!`,
    });
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error('[email-test] Failed to send test email:', errorMsg);
    return jsonResponse(
      {
        success: false,
        configured: true,
        recipient,
        error: errorMsg,
        message: `SMTP Connection failed: ${errorMsg}`,
      },
      400
    );
  }
});
