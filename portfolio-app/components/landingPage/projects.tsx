"use client"

import { useI18n } from "@/locales/client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Building2, Database, Server } from "lucide-react"
import Link from "next/link"

export default function Projects() {
  const t = useI18n()

  const projects = [
    {
      title: t("projects.hotel.title"),
      description: t("projects.hotel.description"),
      icon: <Building2 className="h-10 w-10" />,
      tags: ["Next.js", "Tailwind CSS", "Framer Motion", "PDF Generation"],
      featured: true,
      link: "https://hotel-lalouisiane.com",
      image: "/premierePage.jpg",
    },
    {
      title: t("projects.extraction.title"),
      description: t("projects.extraction.description"),
      icon: <Database className="h-10 w-10" />,
      tags: ["Python", "Selenium", "PostgreSQL", "Docker", "ETL"],
      featured: false,
    },
    {
      title: t("projects.infrastructure.title"),
      description: t("projects.infrastructure.description"),
      icon: <Server className="h-10 w-10" />,
      tags: ["Infrastructure", "PXE", "iDRAC", "VLAN", "Monitoring"],
      featured: false,
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section id="projects" className="py-16 px-4 sm:px-8 lg:px-12 scroll-mt-8">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12"
        >
          {t("projects.title")}
        </motion.h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-12"
        >
          {/* Featured Project */}
          {projects
            .filter((project) => project.featured)
            .map((project, index) => (
              <motion.div key={index} variants={item}>
                <Card className="overflow-hidden">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative h-64 md:h-auto">
                      <Image
                        src={project.image ?? ""}
                        alt={project.title}
                        fill
                        className="object-cover"
                        objectPosition="top"
                      />
                    </div>
                    <div className="p-6 flex flex-col justify-between">
                      <div>
                        <div className="mb-4 flex justify-between items-start">
                          <div>
                            <Badge className="mb-2">{t("projects.featured")}</Badge>
                            <h3 className="text-2xl font-bold">{project.title}</h3>
                          </div>
                          <div className="p-2 bg-primary/10 rounded-lg text-primary">{project.icon}</div>
                        </div>
                        <p className="text-muted-foreground mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="outline">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <Button variant="default" size="sm">
                          <Link href={project.link ?? ""} target="_blank">
                            {t("projects.viewProject")}
                          </Link>
                        </Button>
                        {/* <Button variant="outline" size="sm">
                          {t("projects.sourceCode")}
                        </Button> */}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}

          {/* Other Projects */}
          <div className="grid md:grid-cols-2 gap-6">
            {projects
              .filter((project) => !project.featured)
              .map((project, index) => (
                <motion.div key={index} variants={item}>
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle>{project.title}</CardTitle>
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">{project.icon}</div>
                      </div>
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    {/* <CardFooter className="flex justify-between">
                      <Button variant="default" size="sm">
                        {t("projects.viewProject")}
                      </Button>
                      <Button variant="outline" size="sm">
                        {t("projects.sourceCode")}
                      </Button>
                    </CardFooter> */}
                  </Card>
                </motion.div>
              ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

