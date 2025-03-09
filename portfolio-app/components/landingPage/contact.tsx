"use client"


import { useI18n } from "@/locales/client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, MapPin, Phone } from "lucide-react"
import Link from "next/link"
import ProjectForm from "../reservation/project-form"
import { FiLinkedin } from "react-icons/fi"
import { LuGithub,  } from "react-icons/lu"
import { FaXTwitter } from "react-icons/fa6"
import { RiTiktokLine } from "react-icons/ri"
import { FiFacebook } from "react-icons/fi"
import { LuYoutube } from "react-icons/lu"
import { FaInstagram } from "react-icons/fa";


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
    <section id="contact" className="py-16 px-4 sm:px-8 lg:px-12 scroll-mt-8">
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

            <div className="flex flex-wrap gap-4 pt-4 justify-center">
              <Link href="https://github.com/LeMarechalDeFer" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="icon" aria-label="GitHub">
                  <LuGithub className="h-5 w-5" />
                </Button>
              </Link>
                <Link href="https://www.linkedin.com/in/romain-blanchot-449941284/" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="icon" aria-label="LinkedIn">
                    <FiLinkedin className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="https://www.instagram.com/_romain_blanchot_/" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="icon" aria-label="Instagram">
                    <FaInstagram className="h-5 w-5" />
                  </Button>
                </Link>
            <Link href="mailto:blanchot@et.esiea.fr">
              <Button variant="outline" size="icon" aria-label="Email" onClick={() => window.location.href = 'mailto:blanchot@et.esiea.fr'}>
                <Mail className="h-5 w-5"/>
              </Button>
            </Link>
            <Link href="https://x.com/talleyrand1000" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="icon" aria-label="Twitter">
                <FaXTwitter className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="https://www.tiktok.com/@romain.blanchot" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="icon" aria-label="TikTok">
                <RiTiktokLine className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="https://web.facebook.com/people/Romain-Blanchot/pfbid034Hz3fp8rLVBXKJkS31RF8pCSVCVbN7zGtNZZR53GZmwHgyxizSupZj9J1Qact2Nzl/" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="icon" aria-label="Facebook">
                <FiFacebook className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="https://www.youtube.com/@romainblanchot" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="icon" aria-label="Youtube">
                <LuYoutube className="h-5 w-5" />
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
            {/* <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2 mx-4">
        <div className="space-y-6 md:space-y-8"> */}
          <Card>
            <CardHeader>
              <CardTitle>Parlons de votre projet</CardTitle>
              <CardDescription>
                {t("contact.form.description")}
              </CardDescription>
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

