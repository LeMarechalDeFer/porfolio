"use client"

import { useI18n } from "@/locales/client"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, MapPin, Phone } from "lucide-react"
import Link from "next/link"
import ProjectForm from "../reservation/project-form"
import { SocialLinks } from "@/components/social-links"

export default function Contact() {
  const t = useI18n()

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      title: t("contact.info.email"),
      value: "blanchot@et.esiea.fr",
      href: "mailto:blanchot@et.esiea.fr",
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: t("contact.info.phone"),
      value: "+33 7 88 28 47 15",
      href: "tel:+33788284715",
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: t("contact.info.location"),
      value: "Paris, France",
      href: "https://maps.google.com/?q=Paris,France",
    },
  ]

  return (
    <section id="contact" className="scroll-mt-8 py-16">
      <div className="container mx-auto px-4 sm:px-8 lg:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center text-3xl font-bold"
        >
          {t("contact.title")}
        </motion.h2>

        <div className="grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold">{t("contact.restons")}</h3>
            <p className="text-muted-foreground">{t("contact.description")}</p>

            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <Link
                  key={`contact-${index}`}
                  href={info.href}
                  target={info.href.startsWith("http") ? "_blank" : undefined}
                  rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="bg-card hover:bg-accent/50 flex items-center gap-4 rounded-lg border p-4 transition-colors"
                >
                  <div className="bg-primary/10 text-primary rounded-full p-2">{info.icon}</div>
                  <div>
                    <h4 className="font-medium">{info.title}</h4>
                    <p className="text-muted-foreground text-sm">{info.value}</p>
                  </div>
                </Link>
              ))}
            </div>

            <SocialLinks
              variant="outline"
              className="flex flex-wrap justify-center gap-4 pt-4"
              include={[
                "github",
                "linkedin",
                "instagram",
                "email",
                "twitter",
                "tiktok",
                "facebook",
                "youtube",
              ]}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2 mx-4">
        <div className="space-y-6 md:space-y-8"> */}
            <Card>
              <CardHeader>
                <CardTitle>Parlons de votre projet</CardTitle>
                <CardDescription>{t("contact.form.description")}</CardDescription>
              </CardHeader>
              <CardContent>
                <ProjectForm />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
