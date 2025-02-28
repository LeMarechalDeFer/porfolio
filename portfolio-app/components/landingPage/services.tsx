"use client"

import { useI18n } from "@/locales/client"
import { motion } from "framer-motion"
import { Code, Rocket, Zap, Bot, Cloud } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Services() {
  const t = useI18n()

  const services = [
    {
      icon: <Code className="h-8 w-8 text-primary" />,
      title: t("services.dev.title"),
      description: t("services.dev.description"),
    },
    {
      icon: <Rocket className="h-8 w-8 text-primary" />,
      title: t("services.solutions.title"),
      description: t("services.solutions.description"),
    },
    {
      icon: <Bot className="h-8 w-8 text-primary" />,
      title: t("services.ai.title"),
      description: t("services.ai.description"),
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: t("services.perf.title"),
      description: t("services.perf.description"),
    },
    {
      icon: <Cloud className="h-8 w-8 text-primary" />,
      title: t("services.deploy.title"),
      description: t("services.deploy.description"),
    }
  ]

  return (
    <section id="services" className="py-16 bg-muted/30">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12"
        >
          {t("services.title")}
        </motion.h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="p-2 w-fit rounded-lg bg-primary/10 mb-4">{service.icon}</div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{service.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

