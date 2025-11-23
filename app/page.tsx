import Link from "next/link";
import { client } from "../lib/sanity.client";
import { listQuery } from "../lib/queries";
import { BlogCard } from "../components/BlogCard";
import { TextReveal } from "../components/TextReveal";

// ...

{/* Text Reveal Section */ }
<TextReveal text="La curiosidad es el motor que impulsa cada descubrimiento." />

{/* Posts Grid */ }
import { ArrowRight } from "lucide-react";

export const revalidate = 60;

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = parseInt(pageParam || "1");
  const pageSize = 6;
  const from = (page - 1) * pageSize;
  const to = from + pageSize;

  const posts = await client.fetch(listQuery, { from, to });

  return (
    <div className="min-h-screen">
      {/* Asymmetrical Hero Section */}
      <section className="relative w-full min-h-[80vh] flex items-center overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Content - Typography Heavy */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium tracking-wider uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Blog Personal
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold tracking-tighter leading-[0.9]">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-primary animate-text-gradient">
                Mi <br /> Camino.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-xl font-light">
              Un espacio donde convergen mis pensamientos, aprendizajes y la búsqueda constante de crecimiento.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="#posts" className="inline-flex h-14 items-center justify-center rounded-full bg-foreground px-8 text-base font-medium text-background transition-all hover:bg-foreground/90 hover:scale-105 active:scale-95">
                Explorar Aportaciones
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Right Content - Abstract/Visual */}
          <div className="lg:col-span-5 relative hidden lg:block h-[600px]">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-purple-500/30 rounded-full blur-3xl animate-pulse" />
            <div className="relative h-full w-full rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-muted/10 backdrop-blur-sm flex items-center justify-center">
              <div className="text-center flex items-center justify-center h-full w-full">
                <span className="text-9xl md:text-[10rem] leading-normal font-serif italic opacity-20 select-none p-4">IB</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Text Reveal Section */}
      <TextReveal text="La curiosidad es el motor que impulsa cada descubrimiento." />

      {/* Posts Grid */}
      <section id="posts" className="container mx-auto px-4 md:px-6 py-24">
        <div className="flex items-end justify-between mb-16">
          <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight">Últimas <br /> Publicaciones</h2>
          <p className="hidden md:block text-muted-foreground text-lg max-w-xs text-right">
            Historias seleccionadas para inspirar y reflexionar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-[minmax(400px,auto)]">
          {posts.map((post: any, index: number) => (
            <BlogCard
              key={post.slug}
              post={post}
              index={index}
              isHero={index === 0 && page === 1}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-24 flex justify-center gap-4">
          {page > 1 && (
            <Link href={`/?page=${page - 1}`} className="inline-flex h-12 items-center justify-center rounded-full border border-input bg-background px-8 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors">
              Anterior
            </Link>
          )}
          {posts.length === pageSize && (
            <Link href={`/?page=${page + 1}`} className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              Siguiente
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
