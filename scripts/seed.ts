/**
 * Seeder idempotent — isi CMS dari data statis `src/data/*`.
 * Jalankan: npx payload run scripts/seed.ts --disable-transpile
 * (atau `npm run seed`)
 *
 * Aturan:
 * - Dokumen yang SUDAH ADA di CMS menang (tolak admin tidak ditimpa).
 *   Seeder hanya membuat dokumen yang belum ada, berdasarkan kunci:
 *   media → filename, kategori/menu/lnews/resto/banner → nama/slug.
 * - Globals hanya diisi jika masih kosong (belum pernah diedit admin).
 * - Teks diambil verbatim dari file data/halaman — tidak ada fakta baru
 *   yang dikarang; placeholder "(TODO)" dipertahankan apa adanya.
 */
import path from 'node:path'

import config from '../payload.config.ts'
import { getPayload } from 'payload'
import type { Config } from 'payload'

import {
  ALL_MENU_ITEMS,
  FAVORITE_MENU,
  HERO_BANNERS,
  MENU_CATEGORIES,
  PROMOS_DATA,
  RESTAURANT_LOCATIONS,
} from '../src/data/mochikinData.ts'
import {
  BRAND_VALUES,
  CAREER_FAQ,
  COMMITMENT_PILLARS,
  IMPACT_STATS,
  JOB_ITEMS,
  NEWS_ITEMS,
  RECRUITMENT_STEPS,
  TEAM_MEMBERS,
  TIMELINE_MILESTONES,
} from '../src/data/pagesData.ts'
import type { News } from '../src/payload-types.ts'

const payload = await getPayload({ config })

// Antarmuka longgar: tipe generik payload.create/find tidak bisa memuaskan data
// literal hasil kompilasi file data statis — validasi tetap berjalan di runtime.
const db = payload as unknown as {
  find: (opts: Record<string, unknown>) => Promise<{ docs: Array<{ id: number } & Record<string, unknown>> }>
  create: (opts: Record<string, unknown>) => Promise<{ id: number } & Record<string, unknown>>
  update: (opts: Record<string, unknown>) => Promise<unknown>
  findGlobal: (opts: Record<string, unknown>) => Promise<Record<string, unknown>>
  updateGlobal: (opts: Record<string, unknown>) => Promise<unknown>
}

/* ---------------------------------- util ---------------------------------- */

const assetFile = (relPath: string) => path.join(process.cwd(), 'public', relPath)

async function findDoc(collection: string, field: string, value: string) {
  const res = await db.find({
    collection,
    where: { [field]: { equals: value } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })
  return res.docs[0] ?? null
}

/** Upload-in atau temukan media berdasarkan nama file asli */
async function upsertMedia(srcPath: string, alt: string) {
  const base = path.basename(srcPath)
  const existing = await findDoc('media', 'filename', base)
  if (existing) return existing
  return db.create({
    collection: 'media',
    data: { alt },
    filePath: assetFile(srcPath),
    overrideAccess: true,
  })
}

/** Konversi array paragraf → dokumen Lexical richText minimal */
function lexical(paragraphs: string[]) {
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: null,
      children: paragraphs.map((text) => ({
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        direction: null,
        children: [
          {
            type: 'text',
            text,
            version: 1,
            format: 0,
            detail: 0,
            mode: 'normal',
            style: '',
            bold: false,
            italic: false,
            underline: false,
          },
        ],
      })),
    },
  }
}

/* ------------------------------- collections ------------------------------- */

// 1. Kategori menu
const categoryIds = new Map<string, number>()
for (const [i, name] of MENU_CATEGORIES.entries()) {
  const existing = await findDoc('menu-categories', 'name', name)
  if (existing) {
    categoryIds.set(name, Number(existing.id))
  } else {
    const doc = await db.create({
      collection: 'menu-categories',
      data: { name, order: i },
      overrideAccess: true,
    })
    categoryIds.set(name, Number(doc.id))
  }
}
console.log(`✔ menu-categories: ${categoryIds.size}`)

// 2. Menu items — iterasi ALL_MENU_ITEMS (sumber kanonik foto/deskripsi),
//    foto kartu favorit diambil dari FAVORITE_MENU bila id cocok.
const favById = new Map(FAVORITE_MENU.map((f) => [f.id, f]))
const seenFavIds = new Set<string>()
let itemCount = 0

