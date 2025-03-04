import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ArrowRight, Star } from "lucide-react"
import Image from "next/image"
import ProjectForm from "@/components/reservation/project-form"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"


const processSteps = [
  {
    title: "Consultation initiale gratuite",
    description: "Discutons de votre vision, vos objectifs et vos besoins spécifiques.",
  },
  {
    title: "Proposition sur mesure",
    description: "Je vous fournis un plan d'action détaillé et un devis adapté à votre projet.",
  },
  {
    title: "Développement agile",
    description: "Création de votre solution avec des mises à jour régulières et des ajustements en temps réel.",
  },
  {
    title: "Tests et optimisation",
    description: "Assurance qualité rigoureuse pour un produit final impeccable et performant.",
  },
  {
    title: "Lancement et support",
    description: "Déploiement en douceur et accompagnement continu pour assurer le succès de votre projet.",
  },
]

const trustReasons = [
  { title: "Expertise Next.js", description: "Applications web ultra-performantes et évolutives" },
  { title: "Solutions sur mesure", description: "Adaptées à vos besoins uniques et objectifs commerciaux" },
  { title: "Intégration IA", description: "Boost de productivité et fonctionnalités innovantes" },
  { title: "Approche end-to-end", description: "Du concept au déploiement, et au-delà" },
  { title: "Communication transparente", description: "Mises à jour régulières et collaboration étroite" },
  { title: "Résultats garantis", description: "Engagement sur la qualité et la satisfaction client" },
]

const testimonials = [
  {
    name: "Marie D.",
    role: "CEO de TechStart",
    content:
      "Romain a transformé notre idée en une application web exceptionnelle. Son expertise en Next.js et son approche professionnelle ont dépassé toutes nos attentes. Notre plateforme est maintenant plus rapide, plus intuitive et nos utilisateurs adorent !",
  },
  {
    name: "Thomas L.",
    role: "Fondateur de EcoSolutions",
    content:
      "Travailler avec Romain a été une expérience incroyable. Sa compréhension approfondie de nos besoins et sa capacité à proposer des solutions innovantes ont fait toute la différence. Notre site e-commerce est non seulement beau, mais aussi extrêmement performant.",
  },
  {
    name: "Sophie M.",
    role: "Directrice Marketing chez InnoHealth",
    content:
      "L'expertise de Romain en matière d'intégration d'IA dans les applications web a révolutionné notre approche du service client. Grâce à lui, nous avons maintenant un chatbot intelligent qui traite efficacement 70% de nos requêtes client.",
  },
  {
    name: "Alexandre P.",
    role: "CTO de FinTech Solutions",
    content:
      "La rigueur technique de Romain et sa maîtrise des meilleures pratiques en matière de sécurité ont été cruciales pour notre projet. Il a su créer une plateforme robuste et sécurisée, essentielle dans notre secteur financier.",
  },
]

export default function DemarrerVotreProjet() {
  return (
    <div className="container mx-auto px-4 py-8 pt-20 md:py-16 md:pt-20 max-w-full overflow-x-hidden">
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">Transformez votre vision en réalité digitale</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Vous êtes prêt à propulser votre entreprise vers de nouveaux sommets. Remplissez le formulaire ci-dessous pour
          démarrer votre projet web sur mesure.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
        <div className="space-y-6 md:space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Parlons de votre projet</CardTitle>
            </CardHeader>
            <CardContent>
              <ProjectForm />
            </CardContent>
          </Card>

          <Card className="bg-primary text-primary-foreground">
            <CardHeader>
              <CardTitle>Pourquoi choisir mes services ?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {trustReasons.map((reason, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-sm">{reason.title}</h3>
                      <p className="text-xs opacity-90">{reason.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6 md:space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Un processus éprouvé pour votre réussite</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {processSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ce que disent mes clients</CardTitle>
            </CardHeader>
            <CardContent className="px-2 sm:px-6">
              <Carousel className="w-full">
                <CarouselContent>
                  {testimonials.map((testimonial, index) => (
                    <CarouselItem key={index}>
                      <Card>
                        <CardContent className="pt-6">
                          <div className="flex justify-center mb-4">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                            ))}
                          </div>
                          <blockquote className="text-center italic text-xs sm:text-sm mb-4 break-words">"{testimonial.content}"</blockquote>
                          <div className="text-center">
                            <p className="font-semibold">{testimonial.name}</p>
                            <p className="text-xs sm:text-sm text-muted-foreground">{testimonial.role}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="hidden sm:block">
                  <CarouselPrevious />
                  <CarouselNext />
                </div>
              </Carousel>
            </CardContent>
          </Card>

          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <Image
              src="/premierePage.jpg"
              alt="Collaboration en action"
              width={600}
              height={300}
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end p-4 md:p-6">
              <div className="text-white">
                <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">Prêt à concrétiser votre projet ?</h3>
                <p className="mb-2 md:mb-4 text-sm md:text-base">Ensemble, créons une solution web qui propulsera votre entreprise.</p>
                <Button variant="secondary" size="sm" className="md:size-default">
                  Commencer maintenant
                  <ArrowRight className="ml-2 h-3 w-3 md:h-4 md:w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

