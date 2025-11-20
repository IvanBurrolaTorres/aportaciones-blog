'use client'

import { useEffect } from 'react'

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
    <div className="container flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h2 className="mb-4 text-2xl font-bold">Algo salió mal</h2>
      <p className="mb-8 text-muted">
        Ocurrió un error al cargar esta página.
      </p>
      <button
        onClick={reset}
        className="rounded-md bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent/90"
      >
        Intentar de nuevo
      </button>
    </div>
  )
}
