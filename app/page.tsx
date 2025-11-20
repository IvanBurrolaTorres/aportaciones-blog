export const revalidate = 300

import Link from "next/link"
import { client } from "../lib/sanity.client"
import { listQuery, PAGE_SIZE } from "../lib/queries"
import { PostCard } from "../components/PostCard"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "../lib/utils"

type SP = Record<string, string | string[]> | URLSearchParams | undefined

function getPage(sp: SP): number {
  if (!sp) return 1
  if (typeof (sp as any).get === 'function') {
    const v = (sp as URLSearchParams).get('page') || '1'
    const n = Number(v)
    return Number.isFinite(n) && n > 0 ? n : 1
  }
  const raw = (sp as Record<string, any>).page ?? '1'
  const v = Array.isArray(raw) ? raw[0] : raw
  const n = Number(v ?? '1')
  return Number.isFinite(n) && n > 0 ? n : 1
}

export default async function Home(props: { searchParams?: Promise<SP> | SP }) {
  const maybePromise = props?.searchParams as any
  const sp: SP = maybePromise && typeof maybePromise.then === 'function'
    ? await maybePromise
    : (props.searchParams as SP)

  const page = getPage(sp)
  const from = (page - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE

  let posts: any[] = []
  try {
    posts = await client.fetch(listQuery, { from, to })
  } catch (e) {
    console.error(e)
    posts = []
  }

  const hasMore = posts.length >= PAGE_SIZE // Basic check, ideal would be to count total

  return (
    <div className="container py-10">
      <section className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Aportaciones
        </h1>
        <p className="text-lg text-muted max-w-2xl mx-auto">
          Explora nuestros últimos artículos, tutoriales y noticias sobre desarrollo y diseño.
        </p>
      </section>

      {posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted">Aún no hay aportaciones publicadas.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post: any) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}

      <div className="mt-12 flex justify-center gap-4">
        {page > 1 && (
          <Link
            href={`/?page=${page - 1}`}
            className={cn(
              "flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-white"
            )}
          >
            <ChevronLeft className="h-4 w-4" />
            Anterior
          </Link>
        )}
        {/* We don't know total count easily without another query, but we can show Next if we got full page */}
        {/* For now assuming if we got PAGE_SIZE items there might be more */}
        {posts.length >= PAGE_SIZE && (
           <Link
           href={`/?page=${page + 1}`}
           className={cn(
             "flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-white"
           )}
         >
           Siguiente
           <ChevronRight className="h-4 w-4" />
         </Link>
        )}
      </div>
    </div>
  )
}
