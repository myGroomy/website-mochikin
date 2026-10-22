import type { CollectionConfig } from 'payload'


export const HeroBanners: CollectionConfig = {
  slug: 'hero-banners',
  admin: {
    useAsTitle: 'title',
    group: 'Beranda',
    defaultColumns: ['title', 'link', 'order'],
  },
  defaultSort: 'order',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Judul Banner',
      required: true,
      maxLength: 120,
    },
    {
      name: 'link',
      type: 'text',
      label: 'Tautan Saat Diklik',
      required: true,
      defaultValue: '/promo',
      maxLength: 200,
    },
    {
      name: 'imageDesktop',
      type: 'upload',
      label: 'Gambar Desktop',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'imageMobile',
      type: 'upload',
      label: 'Gambar Mobile',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'order',
      type: 'number',
      label: 'Urutan Slide',
      defaultValue: 0,
    },
  ],
  hooks: {
    afterChange: [() => {}],

  },
}

export default HeroBanners
