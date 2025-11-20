import {client} from '../../../lib/sanity.client'
import {bySlugQuery} from '../../../lib/queries'
import {urlFor} from '../../../lib/image'
import Image from 'next/image'
import {notFound} from 'next/navigation'

export const dynamic = 'force-dynamic' // SSR estable (alternativa: export const revalidate = 60)

type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function AportacionPage({ params }: PageProps) {
  const { slug } = await params
  if (!slug || typeof slug !== 'string') notFound()

  const post = await client.fetch(bySlugQuery, { slug })
  if (!post) notFound()

  const { title, excerpt, coverImage } = post

  return (
    <main style={{maxWidth:860, margin:'32px auto', padding:'0 16px'}}>
      <h1 style={{fontSize:32, fontWeight:800, margin:'0 0 16px'}}>{title}</h1>

      {coverImage ? (
        <Image
          src={urlFor(coverImage).width(1200).height(800).url()}
          alt={title}
          width={1200}
          height={800}
          style={{width:'100%',height:'auto',borderRadius:6}}
        />
      ) : null}

      {excerpt ? <p style={{marginTop:12, opacity:.8}}>{excerpt}</p> : null}
    </main>
  )
}
