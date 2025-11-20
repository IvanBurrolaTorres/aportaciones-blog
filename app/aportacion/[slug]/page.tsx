export const dynamic = 'force-dynamic'

import Image from 'next/image'
import { notFound } from 'next/navigation'
import { client } from '../../../lib/sanity.client'
import { bySlugQuery } from '../../../lib/queries'
import { urlFor } from '../../../lib/image'

type PageProps = { params: Promise<{ slug: string }> }

export default async function AportacionPage({ params }: PageProps) {
  const { slug } = await params
  if (!slug) notFound()

  const post = await client.fetch(bySlugQuery, { slug })
  if (!post) notFound()

  const { title, excerpt, coverImage } = post

  const hasImage =
    !!coverImage &&
    (coverImage.asset?._ref || coverImage.asset?._id)

  return (
    <main style={{ maxWidth: 860, margin: '32px auto', padding: '0 16px' }}>
      <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 16px' }}>{title}</h1>

      {hasImage ? (
        <Image
          src={urlFor(coverImage).width(1200).height(800).url()}
          alt={title || 'Aportación'}
          width={1200}
          height={800}
          style={{ width: '100%', height: 'auto', borderRadius: 6 }}
          priority
        />
      ) : null}

      {excerpt ? <p style={{ marginTop: 12, opacity: 0.8 }}>{excerpt}</p> : null}
    </main>
  )
}
