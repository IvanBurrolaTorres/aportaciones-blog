import Image from 'next/image'
import Link from 'next/link'
import {client} from '../lib/sanity.client'
import {urlFor} from '../lib/image'
import {listQuery, PAGE_SIZE} from '../lib/queries'

export const revalidate = 300

type SP = Record<string, string | string[]> | URLSearchParams
function getPage(sp: SP | undefined): number {
  if (!sp) return 1
  if (typeof (sp as any).get === 'function') {
    const v = (sp as URLSearchParams).get('page') || '1'
    const n = Number(v)
    return Number.isFinite(n) && n > 0 ? n : 1
  }
  const raw = (sp as Record<string, any>).page ?? '1'
  const v = Array.isArray(raw) ? raw[0] : raw
  const n = Number(v ?? '1')
  return Number.isFinite(n) && n > 0 ? n : 1
}

export default async function Home(props: { searchParams: Promise<SP> | SP }) {
  const sp = typeof (props.searchParams as any)?.then === 'function'
    ? await (props.searchParams as Promise<SP>)
    : (props.searchParams as SP)

  const page = getPage(sp)
  const from = (page - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE

  let posts: any[] = []
  try {
    posts = await client.fetch(listQuery, { from, to })
  } catch {
    posts = []
  }

  return (
    <main style={{maxWidth:960, margin:'32px auto', padding:'0 16px'}}>
      <h1 style={{fontSize:28, fontWeight:700, margin:'0 0 16px'}}>Aportaciones</h1>
      {posts.length === 0 && (
        <p style={{opacity:.8}}>Aún no hay aportaciones publicadas.</p>
      )}
      <ul style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:16, listStyle:'none', padding:0, margin:0}}>
        {posts.map((p:any) => (
          <li key={p.slug}>
            <Link href={`/aportacion/${p.slug}`} style={{textDecoration:'none', color:'inherit', display:'block'}}>
              <h2 style={{fontSize:18, margin:'0 0 8px'}}>{p.title}</h2>
              {p.coverImage && (
                <Image
                  src={urlFor(p.coverImage).width(1200).height(800).url()}
                  alt={p.title}
                  width={1200}
                  height={800}
                  style={{width:'100%',height:'auto',borderRadius:6}}
                />
              )}
              <p style={{marginTop:8,opacity:.8}}>{p.excerpt ?? ''}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
