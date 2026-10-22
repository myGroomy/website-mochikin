import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kebijakan Privasi | MOCHIKIN",
  description: "Kebijakan privasi website MOCHIKIN.",
};

export default function KebijakanPrivasiPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10">
        <Link href="/" className="text-xs font-bold text-[#FF6B35] hover:text-[#E55A2B]">
          ← Kembali ke Beranda
        </Link>
        <h1 className="text-3xl font-black text-gray-900 mt-4 mb-6">Kebijakan Privasi</h1>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4 text-sm text-gray-600 leading-relaxed">
          <p>MOCHIKIN menghargai privasi setiap pengunjung website ini.</p>
          {/* TODO: ganti dengan kebijakan privasi resmi dari owner */}
          <ul className="list-disc pl-5 space-y-2">
            <li>Website ini tidak menyimpan data pribadi kecuali kamu mengirimkannya secara sukarela.</li>
            <li>Pemesanan dilakukan melalui channel pihak ketiga (WhatsApp, GoFood, GrabFood, ShopeeFood) yang memiliki kebijakan privasi masing-masing.</li>
            <li>Data yang dikirim melalui dapat digunakan untuk membalas pesanmu.</li>
          </ul>
          <p className="text-[11px] text-gray-400 uppercase tracking-wide font-bold">⚠️ Konten placeholder — TODO: teks privasi asli</p>
        </div>
      </div>
    </div>
  );
}
