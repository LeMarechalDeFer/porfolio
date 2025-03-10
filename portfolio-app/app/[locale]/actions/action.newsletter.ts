"use server"

import { newsletterSchema, NewsletterSchemaType } from "@/lib/schema/schema.newsletter"
import { getI18n } from "@/locales/server"
import { Resend } from "resend"
import prisma from "@/lib/prisma"
import { WelcomeNewsletter } from "@/components/email/welcomeNewsletter-Email"


const resend = new Resend(process.env.RESEND_API_KEY as string);

export async function subscribeToNewsletter(data: NewsletterSchemaType) {
  const t = await getI18n()

  const email = data.email
  const language = data.language
  const parsed = newsletterSchema(t).safeParse({email, language})

  if (!parsed.success) {
    return { success: false, error: parsed.error.message }
  }

  try {
    // 🔹 Vérifier si l'email est déjà inscrit
    const existingUser = await prisma.newsletterSubscription.findUnique({
      where: { email: parsed.data.email },
    });

    if (existingUser) {
      return { success: false, message: "Cet email est déjà inscrit." };
    }

    // 🔹 Insérer dans la base de données
    await prisma.newsletterSubscription.create({
      data: { email: parsed.data.email, language: parsed.data.language },
    });

    // 🔹 Envoyer un email de confirmation
    await resend.emails.send({
      from: "Newsletter Romain <newsletter@romainblanchot.com>",
      to: parsed.data.email,
      subject: t("newsletter.email.subject"),
      react: WelcomeNewsletter({ 
        email: parsed.data.email, 
        language: parsed.data.language
      }),
      replyTo: "romainblanchot@gmail.com"
    });

    return { success: true, message: t("newsletter.success.description") };
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return { success: false, message: "Une erreur est survenue. Veuillez réessayer." };
  }
}