# TRD — Technical Requirements Document
## Website MOCHIKIN ("Korean Chickennya Indonesia") + Payload CMS

> Versi: 1.0 · Status: DRAFT untuk review · Domain: mochikin.id
> Dokumen terkait: [`PAYLOAD_PLAN.md`](./PAYLOAD_PLAN.md) (rencana eksekusi migrasi CMS) · [`UI-UX.md`](./UI-UX.md) (design system & panduan antarmuka)

---

## 1. Konteks & Tujuan

Website komersial + landing korporat untuk brand **MOCHIKIN**. Berfungsi ganda:

1. **Marketing site** — profil brand, katalog produk, promo, outlet, berita, karier, komitmen, tentang.
2. **Titik konversi ke channel eksternal** — website **tidak** meng-handle transaksi; semua pemesanan diarahkan ke **WhatsApp, GoFood, GrabFood, ShopeeFood**.
3. **Konten dikelola non-developer** — setelah integrasi Payload CMS, tim konten mengelola menu/promo/berita/lowongan via `/admin` tanpa deploy ulang.

### Ruang lingkup
| Termasuk | Tidak termasuk |
|---|---|
| Halaman publik 17+ route (§4.1) | Checkout / keranjang / pembayaran online |
| Admin CMS (Payload, §4.4) | Akun pelanggan (login member) |
| Seed data dari source statis | Aplikasi mobile |
| SEO teknis (sitemap/robots/metadata) | Analitik pihak ketiga (opsional belakangan) |
| Migrasi data statis → database | Multi-bahasa (hanya id di versi ini) |

---

## 2. Stack Teknologi

| Layer | Teknologi | Versi | Peran |
|---|---|---|---|
| Framework | Next.js (App Router, Turbopack) | 16.4.2 | Halaman publik + admin CMS dalam satu app |
| Runtime UI | React | 19.3.0 | Client & server components |
| Bahasa | TypeScript | 5.x | Strict typing; `payload-types.ts` di-generate |
| Styling | Tailwind CSS 4 + CSS variables | 4.x | Utility classes + design token di `@theme` |
| CMS | Payload 3.x (target integrasi) | 3.x | Collections, admin `/admin`, Local API |
| Database | PostgreSQL (Supabase) | 15+ | Via Drizzle (`@payloadcms/db-postgres`) |
| Media (fase awal) | Local disk `media/` | — | Upload collection (upgrade path: Supabase Storage/R2) |
| Ikon | lucide-react | 1.59 | Sistem ikon tunggal |
| Package manager | npm | 10+ | `package-lock.json` sebagai lockfile |
| Node.js | — | ≥ 20.9 | Syarat build & Payload 3 |

### Konfigurasi build yang mengikat desain kode
- `cacheComponents: true` + `partialPrefetching: true` — static prerender sebagai default; dynamic route wajib `generateStaticParams` dan `params` bertipe **Promise** (di-`await`).
- **Server component dilarang memakai React hooks** (plugin React Server) — semua interaksi pindah ke client component.
- `images.unoptimized: true` — `<Image>` tanpa optimasi server-side.
- Rule Turbopack untuk CSS loader dikonfigurasi di `next.config.ts`.

---

## 3. Arsitektur

```
┌──────────────────────── Next.js App (monolith) ─────────────────────────┐
│ Route groups:                                                           │
│  ├─ src/app/*            → halaman publik (SSG + "use cache")           │
│  ├─ src/app/(payload)/*  → admin CMS /admin                             │
│  └─ src/app/api/*        → endpoint revalidate (opsional)               │
│                                                                         │
│ Lapisan data:                                                           │
│  ├─ src/data/mochikinData.ts  → FALLBACK statis (dipertahankan)         │
│  ├─ src/data/pagesData.ts     → FALLBACK statis (dipertahankan)         │
│  ├─ payload.config.ts         → definisi collections/globals            │
│  ├─ src/lib/payload.ts        → getPayload Local API di RSC             │
│  └─ src/lib/queries.ts        → query cached per-halaman + revalidateTag│
└─────────────────────────────────────────────────────────────────────────┘
            │ Local API (in-process)        │ REST/GraphQL (opsional)
            ▼                               ▼
   ┌─────────────────┐             ┌───────────────────────┐
   │ Payload 3.x     │── Drizzle ─▶│ Supabase PostgreSQL   │
   └─────────────────┘             └───────────────────────┘
```

Prinsip arsitektur:
- **Fallback total** — sampai Fase 4 selesai dan terverifikasi, semua halaman tetap membaca `src/data/*.ts`; Payload diaktifkan per-halaman secara progresif.
- **Revalidasi** — hook `afterChange`/`afterDelete` di collection memanggil `revalidateTag(...)` dari `next/cache`; halaman publik ter-update tanpa deploy.
- **Satu sumber kebenaran konten** setelah migrasi: database. `src/data/*.ts` berperan sebagai seed source + fallback developer.
- `payload.config.ts` berada di root repo (konvensi Payload 3).

