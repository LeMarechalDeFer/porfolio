"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { useCurrentLocale, useI18n } from "@/locales/client"
import Link from "next/link"
import { Loader2 } from "lucide-react"
import { newsletterSchema, NewsletterSchemaType } from "@/lib/schema/schema.newsletter"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { subscribeToNewsletter } from "@/app/[locale]/actions/action.newsletter"
import { useEffect } from "react"


export function Newsletter() {
  const t = useI18n()
  const currentLocale = useCurrentLocale(); 

  
  const form = useForm<NewsletterSchemaType>({
    resolver: zodResolver(newsletterSchema(t)),
    defaultValues: {
      email: "",
      // name: "",
      language: currentLocale,
    },
  })

  
  useEffect(() => {
    form.setValue("language", currentLocale);
  }, [currentLocale, form.setValue, form]);



  const onSubmit = async (data: NewsletterSchemaType) => {
    
    try {
      console.log("data", data);
      const response = await subscribeToNewsletter(data);

      if (response.success) {
        toast.success(t("newsletter.success.title"), {
          description: t("newsletter.success.description"),
        });
        form.reset();
      } else {
        toast.error(t("newsletter.error.title"), {
          description: t("newsletter.error.description"),
        });
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire:", error);
      toast.error(t("newsletter.error.title"), {
        description: t("newsletter.error.description"),
      });
    } 
    
  };

  


 
  return (
    <div className="w-full max-w-md">
      <h3 className="text-lg font-semibold mb-4">{t("newsletter.title")}</h3>
      <p className="text-sm text-muted-foreground mb-4">
        {t("newsletter.description")}
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <div className="flex flex-col space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>{t("newsletter.label")}</FormLabel>
                  <div className="flex items-center space-x-2">
                    <FormControl>
                      <Input
                        aria-label={t("newsletter.placeholder")}
                        className="flex-grow"
                        type="email"
                        placeholder={t("newsletter.placeholder")}
                        {...field}
                      />
                    </FormControl>
                    <Button className="h-10" type="submit" disabled={form.formState.isSubmitting}>
                      {form.formState.isSubmitting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        t("newsletter.button")
                      )}
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            {t("newsletter.disclaimer")}{" "}
            <Link href="/politique-de-confidentialite" className="underline hover:text-primary">
              {t("newsletter.privacy")}
            </Link>
            .
          </p>
        </form>
      </Form>
  
    </div>
  )
}
