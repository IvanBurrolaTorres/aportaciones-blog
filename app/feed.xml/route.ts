import {NextResponse} from 'next/server'
import {client} from '../../lib/sanity.client'

export async function GET(){
  const items:any[] = await client.fetch(`*[_type=='aportacion']|order(publishedAt desc)[0...50]{title,"slug":slug.current,excerpt,publishedAt}`)
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const esc = (s:any)=>String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
  const xmlItems = items.map(it=>`
    <item>
      <title>${esc(it.title)}</title>
      <link>${base}/aportacion/${esc(it.slug)}</link>
      <guid>${base}/aportacion/${esc(it.slug)}</guid>
      <pubDate>${new Date(it.publishedAt).toUTCString()}</pubDate>
      <description><![CDATA[${it.excerpt ?? ''}]]></description>
    </item>`).join('')
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
  <title>Aportaciones</title>
  <link>${base}</link>
  <language>es</language>
  ${xmlItems}
</channel></rss>`
  return new NextResponse(xml,{headers:{'Content-Type':'application/rss+xml; charset=utf-8'}})
}
