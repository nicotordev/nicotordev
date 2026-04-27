import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const RESEND_FROM = process.env.RESEND_FROM?.trim();
const ADMIN_EMAILS = process.env.ADMIN_EMAILS
  ? process.env.ADMIN_EMAILS.split(",")
      .map((e) => e.trim())
      .filter(Boolean)
  : [];

export async function sendAdminNotification({
  subject,
  html,
}: {
  subject: string;
  html: string;
}) {
  if (
    !process.env.RESEND_API_KEY ||
    !RESEND_FROM ||
    ADMIN_EMAILS.length === 0
  ) {
    console.warn(
      "Resend not configured: set RESEND_API_KEY, RESEND_FROM, and ADMIN_EMAILS",
    );
    return;
  }

  try {
    const { data, error } = await resend.emails.send({
      from: RESEND_FROM,
      to: ADMIN_EMAILS,
      subject,
      html,
    });

    if (error) {
      console.error("Failed to send email via Resend:", error);
    }
    return data;
  } catch (error) {
    console.error("Error sending notification email:", error);
  }
}

export async function notifyNewLead(payload: {
  name: string;
  email: string;
  message: string;
  source: string;
}) {
  const subject = `🚀 New Lead: ${payload.name} (${payload.source})`;
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded: 8px;">
      <h2 style="color: #0f172a; margin-bottom: 24px;">New Lead Received!</h2>
      <div style="background-color: #f8fafc; padding: 16px; border-radius: 6px; margin-bottom: 24px;">
        <p><strong>Name:</strong> ${payload.name}</p>
        <p><strong>Email:</strong> <a href="mailto:${payload.email}" style="color: #3b82f6;">${payload.email}</a></p>
        <p><strong>Source:</strong> ${payload.source}</p>
      </div>
      <div style="margin-bottom: 24px;">
        <h3 style="font-size: 16px; color: #475569; margin-bottom: 8px;">Message:</h3>
        <p style="white-space: pre-wrap; color: #1e293b; line-height: 1.6;">${payload.message}</p>
      </div>
      <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
      <p style="font-size: 12px; color: #94a3b8;">This is an automated notification from <a href="https://nicotordev.com">nicotordev.com</a>.</p>
    </div>
  `;

  return sendAdminNotification({ subject, html });
}

export async function notifyNewSubscription(email: string) {
  const subject = `📧 New Newsletter Subscription: ${email}`;
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded: 8px;">
      <h2 style="color: #0f172a; margin-bottom: 24px;">New Subscriber!</h2>
      <p style="color: #1e293b; font-size: 16px;">
        Great news! Someone just subscribed to your newsletter.
      </p>
      <div style="background-color: #f0f9ff; padding: 16px; border-radius: 6px; margin: 24px 0;">
        <p style="margin: 0; font-weight: bold;">Email: <a href="mailto:${email}" style="color: #0369a1;">${email}</a></p>
      </div>
      <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
      <p style="font-size: 12px; color: #94a3b8;">This is an automated notification from <a href="https://nicotordev.com">nicotordev.com</a>.</p>
    </div>
  `;

  return sendAdminNotification({ subject, html });
}
