"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { Brain, Code, Zap, Lock, CheckCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { useI18n, useCurrentLocale } from "@/locales/client"

import { newsletterSchema, NewsletterSchemaType } from "@/lib/schema/schema.newsletter"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { useEffect } from "react"
import { subscribeToNewsletter } from "@/app/[locale]/actions/action.newsletter"

export default function NewsletterSection() {
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
    <section className="py-8 md:py-12 bg-gradient-to-br from-primary/5 via-background to-background">
      <div className="container px-4 mx-auto max-w-5xl">
        <div className="grid gap-6 md:gap-8 lg:grid-cols-2 lg:gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-3 md:space-y-4"
          >
            <Badge className="px-2 py-0.5 text-xs bg-primary/10 text-primary border-primary/20">
              {t("newsletter-section.badge")}
            </Badge>

            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              {t("newsletter-section.title")}
            </h2>

            <p className="text-sm md:text-base text-muted-foreground">
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
                  <div className="mt-0.5 bg-background rounded-full p-1 shadow-sm border border-muted">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">{benefit.title}</h3>
                    <p className="text-xs text-muted-foreground">{benefit.description}</p>
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
            <Card className="overflow-hidden border-primary/10 bg-background/60 backdrop-blur-sm">
              <CardContent className="p-4 md:p-6">
                <div className="mb-4 space-y-1 text-center">
                  <h3 className="text-lg md:text-xl font-bold">{t("newsletter-section.card.title")}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">
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
                        <Button type="submit" className="w-full h-9 text-sm group" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                t("newsletter-section.form.button")
                            )}
                        </Button>
                        <div className="flex items-center justify-center gap-1.5 pt-1">
                            <Lock className="h-3 w-3 text-muted-foreground" />
                            <p className="text-xs text-muted-foreground">
                            {t("newsletter-section.form.privacy")}{" "}
                            <Link href="/politique-de-confidentialite" className="underline hover:text-primary">
                                {t("newsletter-section.form.privacy.link")}
                            </Link>
                            </p>
                        </div>
                    </form>
                </Form>
                <div className="mt-6 pt-4 border-t">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                        <span className="text-green-700 dark:text-green-300 text-xs font-medium">RD</span>
                      </div>
                      <div>
                        <p className="text-xs italic leading-relaxed">
                          {t("newsletter-section.testimonial")}
                        </p>
                        <p className="text-xs font-medium mt-1">{t("newsletter-section.testimonial.author")}</p>
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

