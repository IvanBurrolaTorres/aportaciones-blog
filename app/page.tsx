import {client} from '../lib/sanity.client'
import {urlFor} from '../lib/image'
import Image from 'next/image'
import Link from 'next/link'
import {listQuery, PAGE_SIZE} from '../lib/queries'
export const revalidate = 60
export default async function Home({searchParams}:{searchParams:{page?:string}}){
  const page = Number(searchParams?.page || '1')
  const from = (page-1)*PAGE_SIZE
  const to = from + PAGE_SIZE
  const data:any[] = await client.fetch(listQuery, {from, to})
  return (
    <main style={{padding:'24px',maxWidth:1000,margin:'0 auto',fontFamily:'system-ui,ui-sans-serif'}}>
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
        <h1 style={{margin:0}}>Aportaciones</h1>
        <Link href="/studio">Admin (Studio)</Link>
      </header>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(260px,1fr))', gap:16}}>
        {data?.map((p:any)=>(
          <Link key={p.slug} href={`/aportacion/${p.slug}`} style={{textDecoration:'none',color:'inherit'}}>
            <article style={{border:'1px solid #e5e7eb',borderRadius:8,overflow:'hidden'}}>
              {p.coverImage && (
                <Image
                  src={urlFor(p.coverImage).width(600).height(400).url()}
                  alt={p.title}
                  width={600} height={400}
                  style={{width:'100%',height:'auto'}}
                />
              )}
              <div style={{padding:12}}>
                <h3 style={{margin:'0 0 6px 0',fontSize:18}}>{p.title}</h3>
                <div style={{opacity:.7,fontSize:14}}>
                  {p.publishedAt ? new Date(p.publishedAt).toLocaleDateString('es-MX') : ''}
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
      <nav style={{display:'flex',gap:8,justifyContent:'center',marginTop:20}}>
        <Link href={`/?page=${Math.max(1, page-1)}`} aria-disabled={page<=1} style={{pointerEvents: page<=1 ? 'none':'auto', opacity: page<=1? .4:1}}>← Anterior</Link>
        <Link href={`/?page=${page+1}`}>Siguiente →</Link>
      </nav>
    </main>
  )
}
