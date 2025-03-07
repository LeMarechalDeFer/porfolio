import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="pt-16 lg:pt-20 animate-in fade-in duration-500">
      <section className="py-16 bg-muted/50 px-4 sm:px-8 lg:px-12 scroll-mt-8">
        <div className="container">
          <Skeleton className="h-12 w-64 mx-auto mb-12" />

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative h-[550px] rounded-lg overflow-hidden">
              <Skeleton className="h-full w-full" />
            </div>

            {/* Texte */}
            <div className="space-y-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-3/4" />
              
              <div className="pt-4">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-5/6" />
              </div>
              
              <div className="pt-4">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-4/5" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
