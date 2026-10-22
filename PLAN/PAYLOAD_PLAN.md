# Rencana Eksekusi: Integrasi Payload CMS — Website MOCHIKIN

> Status: **DRAFT — MENUNGGU REVIEW** (belum dieksekusi)

---

## 0. Keputusan yang Sudah Dikunci

| Pertanyaan | Keputusan | Konsekuensi |
|---|---|---|
| Container CMS | **Payload 3.x** (native Next.js, di dalam app — bukan app terpisah) | Admin UI hidup di `/admin` website ini sendiri |
| Database | **Supabase** (hosted PostgreSQL) | Adapter: `@payloadcms/db-postgres` (Drizzle). Kredensial via connection string Supabase |
| Media/foto | **Local disk (dulu)** | Foto upload tersimpan di folder `/media` (bukan `/public`). ⚠️ Disk ephemeral di banyak platform hosting → nanti upgrade ke Supabase Storage / Cloudflare R2 |
| Metode scaffold | **`npx create-payload-app`**, dengan fallback integrasi manual (Fase 2c) | Detail di Fase 1 |
| Keamanan | Bekerja di branch `spike/payload-integration` | `main` tetap bersih, mudah rollback |

---

## 1. Pra-Syarat

1. **Node.js ≥ 20.9** (Payload 3). Cek: `node -v`.
2. **Branch kerja**: `git checkout -b spike/payload-integration`
3. **Supabase**: buat/pakai project yang ada → salin **connection string (Session mode, port 5432)**:
   ```
   DATABASE_URI=postgresql://postgres.<ref>:<password>@aws-0-<region>.pooler.supabase.com:5432/postgres?sslmode=require
   PAYLOAD_SECRET=<random-64-char>
   ```
   - Port **5432 (session mode)** untuk dev — integrasi Transaction pooler 6543 baru dipertimbangkan saat deploy serverless (bisa berpotensi bentrok drizzle prepared statements).
4. Buat `.env.example` berisi nama variabel (tanpa nilai) → commit. `.env` asli → di-gitignore.

---

## 2. Fase 1 — Scaffold Payload (est. 1–2 jam)

### 2a. Path A (rekomendasi): `create-payload-app`

```bash
npx create-payload-app@latest
```

Dijalankan **tanpa argumen project-name** di root repo — dia mendeteksi Next.js yang sudah ada. Jawab prompt:
- Template: **Blank**
- Database: **Postgres**
- Connection string: tempel dari Supabase
- Package manager: **npm**

### 2b. File yang dibuat / diubah (hasil Fase 1)

| Status | File | Isi |
|---|---|---|
| **Buat** | `payload.config.ts` | Root config: db adapter (postgres→Supabase), collections, globals, `defaultDepth`, `serverURL` |
| **Buat** | `src/collections/Users.ts` | Admin default (dibuat scaffold) |
| **Buat** | `src/app/(payload)/layout.tsx` | Layout khusus admin (memutus dari layout publik) |
| **Buat** | `src/app/(payload)/admin/[[...segments]]/page.tsx` | Route admin Next.js |
| **Buat** | `src/app/(payload)/custom.scss` | Custom style admin (opsional, brand MOCHIKIN) |
| **Buat** | `src/payload-types.ts` | (di-generate) type untuk semua collection |
| **Buat** | `src/lib/payload.ts` | Util `getPayload({ config })` untuk Local API di RSC |
| **Buat** | `src/lib/queries.ts` | Fungsi query cached per-halaman (dipakai Fase 4) |
| **Buat** | `scripts/seed.ts` | Seed data dari `src/data/*.ts` → Payload (Fase 3) |
| **Buat** | `media/` (giignored) | Folder upload foto |
| **Ubah** | `next.config.ts` | Dibungkus `withPayload(...)`; **recon** 3 hal: `cacheComponents`, `partialPrefetching`, rule Turbopack CSS |
| **Ubah** | `tsconfig.json` | Path alias `@payload-config` |
| **Ubah** | `package.json` | deps baru + scripts `payload` |
| **Ubah** | `.gitignore` | + `.env`, `/media` |
| **Tetap** | `src/data/mochikinData.ts`, `pagesData.ts` | Jadi **fallback statis** sampai Fase 4 selesai — tidak dihapus |

