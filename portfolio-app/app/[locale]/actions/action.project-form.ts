"use server"

import { projectFormSchema, ProjectFormSchema } from "@/lib/schema/schema.project-form"
import { getI18n } from "@/locales/server"
import { Resend } from "resend"
import prisma from "@/lib/prisma"
import { ProjectFormEmail } from "@/components/email/projectForm-Email"


const resend = new Resend(process.env.RESEND_API_KEY as string);
export async function projectFormRequest(data: ProjectFormSchema) {
  const t = await getI18n()

  const parsed = projectFormSchema(t).safeParse(data);

  if (!parsed.success) {
    return { success: false, error: parsed.error.format() }
  }

  const { email, name, surname, company, sector, budget, timeline, mainObjective, projectIdea, targetAudience, expectedResults, technicalPreferences, otherDetails } = parsed.data;


  try {
    const existingProject = await prisma.projectForm.findFirst({
      where: {
        AND: [
          { email: email },
          { name: name },
          { surname: surname },
          { projectIdea: projectIdea },
          { company: company },
          { sector: sector },
          { budget: budget },
          { timeline: timeline },
          { mainObjective: mainObjective },
          { targetAudience: targetAudience },
          { expectedResults: expectedResults }
        ]
      }
    });

    if (existingProject) {
      return { success: false, message: "Un projet avec cet email existe déjà." };
    }

    // 🔹 Insérer dans la base de données
    await prisma.projectForm.create({
      data: { 
        email: email,
        name: name,
        surname: surname,
        company: company,
        sector: sector,
        budget: budget,
        timeline: timeline,
        mainObjective: mainObjective,
        projectIdea: projectIdea,
        targetAudience: targetAudience,
        expectedResults: expectedResults,
        technicalPreferences: technicalPreferences,
        otherDetails: otherDetails
      },
    });

    // 🔹 Envoyer un email de confirmation
    await resend.emails.send({
      from: "Devis Romain Blanchot <devis@romainblanchot.com>",
      to: parsed.data.email,
      subject: t("project-form.email.subject"),
      react: ProjectFormEmail({
        email: email,
        name: name,
        surname: surname,
        company: company,
        sector: sector,
        budget: budget,
        timeline: timeline,
        mainObjective: mainObjective,
        projectIdea: projectIdea,
        targetAudience: targetAudience,
        expectedResults: expectedResults,
        technicalPreferences: technicalPreferences,
        otherDetails: otherDetails
      }),
      replyTo: "romainblanchot@gmail.com"
    });

    return { success: true, message: t("project-form.email.subject") };
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return { success: false, message: "Une erreur est survenue. Veuillez réessayer." };
  }
}