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
      <section className="relative w-full border-b border-border bg-background py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="mx-auto max-w-3xl space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-text animate-fade-in">
              MI CAMINO.
            </h1>
            <p className="text-lg md:text-xl text-muted leading-relaxed">
              Iván Burrola Torres A01562825.
            </p>
          </div>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
      </section>

      {/* Posts Grid */}
      <section className="container mx-auto px-4 md:px-6 py-16">
        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="rounded-full bg-neutral-100 dark:bg-neutral-800 p-4 mb-4">
              <svg
                className="w-8 h-8 text-neutral-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-neutral-900 dark:text-white">
              No hay artículos aún
            </h3>
            <p className="text-neutral-500 dark:text-neutral-400 max-w-sm mt-2">
              Estamos trabajando en nuevo contenido. Vuelve pronto para leer las
              últimas novedades.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: any, index: number) => (
              <BlogCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        <div className="mt-16 flex justify-center gap-4">
          {page > 1 && (
            <Link
              href={`/?page=${page - 1}`}
              className="group flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-6 py-2.5 text-sm font-medium text-neutral-700 transition-all hover:border-neutral-300 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"
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
              className="group flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-6 py-2.5 text-sm font-medium text-neutral-700 transition-all hover:border-neutral-300 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"
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
