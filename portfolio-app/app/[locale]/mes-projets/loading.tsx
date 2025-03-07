import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="pt-10 space-y-12 animate-in fade-in duration-500">
      <section className="py-16 px-4 sm:px-8 lg:px-12 scroll-mt-8">
        <div className="container">
          <Skeleton className="h-12 w-64 mx-auto mb-12" />
          
          {/* Featured Project Skeleton */}
          <div className="space-y-12 mb-12">
            <Skeleton className="h-[400px] md:h-96 w-full rounded-lg" />
          </div>

          {/* Other Projects Skeleton */}
          <div className="grid md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, index) => (
              <Skeleton key={index} className="h-80 rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

