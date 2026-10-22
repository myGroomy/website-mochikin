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
    {
      name: 'role',
      type: 'select',
      label: 'Role Akses',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Admin (Full Access)', value: 'admin' },
        { label: 'Editor (Content Only)', value: 'editor' },
      ],
    },
  ],
  access: {
    read: () => true,
    create: () => false,
    update: (req) => {
      return (req as any).user?.role === 'admin';
    },
    delete: () => false,
  },
}

export default Users
