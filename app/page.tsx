import { client } from "../lib/sanity.client";
import { listQuery, PAGE_SIZE } from "../lib/queries";
import { BlogCard } from "../components/BlogCard";
import Link from "next/link";

export const revalidate = 300;

type SP = Record<string, string | string[]> | URLSearchParams | undefined;

function getPage(sp: SP): number {
  if (!sp) return 1;
  if (typeof (sp as any).get === "function") {
    const v = (sp as URLSearchParams).get("page") || "1";
    const n = Number(v);
    return Number.isFinite(n) && n > 0 ? n : 1;
  }
  const raw = (sp as Record<string, any>).page ?? "1";
  const v = Array.isArray(raw) ? raw[0] : raw;
  const n = Number(v ?? "1");
  return Number.isFinite(n) && n > 0 ? n : 1;
}

export default async function Home(props: { searchParams?: Promise<SP> | SP }) {
  const maybePromise = props?.searchParams as any;
  const sp: SP =
    maybePromise && typeof maybePromise.then === "function"
      ? await maybePromise
      : (props.searchParams as SP);

  const page = getPage(sp);
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE;

  let posts: any[] = [];
  try {
    posts = await client.fetch(listQuery, { from, to });
  } catch (e) {
    console.error(e);
    posts = [];
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative w-full border-b border-white/10 bg-background py-32 md:py-48 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl space-y-8">
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-foreground animate-fade-in">
              MI CAMINO.
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl animate-fade-in [animation-delay:200ms]">
              Iván Burrola Torres A01562825.
            </p>
          </div>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        {/* Gradient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none opacity-50" />
      </section>

      {/* Posts Grid */}
      <section className="container mx-auto px-4 md:px-6 py-24">
        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="rounded-full bg-muted p-6 mb-6">
              <svg
                className="w-10 h-10 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              No hay artículos aún
            </h3>
            <p className="text-muted-foreground max-w-sm mt-3">
              Estamos trabajando en nuevo contenido. Vuelve pronto para leer las
              últimas novedades.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(400px,auto)]">
            {posts.map((post: any, index: number) => (
              <BlogCard
                key={post.slug}
                post={post}
                index={index}
                isHero={index === 0 && page === 1}
              />
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        <div className="mt-24 flex justify-center gap-4">
          {page > 1 && (
            <Link
              href={`/?page=${page - 1}`}
              className="group flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-all hover:border-primary/50 hover:bg-muted"
            >
              <svg
                className="h-4 w-4 transition-transform group-hover:-translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Anterior
            </Link>
          )}

          {posts.length >= PAGE_SIZE && (
            <Link
              href={`/?page=${page + 1}`}
              className="group flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-all hover:border-primary/50 hover:bg-muted"
            >
              Siguiente
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
