import type { GlobalConfig } from 'payload'

export const OrderChannels: GlobalConfig = {
  slug: 'order-channels',
  label: 'Channel Pemesanan',
  admin: {
    group: 'Pengaturan',
    description: 'Link & nomor yang dipakai semua tombol pesan (halaman /order, /cara-pesan, tombol mengapung).',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'WhatsApp',
          fields: [
            {
              name: 'whatsappNumber',
              type: 'text',
              label: 'Nomor WhatsApp (format internasional tanpa +)',
              required: true,
              maxLength: 20,
              admin: {
                description: 'Contoh: 628111002000',
              },
            },
            {
              name: 'whatsappPesan',
              type: 'textarea',
              label: 'Pesan Awal Chat',
              maxLength: 200,
              admin: {
                description: 'Otomatis terisi saat pelanggan membuka chat, mis. "Halo MOCHIKIN, saya ingin memesan..."',
              },
            },
          ],
        },
        {
          label: 'Aplikasi Pesan-Antara',
          fields: [
            {
              name: 'gofoodLink',
              type: 'text',
              label: 'Link GoFood',
              required: true,
              maxLength: 300,
            },
            {
              name: 'grabfoodLink',
              type: 'text',
              label: 'Link GrabFood',
              required: true,
              maxLength: 300,
            },
            {
              name: 'shopeefoodLink',
              type: 'text',
              label: 'Link ShopeeFood',
              required: true,
              maxLength: 300,
            },
          ],
        },
        {
          label: 'Aplikasi MOCHIKIN',
          fields: [
            {
              name: 'appLink',
              type: 'text',
              label: 'Link Aplikasi MOCHIKIN',
              maxLength: 300,
              admin: {
                description: 'Kosongkan/diisi # bila aplikasi belum rilis',
              },
            },
          ],
        },
      ],
    },
  ],
  
  hooks: {
    afterChange: [() => {}],

  },
}
export default OrderChannels
