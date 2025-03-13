"use client"

import { useI18n } from "@/locales/client"
import { AnimatePresence, motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Building2, Database, Server, Lightbulb, Code, Zap, Cog, Shield, Users, ChevronUp, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

// import { getI18n } from "@/locales/server"
// import { setStaticParamsLocale } from "next-international/server"

// export default async function Projects({ params }: { params: Promise<{ locale: string }> }) {
//   const t = await getI18n()
//   const { locale } = await params;
//   setStaticParamsLocale(locale);


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
      challenged: true,
      challenges: [
        {
          challenge: t("projects.hotel.challenges.1.challenge"),
          solution: t("projects.hotel.challenges.1.solution"),
          icon: <Code className="h-6 w-6" />,
        },
        {
          challenge: t("projects.hotel.challenges.2.challenge"),
          solution: t("projects.hotel.challenges.2.solution"),
          icon: <Zap className="h-6 w-6" />,
        },
        {
          challenge: t("projects.hotel.challenges.3.challenge"),
          solution: t("projects.hotel.challenges.3.solution"),
          icon: <Cog className="h-6 w-6" />,
        },
      ],
    },



    {
      title: t("projects.extraction.title"),
      description: t("projects.extraction.description"),
      icon: <Database className="h-10 w-10" />,
      tags: ["Python", "Selenium", "PostgreSQL", "Docker", "ETL"],
      featured: false,
      challenged: true,
      challenges: [
        {
          challenge: t("projects.extraction.challenges.1.challenge"),
          solution: t("projects.extraction.challenges.1.solution"),
          icon: <Shield className="h-6 w-6" />,
        },
        {
          challenge: t("projects.extraction.challenges.2.challenge"),
          solution: t("projects.extraction.challenges.2.solution"),
          icon: <Zap className="h-6 w-6" />,
        },
        {
          challenge: t("projects.extraction.challenges.3.challenge"),
          solution: t("projects.extraction.challenges.3.solution"),
          icon: <Users className="h-6 w-6" />,
        },
      ],
    },
    {
      title: t("projects.infrastructure.title"),
      description: t("projects.infrastructure.description"),
      icon: <Server className="h-10 w-10" />,
      tags: ["Infrastructure", "PXE", "iDRAC", "VLAN", "Monitoring"],
      featured: false,
      challenged: true,
      challenges: [
        {
          challenge: t("projects.infrastructure.challenges.1.challenge"),
          solution: t("projects.infrastructure.challenges.1.solution"),
          icon: <Cog className="h-6 w-6" />,
        },
        {
          challenge: t("projects.infrastructure.challenges.2.challenge"),
          solution: t("projects.infrastructure.challenges.2.solution"),
          icon: <Shield className="h-6 w-6" />,
        },
        {
          challenge: t("projects.infrastructure.challenges.3.challenge"),
          solution: t("projects.infrastructure.challenges.3.solution"),
          icon: <Zap className="h-6 w-6" />,
        },
      ],
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

  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set())

  const isProjectExpanded = (projectId: string) => expandedProjects.has(projectId)

  const toggleProject = (projectId: string) => {
    setExpandedProjects(prev => {
      const newSet = new Set(prev)
      if (newSet.has(projectId)) {
        newSet.delete(projectId)
      } else {
        newSet.add(projectId)
      }
      return newSet
    })
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
            .map((project, index) => {
              const projectId = `featured-${index}`
              return (
              <motion.div key={index} variants={item}>
                <Card className="overflow-hidden">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative h-64 md:h-auto">
                      <Image
                        src={project.image ?? ""}
                        alt={project.title}
                        fill
                        className="object-cover object-top"
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
                      <div className="flex flex-col gap-2 lg:flex-row lg:justify-between lg:gap-4">
                        <Link href={project.link ?? ""} target="_blank" className="w-full lg:w-auto">
                          <Button variant="default" size="sm" className="w-full lg:w-auto">
                            {t("projects.viewProject")}
                          </Button>
                        </Link>
                        {project.challenged && (
                          <Button variant="outline" size="sm" className="gap-2 w-full lg:w-auto" 
                          aria-controls={`challenge-${projectId}`}
                          aria-expanded={isProjectExpanded(projectId)}
                          onClick={() => toggleProject(projectId)}>
                            {isProjectExpanded(projectId) ? (
                              <>
                                <ChevronUp className="w-4 h-4" />
                                {t("projects.masquer")}
                              </>
                            ) : (
                              <>
                                <ChevronDown className="w-4 h-4" />
                                {t("projects.defiSolution")}
                                <Lightbulb className="w-4 h-4 text-yellow-400" />
                              </>
                            )}
                          </Button>
                        )}
                        {/* <Button variant="outline" size="sm">
                          {t("projects.sourceCode")}
                        </Button> */}
                      </div>
                      <AnimatePresence>
                      {isProjectExpanded(projectId) && (
                        <motion.div
                          id={`challenges-${projectId}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 space-y-4"
                        >
                          {project.challenges.map((challenge, challengeIndex) => (
                            <div key={challengeIndex} className="bg-background p-4 rounded-lg shadow-sm">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="p-1 bg-primary/10 rounded-full text-primary">{challenge.icon}</div>
                                <h5 className="font-semibold">{challenge.challenge}</h5>
                              </div>
                              <p className="text-sm text-muted-foreground ml-8">{challenge.solution}</p>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )})}

          {/* Other Projects */}
          <div className="grid md:grid-cols-2 gap-6">
            {projects
              .filter((project) => !project.featured)
              .map((project, index) => {
                const projectId = `regular-${index}`
                return (
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
                    <CardFooter className="flex justify-center md:justify-end">
                        {project.challenged && (
                          <Button variant="outline" size="sm" className="gap-2 w-full md:w-auto" 
                          aria-controls={`challenge-${projectId}`}
                          aria-expanded={isProjectExpanded(projectId)}
                          onClick={() => toggleProject(projectId)}>
                            {isProjectExpanded(projectId) ? (
                              <>
                                <ChevronUp className="w-4 h-4" />
                                {t("projects.masquer")}
                              </>
                            ) : (
                              <>
                                <ChevronDown className="w-4 h-4" />
                                {t("projects.defiSolution")} 
                                <Lightbulb className="w-4 h-4 text-yellow-400" />
                              </>
                            )}
                          </Button>
                        )}
                    </CardFooter>
                    <AnimatePresence>
                      {isProjectExpanded(projectId) && (
                        <motion.div
                          id={`challenges-${projectId}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 space-y-4"
                        >
                          {project.challenges.map((challenge, challengeIndex) => (
                            <div key={challengeIndex} className="bg-background p-4 rounded-lg shadow-sm">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="p-1 bg-primary/10 rounded-full text-primary">{challenge.icon}</div>
                                <h5 className="font-semibold">{challenge.challenge}</h5>
                              </div>
                              <p className="text-sm text-muted-foreground ml-8">{challenge.solution}</p>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              )})}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

