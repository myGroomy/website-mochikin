# UI/UX — Design System & Panduan Antarmuka
## Website MOCHIKIN ("Korean Chickennya Indonesia")

> Versi: 1.0 · Status: DRAFT untuk review
> Sumber token: `src/app/globals.css` (`@theme`) · Aset: `public/assets/` (dari brand guideline) · Prasyarat: [`TRD.md`](./TRD.md) §4.1

---

## 1. Karakter Visual & Prinsip

MOCHIKIN = **Korean chicken playful-modern**: hangat, berani, ramah — tanpa terasa generik.

| Prinsip | Artinya dalam praktik |
|---|---|
| **Orange sebagai pemimpin** | `--brand-red` (#FF6B35) dipakai fokus: CTA utama, badge, dan highlight — bukan penuh-sebar di mana-mana; keterbacaan tetap diprioritaskan |
| **Latar netral** | `--brand-gray-bg` membuat orange dan foto makanan menonjol; perbedaan latar antar-section halus (muda/abu) |
| **Foto dominan → overlay ringan** | Slot foto menguasai card; teks overlay menempel di area kontras (chip/solid), bukan menimpa foto mentah |
| **Rounded & friendly** | Kartu menggunakan radius besar; sudut tajam dihindari pada elemen utama |
| **Satu keluarga ikon** | Semua ikon dari lucide-react, stroke konsisten |

---

## 2. Design Tokens

### 2.1 Warna (`globals.css @theme`)

| Token | Nilai | Penggunaan |
|---|---|---|
| `--brand-red` | `#FF6B35` | **primary**: tombol utama, badge aktif, aksen heading |
| `--brand-red-dark` | `#E55A2B` | Hover/active primary; border aksen |
| `--brand-yellow` | `#FFD166` | **accent**: badge "favorit/promo", highlight, varian CTA |
| `--brand-yellow-dark` | `#E6B84A` | Hover/active accent |
| `--brand-dark` | `#2d2d2d` | Teks utama, navbar solid |
| `--brand-gray-bg` | `#f5f5f5` | Latar section |
| `--brand-gray-light` | `#fafafa` | Latar kartu lembut |
| `--brand-gray-border` | `#e5e5e5` | Border kartu, divider |
| `--brand-gray-text` | `#666666` | Teks sekunder/description |

Aturan: semua warna dikonsumsi via token/class ini — **dilarang menulis hex langsung** di komponen baru; tambahkan token bila diperlukan.

### 2.2 Tipografi

| Token | Keluarga | Cakupan |
|---|---|---|
| `--font-sans` / `--font-plus-jakarta-sans` | **Plus Jakarta Sans** | Seluruh UI |

| Step | Kegunaan |
|---|---|
| `text-4xl–6xl` bold | Hero/banner, judul halaman |
| `text-2xl/3xl` bold | Judul section |
| `text-lg/xl` bold | Judul kartu (menu/promo/berita) |
| `text-base` | Paragraf umum |
| `text-sm` | Info pendukung, tanggal, breadcrumb |
| `text-xs` | Badge, label kecil, legal footer |

Ketentuan: heading memakai `leading-tight` (1.1–1.2); body `leading-relaxed`.

### 2.3 Radius & Shadow
- Kartu komponen: `rounded-2xl`–`rounded-3xl`; pill/badge: `rounded-full`.
- Shadow ringan (`shadow-sm`) untuk kartu; shadow lebih besar hanya untuk elemen mengambang (FAB, sticky nav, modal).

---

## 3. Formula Halaman Konten

Setiap halaman non-beranda mengikuti struktur:

```
1. Breadcrumb        → path teks kecil, link hidup
2. Hero              → judul + subtitle + (foto aset brand bila ada)
3. Konten            → per halaman (lihat §5)
4. CTA               → "Pesan Sekarang" / kontak; komponen konsisten
5. Footer            → navigasi, legal, sosial
```

Konsekuensi: blok (2)–(4) memakai pola shared; data yang berulang disimpan di array data terpisah, **bukan hardcode di JSX**; placeholder faktual memakai `{/* TODO */}`.

---

## 4. Komponen Global

| Komponen | File | Perilaku |
|---|---|---|
| Navbar | `src/components/Navbar.tsx` | Sticky top; dropdown desktop (Produk/Company), full-menu mobile; nav aktif perlu `aria-current` (belum tuntas — backlog) |
| Footer | `src/components/Footer.tsx` | Navigasi utama + legal + sosial; identik di semua halaman |
| HeroCarousel | `HeroCarousel.tsx` | Carousel banner beranda dari `HERO_BANNERS`; auto-play + dot indicator; `alt` per slide |
| PromoSection | `PromoSection.tsx` | Ekstrak promo unggulan ke grid; kartu → `/promo#<slug>` |
| MenuSection | `MenuSection.tsx` | Favorit menu di beranda (`FAVORITE_MENU`) → `/menu` |
| AppSection | `AppSection.tsx` | Banner unduh aplikasi; CTA → `/order` (app belum ada) |
| CelebrateBanner | `CelebrateBanner.tsx` | Banner komunitas `id="dunia-anak"` (target anchor) |
| FloatingOrderButton | `FloatingOrderButton.tsx` | FAB sticky mobile → `/order` |
| CookieBanner | `CookieBanner.tsx` | Banner cookie yang mudah ditutup, tidak menghalangi konten |
| SecurityModal | `SecurityModal.tsx` | Modal interstitial khusus |
| InstagramFeed | `InstagramFeed.tsx` | Strip feed sosial (placeholder gambar grid) |

## 5. Konten Per-Halaman

| Halaman | Konten unik | Pola interaktif | Komponen |
|---|---|---|---|
| `/restoran-kami` | Grid outlet, per kota | Filter kota, filter layanan (24 jam/Drive-thru/Dine-in), pencarian; empty state | `RestaurantDirectory.tsx` (client) |
| `/produk-kami` | Katalog item semua kategori | Tab kategori, pencarian, accordion gizi (kalori/Gula/Protein…) | `ProductCatalog.tsx` (client) |
| `/komitmen` | Pilar + langkah kualitas + sertifikasi (placeholder; dilarang mengarang fakta) | list statis + timeline | — |
| `/newsroom` | Kartu berita per kategori | grid + navigasi kategori | `NewsroomList.tsx` (client) |
| `/newsroom/[slug]` | Body berita + berita terkait | statis + "berita lainnya" | — |
| `/tentang` | Story, visi-misi, nilai, filosofi logo, timeline, tim | grid + timeline | — |
| `/karier` | Lowongan aktif + benefit + FAQ | list + collapse FAQ | `CareerList.tsx` (client) |
| `/karier/[slug]` | Detail: deskripsi/responsibilities/kualifikasi | statis | — |
| `/promo` | Kartu promo + kategori kegiatan/menu/cashless | kartu + anchor `#pesta-ulang-tahun-makin-seru` | — |
| `/menu` | Katalog + modal detail (menggantikan dynamic route) | modal detail | komponen menu di `src/app/menu` |
| `/order`, `/cara-pesan` | Kartu 4 channel eksternal | kartu per channel + langkah pesan | — |

---

## 6. Responsive & Breakpoint

| Viewport | Perilaku |
|---|---|
| `< sm` (mobile) | Navbar → hamburger full-menu; grid 1 kolom; FAB muncul; hero stack |
| `sm–lg` | Grid 2 kolom; chip filter wrap |
| `≥ lg` | Navbar desktop + dropdown; grid 3–4 kolom; kontainer max-width `7xl` |

Kontrol lebar konten memakai kelas Tailwind (`max-w-7xl mx-auto`); tanpa media-query ad-hoc di CSS.

---

## 7. Interaksi & Motion

- **Durasi default**: `duration-200/300` (`ease-out`). CTA: perubahan warna ke varian `*-dark` + scale halus saat hover.
- **Carousel**: transisi horizontal; dot aktif berwarna brand; interval autoplay tidak agresif.
- **Modal detail menu**: backdrop blur + panel naik; ESC/klik-luar menutup; keyboard handler wajib (Tab tertahan di dalam modal).
- **Accordion gizi**: animate height; hanya satu terbuka pada satu waktu.
- **Filter/pencarian**: filter ringan; empty state selalu menyediakan aksi pemulihan ("reset filter").
- Tidak ada motion besar-besaran (parallax berlebih dsb.); hindari delay animasi > 500 ms.

---

## 8. Aksesibilitas

| Aspek | Ketentuan |
|---|---|
| Kontras | Body text vs latar ≥ 4.5:1; teks `#666` hanya di bg terang; orange hanya untuk teks besar/bold atau elemen non-teks |
| Keyboard | Tab urut secara logika; dropdown/modal/accordion dapat dioperasikan full keyboard; **focus ring** (`focus-visible`) terlihat |
| ARIA | `aria-current` pada nav aktif; `aria-expanded` accordion/dropdown; `role="dialog"` + `aria-modal` untuk modal; `aria-live` untuk hasil filter/pencarian |
| Gambar | Semua foto menu/promo/berita mempunyai `alt` deskriptif (nanti wajib di Payload, FR-26) |
| Struktur | Satu `h1` per halaman; heading tidak melompat level |

---

## 9. Foto & Aset

- Sumber: `public/assets/` (108 aset dari brand guideline; 82 foto produk).
- Penamaan mengikuti pola guideline (mis. `logo_mochikin-primary-*`); **dilarang** menambah aset dengan prefix brand lama.
- OG image/favicon: `logo_mochikin-primary-logo_outline_01.png`.
- Foto yang belum terpakai tetap tersedia untuk menu-items saat datanya dimigrasi ke Payload.

---

## 10. Anti-Pattern — dilarang

1. Hex warna langsung di JSX (`bg-[#FF6B35]`) — pakai token/class.
2. Konten berulang hardcode di JSX (harus pattern array di file data).
3. Link anchor palsu (`#restoran-kami` dll.) — anchor hanya menuju id yang benar-benar ada.
4. Mengarang fakta/klaim (halal, BPOM, "100+ outlet" tanpa sumber) — gunakan `{/* TODO */}`.
5. React hooks di server component — interaktif wajib client component.
6. Spasi section tak konsisten — default: `py-16` desktop / `py-12` mobile.
7. Shadow berlebih untuk kartu level-1.

---

## 11. Admin CMS (Payload) — catatan ringkas

- Jangan menimpa tampilan admin default secara berlebihan; opsi `custom.scss` mengarahkan warna aksen ke orange MOCHIKIN.
- Field image: alt wajib, preview jelas; kategori memakai dropdown (relationship), bukan teks bebas.
- Konten belum-lengkap pakai `draft`, jangan dipublish dalam keadaan kosong.

---

## 12. Pemeliharaan Dokumen

- Tokens berubah → update `globals.css` **dan** tabel §2 di file ini.
- Komponen baru masuk tabel §4 dan pola interaksinya §7 bila relevan.
- Dokumen pasangan: [`TRD.md`](./TRD.md) (kebutuhan teknis), [`PAYLOAD_PLAN.md`](./PAYLOAD_PLAN.md) (eksekusi CMS).
