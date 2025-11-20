import { NextResponse } from 'next/server'
import { client } from '../../lib/sanity.client'

const esc = (text: string) => {
  if (!text) return ''
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const query = `*[_type=="aportacion"] | order(publishedAt desc) [0...20] {
    title, "slug": slug.current, excerpt, publishedAt
  }`
  const items: any[] = await client.fetch(query)
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://aportaciones-blog.vercel.app'

  const xmlItems = items.map(it => `
    <item>
      <title>${esc(it.title)}</title>
      <link>${base}/aportacion/${esc(it.slug)}</link>
      <guid>${base}/aportacion/${esc(it.slug)}</guid>
      <pubDate>${new Date(it.publishedAt).toUTCString()}</pubDate>
      <description><![CDATA[${it.excerpt ?? ''}]]></description>
    </item>`).join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Aportaciones</title>
  <link>${base}</link>
  <description>Blog de Aportaciones</description>
  <language>es</language>
  ${xmlItems}
</channel>
</rss>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate'
    }
  })
}
