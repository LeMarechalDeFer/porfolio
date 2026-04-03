"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCurrentLocale, useI18n } from "@/locales/client"
import Link from "next/link"
import { Loader2 } from "lucide-react"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { useNewsletterForm } from "@/hooks/use-newsletter-form"

export function Newsletter() {
  const t = useI18n()
  const currentLocale = useCurrentLocale()

  const { form, onSubmit } = useNewsletterForm({ t, currentLocale })

  return (
    <div className="w-full max-w-md">
      <h3 className="mb-4 text-lg font-semibold">{t("newsletter.title")}</h3>
      <p className="text-muted-foreground mb-4 text-sm">{t("newsletter.description")}</p>
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
          <p className="text-muted-foreground text-xs">
            {t("newsletter.disclaimer")}{" "}
            <Link href="/politique-de-confidentialite" className="hover:text-primary underline">
              {t("newsletter.privacy")}
            </Link>
            .
          </p>
        </form>
      </Form>
    </div>
  )
}
