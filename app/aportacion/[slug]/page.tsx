export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
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

      <main className="w-full min-h-screen bg-background pb-20">
        {/* Hero Header */}
        <header className="relative w-full py-20 md:py-32 border-b border-white/10 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-muted/20" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />

          <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al inicio
            </Link>

            <div className="mb-6 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
              {publishedAt && (
                <div className="flex items-center gap-1.5">
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
                <div className="flex items-center gap-1.5">
                  <User className="h-4 w-4" />
                  <span>{author.name}</span>
                </div>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-foreground mb-6 leading-tight">
              {title}
            </h1>

            {excerpt && (
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                {excerpt}
              </p>
            )}
          </div>
        </header>

        <article className="container mx-auto max-w-3xl px-4 md:px-6 -mt-12 relative z-10">
          {/* Imagen */}
          {hasImage && (
            <div className="w-full mb-12 overflow-hidden rounded-2xl shadow-2xl border border-white/10 bg-card aspect-video relative">
              <Image
                src={urlFor(coverImage).width(1200).height(630).url()}
                alt={title || "Aportación"}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 800px"
              />
            </div>
          )}

          {/* Cuerpo del Texto (Prose) */}
          <div className="bg-background/50 backdrop-blur-sm rounded-2xl p-0 md:p-0">
            <Prose value={body} />
          </div>

          {/* Footer del post */}
          <hr className="my-12 border-border" />

          <div className="flex justify-center">
            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:scale-105 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
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
