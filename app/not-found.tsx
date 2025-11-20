import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h2 className="mb-4 text-4xl font-bold">404</h2>
      <p className="mb-8 text-lg text-muted">
        Lo sentimos, la página que buscas no existe.
      </p>
      <Link
        href="/"
        className="rounded-md bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent/90"
      >
        Volver al inicio
      </Link>
    </div>
  )
}
