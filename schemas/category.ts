export default {
  name: 'category',
  type: 'document',
  title: 'Categoría',
  fields: [
    { name: 'title', type: 'string', title: 'Título', validation: (Rule:any)=>Rule.required() },
    { name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title' }, validation: (Rule:any)=>Rule.required() },
  ],
}
