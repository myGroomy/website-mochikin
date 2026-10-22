import path from 'path'
import { fileURLToPath } from 'url'

import type { CollectionConfig } from 'payload'


const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'alt',
    group: 'Media',
  },
  upload: {
    // Local disk (fase awal) — folder /media di root repo
    staticDir: path.resolve(dirname, '../../media'),
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 320,
        height: 320,
        position: 'centre',
      },
      {
        name: 'card',
        width: 800,
        height: 800,
        position: 'centre',
      },
    ],
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Alt Text (deskripsi gambar untuk SEO & aksesibilitas)',
    },
  ],
  hooks: {
    afterChange: [() => {}],

  },
}

export default Media
