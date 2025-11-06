import { client } from '../lib/sanity.client';
import { searchAportacionesQuery } from '../lib/queries';
import Link from 'next/link';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const q = typeof searchParams.q === 'string' ? searchParams.q : '';
  const aportaciones = await client.fetch(searchAportacionesQuery, { q });

  return (
    <div>
      <header>
        <h1>Resultados de búsqueda para "{q}"</h1>
        <Link href="/">← Volver</Link>
      </header>

      <main>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
          {aportaciones.map((aportacion: any) => (
            <div key={aportacion._id} style={{ border: '1px solid #ccc', padding: '1rem' }}>
              <Link href={`/aportacion/${aportacion.slug}`}>
                <h2>{aportacion.title}</h2>
                <p>{new Date(aportacion.publishedAt).toLocaleDateString()}</p>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
