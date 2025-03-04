"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Code, Server, Database, Brain, Cloud, Zap, Shield, Cog, Users } from "lucide-react"
import Link from "next/link"

const services = [
  {
    category: "Développement Full Stack",
    items: [
      {
        title: "Applications Web Modernes",
        description:
          "Création d'applications web performantes et évolutives avec les dernières technologies (React, Next.js, Node.js).",
        icon: <Code className="h-8 w-8" />,
        skills: ["React", "Next.js", "Node.js", "TypeScript"],
      },
      {
        title: "APIs RESTful & GraphQL",
        description: "Conception et développement d'APIs robustes pour connecter vos systèmes et applications.",
        icon: <Zap className="h-8 w-8" />,
        skills: ["REST", "GraphQL", "Express", "Apollo"],
      },
      {
        title: "Intégration de Systèmes",
        description: "Connexion et optimisation de vos systèmes existants pour une efficacité maximale.",
        icon: <Cog className="h-8 w-8" />,
        skills: ["Microservices", "ESB", "Middleware"],
      },
    ],
  },
  {
    category: "Administration Système",
    items: [
      {
        title: "Infrastructure Cloud",
        description: "Mise en place et gestion d'infrastructures cloud scalables et sécurisées.",
        icon: <Cloud className="h-8 w-8" />,
        skills: ["AWS", "Azure", "GCP", "Kubernetes"],
      },
      {
        title: "DevOps & CI/CD",
        description: "Automatisation des processus de développement et de déploiement pour une livraison continue.",
        icon: <Server className="h-8 w-8" />,
        skills: ["Docker", "Jenkins", "GitLab CI", "Ansible"],
      },
      {
        title: "Sécurité & Conformité",
        description: "Implémentation de meilleures pratiques de sécurité et conformité aux normes de l'industrie.",
        icon: <Shield className="h-8 w-8" />,
        skills: ["OWASP", "GDPR", "ISO 27001"],
      },
    ],
  },
  {
    category: "AI & MLOps",
    items: [
      {
        title: "Intégration d'IA",
        description:
          "Incorporation de solutions d'IA pour automatiser les processus et améliorer la prise de décision.",
        icon: <Brain className="h-8 w-8" />,
        skills: ["TensorFlow", "PyTorch", "Scikit-learn"],
      },
      {
        title: "Pipelines ML",
        description:
          "Création et optimisation de pipelines de machine learning pour un déploiement et une mise à jour efficaces des modèles.",
        icon: <Database className="h-8 w-8" />,
        skills: ["MLflow", "Kubeflow", "Apache Airflow"],
      },
      {
        title: "Analyse de Données",
        description: "Exploitation de vos données pour des insights précieux et une prise de décision éclairée.",
        icon: <Users className="h-8 w-8" />,
        skills: ["Pandas", "Spark", "Tableau", "Power BI"],
      },
    ],
  },
]

export default function MesServicesClient() {
  const [activeCategory, setActiveCategory] = useState(services[0].category)

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20 mt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8 md:mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">Mes Services</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          De la conception à la mise en production, je vous accompagne dans toutes les étapes de votre projet digital.
        </p>
      </motion.div>

      <Tabs defaultValue={services[0].category} className="w-full" onValueChange={setActiveCategory}>
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-4 md:mb-8 pb-24 lg:pb-10">
          {services.map((service) => (
            <TabsTrigger key={service.category} value={service.category} className="text-base md:text-lg">
              {service.category}
            </TabsTrigger>
          ))}
        </TabsList>
        {services.map((service) => (
          <TabsContent key={service.category} value={service.category}>
            <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {service.items.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full flex flex-col">
                    <CardHeader>
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3 md:mb-4">
                        {item.icon}
                      </div>
                      <CardTitle className="text-lg md:text-xl">{item.title}</CardTitle>
                      <CardDescription className="text-sm md:text-base">{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div className="flex flex-wrap gap-2">
                        {item.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs md:text-sm">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" className="w-full text-sm md:text-base">
                        En savoir plus
                        <ArrowRight className="ml-2 h-3 w-3 md:h-4 md:w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-10 md:mt-16 text-center"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Prêt à propulser votre projet ?</h2>
        <p className="text-base md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto">
          Que vous ayez besoin d'une application web performante, d'une infrastructure robuste ou d'intégrer l'IA dans
          vos processus, je suis là pour vous aider à concrétiser votre vision.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
          <Button size="default" className="md:size-lg" asChild>
            <Link href="/demarrer-votre-projet">
              Démarrer votre projet
              <ArrowRight className="ml-2 h-3 w-3 md:h-4 md:w-4" />
            </Link>
          </Button>
          <Button size="default" className="md:size-lg" variant="outline" asChild>
            <Link href="/contact">Prendre rendez-vous</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