### 2c. Jika `create-payload-app` menolak (Path B — fallback manual)

```bash
npm install payload @payloadcms/next @payloadcms/richtext-lexical @payloadcms/db-postgres sharp graphql
```
lalu saya tulis manual semua file di tabel 2b (payload.config.ts versi Postgres, folder `(payload)`, dll.).

### 2d. Risiko kompatibilitas Next 16 + mitigasi

| Risiko | Gejala | Mitigasi |
|---|---|---|
| `cacheComponents: true` × admin Payload | Prerender error / admin hang | **Plan A**: pertahankan, admin ada di route group `(payload)` terpisah. **Plan B**: matikan `cacheComponents` (halaman kita sudah mostly static, kehilangan PPR tidak fatal) |
| Turbopack dev × Payload | Error saat `next dev` | Payload sudah support Turbopack di versi baru; kalau bentrok → dev pakai `--webpack` flag sementara |
| `withPayload` menimpa key config | Build config berubah| Recon manual: gabungkan `withPayload(nextConfig)` dengan mempertahankan semua key lama |

### 2e. Acceptance Test Fase 1
- [ ] `next build` + `next dev` sukses
- [ ] `/admin` terbuka, bisa buat user pertama & login
- [ ] Supabase dashboard menampilkan tabel-tabel Payload yang sudah di-`push`

---

## 3. Fase 2 — Collections & Globals (est. 1–2 hari)

Semua definisi di `src/collections/` dan `src/globals/`.

### Collections

| Collection | Sumber data sekarang | Field utama | Dipakai halaman |
|---|---|---|---|
| `menu-categories` | `MENU_CATEGORIES` (10) | `name` (unique), `order` | `/menu`, `/produk-kami` |
| `menu-items` | `ALL_MENU_ITEMS` (62) | `name`, `menuCategory` (rel), `image` (upload), `description`, `price`, `calories`, `isFeatured`, `isSpicy`, `order` | `/menu`, `/produk-kami`, beranda |
| `promos` | `PROMOS_DATA` | `name`, `category` (enum: kegiatan/menu/cashless), `image`, `description`, `expiryDate`, `slug` (unique) | `/promo`, beranda |
| `locations` | `RESTAURANT_LOCATIONS` (15) | `name`, `city`, `address`, `phone`, `hours`, `services` (array) | `/locations`, `/restoran-kami` |
| `news` | `NEWS_ITEMS` (4) | `title`, `slug` (unique), `category` (enum), `date`, `image`, `excerpt`, `body` (Lexical richText), `_status` (draft/published) | `/newsroom`, `/newsroom/[slug]` |
| `jobs` | `JOB_ITEMS` (3) | `title`, `slug` (unique), `location`, `department` (enum), `type` (enum), `postedDate`, `description`, `responsibilities` (array), `qualifications` (array), `_status` | `/karier`, `/karier/[slug]` |
| `hero-banners` | `HERO_BANNERS` | `title`, `imageDesktop`, `imageMobile`, `link`, `order` | Beranda (carousel) |
| `media` | — | upload dengan `alt` **required**, focal point, `imageSizes` untuk thumb | semua di atas |

### Globals

