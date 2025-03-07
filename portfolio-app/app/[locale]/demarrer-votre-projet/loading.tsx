import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 pt-20 md:py-16 md:pt-20 max-w-full overflow-x-hidden animate-in fade-in duration-500">
      <div className="text-center mb-8 md:mb-12">
        <Skeleton className="h-10 w-3/4 md:w-1/2 mx-auto mb-3 md:mb-4" />
        <Skeleton className="h-6 w-full max-w-2xl mx-auto" />
      </div>

      <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
        <div className="space-y-6 md:space-y-8">
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-56" />
            </CardHeader>
            <CardContent>
              {/* Formulaire skeleton */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <Skeleton className="h-10 w-full" />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary">
            <CardHeader>
              <Skeleton className="h-8 w-56 bg-primary-foreground/20" />
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Skeleton className="h-5 w-5 mt-1 rounded-full bg-primary-foreground/20" />
                    <div>
                      <Skeleton className="h-4 w-32 mb-1 bg-primary-foreground/20" />
                      <Skeleton className="h-8 w-full bg-primary-foreground/20" />
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
              <Skeleton className="h-8 w-56" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
                    <div className="flex-1 min-w-0 space-y-1">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-56" />
            </CardHeader>
            <CardContent className="px-2 sm:px-6">
              <Skeleton className="h-64 w-full rounded-lg" />
            </CardContent>
          </Card>

          <div className="relative overflow-hidden rounded-lg">
            <Skeleton className="w-full h-64 rounded-lg" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4 md:p-6">
              <div className="w-full">
                <Skeleton className="h-6 w-48 mb-1 md:mb-2 bg-white/30" />
                <Skeleton className="h-4 w-full mb-2 md:mb-4 max-w-md bg-white/30" />
                <Skeleton className="h-8 w-32 bg-white/30" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
