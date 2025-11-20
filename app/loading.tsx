export default function Loading() {
  return (
    <div className="container py-10">
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="h-8 w-48 animate-pulse rounded bg-card" />
        <div className="h-96 w-full animate-pulse rounded-xl bg-card" />
        <div className="space-y-4">
          <div className="h-4 w-full animate-pulse rounded bg-card" />
          <div className="h-4 w-full animate-pulse rounded bg-card" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-card" />
        </div>
      </div>
    </div>
  )
}
