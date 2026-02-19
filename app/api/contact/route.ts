import { Resend } from 'resend';

export async function POST(req: Request) {
  try {
    const { name, email, message, recaptcha } = await req.json();

    if (!name || !email || !message || !recaptcha) {
      return Response.json(
        { error: 'All fields and reCAPTCHA are required' },
        { status: 400 }
      );
    }

    const verifyRes = await fetch(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptcha}`,
      }
    );

    const json = await verifyRes.json();

    if (!json.success) {
      return Response.json({ error: 'Invalid reCAPTCHA' }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'milenko.ilic997@gmail.com',
      subject: `Nova poruka od ${name}`,
      html: `
        <p><strong>Ime:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p>${message}</p>
      `,
    });

    return Response.json({ success: true, data });

  } catch (error) {
    console.error('Email error:', error);
    return Response.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
