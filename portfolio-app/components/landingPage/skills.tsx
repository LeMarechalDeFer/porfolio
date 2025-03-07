"use client"

import { useI18n } from "@/locales/client"
import { motion } from "framer-motion"
import { Database, Server, Cpu, BrainCircuit, Globe } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


type SkillLevel = "skills.level.beginner" | "skills.level.intermediate" | "skills.level.advanced" | "skills.level.expert"
type SkillCategory = "skills.category.frontend" | "skills.category.backend" | "skills.category.database" | "skills.category.devops" | "skills.category.ai"

type Skill = {
  name: string
  level: SkillLevel
  category: SkillCategory
  description: string
  projects: string[]
}

export default function Skills() {
  const t = useI18n()

  const skillsData: Skill[] = [
    {
      name: "React.js",
      level: "skills.level.expert",
      category: "skills.category.frontend",
      description: t("skills.react.description"),
      projects: ["Portfolio personnel", "Dashboard pour Hotel La Louisiane"],
    },
    {
      name: "Next.js",
      level: "skills.level.advanced",
      category: "skills.category.frontend",
      description: t("skills.nextjs.description"),
      projects: ["Site e-commerce", "Blog avec CMS headless"],
    },
    {
      name: "TypeScript",
      level: "skills.level.advanced",
      category: "skills.category.frontend",
      description: t("skills.typescript.description"),
      projects: ["API RESTful", "Librairie de composants UI"],
    },
    {
      name: "HTML/CSS",
      level: "skills.level.expert",
      category: "skills.category.frontend",
      description: t("skills.html.description"),
      projects: ["Refonte de site vitrine", "Landing pages"],
    },
    {
      name: "Tailwind CSS",
      level: "skills.level.advanced",
      category: "skills.category.frontend",
      description: t("skills.tailwind.description"),
      projects: ["Application de gestion de tâches", "Interface d'administration"],
    },
    {
      name: "Node.js",
      level: "skills.level.advanced",
      category: "skills.category.backend",
      description: t("skills.nodejs.description"),
      projects: ["Microservices pour une application de réservation", "Chatbot IA"],
    },
    {
      name: "Express.js",
      level: "skills.level.advanced",
      category: "skills.category.backend",
      description: t("skills.express.description"),
      projects: ["API RESTful", "Serveur d'authentification"],
    },
    {
      name: "C/C++",
      level: "skills.level.intermediate",
      category: "skills.category.backend",
      description: t("skills.cpp.description"),
      projects: ["Optimisation d'algorithmes", "Développement de plugins"],
    },
    {
      name: "Java",
      level: "skills.level.intermediate",
      category: "skills.category.backend",
      description: t("skills.java.description"),
      projects: ["Application de gestion de stock", "Système de facturation"],
    },
    {
      name: "PostgreSQL",
      level: "skills.level.intermediate",
      category: "skills.category.database",
      description: t("skills.postgresql.description"),
      projects: ["Système de gestion de contenu", "Application de suivi financier"],
    },
    {
      name: "MongoDB",
      level: "skills.level.intermediate",
      category: "skills.category.database",
      description: t("skills.mongodb.description"),
      projects: ["Application de logging", "Système de recommandation"],
    },
    {
      name: "Redis",
      level: "skills.level.beginner",
      category: "skills.category.database",
      description: t("skills.redis.description"),
      projects: ["Système de mise en cache", "Gestion de sessions"],
    },
    {
      name: "Docker",
      level: "skills.level.intermediate",
      category: "skills.category.devops",
      description: t("skills.docker.description"),
      projects: ["Infrastructure distribuée", "Pipeline CI/CD"],
    },
    {
      name: "Git",
      level: "skills.level.advanced",
      category: "skills.category.devops",
      description: t("skills.git.description"),
      projects: ["Tous les projets"],
    },
    {
      name: "CI/CD",
      level: "skills.level.intermediate",
      category: "skills.category.devops",
      description: t("skills.cicd.description"),
      projects: ["Configuration de pipeline Jenkins", "Intégration avec GitHub Actions"],
    },
    {
      name: "Machine Learning",
      level: "skills.level.beginner",
      category: "skills.category.ai",
      description: t("skills.ml.description"),
      projects: ["Système de recommandation", "Analyse de sentiments"],
    },
    {
      name: "NLP",
      level: "skills.level.beginner",
      category: "skills.category.ai",
      description: t("skills.nlp.description"),
      projects: ["Chatbot", "Système de classification de documents"],
    },
  ]

  const categoryIcons = {
    "skills.category.frontend": <Globe className="h-6 w-6" />,
    "skills.category.backend": <Server className="h-6 w-6" />,
    "skills.category.database": <Database className="h-6 w-6" />,
    "skills.category.devops": <Cpu className="h-6 w-6" />,
    "skills.category.ai": <BrainCircuit className="h-6 w-6" />,
  }

  const levelColors = {
    "skills.level.beginner": "bg-blue-100 text-blue-800 hover:bg-blue-200",
    "skills.level.intermediate": "bg-green-100 text-green-800 hover:bg-green-200",
    "skills.level.advanced": "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
    "skills.level.expert": "bg-red-100 text-red-800 hover:bg-red-200",
  }

  const categories = Array.from(new Set(skillsData.map((skill) => skill.category)))

  return (
    <section id="skills" className="py-16 bg-muted/50 px-4 sm:px-8 lg:px-12 scroll-mt-8" >
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12"
        >
          {t("skills.title")}
        </motion.h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {categoryIcons[category as keyof typeof categoryIcons]}
                  {t(category)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skillsData
                    .filter((skill) => skill.category === category)
                    .map((skill) => (
                      <Dialog key={skill.name}>
                        <DialogTrigger asChild>
                          <Badge
                            interactive
                            className={`${levelColors[skill.level]} cursor-pointer transition-colors`}
                          >
                            {skill.name}
                          </Badge>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{skill.name}</DialogTitle>
                            <DialogDescription>
                              {t("skills.level")} :
                            </DialogDescription>
                            <Badge className={levelColors[skill.level]}>{t(skill.level)}</Badge>
                          </DialogHeader>
                          <div className="mt-4">
                            <p className="text-sm text-muted-foreground mb-4">{skill.description}</p>
                            <h4 className="text-sm font-semibold mb-2">{t("skills.projects")}</h4>
                            <ul className="list-disc list-inside text-sm text-muted-foreground">
                              {skill.projects.map((project, idx) => (
                                <li key={idx}>{project}</li>
                              ))}
                            </ul>
                          </div>
                        </DialogContent>
                      </Dialog>
                    ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

