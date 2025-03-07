import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20 mt-16 animate-in fade-in duration-500">
      {/* En-tête de la page */}
      <div className="text-center mb-8 md:mb-12">
        <Skeleton className="h-10 w-3/4 md:w-1/2 mx-auto mb-3 md:mb-4" />
        <Skeleton className="h-6 w-full max-w-2xl mx-auto" />
      </div>

      {/* Onglets de catégories */}
      <div className="w-full mb-8">
        <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-4 mb-4 md:mb-8 pt-4 md:pt-1 lg:pt-1 pb-10">
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} className="h-12 rounded-md" />
          ))}
        </div>
      </div>

      {/* Grille de services */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, index) => (
          <Card key={index} className="h-full">
            <CardHeader>
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-muted mb-3 md:mb-4" />
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-24 w-full" />
              <div className="flex flex-wrap gap-2">
                {[...Array(4)].map((_, tagIndex) => (
                  <Skeleton key={tagIndex} className="h-5 w-16 rounded-full" />
                ))}
              </div>
              <div className="pt-2">
                <Skeleton className="h-9 w-full md:w-32 rounded-md" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Section d'appel à l'action */}
      <div className="mt-10 md:mt-16">
        <Card className="bg-muted/10">
          <CardContent className="p-6 md:p-8 lg:p-10">
            <div className="space-y-6 text-center">
              <Skeleton className="h-8 w-3/4 mx-auto" />
              <Skeleton className="h-6 w-full max-w-2xl mx-auto" />
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md mx-auto">
                <Skeleton className="h-10 w-full sm:w-40 rounded-md" />
                <Skeleton className="h-10 w-full sm:w-40 rounded-md" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
