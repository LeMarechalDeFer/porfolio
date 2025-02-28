"use client"


import { useI18n } from "@/locales/client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Instagram, Mail, MapPin, Phone } from "lucide-react"
import Link from "next/link"

export default function Contact() {
  const t = useI18n()

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      title: t("contact.info.email"),
      value: "contact@example.com",
      href: "mailto:contact@example.com",
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: t("contact.info.phone"),
      value: "+33 6 12 34 56 78",
      href: "tel:+33612345678",
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: t("contact.info.location"),
      value: "Paris, France",
      href: "https://maps.google.com/?q=Paris,France",
    },
  ]

  return (
    <section id="contact" className="py-16 px-4 sm:px-8 lg:px-12">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12"
        >
          {t("contact.title")}
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold">{t("contact.restons")}</h3>
            <p className="text-muted-foreground">
              {t("contact.description")}
            </p>

            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <Link
                  key={index}
                  href={info.href}
                  target={info.href.startsWith("http") ? "_blank" : undefined}
                  rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="p-2 bg-primary/10 rounded-full text-primary">{info.icon}</div>
                  <div>
                    <h4 className="font-medium">{info.title}</h4>
                    <p className="text-sm text-muted-foreground">{info.value}</p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="flex gap-4 pt-4">
              <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="icon" aria-label="GitHub">
                  <Github className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="icon" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="icon" aria-label="Instagram">
                  <Instagram className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>{t("contact.form.title")}</CardTitle>
                <CardDescription>
                  {t("contact.form.description")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="first-name" className="text-sm font-medium">
                        {t("contact.form.firstname")}
                      </label>
                      <Input id="first-name" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="last-name" className="text-sm font-medium">
                        {t("contact.form.lastname")}
                      </label>
                      <Input id="last-name" placeholder="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      {t("contact.form.email")}
                    </label>
                    <Input id="email" type="email" placeholder="john.doe@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      {t("contact.form.subject")}
                    </label>
                    <Input id="subject" placeholder="Comment puis-je vous aider ?" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      {t("contact.form.message")}
                    </label>
                    <Textarea id="message" placeholder="Votre message ici..." rows={4} />
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button className="w-full">{t("contact.form.send")}</Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

