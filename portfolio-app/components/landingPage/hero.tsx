"use client"

import { useI18n } from "@/locales/client"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin, Mail, ArrowRight, CheckCircle } from "lucide-react"

export default function Hero() {
  const t = useI18n()

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background py-20"
    >
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left space-y-6"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              {t("hero.title")}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              {t("hero.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="group">
                {t("hero.cta.primary")}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline">
                {t("hero.cta.secondary")}
              </Button>
            </div>
            <div className="flex justify-center lg:justify-start gap-6 pt-4">
              {[
                 { icon: <CheckCircle className="h-5 w-5 text-primary" />, text: t("hero.feature.1") },
                 { icon: <CheckCircle className="h-5 w-5 text-primary" />, text: t("hero.feature.2") },
                 { icon: <CheckCircle className="h-5 w-5 text-primary" />, text: t("hero.feature.3") },
                 { icon: <CheckCircle className="h-5 w-5 text-primary" />, text: t("hero.feature.4") },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  {item.icon}
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10 mx-auto lg:ml-auto lg:mr-0 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-primary/40 blur-2xl opacity-20 animate-pulse" />
              <div className="relative h-full w-full rounded-full border-2 border-primary/20 overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Romain"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-background rounded-lg shadow-lg p-4 border">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <span className="text-sm font-medium">{t("hero.availability")}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-12 flex justify-center lg:justify-start gap-4"
        >
          <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon" aria-label="GitHub" className="rounded-full">
              <Github className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon" aria-label="LinkedIn" className="rounded-full">
              <Linkedin className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="mailto:contact@example.com">
            <Button variant="ghost" size="icon" aria-label="Email" className="rounded-full">
              <Mail className="h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