| Global | Sumber sekarang | Isi | Dipakai |
|---|---|---|---|
| `order-channels` | `src/app/order/page.tsx` + CTA | `whatsapp` (nomor+link), `gofood`, `grabfood`, `shopeefood`, `appLink` (mungkin `#` dulu) | `/order`, `/cara-pesan`, semua CTA |
| `tentang-global` | `pagesData.ts` | `story`, `vision`, `mission`, `values[]`, `timeline[]`, `team[]`, logo philosophy | `/tentang` |
| `komitmen-global` | `pagesData.ts` | `pillars[]`, `qualitySteps[]`, `certifications[]`, `communityPrograms[]`, `impactStats[]` | `/komitmen` |
| `karier-global` | `pagesData.ts` | `benefits[]`, `recruitmentSteps[]`, `faqs[]`, `hrEmail` | `/karier` |
| `site-settings` | metadata + footer | `tagline`, `deskripsi`, kontak, social links, media kit link, SEO defaults | layout, footer |

Setelah semua collection jadi:
```bash
npx payload generate:types
```

---

## 4. Fase 3 — Seed/Migrasi Data (est. 2–4 jam)

`scripts/seed.ts` dijalankan via: `npx payload run scripts/seed.ts`

- Baca `mochikinData.ts` + `pagesData.ts` (hanya untuk seeder, **tidak dihapus**).
- **Idempotent**: upsert by `slug`/`name` — bisa dijalankan berulang tanpa duplikasi.
- Salin foto yang sama dari `public/assets` → isi `media` (detail per slot alt text).
- Setelah seed cocok → isi semua halaman tetap identik dengan sekarang (diff visual 0).

---

## 5. Fase 4 — Rewire Halaman (est. 1–2 hari)

Urutan eksekusi (kecil→besar risiko), **satu commit per langkah**:

| # | Yang di-rewire | Perubahan | Strategi cache (cacheComponents aktif) |
|---|---|---|---|
| 1 | `order-channels` global | `/order`, `/cara-pesan`, semua tombol CTA | `"use cache"` + `isStatic` |
| 2 | `locations` | `/locations`, `/restoran-kami` | `"use cache"` |
| 3 | `menu-items` + kategori | `/menu`, `/produk-kami`, beranda | `"use cache"` + revalidateTag saat admin edit |
| 4 | `promos` | `/promo`, komponen beranda | `"use cache"` |
| 5 | `news` | `/newsroom`, `/newsroom/[slug]` | `"use cache"` + draft preview via preview route |
| 6 | `jobs` | `/karier`, `/karier/[slug]` | `"use cache"` |
| 7 | Globals (tentang/komitmen/karier/site) | `/tentang`, `/komitmen`, footer | `"use cache"` |
| 8 | `hero-banners` | Carousel beranda | `"use cache"` |

Revalidasi:
- `afterChange`/`afterDelete` hooks di tiap collection → `revalidateTag(<nama>)` (import dari `next/cache`).
- Opsional: endpoint `/api/revalidate?tag=...&secret=...` untuk trigger dari luar (mis. kalau admin nanti dipisah hostingnya).

Acceptance: setiap halaman identik dengan versi statis-lama (guna `diff` visual admin).

---

## 6. Fase 5 — Hardening & Siap Deploy (est. 0.5–1 hari)

1. **Validasi field**: field wajib (gambar, alt), unique slug, enum yang valid.
2. **RBAC**: role `admin` (full) vs `editor` (hanya collection konten), user Supabase? — Payload own users, bukan Supabase auth.
3. **Draft & versioning**: aktif di `news` dan `jobs` (aman edit tanpa publish).
4. **Live Preview** (opsional): tab iframe di admin → halaman publik dengan `draft=true`.
5. **Cleanup**: hapus `remotePatterns` mcd sisa (jika ada), pindah `.env` ke deploy target.
6. **Commit final + push branch → PR → merge ke `main`** setelah semua acceptance test lulus.

---

## 7. Deployment Nanti (out of scope sekarang, dicatat)

- Hosting: Vercel / VPS — belum diputuskan → **dipengaruhi** pilihan media (local disk tidak persist di Vercel).
- Upgrade path media gratis: **Supabase Storage** via plugin `@payloadcms/storage-s3` (S3-compatible endpoint) saat sudah online.
- Supabase: aktifkan connection pooler (Transaction mode 6543) + set `pool: { max: 3 }` di adapter.

---

