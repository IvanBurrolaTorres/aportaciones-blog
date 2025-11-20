export default {
  name: 'aportacion',
  type: 'document',
  title: 'Aportación',
  fields: [
    { name: 'title', type: 'string', title: 'Título', validation: (Rule:any)=>Rule.required() },
    { name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title', maxLength: 96 }, validation: (Rule:any)=>Rule.required() },
    { name: 'tipo', type: 'string', title: 'Tipo', options: { list: ['infografico','resena','articulo','otro'] } },
    { name: 'excerpt', type: 'text', title: 'Resumen', rows: 3 },
    { name: 'coverImage', type: 'image', title: 'Imagen principal', options: { hotspot: true } },
    { name: 'publishedAt', type: 'datetime', title: 'Fecha de publicación', validation: (Rule:any)=>Rule.required() },
    { name: 'author', type: 'reference', to: [{ type: 'author' }] },
    { name: 'categories', type: 'array', of: [{ type: 'reference', to: [{ type: 'category' }] }] },
    { name: 'body', type: 'blockContent', title: 'Contenido' },
  ],
  preview: { select: { title: 'title', media: 'coverImage', subtitle: 'excerpt' } },
}
