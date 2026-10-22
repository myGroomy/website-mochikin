import type { GlobalConfig } from 'payload'

export const TentangGlobal: GlobalConfig = {
  slug: 'tentang-global',
  label: 'Halaman: Tentang Kami',
  admin: {
    group: 'Halaman',
    description: 'Konten halaman /tentang: cerita, visi-misi, nilai, timeline, tim, dan filosofi logo.',
  },
  fields: [
    {
      name: 'story',
      type: 'array',
      label: 'Paragraf Cerita Kami',
      labels: { singular: 'Paragraf', plural: 'Paragraf' },
      fields: [
        {
          name: 'paragraph',
          type: 'textarea',
          label: 'Paragraf',
          required: true,
          maxLength: 800,
        },
      ],
    },
    {
      name: 'storyImage',
      type: 'upload',
      label: 'Foto Saat Cerita',
      relationTo: 'media',
    },
    {
      name: 'vision',
      type: 'textarea',
      label: 'Visi',
      maxLength: 300,
    },
    {
      name: 'mission',
      type: 'array',
      label: 'Misi',
      labels: { singular: 'Butir Misi', plural: 'Butir Misi' },
      fields: [
        {
          name: 'point',
          type: 'textarea',
          label: 'Butir',
          required: true,
          maxLength: 300,
        },
      ],
    },
    {
      name: 'values',
      type: 'array',
      label: 'Nilai Brand',
      labels: { singular: 'Nilai', plural: 'Nilai' },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Judul',
          required: true,
          maxLength: 80,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Deskripsi',
          required: true,
          maxLength: 300,
        },
        {
          name: 'icon',
          type: 'text',
          label: 'Emoji Ikon',
          maxLength: 10,
          admin: {
            description: 'Mis. 💛 — fallback: ikon bawaan UI',
          },
        },
      ],
    },
    {
      name: 'timeline',
      type: 'array',
      label: 'Perjalanan (Timeline)',
      labels: { singular: 'Milestone', plural: 'Milestone' },
      fields: [
        {
          name: 'year',
          type: 'text',
          label: 'Tahun',
          required: true,
          maxLength: 10,
        },
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
      name: 'team',
      type: 'array',
      label: 'Tim Pimpinan',
      labels: { singular: 'Anggota', plural: 'Anggota' },
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Nama',
          required: true,
          maxLength: 120,
        },
        {
          name: 'role',
          type: 'text',
          label: 'Jabatan',
          required: true,
          maxLength: 120,
        },
        {
          name: 'photo',
          type: 'upload',
          label: 'Foto',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'logoPhilosophy',
      type: 'textarea',
      label: 'Filosofi Logo & Maskot',
      maxLength: 800,
    },
  ],
}

export default TentangGlobal
