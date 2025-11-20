"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
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
}

export function BlogCard({ post, index }: BlogCardProps) {
  return (
    <Link href={`/aportacion/${post.slug}`} className="group block h-full">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        whileHover={{ y: -5 }}
        className="relative flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-neutral-900 shadow-md transition-shadow duration-300 hover:shadow-xl dark:bg-neutral-900 bg-white dark:border-white/10 border-neutral-200"
      >
        {/* Image Container */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-800">
          {post.coverImage ? (
            <Image
              src={urlFor(post.coverImage).width(800).height(450).url()}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              placeholder="blur"
              blurDataURL={post.coverImage?.blurDataURL || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-neutral-800 text-neutral-500">
              <span className="text-sm">Sin imagen</span>
            </div>
          )}

          {/* Category Badge (if any) */}
          {post.categories && post.categories.length > 0 && (
            <div className="absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
              {post.categories[0].title}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-6">
          <div className="mb-3 flex items-center gap-2 text-xs font-medium text-neutral-500 dark:text-neutral-400">
            {post.publishedAt && (
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString("es-MX", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </time>
            )}
            {post.author && (
              <>
                <span>•</span>
                <span>{post.author.name}</span>
              </>
            )}
          </div>

          <h3 className="mb-3 text-xl font-bold leading-tight tracking-tight text-neutral-900 dark:text-white group-hover:text-emerald-500 transition-colors">
            {post.title}
          </h3>

          <p className="line-clamp-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            {post.excerpt}
          </p>

          {/* Footer / Read More */}
          <div className="mt-auto pt-6">
            <span className="inline-flex items-center text-sm font-semibold text-emerald-600 dark:text-emerald-500">
              Leer artículo
              <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        </div>
      </motion.article>
    </Link>
  )
}
