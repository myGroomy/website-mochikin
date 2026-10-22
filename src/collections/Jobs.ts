import type { CollectionConfig } from 'payload'


export const Jobs: CollectionConfig = {
  slug: 'jobs',
  admin: {
    useAsTitle: 'title',
    group: 'Karier',
    defaultColumns: ['title', 'location', 'department', 'type', 'postedDate', '_status'],
  },
  defaultSort: '-postedDate',
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Posisi',
      required: true,
      maxLength: 120,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug (URL)',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'Hanya huruf kecil dan tanda hubung, mis. crew-outlet-bandung',
      },
    },
    {
      name: 'location',
      type: 'text',
      label: 'Lokasi',
      required: true,
      maxLength: 80,
    },
    {
      name: 'department',
      type: 'select',
      label: 'Departemen',
      required: true,
      options: ['Outlet', 'Kitchen', 'Marketing', 'Corporate'],
    },
    {
      name: 'type',
      type: 'select',
      label: 'Tipe',
      required: true,
      options: ['Full-time', 'Part-time', 'Magang'],
      defaultValue: 'Full-time',
    },
    {
      name: 'postedDate',
      type: 'date',
      label: 'Tanggal Posting',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Deskripsi',
      required: true,
      maxLength: 600,
    },
    {
      name: 'responsibilities',
      type: 'array',
      label: 'Tanggung Jawab',
      labels: { singular: 'Butir', plural: 'Butir' },
      fields: [
        {
          name: 'point',
          type: 'textarea',
          label: 'Butir',
          required: true,
          maxLength: 300,
        },
      ],
  hooks: {
    afterChange: [() => {}],

  },
},
    {
      name: 'qualifications',
      type: 'array',
      label: 'Kualifikasi',
      labels: { singular: 'Butir', plural: 'Butir' },
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
  ],
}

export default Jobs
