"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Code, Zap, Lock, CheckCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { useI18n, useCurrentLocale } from "@/locales/client"

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { useNewsletterForm } from "@/hooks/use-newsletter-form"

export default function NewsletterSection() {
  const t = useI18n()
  const currentLocale = useCurrentLocale()

  const { form, onSubmit } = useNewsletterForm({ t, currentLocale })

  const benefits = [
    {
      icon: <Brain className="h-4 w-4 text-purple-500" />,
      title: t("newsletter-section.benefit.1.title"),
      description: t("newsletter-section.benefit.1.description"),
    },
    {
      icon: <Code className="h-4 w-4 text-blue-500" />,
      title: t("newsletter-section.benefit.2.title"),
      description: t("newsletter-section.benefit.2.description"),
    },
    {
      icon: <Zap className="h-4 w-4 text-amber-500" />,
      title: t("newsletter-section.benefit.3.title"),
      description: t("newsletter-section.benefit.3.description"),
    },
  ]

  return (
    <section className="from-primary/5 via-background to-background bg-gradient-to-br py-8 md:py-12">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="grid items-center gap-6 md:gap-8 lg:grid-cols-2 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-3 md:space-y-4"
          >
            <Badge className="bg-primary/10 text-primary border-primary/20 px-2 py-0.5 text-xs">
              {t("newsletter-section.badge")}
            </Badge>

            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              {t("newsletter-section.title")}
            </h2>

            <p className="text-muted-foreground text-sm md:text-base">
              {t("newsletter-section.description")}
            </p>

            <div className="space-y-2 pt-2 md:pt-3">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                  className="flex items-start gap-2"
                >
                  <div className="bg-background border-muted mt-0.5 rounded-full border p-1 shadow-xs">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">{benefit.title}</h3>
                    <p className="text-muted-foreground text-xs">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center gap-1.5 pt-1">
              <CheckCircle className="h-3.5 w-3.5 text-green-500" />
              <p className="text-xs">{t("newsletter-section.info")}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-primary/10 bg-background/60 overflow-hidden backdrop-blur-xs">
              <CardContent className="p-4 md:p-6">
                <div className="mb-4 space-y-1 text-center">
                  <h3 className="text-lg font-bold md:text-xl">
                    {t("newsletter-section.card.title")}
                  </h3>
                  <p className="text-muted-foreground text-xs md:text-sm">
                    {t("newsletter-section.card.subtitle")}
                  </p>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                    <div className="space-y-1.5">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("newsletter-section.form.label")}</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder={t("newsletter-section.form.placeholder")}
                                className="h-10"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="group h-9 w-full text-sm"
                      disabled={form.formState.isSubmitting}
                    >
                      {form.formState.isSubmitting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        t("newsletter-section.form.button")
                      )}
                    </Button>
                    <div className="flex items-center justify-center gap-1.5 pt-1">
                      <Lock className="text-muted-foreground h-3 w-3" />
                      <p className="text-muted-foreground text-xs">
                        {t("newsletter-section.form.privacy")}{" "}
                        <Link
                          href="/politique-de-confidentialite"
                          className="hover:text-primary underline"
                        >
                          {t("newsletter-section.form.privacy.link")}
                        </Link>
                      </p>
                    </div>
                  </form>
                </Form>
                <div className="mt-6 border-t pt-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                        <span className="text-xs font-medium text-green-700 dark:text-green-300">
                          RD
                        </span>
                      </div>
                      <div>
                        <p className="text-xs leading-relaxed italic">
                          {t("newsletter-section.testimonial")}
                        </p>
                        <p className="mt-1 text-xs font-medium">
                          {t("newsletter-section.testimonial.author")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
