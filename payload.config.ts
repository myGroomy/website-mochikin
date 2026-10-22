import path from 'path'
import { fileURLToPath } from 'url'

import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'

import { HeroBanners } from './src/collections/HeroBanners.ts'
import { Jobs } from './src/collections/Jobs.ts'
import { Locations } from './src/collections/Locations.ts'
import { Media } from './src/collections/Media.ts'
import { MenuCategories } from './src/collections/MenuCategories.ts'
import { MenuItems } from './src/collections/MenuItems.ts'
import { News } from './src/collections/News.ts'
import { Promos } from './src/collections/Promos.ts'
import { Users } from './src/collections/Users.ts'

import { KarierGlobal } from './src/globals/KarierGlobal.ts'
import { KomitmenGlobal } from './src/globals/KomitmenGlobal.ts'
import { OrderChannels } from './src/globals/OrderChannels.ts'
import { SiteSettings } from './src/globals/SiteSettings.ts'
import { TentangGlobal } from './src/globals/TentangGlobal.ts'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const NEXT_PUBLIC_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

const localhostOrigins = ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3111']

export default buildConfig({
  // This config helps us when we run into production, don't worry about it now
  serverURL: NEXT_PUBLIC_SITE_URL,

  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' — MOCHIKIN Admin',
    },
  },

  collections: [Media, Users, MenuCategories, MenuItems, Promos, Locations, News, Jobs, HeroBanners],

  globals: [OrderChannels, SiteSettings, TentangGlobal, KomitmenGlobal, KarierGlobal],

  editor: lexicalEditor(),

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),

  // Paths admin
  routes: {
    admin: '/admin',
    api: '/api',
  },

  cors: [...localhostOrigins, NEXT_PUBLIC_SITE_URL],
  csrf: [...localhostOrigins, NEXT_PUBLIC_SITE_URL],

  secret: process.env.PAYLOAD_SECRET || 'dev-secret-change-me',

  sharp,

  typescript: {
    outputFile: path.resolve(dirname, 'src/payload-types.ts'),
  },

  upload: {
    limits: {
      fileSize: 10000000, // 10 MB
    },
  },

  telemetry: false,
})