## 8. Estimasi Total

| Fase | Estimasi |
|---|---|
| Fase 1 (scaffold) | 1–2 jam |
| Fase 2 (collections) | 1–2 hari |
| Fase 3 (seed) | 2–4 jam |
| Fase 4 (rewire) | 1–2 hari |
| Fase 5 (hardening) | 0.5–1 hari |
| **Total** | **± 4–6 hari kerja fokus** |

---

## 9. Cara Rollback

- Bekerja di branch → `main` tidak tersentuh sampai PR diterima.
- Data seed di Supabase bisa dihapus drop schema via SQL editor (`drop schema public cascade; create schema public;`) — **perhatian: ini menghapus semua tabel supabase itu**.
- File `src/data/*.ts` tetap di repo sampai Fase 4 semua halaman ter-verified — fallback total: `git revert` ke commit sebelum integrasi.

---

## Catatan Implementasi Fase 1 (actual run, 2026-10-22)

`create-payload-app` tidak bisa berjalan di shell non-TTY → integrasi manual (Path B) dari
template resmi v3.91.0 (`node_modules/create-payload-app/dist/template`).

Gotcha yang ditemukan ( undocumented):

1. **Konflik tsx × Node 22.23 saat CLI Payload** (`payload generate:types` / `migrate` / `run`):
   undici lempar `Illegal constructor`. Solusi: selalu tambahkan flag `--disable-transpile`
   (Pakai TS-stripping bawaan Node) + import `.ts` eksplisit di `payload.config.ts`
   (`./src/collections/Users.ts`). Skrip npm sudah diset demikian. tsconfig butuh
   `allowImportingTsExtensions: true`.
2. **tsconfig `@payload-config`** harus menunjuk `./payload.config.ts` milik proyek
   (Bukan `./node_modules/@payloadcms/next/payload-config` — cara lama sudah tidak dipakai oleh CPA v3.91).
3. **Config admin**: kunci yang benar `admin.meta` (`titleSuffix`), Bukan `admin.metadata`,
   dan `MetaConfig` tidak menerima `favicon`.
4. **`turbopack.root`** wajib di-set ke direktori proyek (sanitasi `WORKSPACE root` salah inferens).
5. **`package.json`**: `"type": "module"` diperlukan (rekomendasi Payload; menghindari overhead reparse ESM).
6. `/admin` shell 200 meski DB belum tersambung (PPR shell); error DB hanya muncul saat
   API admin dipanggil. Segera setelah `DATABASE_URI` Supabase asli diisi, jalankan
   `npx payload migrate --disable-transpile` untuk push schema.

---

## Catatan Implementasi Fase 2–3 (sudah dijalankan)

- Type field versi Payload 3 = `richText` (camelCase), bukan `richtext` ala v2 — error muncul saat `next build`.
- Field `icon` (emoji) harus `maxLength` ≥ 20: emoji keluarga `👨‍👩‍👧‍👦` adalah ZWJ-sequence melebihi 10 unit UTF-16.
- Jumlah menu aktual = **34 item unik + 5 favorit** (angka 62 di tabel rencana ini sudah usang pasca-rebranding).
- Field baru `imageCard` di `menu-items`: foto kartu "Menu Favorit" beranda yang berbeda dengan foto kanonik halaman /menu (kualitas data FAVORITE_MENU vs ALL_MENU_ITEMS memang berbeda untuk produk yang sama).
- Seeder idempotent: dokumen yang SUDAH ADA menang (tidak ditimpa selain field seed yang konvergen); globals hanya diisi bila masih kosong. Jalankan ulang = aman.
- Skrip seed pakai antarmuka `db` longgar — tipe generik `payload.create/find/update` terlalu ketat untuk literal hasil `src/data/*`; validasi tetap jalan di runtime.
- Koneksi Supabase lokal dev: `?uselibpqcompat=true&sslmode=require` (Session pooler 5432) tanpa `SELF_SIGNED_CERT_IN_CHAIN`.
