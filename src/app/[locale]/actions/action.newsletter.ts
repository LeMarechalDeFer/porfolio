"use server"

import { newsletterSchema, NewsletterSchemaType } from "@/lib/schema/schema.newsletter"
import { getI18n } from "@/locales/server"
import { Resend } from "resend"
import { WelcomeNewsletter } from "@/components/email/welcomeNewsletter-Email"

const resend = new Resend(process.env.RESEND_API_KEY as string)

export async function subscribeToNewsletter(data: NewsletterSchemaType) {
  const t = await getI18n()

  const email = data.email
  const language = data.language
  const parsed = newsletterSchema(t).safeParse({ email, language })

  if (!parsed.success) {
    return { success: false, error: parsed.error.message }
  }

  try {
    // TODO: Reconnecter la base de données pour vérifier les doublons et persister les inscriptions
    // const existingUser = await prisma.newsletterSubscription.findUnique({
    //   where: { email: parsed.data.email },
    // });
    // if (existingUser) {
    //   return { success: false, message: "Cet email est déjà inscrit." };
    // }
    // await prisma.newsletterSubscription.create({
    //   data: { email: parsed.data.email, language: parsed.data.language },
    // });

    await resend.emails.send({
      from: "Newsletter Romain <newsletter@romainblanchot.com>",
      to: parsed.data.email,
      subject: t("newsletter.email.subject"),
      react: WelcomeNewsletter({
        email: parsed.data.email,
        language: parsed.data.language ?? "fr",
      }),
      replyTo: "romainblanchot0@gmail.com",
    })

    return { success: true, message: t("newsletter.success.description") }
  } catch (error) {
    console.error("Newsletter subscription error:", error)
    return { success: false, message: "Une erreur est survenue. Veuillez réessayer." }
  }
}
