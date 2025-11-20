import {NextResponse} from 'next/server'
import RSS from 'rss'
import {client} from '../lib/sanity.client'
export async function GET(){
  const items:any[] = await client.fetch(`*[_type=='aportacion']|order(publishedAt desc)[0...50]{title,"slug":slug.current,excerpt,publishedAt}`)
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const feed = new RSS({ title:'Aportaciones', site_url: base, feed_url: `${base}/feed.xml`, language:'es' })
  for(const it of items){
    feed.item({ title:it.title, url:`${base}/aportacion/${it.slug}`, date:it.publishedAt, description:it.excerpt||'' })
  }
  return new NextResponse(feed.xml({indent:true}), {headers:{'Content-Type':'application/rss+xml'}})
}
