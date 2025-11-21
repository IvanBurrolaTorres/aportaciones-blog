export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { client } from "../../../lib/sanity.client";
import { bySlugQuery } from "../../../lib/queries";
import { urlFor } from "../../../lib/image";
import { Prose } from "../../../components/Prose"; // Asegúrate que la ruta sea correcta
import { BackToTop } from "../../../components/BackToTop"; // Asegúrate que la ruta sea correcta
import { ReadingProgress } from "../../../components/ReadingProgress"; // Asegúrate que la ruta sea correcta
import { ArrowLeft, Calendar, User } from "lucide-react";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch(bySlugQuery, { slug });

  if (!post) return { title: "Post no encontrado" };

  const ogImage = post.coverImage
    ? urlFor(post.coverImage).width(1200).height(630).url()
    : undefined;

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function AportacionPage({ params }: PageProps) {
  const { slug } = await params;
  if (!slug) notFound();

  const post = await client.fetch(bySlugQuery, { slug });
  if (!post) notFound();

  const { title, excerpt, coverImage, body, publishedAt, author } = post;
  const hasImage = !!coverImage && (coverImage.asset?._ref || coverImage.asset?._id);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    image: hasImage ? urlFor(coverImage).url() : undefined,
    datePublished: publishedAt,
    author: author?.name ? { "@type": "Person", name: author.name } : undefined,
    description: excerpt,
  };

  return (
    <>
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* --- CONTENEDOR PRINCIPAL --- */}
      {/* w-full: Ancho total */}
      {/* min-h-screen: Altura mínima */}
      {/* bg-background: Asegura color de fondo correcto */}
      <main className="w-full min-h-screen bg-background">
        
        {/* --- ARTÍCULO CENTRADO --- */}
        {/* max-w-3xl: Ancho máximo de lectura (aprox 768px) */}
        {/* mx-auto: CENTRADO AUTOMÁTICO HORIZONTAL */}
        {/* px-6: PADDING LATERAL OBLIGATORIO (Evita bordes pegados en móvil) */}
        {/* py-12: Espaciado vertical */}
        <article className="container mx-auto max-w-3xl px-6 py-12 md:py-20">
          
          {/* Botón Volver */}
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-accent transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>

          {/* Header */}
          <header className="flex flex-col items-center text-center mb-10">
            <div className="mb-4 flex flex-wrap items-center justify-center gap-4 text-sm text-muted">
              {publishedAt && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={publishedAt}>
                    {new Date(publishedAt).toLocaleDateString("es-MX", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
              )}
              {author?.name && (
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{author.name}</span>
                </div>
              )}
            </div>
            
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl mb-6 text-text">
              {title}
            </h1>
            
            {excerpt && (
              <p className="max-w-2xl text-lg text-muted">
                {excerpt}
              </p>
            )}
          </header>

          {/* Imagen */}
          {hasImage && (
            <div className="w-full mb-12 overflow-hidden rounded-xl shadow-lg bg-card">
              <Image
                src={urlFor(coverImage).width(1200).height(630).url()}
                alt={title || "Aportación"}
                width={1200}
                height={630}
                priority
                className="w-full h-auto object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 800px"
              />
            </div>
          )}

          {/* Cuerpo del Texto (Prose) */}
          {/* Al estar dentro del article con px-6, ya no tocará los bordes */}
          <div className="w-full">
            <Prose value={body} />
          </div>

          {/* Footer del post */}
          <hr className="my-12 border-border" />
          
          <div className="flex justify-center">
            <Link
              href="/"
              className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Leer más artículos
            </Link>
          </div>

        </article>
      </main>

      <BackToTop />
    </>
  );
}