---

## 4. Persyaratan Fungsional

### 4.1 Halaman publik

| ID | Route | Deskripsi | Sumber data | Status |
|---|---|---|---|---|
| FR-01 | `/` | Beranda: hero carousel, promo, menu favorit, CTA app | `HERO_BANNERS`, `PROMOS_DATA`, `FAVORITE_MENU` | ✅ |
| FR-02 | `/promo` | Grid promo; anchor `#pesta-ulang-tahun-makin-seru` valid | `PROMOS_DATA` | ✅ |
| FR-03 | `/menu` | Katalog menu dengan tab kategori + modal detail | `MENU_CATEGORIES`, `ALL_MENU_ITEMS` | ✅ |
| FR-04 | `/order` | Landing konversi ke 4 channel eksternal | statis | ✅ |
| FR-05 | `/cara-pesan` | Panduan cara pesan per channel | statis | ✅ |
| FR-06 | `/locations` | Lokasi outlet & peta | `RESTAURANT_LOCATIONS` | ✅ |
| FR-07 | `/restoran-kami` | Direktori outlet: filter kota/layanan/pencarian + empty state | `RESTAURANT_LOCATIONS` | ✅ |
| FR-08 | `/produk-kami` | Katalog produk + gizi (accordion), tab kategori, pencarian | `ALL_MENU_ITEMS` | ✅ |
| FR-09 | `/komitmen` | Pilar komitmen, langkah kualitas; sertifikasi = placeholder | `COMMITMENT_PILLARS`, `QUALITY_STEPS` | ✅ |
| FR-10 | `/newsroom` | Daftar berita | `NEWS_ITEMS` (4) | ✅ |
| FR-11 | `/newsroom/[slug]` | Detail berita + berita terkait | `NEWS_ITEMS` | ✅ |
| FR-12 | `/tentang` | Cerita brand, visi-misi, nilai, filosofi logo, timeline, tim | `BRAND_VALUES`, `TIMELINE_MILESTONES`, `TEAM_MEMBERS` | ✅ |
| FR-13 | `/karier` | Daftar lowongan, benefit, langkah rekrutmen, FAQ | `JOB_ITEMS` (3), `CAREER_FAQ` | ✅ |
| FR-14 | `/karier/[slug]` | Detail lowongan | `JOB_ITEMS` | ✅ |
| FR-15 | `/syarat-ketentuan`, `/kebijakan-privasi` | Halaman legal | statis | ✅ |
| FR-16 | `not-found.tsx` | 404 branded + CTA kembali | — | ✅ |
| FR-17 | `sitemap.ts`, `robots.ts` | Infrastruktur SEO | daftar route | ✅ |

**Formula struktur halaman konten**: `Breadcrumb → Hero → Konten → CTA → Footer`. Data yang berulang disimpan sebagai array/JSON di file data terpisah (tidak hardcode di JSX). Placeholder faktual ditandai `{/* TODO */}` — dilarang mengarang angka, sertifikasi, atau klaim (halal/BPOM/dll.).

### 4.2 Konversi (channel eksternal)
- **FR-18** — Tidak ada flow pembayaran dalam website. Semua CTA "Pesan Sekarang" → `/order`.
- **FR-19** — `/order` memuat 4 kanal: WhatsApp (link `wa.me`), GoFood, GrabFood, ShopeeFood; badge App Store/Play menunjuk `/order` sampai aplikasi tersedia.
- **FR-20** — Floating order button sticky di mobile.

### 4.3 Navigasi & tautan
- **FR-21** — Semua `href` valid: dilarang link ke `#restoran-kami`, `#produk-kami`, `#komitmen`, `#newsroom`, `#tentang`, `#karier`. Anchor dibatasi ke id yang benar-benar ada (`/#dunia-anak`, `/promo#pesta-ulang-tahun-makin-seru`).
- **FR-22** — Navbar (dropdown desktop, full-menu mobile) dan Footer konsisten di semua halaman.

### 4.4 CMS (setelah integrasi PAYLOAD_PLAN.md)
- **FR-23** — Admin login di `/admin`; user pertama dibuat saat setup.
- **FR-24** — CRUD collections: `menu-items` (62), `menu-categories` (10), `promos`, `locations` (15), `news`, `jobs`, `hero-banners`, `media`.
- **FR-25** — Globals: `order-channels` (WA/GoFood/GrabFood/ShopeeFood), `site-settings`, `tentang`, `komitmen`, `karier`.
- **FR-26** — Media upload local disk; field `alt` **wajib** diisi.
- **FR-27** — Draft & publish untuk `news` dan `jobs`.
- **FR-28** — Simpanan admin memicu `revalidateTag` → halaman publik ter-update tanpa deploy.

### 4.5 Aksesibilitas (fungsional)
- **FR-29** — Semantic HTML: satu `h1` per halaman, heading berurutan, landmark (`nav`, `main`, `footer`).
- **FR-30** — `focus-visible` ring pada semua elemen interaktif; urutan tab masuk akal.

