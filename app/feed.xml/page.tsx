import { client } from '../../lib/sanity.client';
import { allAportacionesQuery } from '../../lib/queries';
import RSS from 'rss';

export async function GET() {
  const feed = new RSS({
    title: 'Aportaciones Blog',
    description: 'Blog de Aportaciones',
    feed_url: `${process.env.NEXT_PUBLIC_BASE_URL}/feed.xml`,
    site_url: process.env.NEXT_PUBLIC_BASE_URL!,
    language: 'es',
  });

  const aportaciones = await client.fetch(allAportacionesQuery, { from: 0, to: 50 });

  aportaciones.forEach((aportacion: any) => {
    feed.item({
      title: aportacion.title,
      description: aportacion.excerpt,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/aportacion/${aportacion.slug}`,
      guid: aportacion._id,
      date: aportacion.publishedAt,
      author: aportacion.author.name,
    });
  });

  return new Response(feed.xml(), {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
