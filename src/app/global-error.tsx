"use client"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  console.error(error)

  return (
    <html lang="fr">
      <body className="flex min-h-screen items-center justify-center bg-gray-100 font-sans">
        <div className="mx-auto max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
          <h1 className="mb-4 text-4xl font-bold text-gray-800">500</h1>
          <p className="mb-6 text-gray-600">Une erreur inattendue est survenue.</p>
          <button
            onClick={reset}
            className="rounded-md bg-indigo-600 px-6 py-3 font-medium text-white transition-colors hover:bg-indigo-700"
          >
            Réessayer
          </button>
        </div>
      </body>
    </html>
  )
}
