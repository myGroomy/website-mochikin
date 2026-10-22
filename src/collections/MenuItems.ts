import type { CollectionConfig } from 'payload'

export const MenuItems: CollectionConfig = {
  slug: 'menu-items',
  admin: {
    useAsTitle: 'name',
    group: 'Konten Menu',
    defaultColumns: ['name', 'menuCategory', 'price', 'isFeatured'],
  },
  defaultSort: 'order',
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nama Menu',
      required: true,
      maxLength: 120,
    },
    {
      name: 'menuCategory',
      type: 'relationship',
      label: 'Kategori',
      relationTo: 'menu-categories',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      label: 'Foto Menu',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'imageCard',
      type: 'upload',
      label: 'Foto Kartu Favorit (opsional)',
      relationTo: 'media',
      admin: {
        description: 'Foto alternatif untuk kartu "Menu Favorit" di beranda, bila berbeda dengan foto halaman menu',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Deskripsi',
      required: true,
      maxLength: 400,
    },
    {
      name: 'price',
      type: 'text',
      label: 'Harga (teks, mis. "Rp 41.500")',
      maxLength: 30,
    },
    {
      name: 'calories',
      type: 'text',
      label: 'Kalori (teks, mis. "550 kkal")',
      maxLength: 30,
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      label: 'Ditampilkan di "Menu Favorit" (beranda)',
      defaultValue: false,
    },
    {
      name: 'isSpicy',
      type: 'checkbox',
      label: 'Berpedas',
      defaultValue: false,
    },
    {
      name: 'order',
      type: 'number',
      label: 'Urutan Tampil',
      defaultValue: 0,
    },
  ],
}

export default MenuItems
