export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { client } from "../../../lib/sanity.client";
import { bySlugQuery } from "../../../lib/queries";
import { urlFor } from "../../../lib/image";
import { Prose } from "../../../components/Prose";
import { BackToTop } from "../../../components/BackToTop";
import { ReadingProgress } from "../../../components/ReadingProgress";
import { ArrowLeft, Calendar, User } from "lucide-react";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch(bySlugQuery, { slug });

  if (!post) {
    return {
      title: "Post no encontrado",
    };
  }

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

  const hasImage =
    !!coverImage && (coverImage.asset?._ref || coverImage.asset?._id);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    image: hasImage ? urlFor(coverImage).url() : undefined,
    datePublished: publishedAt,
    author: author?.name
      ? {
          "@type": "Person",
          name: author.name,
        }
      : undefined,
    description: excerpt,
  };

  return (
    <>
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* CORRECCIÓN: Estructura simplificada para garantizar centrado */}
      <article className="min-h-screen w-full py-10 md:py-16">
        {/* Contenedor principal centrado */}
        <div className="container mx-auto w-full px-4">
          
          {/* Botón Volver */}
          <div className="mx-auto max-w-[65ch]">
            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-accent transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al inicio
            </Link>
          </div>

          {/* Header del Artículo */}
          <header className="mx-auto mb-10 max-w-3xl text-center">
            <div className="mb-4 flex items-center justify-center gap-4 text-sm text-muted">
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
            <h1 className="mb-6 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              {title}
            </h1>
            {excerpt && (
              <p className="mx-auto max-w-2xl text-lg text-muted">
                {excerpt}
              </p>
            )}
          </header>

          {/* Imagen Principal */}
          {hasImage && (
            <div className="mx-auto mb-12 max-w-4xl overflow-hidden rounded-xl shadow-lg">
              <Image
                src={urlFor(coverImage).width(1200).height(630).url()}
                alt={title || "Aportación"}
                width={1200}
                height={630}
                priority
                className="w-full object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 800px"
              />
            </div>
          )}

          {/* Cuerpo del artículo */}
          {/* El centrado lo maneja internamente Prose con mx-auto */}
          <Prose value={body} />

          <hr className="my-12 border-border mx-auto max-w-[65ch]" />

          <div className="flex justify-center">
            <Link
              href="/"
              className="rounded-full bg-card px-8 py-3 text-sm font-medium transition-colors hover:bg-accent hover:text-white"
            >
              Leer más artículos
            </Link>
          </div>
        </div>
      </article>

      <BackToTop />
    </>
  );
}
