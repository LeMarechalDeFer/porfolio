"use client"; // Exécute le code uniquement côté client

import { motion } from "framer-motion";
import Image from "next/image";
import photoProfilRomain from "@/public/photoProfilRomain.jpg";
import { useI18n } from "@/locales/client";

export default function HeroAnimated() {
    const t = useI18n()
  return (
    <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }} // 1 seconde de transition
    className="relative mt-6 sm:mt-8 lg:mt-0"
  >
    
    <div className="relative z-10 mx-auto lg:mx-auto lg:mr-8 w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-primary/40 blur-2xl opacity-20 animate-pulse" />
      <div className="relative h-full w-full rounded-full border-2 border-primary/20 overflow-hidden">
        <Image
          src={photoProfilRomain}
          alt="Romain"
          sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, (max-width: 1024px) 320px, (max-width: 1200px) 384px, 384px"
          // sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
          className="w-full h-full object-cover"
          priority
          fetchPriority="high"
          quality={75}
          loading="eager"
          width={384} 
          height={384}
          placeholder="blur"
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
  )
}