for (const [catName, items] of Object.entries(ALL_MENU_ITEMS)) {
  const catId = categoryIds.get(catName)
  if (!catId) {
    console.warn(`⚠ Kategori "${catName}" tidak ditemukan — item dilewati`)
    continue
  }
  for (const item of items) {
    const mainMedia = await upsertMedia(item.image, `Menu MOCHIKIN: ${item.name}`)
    const fav = favById.get(item.id)
    let cardMedia = null
    if (fav) {
      seenFavIds.add(fav.id)
      if (fav.image !== item.image) {
        cardMedia = await upsertMedia(fav.image, `Kartu favorit MOCHIKIN: ${item.name}`)
      }
    }
    const data = {
      name: item.name,
      menuCategory: catId,
      image: mainMedia.id,
      description: item.description,
      price: item.price ?? '',
      calories: item.calories ?? '',
      isFeatured: Boolean(fav),
      ...(cardMedia ? { imageCard: cardMedia.id } : {}),
    }
    const existing = await findDoc('menu-items', 'name', item.name)
    if (existing) {
      await db.update({ collection: 'menu-items', id: existing.id, data, overrideAccess: true })
    } else {
      await db.create({ collection: 'menu-items', data, overrideAccess: true })
    }
    itemCount++
  }
}

// FAVORITE_MENU yang tidak muncul di ALL — buat juga (jangan hilang dari CMS)
for (const fav of FAVORITE_MENU) {
  if (seenFavIds.has(fav.id)) continue
  const catId = categoryIds.get(fav.category)
  if (!catId) {
    console.warn(`⚠ Kategori favorit "${fav.category}" tidak ditemukan — "${fav.name}" dilewati`)
    continue
  }
  const mainMedia = await upsertMedia(fav.image, `Menu MOCHIKIN: ${fav.name}`)
  await db.create({
    collection: 'menu-items',
    data: {
      name: fav.name,
      menuCategory: catId,
      image: mainMedia.id,
      description: fav.description,
      price: fav.price ?? '',
      calories: fav.calories ?? '',
      isFeatured: true,
    },
    overrideAccess: true,
  })
  itemCount++
}
console.log(`✔ menu-items: ${itemCount}`)

// 3. Promos
for (const p of PROMOS_DATA) {
  const cat = p.category === 'all' ? null : (p.category as 'menu' | 'kegiatan' | 'cashless')
  if (!cat) {
    console.warn(`⚠ Promo "${p.slug}" berkategori "all" — dilewati (pilih kategori manual di CMS)`)
    continue
  }
  const media = await upsertMedia(p.image, `Promo MOCHIKIN: ${p.name}`)
  const data = {
    name: p.name,
    category: cat,
    image: media.id,
    description: p.description,
    expiryDate: p.expiryDate,
    slug: p.slug,
  }
  const existing = await findDoc('promos', 'slug', p.slug)
  if (existing) {
    await db.update({ collection: 'promos', id: existing.id, data, overrideAccess: true })
  } else {
    await db.create({ collection: 'promos', data, overrideAccess: true })
  }
}
console.log(`✔ promos: ${PROMOS_DATA.length}`)

// 4. Locations
for (const l of RESTAURANT_LOCATIONS) {
  const data = {
    name: l.name,
    city: l.city,
    address: l.address,
    phone: l.phone,
    hours: l.hours,
    services: l.services.map((label) => ({ label })),
  }
  const existing = await findDoc('locations', 'name', l.name)
  if (existing) {
    await db.update({ collection: 'locations', id: existing.id, data, overrideAccess: true })
  } else {
    await db.create({ collection: 'locations', data, overrideAccess: true })
  }
}
console.log(`✔ locations: ${RESTAURANT_LOCATIONS.length}`)

// 5. News
for (const n of NEWS_ITEMS) {
  const media = await upsertMedia(n.image, `Berita MOCHIKIN: ${n.title}`)
  const data = {
    title: n.title,
    slug: n.slug,
    category: n.category,
    date: new Date(n.date),
    image: media.id,
    excerpt: n.excerpt,
    body: lexical(n.body) as News['body'],
  }
  const existing = await findDoc('news', 'slug', n.slug)
  if (existing) {
    await db.update({ collection: 'news', id: existing.id, data, overrideAccess: true })
  } else {
    await db.create({ collection: 'news', data, overrideAccess: true, draft: false })
  }
}
console.log(`✔ news: ${NEWS_ITEMS.length}`)

