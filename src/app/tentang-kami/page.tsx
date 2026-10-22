"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Leaf, Store, HeartHandshake, Info, Newspaper, Briefcase } from "lucide-react";

const SECTIONS = [
  { id: "tentang", title: "Tentang Kami", icon: Info, body: "MOCHIKIN adalah brand Korean crispy chicken halal terworth it di Bandung. Kami menyajikan ayam cispy Korea dengan bumbu khas dan kualitas terbaik." },
  { id: "produk-kami", title: "Produk Kami", icon: Store, body: "Lini produk kami meliputi Ayam Krispy, Topokki, Burger & Sandwich, Camilan, Minuman, Dessert, Kids Meal, dan Paket Keluarga." },
  { id: "restoran-kami", title: "Restoran Kami", icon: Store, body: "Restoran MOCHIKIN tersebar di seluruh Indonesia, dilengkapi layanan dine-in, drive-thru, dan pesan-antar." },
  { id: "komitmen", title: "Komitmen & Tanggung Jawab", icon: HeartHandshake, body: "Kami berkomitmen pada kualitas bahan, keamanan pangan, keberlanjutan, dan dukungan komunitas." },
  { id: "newsroom", title: "Newsroom", icon: Newspaper, body: "Baca siaran pers, berita terbaru, dan pengumuman resmi MOCHIKIN." },
  { id: "karier", title: "Karier", icon: Briefcase, body: "Bergabunglah bersama kami! Temukan peluang karier di MOCHIKIN dan tumbuh bersama brand yang berkembang pesat." },
];

export default function TentangKamiPage() {
  return (
    <div className="bg-[#fafafa] min-h-screen pb-20">
      <div className="bg-[#FFF4E6] border-b border-amber-100 py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-xs font-semibold text-gray-500 mb-3">
            <Link href="/" className="hover:text-[#FF6B35]">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gray-900 font-bold">Tentang Kami</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight mb-3">Tentang MOCHIKIN</h1>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl">Korean Chickennya Indonesia. Kenali brand, produk, dan komitmen kami.</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="space-y-4">
          {SECTIONS.map((s) => {
            const Icon = s.icon;
            return (
              <section key={s.id} id={s.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 scroll-mt-24">
                <div className="flex items-center gap-3 mb-2">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#FFD166] text-gray-900"><Icon className="w-5 h-5" /></span>
                  <h2 className="text-lg font-bold text-gray-900">{s.title}</h2>
                </div>
                <p className="text-gray-600 text-sm">{s.body}</p>
              </section>
            );
          })}
        </div>
        <div className="mt-8">
          <Link href="/menu" className="inline-flex items-center justify-center gap-2 bg-[#FF6B35] hover:bg-[#E55A2B] text-white font-bold py-3.5 px-6 rounded-full shadow-md">
            Lihat Menu
          </Link>
        </div>
      </div>
    </div>
  );
}
