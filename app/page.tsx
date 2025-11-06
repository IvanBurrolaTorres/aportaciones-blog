import { client } from '../lib/sanity.client';
import { allAportacionesQuery, aportacionesCountQuery, allCategoriesQuery } from '../lib/queries';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '../lib/image';

export const revalidate = 60;

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1;
  const tipo = typeof searchParams.tipo === 'string' ? searchParams.tipo : '';
  const cat = typeof searchParams.cat === 'string' ? searchParams.cat : '';
  const pageSize = 12;
  const from = (page - 1) * pageSize;
  const to = from + pageSize;

  const filters = [];
  if (tipo) {
    filters.push(`tipo == "${tipo}"`);
  }
  if (cat) {
    filters.push(`"${cat}" in categories[]->slug.current`);
  }

  const filterStr = filters.length > 0 ? `&& ${filters.join(' && ')}` : '';

  const [aportaciones, totalAportaciones, categories] = await Promise.all([
    client.fetch(
      `*[_type == "aportacion" ${filterStr}] | order(publishedAt desc) [$from...$to] {
        _id,
        title,
        "slug": slug.current,
        "tipo": tipo,
        coverImage,
        publishedAt,
        author->{name, "slug": slug.current},
        categories[]->{title, "slug": slug.current}
      }`,
      { from, to }
    ),
    client.fetch(`count(*[_type == "aportacion" ${filterStr}])`),
    client.fetch(allCategoriesQuery),
  ]);

  const totalPages = Math.ceil(totalAportaciones / pageSize);

  return (
    <div>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
        <h1>Aportaciones</h1>
        <Link href="/studio" style={{ padding: '0.5rem 1rem', backgroundColor: '#eee', textDecoration: 'none', color: '#333' }}>Admin</Link>
      </header>

      <main style={{ padding: '1rem' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <form action="/search" method="GET" style={{ flex: 1 }}>
            <input type="search" name="q" placeholder="Buscar..." style={{ width: '100%', padding: '0.5rem' }} />
          </form>
          <form method="GET" style={{ display: 'flex', gap: '1rem' }}>
            <select name="tipo" style={{ padding: '0.5rem' }}>
              <option value="">Todos los tipos</option>
              <option value="infografico">Infográfico</option>
              <option value="resena">Reseña</option>
              <option value="articulo">Artículo</option>
              <option value="otro">Otro</option>
            </select>
            <select name="cat" style={{ padding: '0.5rem' }}>
              <option value="">Todas las categorías</option>
              {categories.map((category: any) => (
                <option key={category.slug} value={category.slug}>
                  {category.title}
                </option>
              ))}
            </select>
            <button type="submit" style={{ padding: '0.5rem 1rem' }}>Filtrar</button>
          </form>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
          {aportaciones.map((aportacion: any) => (
            <div key={aportacion._id} style={{ border: '1px solid #ccc', padding: '1rem' }}>
              <Link href={`/aportacion/${aportacion.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                {aportacion.coverImage && (
                  <Image
                    src={urlFor(aportacion.coverImage).width(600).height(400).url()}
                    alt={aportacion.title}
                    width={600}
                    height={400}
                    style={{ width: '100%', height: 'auto' }}
                  />
                )}
                <h2 style={{ marginTop: '0.5rem' }}>{aportacion.title}</h2>
                <p>{new Date(aportacion.publishedAt).toLocaleDateString()}</p>
              </Link>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          {page > 1 && <Link href={`/?page=${page - 1}`}>Anterior</Link>}
          {page < totalPages && <Link href={`/?page=${page + 1}`}>Siguiente</Link>}
        </div>
      </main>
    </div>
  );
}
