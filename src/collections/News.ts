import type { CollectionConfig } from 'payload'


export const News: CollectionConfig = {
  slug: 'news',
  admin: {
    useAsTitle: 'title',
    group: 'Konten Menu',
    defaultColumns: ['title', 'category', 'date', '_status'],
  },
  defaultSort: '-date',
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Judul',
      required: true,
      maxLength: 200,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug (URL)',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'Hanya huruf kecil dan tanda hubung, mis. event-korean-fest',
      },
    },
    {
      name: 'category',
      type: 'select',
      label: 'Kategori',
      required: true,
      options: [
        { label: 'Siaran Pers', value: 'Siaran Pers' },
        { label: 'Promo', value: 'Promo' },
        { label: 'Event', value: 'Event' },
        { label: 'CSR', value: 'CSR' },
      ],
  hooks: {
    afterChange: [() => {}],

  },
},
    {
      name: 'date',
      type: 'date',
      label: 'Tanggal',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'image',
      type: 'upload',
      label: 'Gambar Utama',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Ringkasan',
      required: true,
      maxLength: 300,
    },
    {
      name: 'body',
      type: 'richText',
      label: 'Isi Berita',
      required: true,
    },
  ],
}

export default News
