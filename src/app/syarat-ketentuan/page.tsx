import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan | MOCHIKIN",
  description: "Syarat dan ketentuan penggunaan website MOCHIKIN.",
};

export default function SyaratKetentuanPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10">
        <Link href="/" className="text-xs font-bold text-[#FF6B35] hover:text-[#E55A2B]">
          ← Kembali ke Beranda
        </Link>
        <h1 className="text-3xl font-black text-gray-900 mt-4 mb-6">Syarat &amp; Ketentuan</h1>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4 text-sm text-gray-600 leading-relaxed">
          <p>Dengan menggunakan website ini, kamu menyetujui syarat dan ketentuan di bawah ini.</p>
          {/* TODO: ganti dengan teks legal resmi dari owner */}
          <ul className="list-disc pl-5 space-y-2">
            <li>Seluruh konten (logo, foto, teks) merupakan milik MOCHIKIN dan dilindungi hukum.</li>
            <li>Harga dan ketersediaan menu dapat berbeda antar outlet dan channel pesan.</li>
            <li>Promosi berlaku dengan syarat &amp; ketentuan yang berlaku pada masing-masing channel.</li>
          </ul>
          <p className="text-[11px] text-gray-400 uppercase tracking-wide font-bold">⚠️ Konten placeholder — TODO: teks legal asli</p>
        </div>
      </div>
    </div>
  );
}
