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
      className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background py-10 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-12 mt-10 "
    >
      <div className="container relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left space-y-4 sm:space-y-6"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              {t("hero.title")}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              {t("hero.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Button size="lg" className="group w-full sm:w-auto">
                <Link href="/demarer-votre-projet">
                  {t("hero.cta.primary")}
                  
                </Link>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                <Link href="/#projects">
                  {t("hero.cta.secondary")}
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center lg:justify-start gap-3 sm:gap-6 pt-4">
              {[
                 { icon: <CheckCircle className="h-5 w-5 text-primary" />, text: t("hero.feature.1") },
                 { icon: <CheckCircle className="h-5 w-5 text-primary" />, text: t("hero.feature.2") },
                 { icon: <CheckCircle className="h-5 w-5 text-primary" />, text: t("hero.feature.3") },
                 { icon: <CheckCircle className="h-5 w-5 text-primary" />, text: t("hero.feature.4") },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  {item.icon}
                  <span className="text-xs sm:text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative mt-6 sm:mt-8 lg:mt-0"
          >
            <div className="relative z-10 mx-auto lg:ml-auto lg:mr-0 w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-primary/40 blur-2xl opacity-20 animate-pulse" />
              <div className="relative h-full w-full rounded-full border-2 border-primary/20 overflow-hidden">
                <Image
                  src="/photoProfilRomain.jpg"
                  alt="Romain"
                  fill
                  sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
                  className="object-cover"
                  priority
                  quality={70}
                  loading="eager"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 bg-background rounded-lg shadow-lg p-2 sm:p-4 border">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-green-500" />
                  <span className="text-xs sm:text-sm font-medium">{t("hero.availability")}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-8 sm:mt-10 lg:mt-12 flex justify-center lg:justify-start gap-4"
        >
          <Link href="https://github.com/LeMarechalDeFer" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon" aria-label="GitHub" className="rounded-full">
              <Github className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="https://www.linkedin.com/in/romain-blanchot-449941284/" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon" aria-label="LinkedIn" className="rounded-full">
              <Linkedin className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="mailto:blanchot@et.esiea.fr">
            <Button variant="ghost" size="icon" aria-label="Email" className="rounded-full">
              <Mail className="h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

