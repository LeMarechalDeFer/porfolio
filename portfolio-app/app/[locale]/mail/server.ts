import { Resend } from 'resend';



// const resend = new Resend('••••••••••••••••••••••••••••••••••••');
const resend = new Resend(process.env.RESEND_API_KEY as string);


resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'blanchot@et.esiea.fr',
  subject: 'First Mail',
  html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
});