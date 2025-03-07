"use client"

import { useI18n } from "@/locales/client"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Mail, ArrowRight, CheckCircle  } from "lucide-react"
import { FaXTwitter } from "react-icons/fa6";
import { LuGithub } from "react-icons/lu";
import { FiFacebook, FiLinkedin } from "react-icons/fi";
import { RiTiktokLine } from "react-icons/ri";



export default function Hero() {
  const t = useI18n()

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background py-10 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-12 mt-10 "
    >
      <div className="container relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="text-center lg:text-left space-y-4 sm:space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              {t("hero.title")}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              {t("hero.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Link href="/demarrer-votre-projet" className="sm:w-auto">
                <Button size="lg" className="group w-full sm:w-auto min-w-[200px] min-h-[44px]">
                  {t("hero.cta.primary")}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/#projects" className="sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto min-w-[200px] min-h-[44px]">
                  {t("hero.cta.secondary")}
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center lg:justify-start gap-3 sm:gap-6 pt-4 ">
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
          </div>
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            className="relative mt-6 sm:mt-8 lg:mt-0"
          >
            
            <div className="relative z-10 mx-auto lg:mx-auto lg:mr-8 w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-primary/40 blur-2xl opacity-20 animate-pulse" />
              <div className="relative h-full w-full rounded-full border-2 border-primary/20 overflow-hidden">
                <Image
                  src="/photoProfilRomain.jpg"
                  alt="Romain"
                  sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, (max-width: 1024px) 320px, (max-width: 1200px) 384px, 384px"
                  // sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
                  className="w-full h-full object-cover"
                  priority
                  fetchPriority="high"
                  quality={60}
                  loading="eager"
                  width={384} 
                  height={384}
                  // placeholder="blur"
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
        <div className="mt-8 sm:mt-10 lg:mt-12 flex justify-center lg:justify-start gap-4">
          <Link href="https://github.com/LeMarechalDeFer" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon" aria-label="GitHub" className="rounded-full">
              <LuGithub className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="https://www.linkedin.com/in/romain-blanchot-449941284/" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon" aria-label="LinkedIn" className="rounded-full">
              <FiLinkedin className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="mailto:blanchot@et.esiea.fr">
            <Button variant="ghost" size="icon" aria-label="Email" className="rounded-full">
              <Mail className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="https://x.com/talleyrand1000" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon" aria-label="Twitter" className="rounded-full">
              <FaXTwitter className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="https://www.tiktok.com/@romain.blanchot" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon" aria-label="TikTok" className="rounded-full">
              <RiTiktokLine className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="https://web.facebook.com/people/Romain-Blanchot/pfbid034Hz3fp8rLVBXKJkS31RF8pCSVCVbN7zGtNZZR53GZmwHgyxizSupZj9J1Qact2Nzl/" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon" aria-label="Facebook" className="rounded-full">
              <FiFacebook className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

