import type { GlobalConfig } from 'payload'

export const KomitmenGlobal: GlobalConfig = {
  slug: 'komitmen-global',
  label: 'Halaman: Komitmen',
  admin: {
    group: 'Halaman',
    description: 'Konten halaman /komitmen: pilar, langkah kualitas, sertifikasi, program komunitas, dan dampak.',
  },
  fields: [
    {
      name: 'pillars',
      type: 'array',
      label: 'Pilar Komitmen',
      labels: { singular: 'Pilar', plural: 'Pilar' },
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
          maxLength: 500,
        },
        {
          name: 'icon',
          type: 'text',
          label: 'Emoji Ikon',
          maxLength: 20,
          admin: {
            description: 'Mis. 🥇 — fallback: ikon bawaan UI',
          },
        },
      ],
    },
    {
      name: 'qualitySteps',
      type: 'array',
      label: 'Langkah Jaminan Kualitas',
      labels: { singular: 'Langkah', plural: 'Langkah' },
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
          maxLength: 400,
        },
      ],
    },
    {
      name: 'certifications',
      type: 'array',
      label: 'Sertifikasi (kartu status)',
      labels: { singular: 'Sertifikasi', plural: 'Sertifikasi' },
      admin: {
        description: 'Catatan status ditampilkan apa adanya — jangan isi angka/klaim yang belum terverifikasi',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Nama',
          required: true,
          maxLength: 120,
        },
        {
          name: 'note',
          type: 'text',
          label: 'Catatan Status',
          maxLength: 200,
        },
      ],
    },
    {
      name: 'communityPrograms',
      type: 'array',
      label: 'Program Komunitas & Keberlanjutan',
      labels: { singular: 'Program', plural: 'Program' },
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
          maxLength: 400,
        },
      ],
    },
    {
      name: 'impactStats',
      type: 'array',
      label: 'Angka Dampak',
      labels: { singular: 'Statistik', plural: 'Statistik' },
      admin: {
        description: '⚠️ Ganti placeholder "XX" dengan angka riil yang bisa dipertanggungjawabkan',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          required: true,
          maxLength: 80,
        },
        {
          name: 'value',
          type: 'text',
          label: 'Nilai',
          required: true,
          maxLength: 40,
        },
      ],
    },
  ],
}

export default KomitmenGlobal
