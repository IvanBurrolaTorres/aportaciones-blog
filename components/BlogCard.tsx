"use client"

import Image from "next/image"
import Link from "next/link"

import { urlFor } from "../lib/image"
import { cn } from "../lib/utils"

interface BlogCardProps {
  post: {
    title: string
    slug: string
    excerpt: string
    coverImage?: any
    publishedAt?: string
    author?: { name: string }
    categories?: { title: string }[]
  }
  index: number
  isHero?: boolean
}

export function BlogCard({ post, index, isHero = false }: BlogCardProps) {
  return (
    <Link href={`/aportacion/${post.slug}`} className={cn("group block h-full", isHero ? "md:col-span-2 lg:col-span-2" : "")}>
      <article
        className={cn(
          "relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-card transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1",
          isHero ? "md:flex-row" : ""
        )}
      >
        {/* Glow Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />

        {/* Image Container */}
        <div className={cn(
          "relative overflow-hidden bg-muted",
          isHero ? "w-full md:w-1/2 min-h-[300px] md:min-h-[400px]" : "aspect-[16/10] w-full"
        )}>
          {post.coverImage ? (
            <Image
              src={urlFor(post.coverImage).width(isHero ? 1600 : 800).height(isHero ? 1000 : 500).fit("crop").url()}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes={isHero ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
              placeholder="blur"
              blurDataURL={post.coverImage?.blurDataURL || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="}
              priority={isHero}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
              <span className="text-sm">Sin imagen</span>
            </div>
          )}

          {/* Category Badge */}
          {post.categories && post.categories.length > 0 && (
            <div className="absolute left-4 top-4 rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur-md border border-white/10">
              {post.categories[0].title}
            </div>
          )}
        </div>

        {/* Content */}
        <div className={cn("flex flex-1 flex-col p-6 md:p-8", isHero ? "justify-center" : "")}>
          <div className="mb-4 flex items-center gap-3 text-xs font-medium text-muted-foreground">
            {post.publishedAt && (
              <time dateTime={post.publishedAt} className="flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-primary/50" />
                {new Date(post.publishedAt).toLocaleDateString("es-MX", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            )}
            {post.author && (
              <>
                <span className="text-border">•</span>
                <span>{post.author.name}</span>
              </>
            )}
          </div>

          <h3 className={cn(
            "font-bold leading-tight tracking-tight text-foreground group-hover:text-primary transition-colors duration-300",
            isHero ? "text-3xl md:text-4xl mb-4" : "text-xl mb-3"
          )}>
            {post.title}
          </h3>

          <p className={cn(
            "text-muted-foreground leading-relaxed",
            isHero ? "text-base md:text-lg line-clamp-4" : "text-sm line-clamp-3"
          )}>
            {post.excerpt}
          </p>

          {/* Footer / Read More */}
          <div className="mt-auto pt-6 flex items-center justify-between">
            <span className="inline-flex items-center text-sm font-semibold text-primary group-hover:translate-x-1 transition-transform duration-300">
              Leer artículo
              <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