---

## 5. Persyaratan Non-Fungsional

| ID | Kategori | Target |
|---|---|---|
| NFR-01 | Performance | Lighthouse mobile ≥ 85; LCP < 2.5 s; CLS < 0.1 |
| NFR-02 | SEO | `metadataBase` di-set (hapus warning build); sitemap mencakup semua route publik; meta OG/Twitter per halaman |
| NFR-03 | Aksesibilitas | WCAG 2.1 AA untuk kontras & struktur |
| NFR-04 | Kompatibilitas | 2 versi terakhir Chrome/Edge/Firefox/Safari + WebView Android/iOS |
| NFR-05 | Keamanan | `.env` tidak ter-commit; `PAYLOAD_SECRET` ≥ 64 char; RBAC `admin` vs `editor` (Fase 5) |
| NFR-06 | Portabilitas data | Data statis dipertahankan sebagai fallback & seed source |
| NFR-07 | Build | `npx next build` lulus 0 error; 30+ halaman prerender |
| NFR-08 | Rollback | Kerja integrasi di branch terpisah; `main` tidak tersentuh sampai PR diterima |

---

## 6. Persyaratan Konfigurasi

### 6.1 Environment variables

| Variabel | Diperlukan oleh | Keterangan |
|---|---|---|
| `DATABASE_URI` | Payload | `postgresql://...pooler.supabase.com:5432/postgres?sslmode=require` — Session mode port 5432 untuk dev |
| `PAYLOAD_SECRET` | Payload | Random ≥ 64 karakter |
| `NEXT_PUBLIC_SITE_URL` | SEO (`metadataBase`) | `https://mochikin.id` |

`.env.example` di-commit (nama variabel tanpa nilai); `.env` asli di-gitignore.

### 6.2 Supabase
- Buat project → salin connection string **Session mode (5432)** untuk dev.
- Transaction pooler (6543) hanya untuk deploy serverless nanti; waspadai konflik drizzle prepared statements (`pool.max` kecil).
- Reset database daring bisa lewat SQL editor `drop schema public cascade` — bersifat destruktif, perlu konfirmasi.

---

## 7. Kriteria Penerimaan

### Fase saat ini (rebrand + halaman terpisah) — sudah tercapai
- [x] `npx next build` sukses; 28 halaman statis.
- [x] Semua route baru → HTTP 200 via `curl` di `next start`; `/tentang-kami` → 404.
- [x] 0 temuan string/logo/foto McDonald's pada source & assets.
- [x] Semua CTA pemesanan mengarah ke `/order`.

### Target per-fase integrasi Payload
- [ ] **F1** — `/admin` login OK; tabel terbentuk di Supabase; `next build` + `next dev` sukses.
- [ ] **F2** — `npx payload generate:types` sukses; seluruh collection & global tampil di admin.
- [ ] **F3** — Seed idempotent: 62 menu-items, 10 kategori, promo, 15 lokasi, news, jobs; re-run tanpa duplikat.
- [ ] **F4** — Halaman yang mem-fetch Payload identik dengan versi statis (visual diff 0); edit promo via admin → halaman berubah tanpa deploy.
- [ ] **F5** — Draft/publish bekerja; role `editor` tidak bisa akses Users; semua lulusan sebelumnya tetap lolos.

---

## 8. Daftar Risiko

| ID | Risiko | Dampak | Mitigasi | Status |
|---|---|---|---|---|
| R-01 | `cacheComponents` × admin Payload bentrok | Admin hang / prerender error | Rencana A: pertahankan (admin di route group terpisah). Rencana B: matikan flag | Ditangani saat F1 |
| R-02 | Turbopack dev × Payload | Error saat `next dev` | Dev sementara via `--webpack` | Ditangani saat F1 |
| R-03 | `withPayload` menimpa key next config | Regresi build | Recon manual: gabungkan config, pertahankan semua key lama | Ditangani saat F1 |
| R-04 | Media local disk tidak persist di hosting ephemeral | Foto hilang saat deploy | Upgrade ke Supabase Storage / Cloudflare R2 | Ditunda ke fase deploy |
| R-05 | Supabase pooler × drizzle | Query error di serverless | Session mode 5432 pada dev; `pool.max` kecil saat deploy | Pantau |
| R-06 | Bentuk data lama tidak konsisten (mis. key `"Mochi Cafe"` ber-kutip) | Seeder gagal | Seeder toleran + verifikasi jumlah record | Ditangani saat F3 |

---

## 9. Referensi

- Rencana eksekusi per fase: [`PAYLOAD_PLAN.md`](./PAYLOAD_PLAN.md)
- Design system & panduan antarmuka: [`UI-UX.md`](./UI-UX.md)
- Seed source: `src/data/mochikinData.ts`, `src/data/pagesData.ts`
- Konfigurasi build: `next.config.ts`, `tsconfig.json`
- Repo: https://github.com/myGroomy/website-mochikin (branch `main`)
