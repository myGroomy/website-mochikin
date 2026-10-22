import React from "react";
import Link from "next/link";
import { ChevronRight, CheckCircle2 } from "lucide-react";

const STEPS = [
  "Pilih menu yang kamu inginkan di halaman Menu.",
  "Klik tombol Pesan, lalu pilih channel (WhatsApp, GoFood, GrabFood, ShopeeFood, atau MOCHIKINelivery).",
  "Kamu akan diarahkan ke platform yang dipilih.",
  "Selesaikan pemesanan & pembayaran di platform tersebut.",
  "Tunggu pesananmu diantar atau ambil di restoran.",
];

export default function CaraPesanPage() {
  return (
    <div className="bg-[#fafafa] min-h-screen pb-20">
      <div className="bg-[#FFF4E6] border-b border-amber-100 py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-xs font-semibold text-gray-500 mb-3">
            <Link href="/" className="hover:text-[#FF6B35]">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gray-900 font-bold">Cara Pesan</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight mb-3">Cara pesan</h1>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl">Ikuti langkah mudah berikut untuk memesan.</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <ol className="space-y-4">
          {STEPS.map((s, i) => (
            <li key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <CheckCircle2 className="w-6 h-6 text-[#FF6B35] flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">{s}</span>
            </li>
          ))}
        </ol>
        <div className="mt-8">
          <Link href="/order" className="inline-flex items-center justify-center gap-2 bg-[#FF6B35] hover:bg-[#E55A2B] text-white font-bold py-3.5 px-6 rounded-full shadow-md transition-colors">
            Mulai pesan
          </Link>
        </div>
      </div>
    </div>
  );
}