// 6. Jobs
for (const j of JOB_ITEMS) {
  const data = {
    title: j.title,
    slug: j.slug,
    location: j.location,
    department: j.department,
    type: j.type,
    postedDate: new Date(j.postedDate),
    description: j.description,
    responsibilities: j.responsibilities.map((point) => ({ point })),
    qualifications: j.qualifications.map((point) => ({ point })),
  }
  const existing = await findDoc('jobs', 'slug', j.slug)
  if (existing) {
    await db.update({ collection: 'jobs', id: existing.id, data, overrideAccess: true })
  } else {
    await db.create({
      collection: 'jobs',
      data,
      overrideAccess: true,
      draft: false,
    })
  }
}
console.log(`✔ jobs: ${JOB_ITEMS.length}`)

// 7. Hero banners
for (const [i, b] of HERO_BANNERS.entries()) {
  const desktop = await upsertMedia(b.imageDesktop, `Banner desktop: ${b.title}`)
  const mobile = await upsertMedia(b.imageMobile, `Banner mobile: ${b.title}`)
  const data = {
    title: b.title,
    link: b.link,
    imageDesktop: desktop.id,
    imageMobile: mobile.id,
    order: i,
  }
  const existing = await findDoc('hero-banners', 'title', b.title)
  if (existing) {
    await db.update({ collection: 'hero-banners', id: existing.id, data, overrideAccess: true })
  } else {
    await db.create({ collection: 'hero-banners', data, overrideAccess: true })
  }
}
console.log(`✔ hero-banners: ${HERO_BANNERS.length}`)

/* --------------------------------- globals --------------------------------- */

async function seedGlobal(
  slug: NonNullable<Config['globals']>[number]['slug'],
  isEmpty: (g: Record<string, unknown>) => boolean,
  data: Record<string, unknown>,
  label: string,
) {
  // cast longgar: tipe generik slug & data global tidak bisa diekspresikan lewat
  // overload generik payload di satu fungsi — aman untuk skrip seed
  // tipe generik slug/data global tidak bisa mengalir lewat satu fungsi bersama —
  // panggil via antarmuka longgar (aman untuk skrip seed)
  const g = await db.findGlobal({ slug, depth: 0, overrideAccess: true })
  if (!isEmpty(g)) {
    console.log(`↷ global "${slug}" sudah terisi — skip`)
    return
  }
  await db.updateGlobal({ slug, data, overrideAccess: true })
  console.log(`✔ global ${label}`)
}

// 8. order-channels
await seedGlobal(
  'order-channels',
  (g) => !g.whatsappNumber,
  {
    whatsappNumber: '628111002000',
    whatsappPesan: 'Halo MOCHIKIN, saya ingin memesan...',
    gofoodLink: 'https://gofood.co.id',
    grabfoodLink: 'https://food.grab.com',
    shopeefoodLink: 'https://shopee.co.id',
    appLink: '#',
  },
  'order-channels',
)

// 9. site-settings
await seedGlobal(
  'site-settings',
  (g) => !g.tagline,
  {
    tagline: 'Korean Chickennya Indonesia',
    deskripsi:
      'Brand ayam crispy Korea halal yang berasal dari Bandung — dibuat untuk semua kalangan yang suka pedas, kriuk, dan penuh rasa.',
    instagram: 'https://instagram.com/mochikin',
    facebook: 'https://www.facebook.com/MOCHIKINID',
    twitter: 'https://twitter.com/mochikin',
    youtube: 'https://www.youtube.com/user/MOCHIKINID',
  },
  'site-settings',
)

// 10. karier-global — sumber: src/app/karier/CareerList.tsx (BENEFITS, hardcoded di UI)
const KARIER_BENEFITS = [
  { title: 'Pelatihan Berkelanjutan', description: 'Onboarding dan pelatihan SOP untuk setiap posisi.' },
  { title: 'Jenjang Karier Jelas', description: 'Dari crew hingga manajerial dengan jalur yang terstruktur.' },
  { title: 'Lingkungan Hangat', description: 'Tim yang saling dukung, melayani dengan senang hati.' },
  { title: 'Paket Remunerasasi', description: 'Gaji kompetitif dengan tunjangan sesuai peran. (TODO: detail)' },
]

await seedGlobal(
  'karier-global',
  (g) => !Array.isArray(g.benefits) || g.benefits.length === 0,
  {
    benefits: KARIER_BENEFITS,
    recruitmentSteps: RECRUITMENT_STEPS.map((label) => ({ label })),
    faqs: CAREER_FAQ.map((f) => ({ question: f.q, answer: f.a })),
    hrEmail: 'hr@mochikin.id',
  },
  'karier-global',
)

