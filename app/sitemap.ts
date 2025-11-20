import {client} from '../lib/sanity.client'
export default async function sitemap(){
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const posts:any[] = await client.fetch(`*[_type=='aportacion']{ "slug": slug.current, publishedAt }`)
  return [
    { url: `${base}/`, lastModified: new Date().toISOString() },
    ...posts.map(p=>({ url:`${base}/aportacion/${p.slug}`, lastModified: p.publishedAt }))
  ]
}
