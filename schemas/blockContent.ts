export default {
  name: 'blockContent',
  title: 'Contenido',
  type: 'array',
  of: [
    { type: 'block' },
    { type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string', title: 'Alt' }] },
  ],
}
