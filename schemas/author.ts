export default {
  name: 'author',
  type: 'document',
  title: 'Autor',
  fields: [
    { name: 'name', type: 'string', title: 'Nombre', validation: (Rule:any)=>Rule.required() },
    { name: 'bio', type: 'text', title: 'Bio' },
    { name: 'image', type: 'image', title: 'Foto', options: { hotspot: true } },
  ],
}
