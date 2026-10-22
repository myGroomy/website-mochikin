import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    group: 'Pengaturan',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nama',
    },
  ],
}

export default Users
