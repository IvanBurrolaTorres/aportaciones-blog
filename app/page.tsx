import {client} from '../lib/sanity.client'
import {urlFor} from '../lib/image'
import Image from 'next/image'
import Link from 'next/link'
import {listQuery, PAGE_SIZE} from '../lib/queries'

export const revalidate = 60

export default async function Home(
  { searchParams }: { searchParams?: { page?: string } }
){
  const page = Number((searchParams?.page ?? '1'))
  const from = (page - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE

  const data:any[] = await client.fetch(listQuery, { from, to })

  return (
    <main style={{padding:'24px',maxWidth:900,margin:'0 auto',fontFamily:'system-ui,ui-sans-serif'}}>
      <h1 style={{marginBottom:16}}>Aportaciones</h1>
      <ul style={{listStyle:'none',padding:0,display:'grid',gap:16}}>
        {data.map((p:any)=>(
          <li key={p.slug} style={{border:'1px solid #eee',borderRadius:8,padding:16}}>
            <Link href={`/aportacion/${p.slug}`} style={{textDecoration:'none',color:'inherit'}}>
              <div style={{fontSize:20,fontWeight:600,marginBottom:8}}>{p.title}</div>
              <div style={{opacity:0.7, marginBottom:8}}>
                {p.publishedAt ? new Date(p.publishedAt).toLocaleDateString('es-MX') : ''}
                {p.author?.name ? ` · ${p.author.name}` : ''}
              </div>
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
