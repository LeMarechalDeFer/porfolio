"use client"

import { useI18n } from "@/locales/client"
import { motion } from "framer-motion"
import Image from "next/image"


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
            <div className="relative h-80 rounded-lg overflow-hidden">
              <Image src="/placeholder.svg?height=400&width=600" alt="About Romain" fill className="object-cover" />
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

