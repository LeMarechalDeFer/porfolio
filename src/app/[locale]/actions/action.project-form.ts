"use server"

import { projectFormSchema, ProjectFormSchema } from "@/lib/schema/schema.project-form"
import { getI18n, getCurrentLocale } from "@/locales/server"
import { ProjectFormEmail } from "@/components/email/projectForm-Email"
import { resend, REPLY_TO } from "@/lib/resend"
export async function projectFormRequest(data: ProjectFormSchema) {
  const locale = await getCurrentLocale()
  const t = await getI18n()

  const parsed = projectFormSchema(t).safeParse(data)

  if (!parsed.success) {
    return { success: false, error: parsed.error.format() }
  }

  const {
    email,
    name,
    surname,
    company,
    sector,
    budget,
    timeline,
    mainObjective,
    projectIdea,
    targetAudience,
    expectedResults,
    technicalPreferences,
    otherDetails,
  } = parsed.data

  try {
    // TODO: Reconnecter la base de données pour vérifier les doublons et persister les demandes de projet
    // const existingProject = await prisma.projectForm.findFirst({
    //   where: {
    //     AND: [
    //       { email }, { name }, { surname }, { projectIdea },
    //       { company }, { sector }, { budget }, { timeline },
    //       { mainObjective }, { targetAudience }, { expectedResults }
    //     ]
    //   }
    // });
    // if (existingProject) {
    //   return { success: false, message: "Un projet avec cet email existe déjà." };
    // }
    // await prisma.projectForm.create({
    //   data: { email, name, surname, company, sector, budget, timeline,
    //           mainObjective, projectIdea, targetAudience, expectedResults,
    //           technicalPreferences, otherDetails },
    // });

    await resend.emails.send({
      from: "Devis Romain Blanchot <devis@romainblanchot.com>",
      to: parsed.data.email,
      subject: t("project-form.email.subject"),
      react: ProjectFormEmail({
        email,
        name,
        surname,
        company,
        sector,
        budget,
        timeline,
        mainObjective,
        projectIdea,
        targetAudience,
        expectedResults,
        technicalPreferences,
        otherDetails,
        language: locale,
      }),
      replyTo: REPLY_TO,
    })

    return { success: true, message: t("project-form.email.subject") }
  } catch (error) {
    console.error("Project form error:", error)
    return { success: false, message: "Une erreur est survenue. Veuillez réessayer." }
  }
}
