"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-foreground mb-4 text-6xl font-bold">500</h1>
      <p className="text-muted-foreground mb-8 text-lg">Une erreur inattendue est survenue.</p>
      <div className="flex gap-4">
        <Button onClick={reset} variant="default">
          Réessayer
        </Button>
        <Button asChild variant="outline">
          <Link href="/">Retour à l&apos;accueil</Link>
        </Button>
      </div>
    </div>
  )
}
