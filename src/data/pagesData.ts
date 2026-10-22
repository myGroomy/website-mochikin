// Data terpisah untuk halaman statis (Restoran, Produk, Komitmen, Newsroom, Tentang, Karier)
// TODO: ganti dengan data asli dari owner brand

export interface CommitmentPillar {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const COMMITMENT_PILLARS: CommitmentPillar[] = [
  {
    id: "kualitas-bahan",
    title: "Kualitas Bahan",
    description:
      "Kami memilih bahan baku dari supplier terpercaya dengan standar penyimpanan dan pengolahan yang ketat. Setiap batch bahan diperiksa sebelum diolah menjadi menu favoritmu.",
    icon: "🥇",
  },
  {
    id: "keamanan-pangan",
    title: "Keamanan & Kebersihan Pangan",
    description:
      "Dapur kami mengikuti SOP kebersihan yang ketat: suhu goreng, pemisahan alat, dan sanitasi berkala. Tim di tiap outlet memastikan standar terpenuhi setiap hari.",
    icon: "🧼",
  },
  {
    id: "pelayanan",
    title: "Pelayanan dengan Senang Hati",
    description:
      "Setiap pelanggan pantas mendapat sapaan hangat dan pelayanan cepat. Kami melatih tim untuk melayani dengan senang hati, dalam kondisi apa pun.",
    icon: "😊",
  },
  {
    id: "lingkungan-komunitas",
    title: "Peduli Lingkungan & Komunitas",
    description:
      "Dari pengelolaan sampah minyak hingga program bakti sosial di komunitas sekitar outlet, kami terus berupaya memberi dampak positif.",
    icon: "🌱",
  },
];

export const QUALITY_STEPS = [
  { step: 1, title: "Seleksi Bahan Baku", description: "Spesifikasi bahan ditetapkan, supplier diaudit, dan proses pemeriksaan diterima di gudang." },
  { step: 2, title: "Penyimpanan Terkontrol", description: "Bahan disimpan pada suhu terjaga dan dipantau kondisi penyimpanannya setiap hari." },
  { step: 3, title: "Pengolahan Bersih", description: "Dapur diatur sesuai alur bersih-kotor, alat dipisah, dan SOP fried-cook diikuti." },
  { step: 4, title: "Kontrol Kualitas", description: "Menu yang keluar melewati pemeriksaan kualitas dan tampilan sebelum disajikan." },
  { step: 5, title: "Sajian Hangat", description: "Menu dikirim ke pelanggan dengan kemasan yang menjaga kelembapan dan kerenyahan." },
];

export interface NewsItem {
  slug: string;
  title: string;
  category: "Siaran Pers" | "Promo" | "Event" | "CSR";
  date: string;
  image: string;
  excerpt: string;
  body: string[];
}

export const NEWS_ITEMS: NewsItem[] = [
  {
    slug: "mochikin-buka-outlet-bandung",
    title: "MOCHIKIN Perluas Jejaring di Bandung dengan Outlet Baru",
    category: "Siaran Pers",
    date: "2026-09-15",
    image: "/assets/banner/banner_menu-catalog-a5_v1_01.png",
    excerpt: "Outlet baru di Bandung hadir dengan konsep dine-in dan drive-thru untuk mempermudah pelanggan.",
    body: [
      "Bandung — MOCHIKIN resmi membuka outlet baru di Bandung untuk menjangkau lebih banyak pelanggan yang menyukai Korean crispy chicken.",
      "Outlet baru dilengkapi area dine-in yang nyaman, drive-thru, dan layanan pesan-antar. Cek /locations untuk melihat daftar outlet yang aktif. {/* TODO: ganti isi berita asli */}",
    ],
  },
  {
    slug: "promo-best-couple",
    title: "Promo Best Couple: Diskon Paket Kencan",
    category: "Promo",
    date: "2026-08-20",
    image: "/assets/banner/banner_sauce-selection-guide_yellow_01.jpeg",
    excerpt: "Nikmati diskon paket couple untuk periode tertentu di outlet dan channel pesan antar.",
    body: [
      "Promo berlaku untuk pembelian paket couple di outlet dan channel pesan antar. S&K berlaku. {/* TODO: masukkan detail promo & periode benar */}",
    ],
  },
  {
    slug: "sosial-aksi-sekolah",
    title: "CSR MOCHIKIN: Program Edukasi Sekolah",
    category: "CSR",
    date: "2026-07-02",
    image: "/assets/banner/banner_mochikin-mascot-illustration_clouds_01.jpg",
    excerpt: "Program edukasi untuk anak-anak di sekolah sekitar outlet.",
    body: [
      "Program edukasi untuk anak-anak di beberapa sekolah sekitar outlet, menekankan nilai gizi dan pola makan seimbang. {/* TODO: konten asli & persetujuan mitra */}",
    ],
  },
  {
    slug: "event-korean-fest",
    title: "Korean Fest: Serunya Festival Kuliner Korea",
    category: "Event",
    date: "2026-06-10",
    image: "/assets/feed-sosmed/feed-sosmed_qr-menu-poster_yellow_01.jpg",
    excerpt: "Kegiatan festival kuliner bergaya Korea di sela perayaan kota.",
    body: [
      "Acara ini menampilkan berbagai makanan bergaya Korea beserta kegiatan menarik untuk keluarga. {/* TODO: detail acara */}",
    ],
  },
];

export interface JobItem {
  slug: string;
  title: string;
  location: string;
  department: "Outlet" | "Kitchen" | "Marketing" | "Corporate";
  type: "Full-time" | "Part-time" | "Magang";
  postedDate: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
}

export const JOB_ITEMS: JobItem[] = [
  {
    slug: "crew-outlet-bandung",
    title: "Crew Outlet",
    location: "Bandung",
    department: "Outlet",
    type: "Full-time",
    postedDate: "2026-10-01",
    description:
      "Melayani pelanggan di outlet dengan standar pelayanan MOCHIKIN: penerimaan pesanan, penyajian, dan perawatan outlet.",
    responsibilities: ["Melayani pelanggan di kasir dan area dining", "Menyiapkan menu sesuai SOP", "Menjaga kebersihan outlet"],
    qualifications: ["Umur 17–30 tahun", "Komunikatif dan ramah", "Siap bekerja shift"],
  },
  {
    slug: "marketing-specialist-jakarta",
    title: "Marketing Specialist",
    location: "Jakarta",
    department: "Marketing",
    type: "Full-time",
    postedDate: "2026-09-24",
    description: "Merencanakan dan mengeksekusi kampanye marketing digital dan offline untuk brand MOCHIKIN.",
    responsibilities: ["Membuat rencana promosi", "Mengelola media sosial", "Mengevaluasi performa kampanye"],
    qualifications: ["Pengalaman 1–3 tahun di marketing", "Kreatif dan komunikatif", "Mengoptimalkan data kampanye"],
  },
  {
    slug: "kitchen-trainee-bandung",
    title: "Kitchen Trainee (Magang)",
    location: "Bandung",
    department: "Kitchen",
    type: "Magang",
    postedDate: "2026-09-10",
    description: "Program magang untuk belajar SOP dapur di bawah bimbingan kitchen leader.",
    responsibilities: ["Membantu persiapan bahan", "Menjaga kebersihan dapur", "Belajar SOP pengolahan"],
    qualifications: ["Siswa/lulusan SMK Perhotelan", "Disiplin dan bertanggung jawab"],
  },
];

export interface ValueItem {
  title: string;
  description: string;
  icon: string;
}

export const BRAND_VALUES: ValueItem[] = [
  { title: "Family Friendly", description: "Tempat hangat untuk keluarga dan teman degan sajian yang semua orang bisa nikmati.", icon: "👨‍👩‍👧‍👦" },
  { title: "Serve With Pleasure", description: "Kami melayani dengan senang hati, dari sapaan di kasir hingga penyajian di meja.", icon: "💛" },
  { title: "Kualitas", description: "Bahan berkualitas dan proses yang disiplin menjadi fondasi rasa.", icon: "🏆" },
  { title: "Inovasi", description: "Menu dan pengalaman baru terus dikembangkan sesuai selera pelanggan.", icon: "🚀" },
];

export const TIMELINE_MILESTONES = [
  { year: "2021", title: "Awal Mula", description: "MOCHIKIN lahir sebagai brand ayam cispy Korea di Bandung." },
  { year: "2023", title: "Pertumbuhan Outlet", description: "Jejaring outlet mulai berkembang dan brand makin dikenal di kalangan anak muda." },
  { year: "2025", title: "Ekspansi & Digital", description: "Channel pesan antar digital mulai dimanfaatkan agar pelanggan lebih mudah membeli." },
  { year: "2026", title: "Menu Baru & Inovasi", description: "Line-up produk baru dirilis untuk melengkapi favorit pelanggan." },
];

export interface TeamMember {
  name: string;
  role: string;
  photo: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  { name: "Nama Orang 1", role: "Founder & CEO", photo: "https://placehold.co/400x400" },
  { name: "Nama Orang 2", role: "Head of Operations", photo: "https://placehold.co/400x400" },
  { name: "Nama Orang 3", role: "Head of Marketing", photo: "https://placehold.co/400x400" },
  { name: "Nama Orang 4", role: "Head of Kitchen", photo: "https://placehold.co/400x400" },
];

export const IMPACT_STATS = [
  { label: "Outlet Aktif", value: "XX" },
  { label: "Kota", value: "XX" },
  { label: "Pelanggan per Bulan", value: "XX" },
  { label: "Tim MOCHIKIN", value: "XX" },
];

export const RECRUITMENT_STEPS = [
  "Kirim Lamaran",
  "Seleksi Berkas",
  "Interview",
  "Penawaran",
  "Onboarding",
];

export const CAREER_FAQ = [
  { q: "Bagaimana cara melamar di MOCHIKIN?", a: "Klik tombol Lamar pada posisi yang cocok, atau kirim CV ke email HR yang tertera." },
  { q: "Apakah ada program pelatihan?", a: "Ya, setiap posisi memiliki onboarding dan pelatihan sesuai departemen." },
  { q: "Apakah fleksibel dalam shift?", a: "Shift diatur sesuai kebutuhan outlet dan ketersediaan tim." },
  { q: "Apakah bisa magang?", a: "Ya, kami memiliki posisi magang untuk pemula di berbagai departemen." },
];
