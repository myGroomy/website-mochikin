import type { CollectionConfig } from 'payload'


export const MenuCategories: CollectionConfig = {
  slug: 'menu-categories',
  admin: {
    useAsTitle: 'name',
    group: 'Konten Menu',
  },
  defaultSort: 'order',
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nama Kategori',
      required: true,
      unique: true,
      maxLength: 80,
    },
    {
      name: 'order',
      type: 'number',
      label: 'Urutan Tampil',
      defaultValue: 0,
      admin: {
        description: 'Angka kecil = tampil lebih dulu',
      },
    },
  ],
  access: {
    create: (req: any) => {
      return (req as any).user?.role === 'admin' || (req as any).user?.role === 'editor';
    },
    read: () => true,
    update: (req: any) => {
      return (req as any).user?.role === 'admin' || (req as any).user?.role === 'editor';
    },
  },
  hooks: {
    afterChange: [() => {}],

  },
}

export default MenuCategories
