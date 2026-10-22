import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Pengaturan Situs',
  admin: {
    group: 'Pengaturan',
    description: 'Identitas brand, kontak, sosial media, dan SEO default untuk seluruh situs.',
  },
  fields: [
    {
      name: 'tagline',
      type: 'text',
      label: 'Tagline',
      required: true,
      maxLength: 80,
    },
    {
      name: 'deskripsi',
      type: 'textarea',
      label: 'Deskripsi Singkat Brand',
      required: true,
      maxLength: 300,
      admin: {
        description: 'Dipakai untuk footer, metadata default, dan teks pengantar',
      },
    },
    {
      name: 'kontakEmail',
      type: 'email',
      label: 'Email Kontak Umum',
    },
    {
      name: 'kontakTelepon',
      type: 'text',
      label: 'Telepon Kontak Umum',
      maxLength: 40,
    },
    {
      name: 'alamatKantor',
      type: 'textarea',
      label: 'Alamat Kantor Pusat',
      maxLength: 300,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Sosial Media',
          fields: [
            {
              name: 'instagram',
              type: 'text',
              label: 'URL Instagram',
              maxLength: 300,
            },
            {
              name: 'facebook',
              type: 'text',
              label: 'URL Facebook',
              maxLength: 300,
            },
            {
              name: 'twitter',
              type: 'text',
              label: 'URL X / Twitter',
              maxLength: 300,
            },
            {
              name: 'youtube',
              type: 'text',
              label: 'URL YouTube',
              maxLength: 300,
            },
            {
              name: 'tiktok',
              type: 'text',
              label: 'URL TikTok',
              maxLength: 300,
            },
          ],
        },
        {
          label: 'SEO Default',
          fields: [
            {
              name: 'seoTitle',
              type: 'text',
              label: 'Judul SEO Default (tanpa nama brand)',
              maxLength: 120,
            },
            {
              name: 'seoDeskripsi',
              type: 'textarea',
              label: 'Deskripsi SEO Default',
              maxLength: 300,
            },
            {
              name: 'mediaKitLink',
              type: 'text',
              label: 'Link Media Kit / Brand Guidelines',
              maxLength: 300,
              admin: {
                description: 'Untuk halaman newsroom (hubungi pers)',
              },
            },
          ],
        },
      ],
    },
  ],
  
  access: {
    read: () => true,
    update: (req) => {
      return (req as any).user?.role === 'admin';
    },
  },
  hooks: {
    afterChange: [() => {}],

  },
}
export default SiteSettings
