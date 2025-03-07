import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="pt-10 animate-in fade-in duration-500">
      <section className="py-16 px-4 sm:px-8 lg:px-12 scroll-mt-8">
        <div className="container">
          <Skeleton className="h-12 w-64 mx-auto mb-12" />

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Informations de contact */}
            <div className="space-y-6">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-20 w-full" />

              <div className="space-y-4">
                {[...Array(2)].map((_, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 rounded-lg border">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div>
                      <Skeleton className="h-5 w-24 mb-2" />
                      <Skeleton className="h-4 w-36" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-4 pt-4">
                {[...Array(3)].map((_, index) => (
                  <Skeleton key={index} className="h-10 w-10 rounded-full" />
                ))}
              </div>
            </div>

            {/* Formulaire de projet */}
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-48 mb-2" />
                <Skeleton className="h-4 w-full" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
