import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fafafa] px-4 text-center">
      <p className="text-6xl font-black text-[#FF6B35] mb-3">404</p>
      <h1 className="text-2xl font-black text-gray-900 mb-2">Halaman tidak ditemukan</h1>
      <p className="text-sm text-gray-500 mb-6 max-w-md">
        Halaman yang kamu cari mungkin sudah dipindahkan atau tidak pernah ada. Yuk kembali ke jalur yang jelas!
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/" className="bg-[#FF6B35] hover:bg-[#E55A2B] text-white font-bold py-3 px-6 rounded-full shadow-md">
          Ke Beranda
        </Link>
        <Link href="/menu" className="border-2 border-[#FF6B35] text-[#FF6B35] hover:bg-[#FFF4E6] font-bold py-3 px-6 rounded-full">
          Lihat Menu
        </Link>
      </div>
    </div>
  );
}
