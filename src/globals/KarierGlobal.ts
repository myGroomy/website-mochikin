import type { GlobalConfig } from 'payload'

export const KarierGlobal: GlobalConfig = {
  slug: 'karier-global',
  label: 'Halaman: Karier',
  admin: {
    group: 'Halaman',
    description: 'Konten halaman /karier: benefit kerja, alur rekrutmen, FAQ, dan email HR.',
  },
  fields: [
    {
      name: 'benefits',
      type: 'array',
      label: 'Benefit Kerja',
      labels: { singular: 'Benefit', plural: 'Benefit' },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Judul',
          required: true,
          maxLength: 120,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Deskripsi',
          required: true,
          maxLength: 300,
        },
      ],
    },
    {
      name: 'recruitmentSteps',
      type: 'array',
      label: 'Alur Rekrutmen',
      labels: { singular: 'Tahap', plural: 'Tahap' },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Nama Tahap',
          required: true,
          maxLength: 80,
        },
      ],
    },
    {
      name: 'faqs',
      type: 'array',
      label: 'FAQ',
      labels: { singular: 'FAQ', plural: 'FAQ' },
      fields: [
        {
          name: 'question',
          type: 'text',
          label: 'Pertanyaan',
          required: true,
          maxLength: 200,
        },
        {
          name: 'answer',
          type: 'textarea',
          label: 'Jawaban',
          required: true,
          maxLength: 500,
        },
      ],
    },
    {
      name: 'hrEmail',
      type: 'email',
      label: 'Email HR (tujuan lamaran)',
    },
  ],
  access: {
    read: () => true,
    update: (req) => {
      return (req as any).user?.role === 'admin' || (req as any).user?.role === 'editor';
    },
  },
  hooks: {
    afterChange: [() => {}],

  },
}
export default KarierGlobal
