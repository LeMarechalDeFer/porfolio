"use client"

import { useI18n } from "@/locales/client"
import { motion } from "framer-motion"
import Image from "next/image"
import photoAlpinismeRomain from "@/public/alpinismeRomain.jpg";

export default function About() {
  const t = useI18n()

  return (
    <section id="about" className="py-16 bg-muted/50 px-4 sm:px-8 lg:px-12 scroll-mt-8">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12"
        >
          {t("about.title")}
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative h-[550px] rounded-lg overflow-hidden">
              <Image 
                src={photoAlpinismeRomain} 
                alt="About Romain" 
                fill 
                className="object-cover"
                // priority
                // fetchPriority="high"
                loading="eager"
                quality={60}
                sizes="(max-width: 768px) 100vw, 50vw"
                placeholder="blur"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <p className="text-lg leading-relaxed">{t("about.description")}</p>
            <p className="text-lg leading-relaxed">
              {t("about.description2")}
            </p>
            <p className="text-lg leading-relaxed">
              {t("about.description3")}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

