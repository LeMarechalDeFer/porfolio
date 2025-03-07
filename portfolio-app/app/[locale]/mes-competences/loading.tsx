import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="pt-16 lg:pt-32 animate-in fade-in duration-500">
      <section className="py-16 bg-muted/50 px-4 sm:px-8 lg:px-12 scroll-mt-8">
        <div className="container">
          <Skeleton className="h-12 w-64 mx-auto mb-12" />

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Frontend Skills Card */}
            {[...Array(5)].map((_, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-6 w-6 rounded" />
                    <Skeleton className="h-6 w-32" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {[...Array(5)].map((_, badgeIndex) => (
                      <Skeleton key={badgeIndex} className="h-6 w-20 rounded-full" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