// 11. komitmen-global — pilar & angka dari pagesData; sertifikasi & program
//     dari src/app/komitmen/page.tsx (hardcoded modifier)
await seedGlobal(
  'komitmen-global',
  (g) => !Array.isArray(g.pillars) || g.pillars.length === 0,
  {
    pillars: COMMITMENT_PILLARS.map((p) => ({ title: p.title, description: p.description, icon: p.icon })),
    qualitySteps: [
      { title: 'Seleksi Bahan Baku', description: 'Spesifikasi bahan ditetapkan, supplier diaudit, dan proses pemeriksaan diterima di gudang.' },
      { title: 'Penyimpanan Terkontrol', description: 'Bahan disimpan pada suhu terjaga dan dipantau kondisi penyimpanannya setiap hari.' },
      { title: 'Pengolahan Bersih', description: 'Dapur diatur sesuai alur bersih-kotor, alat dipisah, dan SOP fried-cook diikuti.' },
      { title: 'Kontrol Kualitas', description: 'Menu yang keluar melewati pemeriksaan kualitas dan tampilan sebelum disajikan.' },
      { title: 'Sajian Hangat', description: 'Menu dikirim ke pelanggan dengan kemasan yang menjaga kelembapan dan kerenyahan.' },
    ],
    certifications: [
      { name: 'Sertifikasi Halal', note: 'Menunggu konfirmasi dokumen' },
      { name: 'Registrasi BPOM', note: 'Menunggu konfirmasi nomor' },
      { name: 'Izin Pangan (SIKM)', note: 'Menunggu konfirmasi dokumen' },
    ],
    communityPrograms: [
      { title: 'Sampah Minyak Tepat', description: 'Minyak goreng bekas dari outlet dikumpulkan untuk pengolahan ulang bersama mitra. (TODO)' },
      { title: 'Kelas Gizi Anak', description: 'Edukasi pola makan seimbang untuk anak-anak di sekolah sekitar outlet. (TODO)' },
      { title: 'Bakti Komunitas', description: 'Kegiatan sosial berkala bersama tim outlet di komunitas sekitar. (TODO)' },
    ],
    impactStats: IMPACT_STATS.map((s) => ({ label: s.label, value: s.value })),
  },
  'komitmen-global',
)

// 12. tentang-global — cerita/visi/misi/filosofi dari src/app/tentang/page.tsx
const storyImage = await upsertMedia(
  '/assets/produk/produk_korean-crispy-chicken_plate_01.jpg',
  'Ayam crispy Korea MOCHIKIN disajikan di piring',
)

await seedGlobal(
  'tentang-global',
  (g) => !Array.isArray(g.story) || g.story.length === 0,
  {
    story: [
      {
        paragraph:
          'MOCHIKIN lahir di Bandung dari obsesi sederhana: ayam crispy gaya Korea yang konsisten kriuknya dan marinasi yang meresap sampai ke tulang. Kami menggabungkan teknik Korean fried chicken dengan saus-saus otentik yang dimatangkan sendiri.',
      },
      {
        paragraph:
          'Hari ini, MOCHIKIN melayani pelanggan melalui dine-in di outlet dan channel delivery favorit — WhatsApp, GoFood, GrabFood, dan ShopeeFood.',
      },
    ],
    storyImage: storyImage.id,
    vision: 'Menjadi brand Korean crispy chicken yang paling dicintai di Indonesia. (TODO: visi resmi)',
    mission: [
      { point: 'Menyajikan ayam crispy dengan standar rasa dan tekstur paling konsisten.' },
      { point: 'Membuat setiap pelanggan dilayani dengan senang hati.' },
      { point: 'Tumbuh bersama komunitas dan channel pesan yang mudah diakses.' },
    ],
    values: BRAND_VALUES.map((v) => ({ title: v.title, description: v.description, icon: v.icon })),
    timeline: TIMELINE_MILESTONES.map((t) => ({ year: t.year, title: t.title, description: t.description })),
    team: TEAM_MEMBERS.map((t) => ({ name: t.name, role: t.role })),
    logoPhilosophy:
      'Warna oranye merepresentasikan semangat dan kehangatan sajian; aksen chartreuse kuning cerah menghadirkan kesan ceria, muda, dan menggugah selera — seperti pengalaman memakan ayam crispy Korea yang menyenangkan.\n\nFilosofi maskot belum dirinci — lihat brand guideline MOCHIKIN. (TODO)',
  },
  'tentang-global',
)

console.log('\n✅ Seed selesai.')
process.exit(0)
