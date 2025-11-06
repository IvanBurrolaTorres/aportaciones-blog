import { groq } from 'next-sanity';

export const allAportacionesQuery = groq`
  *[_type == "aportacion"] | order(publishedAt desc) [$from...$to] {
    _id,
    title,
    "slug": slug.current,
    "tipo": tipo,
    coverImage,
    publishedAt,
    author->{name, "slug": slug.current},
    categories[]->{title, "slug": slug.current}
  }
`;

export const aportacionBySlugQuery = groq`
  *[_type == "aportacion" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    "tipo": tipo,
    coverImage,
    publishedAt,
    author->{name, "slug": slug.current},
    categories[]->{title, "slug": slug.current},
    body
  }
`;

export const searchAportacionesQuery = groq`
  *[_type == "aportacion" && (title match $q || excerpt match $q || pt::text(body) match $q)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    "tipo": tipo,
    coverImage,
    publishedAt,
    author->{name, "slug": slug.current},
    categories[]->{title, "slug": slug.current}
  }
`;

export const aportacionesCountQuery = groq`
  count(*[_type == "aportacion"])
`;

export const allCategoriesQuery = groq`
  *[_type == "category"]{
    title,
    "slug": slug.current
  }
`;
