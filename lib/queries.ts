export const PAGE_SIZE = 12

export const listQuery = `
*[_type=="aportacion"] | order(publishedAt desc) [$from...$to]{
  title,"slug":slug.current,excerpt,coverImage,publishedAt,tipo,
  "author": author->{name},
  "categories": categories[]-> {title}
}`

export const bySlugQuery = `
*[_type=="aportacion" && slug.current==$slug][0]{
  title,"slug":slug.current,excerpt,coverImage,publishedAt,tipo,
  "author": author->{name},
  "categories": categories[]-> {title},
  body
}`
