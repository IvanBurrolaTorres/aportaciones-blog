import { client } from '../lib/sanity.client';
import { groq } from 'next-sanity';

const aportacionesSitemapQuery = groq`
  *[_type == "aportacion"]{
    "slug": slug.current,
    publishedAt
  }
`;

export default async function sitemap() {
  const aportaciones = await client.fetch(aportacionesSitemapQuery);

  const aportacionesUrls = aportaciones.map((aportacion: any) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/aportacion/${aportacion.slug}`,
    lastModified: aportacion.publishedAt,
  }));

  return [
    {
      url: process.env.NEXT_PUBLIC_BASE_URL,
      lastModified: new Date(),
    },
    ...aportacionesUrls,
  ];
}
