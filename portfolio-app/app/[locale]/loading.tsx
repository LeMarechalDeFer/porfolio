import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="space-y-16 animate-in fade-in duration-500">
      {/* Hero Section Skeleton */}
      <section className="relative py-10 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-12 mt-10">
        <div className="container relative z-10">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left space-y-4 sm:space-y-6">
              <Skeleton className="h-14 w-3/4 mx-auto lg:mx-0" />
              <Skeleton className="h-24 w-full" />
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <Skeleton className="h-10 w-40" />
                <Skeleton className="h-10 w-40" />
              </div>
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3 sm:gap-6 pt-4">
                {[...Array(4)].map((_, index) => (
                  <Skeleton key={index} className="h-6 w-32" />
                ))}
              </div>
            </div>
            <div className="relative mt-6 sm:mt-8 lg:mt-0 flex justify-center">
              <Skeleton className="rounded-full w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96" />
            </div>
          </div>
          <div className="mt-8 sm:mt-10 lg:mt-12 flex justify-center lg:justify-start gap-4">
            {[...Array(3)].map((_, index) => (
              <Skeleton key={index} className="h-10 w-10 rounded-full" />
            ))}
          </div>
        </div>
      </section>

      {/* Services Section Skeleton */}
      <section className="py-16 px-4 sm:px-8 lg:px-12">
        <div className="container">
          <Skeleton className="h-12 w-64 mx-auto mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[...Array(3)].map((_, index) => (
              <Skeleton key={index} className="h-64 rounded-lg" />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section Skeleton */}
      <section className="py-16 px-4 sm:px-8 lg:px-12 bg-muted/30">
        <div className="container">
          <Skeleton className="h-12 w-64 mx-auto mb-10" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {[...Array(10)].map((_, index) => (
              <Skeleton key={index} className="h-28 rounded-lg" />
            ))}
          </div>
        </div>
      </section>

      {/* Minimalistic Projects, About and Contact skeletons */}
      {[...Array(3)].map((_, index) => (
        <section key={index} className="py-16 px-4 sm:px-8 lg:px-12">
          <div className="container">
            <Skeleton className="h-12 w-64 mx-auto mb-10" />
            <div className="max-w-3xl mx-auto">
              <Skeleton className="h-96 rounded-lg" />
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}

