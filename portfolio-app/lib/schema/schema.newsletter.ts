import { z } from "zod"
import { useI18n } from "@/locales/client"

export const newsletterSchema = (t: ReturnType<typeof useI18n>) => 
z.object({
    email: z.string().email({ message: t("newsletter.email.invalid") }),
})

export type NewsletterSchemaType = z.infer<ReturnType<typeof newsletterSchema>>