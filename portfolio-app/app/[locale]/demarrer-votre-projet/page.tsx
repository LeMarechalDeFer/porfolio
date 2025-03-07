import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ArrowRight, Star } from "lucide-react"
import Image from "next/image"
import ProjectForm from "@/components/reservation/project-form"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { getI18n } from "@/locales/server"

export default async function DemarrerVotreProjet() {
  const t = await getI18n()
  
  return (
    <div className="container mx-auto px-4 py-8 pt-20 md:py-16 md:pt-20 max-w-full overflow-x-hidden">
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">{t("start-project.title")}</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          {t("start-project.subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
        <div className="space-y-6 md:space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>{t("start-project.form.title")}</CardTitle>
            </CardHeader>
            <CardContent>
              <ProjectForm />
            </CardContent>
          </Card>

          <Card className="bg-primary text-primary-foreground">
            <CardHeader>
              <CardTitle>{t("start-project.why.title")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-sm">{t("start-project.why.expertise")}</h3>
                    <p className="text-xs opacity-90">{t("start-project.why.expertise.desc")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-sm">{t("start-project.why.custom")}</h3>
                    <p className="text-xs opacity-90">{t("start-project.why.custom.desc")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-sm">{t("start-project.why.ai")}</h3>
                    <p className="text-xs opacity-90">{t("start-project.why.ai.desc")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-sm">{t("start-project.why.end2end")}</h3>
                    <p className="text-xs opacity-90">{t("start-project.why.end2end.desc")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-sm">{t("start-project.why.communication")}</h3>
                    <p className="text-xs opacity-90">{t("start-project.why.communication.desc")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-sm">{t("start-project.why.results")}</h3>
                    <p className="text-xs opacity-90">{t("start-project.why.results.desc")}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6 md:space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>{t("start-project.process.title")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    1
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold">{t("start-project.process.step1")}</h3>
                    <p className="text-sm text-muted-foreground">{t("start-project.process.step1.desc")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    2
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold">{t("start-project.process.step2")}</h3>
                    <p className="text-sm text-muted-foreground">{t("start-project.process.step2.desc")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    3
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold">{t("start-project.process.step3")}</h3>
                    <p className="text-sm text-muted-foreground">{t("start-project.process.step3.desc")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    4
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold">{t("start-project.process.step4")}</h3>
                    <p className="text-sm text-muted-foreground">{t("start-project.process.step4.desc")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    5
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold">{t("start-project.process.step5")}</h3>
                    <p className="text-sm text-muted-foreground">{t("start-project.process.step5.desc")}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("start-project.testimonials.title")}</CardTitle>
            </CardHeader>
            <CardContent className="px-2 sm:px-6">
              <Carousel className="w-full">
                <CarouselContent>
                  <CarouselItem>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex justify-center mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <blockquote className="text-center italic text-xs sm:text-sm mb-4 break-words">&quot;{t("start-project.testimonials.client1.content")}&quot;</blockquote>
                        <div className="text-center">
                          <p className="font-semibold">{t("start-project.testimonials.client1.name")}</p>
                          <p className="text-xs sm:text-sm text-muted-foreground">{t("start-project.testimonials.client1.role")}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                  <CarouselItem>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex justify-center mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <blockquote className="text-center italic text-xs sm:text-sm mb-4 break-words">&quot;{t("start-project.testimonials.client2.content")}&quot;</blockquote>
                        <div className="text-center">
                          <p className="font-semibold">{t("start-project.testimonials.client2.name")}</p>
                          <p className="text-xs sm:text-sm text-muted-foreground">{t("start-project.testimonials.client2.role")}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                  <CarouselItem>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex justify-center mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <blockquote className="text-center italic text-xs sm:text-sm mb-4 break-words">&quot;{t("start-project.testimonials.client3.content")}&quot;</blockquote>
                        <div className="text-center">
                          <p className="font-semibold">{t("start-project.testimonials.client3.name")}</p>
                          <p className="text-xs sm:text-sm text-muted-foreground">{t("start-project.testimonials.client3.role")}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                  <CarouselItem>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex justify-center mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <blockquote className="text-center italic text-xs sm:text-sm mb-4 break-words">&quot;{t("start-project.testimonials.client4.content")}&quot;</blockquote>
                        <div className="text-center">
                          <p className="font-semibold">{t("start-project.testimonials.client4.name")}</p>
                          <p className="text-xs sm:text-sm text-muted-foreground">{t("start-project.testimonials.client4.role")}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
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
              priority
              fetchPriority="high"
              loading="eager"
              quality={60}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end p-4 md:p-6">
              <div className="text-white">
                <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">{t("start-project.cta.title")}</h3>
                <p className="mb-2 md:mb-4 text-sm md:text-base">{t("start-project.cta.subtitle")}</p>
                <Button variant="secondary" size="sm" className="md:size-default">
                  {t("start-project.cta.button")}
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

