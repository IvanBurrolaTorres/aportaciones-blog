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

        <article className="container mx-auto max-w-4xl px-4 md:px-6 relative z-10 pb-24">
          {/* Editorial Header */}
          <header className="flex flex-col items-center text-center py-16 md:py-24 space-y-8">
            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center justify-center gap-2 text-sm font-medium tracking-wider uppercase text-primary">
                {post.categories && post.categories.length > 0 && (
                  <span>{post.categories[0].title}</span>
                )}
                {post.publishedAt && (
                  <>
                    <span className="text-muted-foreground">•</span>
                    <time dateTime={post.publishedAt} className="text-muted-foreground">
                      {new Date(post.publishedAt).toLocaleDateString("es-MX", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </>
                )}
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-foreground leading-[1.1]">
                {post.title}
              </h1>

              {post.excerpt && (
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                  {post.excerpt}
                </p>
              )}
            </div>

            {post.author && (
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-muted border border-border overflow-hidden">
                  {/* Placeholder for author image if available */}
                  <div className="w-full h-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    {post.author.name.charAt(0)}
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-foreground">{post.author.name}</p>
                  <p className="text-xs text-muted-foreground">Autor</p>
                </div>
              </div>
            )}
          </header>

          {/* Hero Image with Grain */}
          {post.coverImage && (
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl mb-16 group">
              <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay z-10 pointer-events-none" />
              <Image
                src={urlFor(post.coverImage).width(1200).height(675).url()}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
            </div>
          )}

          {/* Cuerpo del Texto (Prose) */}
          <div className="prose-container max-w-none">
            <Prose value={body} className="mx-auto" />
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
