import type { CollectionConfig } from 'payload'


export const Promos: CollectionConfig = {
  slug: 'promos',
  admin: {
    useAsTitle: 'name',
    group: 'Konten Menu',
    defaultColumns: ['name', 'category', 'expiryDate'],
  },
  defaultSort: 'expiryDate',
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nama Promo',
      required: true,
      maxLength: 150,
    },
    {
      name: 'category',
      type: 'select',
      label: 'Kategori',
      required: true,
      options: [
        { label: 'Menu', value: 'menu' },
        { label: 'Kegiatan', value: 'kegiatan' },
        { label: 'Cashless', value: 'cashless' },
      ],
      defaultValue: 'menu',
    },
    {
      name: 'image',
      type: 'upload',
      label: 'Gambar Promo',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Deskripsi',
      required: true,
      maxLength: 400,
    },
    {
      name: 'expiryDate',
      type: 'text',
      label: 'Masa Berlaku (teks, mis. "30 November 2026")',
      required: true,
      maxLength: 60,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug (URL)',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'Hanya huruf kecil dan tanda hubung, mis. weekend-deals',
      },
    },
  ],
  hooks: {
    afterChange: [() => {}],

  },
}

export default Promos
