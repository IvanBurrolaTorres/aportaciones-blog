import {client} from '../../../lib/sanity.client'
import {bySlugQuery} from '../../../lib/queries'
import {urlFor} from '../../../lib/image'
import Image from 'next/image'
import Link from 'next/link'
import {PortableText} from '@portabletext/react'
import type {Metadata} from 'next'
export const revalidate = 60
async function fetchData(slug:string){ return client.fetch(bySlugQuery, {slug}) }
export async function generateMetadata({params}:{params:{slug:string}}): Promise<Metadata>{
  const data = await fetchData(params.slug)
  if(!data) return { title: 'Aportación no encontrada' }
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const image = data.coverImage ? urlFor(data.coverImage).width(1200).height(630).url() : undefined
  return {
    title: data.title,
    description: data.excerpt,
    openGraph: { title: data.title, description: data.excerpt, images: image ? [{url:image}] : undefined, url: `${base}/aportacion/${data.slug}` }
  }
}
export default async function Page({params}:{params:{slug:string}}){
  const data:any = await fetchData(params.slug)
  if(!data) return <main style={{padding:24}}><p>No encontrada.</p></main>
  const jsonLd:any = {
    '@context':'https://schema.org','@type':'Article',
    headline: data.title, datePublished: data.publishedAt,
    author: data.author?.name ? {"@type":"Person","name":data.author.name} : undefined
  }
  return (
    <main style={{padding:'24px',maxWidth:800,margin:'0 auto',fontFamily:'system-ui,ui-sans-serif'}}>
      <Link href="/">← Volver</Link>
      <h1>{data.title}</h1>
      <div style={{opacity:0.7, marginBottom:12}}>
        {data.publishedAt ? new Date(data.publishedAt).toLocaleDateString('es-MX') : ''}
        {data.author?.name ? ` · ${data.author.name}` : ''}
      </div>
      {data.coverImage && (
        <Image
          src={urlFor(data.coverImage).width(1200).height(800).url()}
          alt={data.title}
          width={1200} height={800}
          style={{width:'100%',height:'auto',borderRadius:8}}
        />
      )}
      <div style={{marginTop:16, lineHeight:1.6}}>
        <PortableText value={data.body}/>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}} />
    </main>
  )
}
