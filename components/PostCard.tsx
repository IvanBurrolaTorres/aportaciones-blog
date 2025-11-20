"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { urlFor } from "../lib/image"
import { cn } from "../lib/utils"

interface PostCardProps {
  post: {
    title: string
    slug: string
    excerpt: string
    coverImage?: any
    publishedAt?: string
    author?: { name: string }
  }
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/aportacion/${post.slug}`} className="group block h-full">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
        className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-accent/50 hover:shadow-lg"
      >
        {post.coverImage && (
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={urlFor(post.coverImage).width(600).height(400).url()}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        <div className="flex flex-1 flex-col p-6">
          <div className="mb-2 flex items-center gap-2 text-xs text-muted">
            {post.publishedAt && (
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString("es-MX", {
                  year: "numeric",
                  month: "long",
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
          <h3 className="mb-3 text-xl font-bold leading-tight tracking-tight group-hover:text-accent transition-colors">
            {post.title}
          </h3>
          <p className="line-clamp-3 text-sm text-muted leading-relaxed">
            {post.excerpt}
          </p>
          <div className="mt-auto pt-4 text-sm font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">
            Leer más →
          </div>
        </div>
      </motion.article>
    </Link>
  )
}
