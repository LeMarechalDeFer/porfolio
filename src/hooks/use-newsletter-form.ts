import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { newsletterSchema, NewsletterSchemaType } from "@/lib/schema/schema.newsletter"
import { subscribeToNewsletter } from "@/app/[locale]/actions/action.newsletter"
import { useI18n } from "@/locales/client"

interface UseNewsletterFormOptions {
  t: ReturnType<typeof useI18n>
  currentLocale: string
  onSuccess?: () => void
}

export function useNewsletterForm({ t, currentLocale, onSuccess }: UseNewsletterFormOptions) {
  const form = useForm<NewsletterSchemaType>({
    resolver: zodResolver(newsletterSchema(t)),
    defaultValues: {
      email: "",
      // name: "",
      language: currentLocale,
    },
  })

  useEffect(() => {
    form.setValue("language", currentLocale)
  }, [currentLocale, form.setValue, form])

  const onSubmit = async (data: NewsletterSchemaType) => {
    try {
      console.log("data", data)
      const response = await subscribeToNewsletter(data)

      if (response.success) {
        toast.success(t("newsletter.success.title"), {
          description: t("newsletter.success.description"),
        })
        form.reset()
        onSuccess?.()
      } else {
        toast.error(t("newsletter.error.title"), {
          description: t("newsletter.error.description"),
        })
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire:", error)
      toast.error(t("newsletter.error.title"), {
        description: t("newsletter.error.description"),
      })
    }
  }

  return { form, onSubmit }
}
