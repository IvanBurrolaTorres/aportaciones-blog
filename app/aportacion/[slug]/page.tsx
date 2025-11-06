import { client } from '../../lib/sanity.client';
import { aportacionBySlugQuery } from '../../lib/queries';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import { urlFor } from '../../lib/image';
import { Metadata } from 'next';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const aportacion = await client.fetch(aportacionBySlugQuery, {
    slug: params.slug,
  });

  if (!aportacion) {
    return {
      title: 'Aportación no encontrada',
    };
  }

  return {
    title: aportacion.title,
    description: aportacion.excerpt,
    openGraph: {
      title: aportacion.title,
      description: aportacion.excerpt,
      images: [
        {
          url: urlFor(aportacion.coverImage).width(1200).height(630).url(),
          width: 1200,
          height: 630,
          alt: aportacion.title,
        },
      ],
    },
  };
}

export default async function AportacionPage({
  params,
}: {
  params: { slug: string };
}) {
  const aportacion = await client.fetch(aportacionBySlugQuery, {
    slug: params.slug,
  });

  return (
    <article style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: aportacion.title,
            image: urlFor(aportacion.coverImage).url(),
            datePublished: aportacion.publishedAt,
            author: {
              '@type': 'Person',
              name: aportacion.author.name,
            },
          }),
        }}
      />
      <Link href="/">← Volver</Link>
      <h1>{aportacion.title}</h1>
      <p>
        {new Date(aportacion.publishedAt).toLocaleDateString()} by {aportacion.author.name}
      </p>
      <div>
        {aportacion.categories.map((category: any) => (
          <span key={category.slug} style={{ marginRight: '0.5rem', backgroundColor: '#eee', padding: '0.25rem 0.5rem' }}>
            {category.title}
          </span>
        ))}
      </div>
      {aportacion.coverImage && (
        <Image
          src={urlFor(aportacion.coverImage).width(800).height(600).url()}
          alt={aportacion.title}
          width={800}
          height={600}
          style={{ width: '100%', height: 'auto', marginTop: '1rem' }}
        />
      )}
      <div style={{ marginTop: '1rem' }}>
        <PortableText value={aportacion.body} />
      </div>
    </article>
  );
}
