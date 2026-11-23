import { Resend } from 'resend';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LENGTH = { name: 100, email: 254, message: 5000 };

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!);

const fail = (error: string, status: number) => Response.json({ error }, { status });

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return fail('Invalid request', 400);
  }

  const read = (key: string) => (typeof body[key] === 'string' ? (body[key] as string).trim() : '');
  const name = read('name');
  const email = read('email');
  const message = read('message');
  const recaptcha = read('recaptcha');

  if (!name || !email || !message || !recaptcha) {
    return fail('All fields and reCAPTCHA are required', 400);
  }
  if (!EMAIL_PATTERN.test(email) || name.length > MAX_LENGTH.name || email.length > MAX_LENGTH.email || message.length > MAX_LENGTH.message) {
    return fail('Invalid input', 400);
  }

  const { RECAPTCHA_SECRET_KEY, RESEND_API_KEY } = process.env;
  if (!RECAPTCHA_SECRET_KEY || !RESEND_API_KEY) {
    console.error('[contact] RECAPTCHA_SECRET_KEY or RESEND_API_KEY is not configured.');
    return fail('Contact form is not configured', 503);
  }

  try {
    const verifyRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret: RECAPTCHA_SECRET_KEY, response: recaptcha }),
    });
    const verification = await verifyRes.json();
    if (!verification.success || verification.score < 0.5) {
      return fail('reCAPTCHA verification failed', 400);
    }

    const resend = new Resend(RESEND_API_KEY);
    // The Resend SDK reports API errors in the result instead of throwing them.
    const { data, error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? 'Portfolio <onboarding@resend.dev>',
      to: process.env.CONTACT_TO_EMAIL ?? 'milenko.ilic997@gmail.com',
      replyTo: email,
      subject: `Nova poruka od ${name.replace(/\s+/g, ' ')}`,
      html: `
        <p><strong>Ime:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
      `,
    });

    if (error) {
      console.error('[contact] Resend error:', error);
      return fail('Failed to send email', 502);
    }

    return Response.json({ success: true, id: data?.id });
  } catch (error) {
    console.error('[contact] Failed to send message:', error);
    return fail('Failed to send email', 500);
  }
}
