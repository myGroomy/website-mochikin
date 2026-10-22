import type { CollectionConfig } from 'payload'

export const Locations: CollectionConfig = {
  slug: 'locations',
  admin: {
    useAsTitle: 'name',
    group: 'Konten Menu',
    defaultColumns: ['name', 'city', 'phone', 'hours'],
  },
  defaultSort: 'order',
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nama Outlet',
      required: true,
      maxLength: 120,
    },
    {
      name: 'city',
      type: 'text',
      label: 'Kota',
      required: true,
      maxLength: 80,
    },
    {
      name: 'address',
      type: 'textarea',
      label: 'Alamat Lengkap',
      required: true,
      maxLength: 300,
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Telepon',
      required: true,
      maxLength: 40,
    },
    {
      name: 'hours',
      type: 'text',
      label: 'Jam Operasional (mis. "24 Jam")',
      required: true,
      maxLength: 60,
    },
    {
      name: 'services',
      type: 'array',
      label: 'Layanan',
      labels: { singular: 'Layanan', plural: 'Layanan' },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Nama Layanan',
          required: true,
          maxLength: 60,
        },
      ],
    },
    {
      name: 'order',
      type: 'number',
      label: 'Urutan Tampil',
      defaultValue: 0,
    },
  ],
}

export default Locations
