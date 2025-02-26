import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY as string);

export async function POST() {
  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'blanchot@et.esiea.fr',
      subject: 'Test Email',
      html: '<p>Ceci est un <strong>email de test</strong> envoyé depuis votre portfolio!</p>',
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
} 