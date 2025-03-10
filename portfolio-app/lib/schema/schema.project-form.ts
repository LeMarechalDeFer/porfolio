import { z } from "zod"
import { useI18n } from "@/locales/client"

export const projectFormSchema = (t: ReturnType<typeof useI18n>) => 
    z.object({
        name: z.string().min(1, { message: t("project-form.required.name") }).max(255),
        surname: z.string().min(1, { message: t("project-form.required.surname") }).max(255),
        email: z.string().email({ message: t("project-form.required.email") }).max(255),
        company: z.string().min(1, { message: t("project-form.required.company") }).max(255),
        sector: z.string().min(1, { message: t("project-form.required.sector") }).max(255),
        budget: z.string().min(1, { message: t("project-form.required.budget") }).max(255),
        timeline: z.string().min(1, { message: t("project-form.required.timeline") }).max(255),
        mainObjective: z.string().min(1, { message: t("project-form.required.mainObjective") }).max(2000),
        projectIdea: z.string().min(1, { message: t("project-form.required.projectIdea") }).max(2000),
        targetAudience: z.string().min(1, { message: t("project-form.required.targetAudience") }).max(2000),
        expectedResults: z.string().min(1, { message: t("project-form.required.expectedResults") }).max(2000),
        technicalPreferences: z.string().max(2000).optional(),
        otherDetails: z.string().max(2000).optional(),
    })

export type ProjectFormSchema = z.infer<ReturnType<typeof projectFormSchema>>


// import { z } from "zod"

// export const projectFormSchema = (t: any) => 
//     z.object({
//         name: z.string().min(1, { message: t("project-form.required.name") }).max(255).default(""),
//         surname: z.string().min(1, { message: t("project-form.required.surname") }).max(255).default(""),
//         email: z.string().email({ message: t("project-form.required.email") }).max(255).default(""),
//         company: z.string().min(1, { message: t("project-form.required.company") }).max(255).default(""),
//         sector: z.string().min(1, { message: t("project-form.required.sector") }).max(255).default(""),
//         budget: z.string().min(1, { message: t("project-form.required.budget") }).max(255).default(""),
//         timeline: z.string().min(1, { message: t("project-form.required.timeline") }).max(255).default(""),
//         mainObjective: z.string().min(1, { message: t("project-form.required.mainObjective") }).max(2000).default(""),
//         projectIdea: z.string().min(1, { message: t("project-form.required.projectIdea") }).max(2000).default(""),
//         targetAudience: z.string().min(1, { message: t("project-form.required.targetAudience") }).max(2000).default(""),
//         expectedResults: z.string().min(1, { message: t("project-form.required.expectedResults") }).max(2000).default(""),
//         technicalPreferences: z.string().max(2000).default("").optional(),
//         otherDetails: z.string().max(2000).default("").optional(),
//     })

// export type ProjectFormSchema = z.infer<ReturnType<typeof projectFormSchema>>
