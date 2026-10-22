import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Heart, Star, Lightbulb, Rocket, ArrowRight, Briefcase } from "lucide-react";
import { BRAND_VALUES, TIMELINE_MILESTONES, TEAM_MEMBERS } from "@/data/pagesData";

export const metadata: Metadata = {
  title: "Tentang Kami | MOCHIKIN",
  description: "Cerita, visi-misi, nilai, dan perjalanan MOCHIKIN — Korean Chickennya Indonesia, ayam crispy Korea halal dari Bandung.",
};

const VALUE_ICONS = [Heart, Star, Lightbulb, Rocket];

export default function TentangPage() {
  return (
    <div className="bg-[#fafafa] min-h-screen pb-20">
      {/* Hero */}
      <div className="bg-[#FFF4E6] border-b border-amber-100 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-3">
            <Link href="/" className="hover:text-[#FF6B35]">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gray-900 font-bold">Tentang Kami</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight mb-2">Tentang MOCHIKIN</h1>
          <p className="text-lg font-bold text-[#FF6B35] mb-3">Korean Chickennya Indonesia</p>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl">
            Brand ayam crispy Korea halal yang berasal dari Bandung — dibuat untuk semua kalangan yang suka pedas, kriuk, dan penuh rasa.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Cerita kami */}
        <section className="grid md:grid-cols-2 gap-8 items-center mb-14">
          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-4">Cerita Kami</h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
              MOCHIKIN lahir di Bandung dari obsesi sederhana: ayam crispy gaya Korea yang konsisten kriuknya dan marinasi yang meresap sampai ke tulang.
              Kami menggabungkan teknik Korean fried chicken dengan saus-saus otentik yang dimatangkan sendiri.
            </p>
            {/* TODO: lengkapi cerita asal-usul versi owner brand */}
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Hari ini, MOCHIKIN melayani pelanggan melalui dine-in di outlet dan channel delivery favorit — WhatsApp, GoFood, GrabFood, dan ShopeeFood.
            </p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/produk/produk_korean-crispy-chicken_plate_01.jpg"
            alt="Ayam krispy khas Korea MOCHIKIN"
            className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-md"
          />
        </section>

        {/* Visi & Misi */}
        <h2 className="text-2xl font-black text-gray-900 mb-6">Visi &amp; Misi</h2>
        <div className="grid gap-5 md:grid-cols-2 mb-14">
          {/* TODO: konfirmasi visi-misi resmi dari owner */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-2 text-lg">Visi</h3>
            <p className="text-sm text-gray-600 leading-relaxed">Menjadi brand Korean crispy chicken yang paling dicintai di Indonesia. (TODO: visi resmi)</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-2 text-lg">Misi</h3>
            <ul className="text-sm text-gray-600 leading-relaxed list-disc pl-5 space-y-1">
              <li>Menyajikan ayam crispy dengan standar rasa dan tekstur paling konsisten.</li>
              <li>Membuat setiap pelanggan dilayani dengan senang hati.</li>
              <li>Tumbuh bersama komunitas dan channel pesan yang mudah diakses.</li>
            </ul>
          </div>
        </div>

        {/* Nilai-nilai brand */}
        <h2 className="text-2xl font-black text-gray-900 mb-6">Nilai-Nilai Kami</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-14">
          {BRAND_VALUES.map((v, i) => {
            const Icon = VALUE_ICONS[i % VALUE_ICONS.length];
            return (
              <div key={v.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#FFD166] text-gray-900 mb-3">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </span>
                <h3 className="font-bold text-gray-900 mb-1">{v.title}</h3>
                <p className="text-sm text-gray-500">{v.description}</p>
              </div>
            );
          })}
        </div>

        {/* Filosofi logo & maskot */}
        <section className="grid md:grid-cols-2 gap-8 items-center bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8 mb-14">
          <Image
            src="/assets/logo/logo_mochikin-primary-logo_outline_01.png"
            alt="Logo MOCHIKIN"
            width={400}
            height={200}
            className="mx-auto max-h-40 object-contain"
          />
          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-3">Filosofi Logo</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-2">
              Warna <strong className="text-[#FF6B35]">oranye</strong> merepresentasikan semangat dan kehangatan sajian; aksen{" "}
              <strong>chartreuse kuning cerah</strong> menghadirkan kesan ceria, muda, dan menggugah selera — seperti pengalaman memakan ayam
              crispy Korea yang menyenangkan.
            </p>
            <p className="text-[11px] text-gray-400">
              {/* TODO: ganti dengan filosofi logo & maskot resmi dari brand guideline */}
              Filosofi maskot belum dirinci — lihat brand guideline MOCHIKIN. (TODO)
            </p>
          </div>
        </section>

        {/* Perjalanan kami */}
        <h2 className="text-2xl font-black text-gray-900 mb-6">Perjalanan Kami</h2>
        <ol className="relative border-l-2 border-[#FF6B35]/30 space-y-8 ml-3 mb-14">
          {TIMELINE_MILESTONES.map((m) => (
            <li key={m.year} className="pl-6 relative">
              <span className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-[#FF6B35] border-4 border-white shadow" aria-hidden="true" />
              <p className="text-xs font-black text-[#FF6B35] uppercase tracking-wide mb-1">{m.year}</p>
              <h3 className="font-bold text-gray-900 mb-1">{m.title}</h3>
              <p className="text-sm text-gray-500 max-w-xl">{m.description}</p>
            </li>
          ))}
        </ol>
        <p className="text-[11px] text-gray-400 mb-14 uppercase tracking-wide font-bold">⚠️ Timeline placeholder — sesuaikan dengan riwayat aktual brand (TODO)</p>

        {/* Tim / Manajemen */}
        <h2 className="text-2xl font-black text-gray-900 mb-2">Tim Kami</h2>
        <p className="text-[11px] text-gray-400 mb-5 uppercase tracking-wide font-bold">⚠️ Nama &amp; foto placeholder — ganti dengan data asli (TODO)</p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-14">
          {TEAM_MEMBERS.map((t) => (
            <article key={t.name} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={t.photo} alt={`Foto ${t.name} (placeholder)`} className="w-20 h-20 rounded-full object-cover mx-auto mb-3 bg-gray-100" />
              <h3 className="font-bold text-gray-900 text-sm">{t.name}</h3>
              <p className="text-xs text-gray-500">{t.role}</p>
            </article>
          ))}
        </div>

        {/* CTA penutup */}
        <div className="text-center">
          <h2 className="text-2xl font-black text-gray-900 mb-5">Jelajahi MOCHIKIN lebih dalam</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/produk-kami" className="inline-flex items-center justify-center gap-2 bg-[#FF6B35] hover:bg-[#E55A2B] text-white font-bold py-3.5 px-6 rounded-full shadow-md">
              Produk Kami <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link href="/karier" className="inline-flex items-center justify-center gap-2 border-2 border-[#FF6B35] text-[#FF6B35] hover:bg-[#FFF4E6] font-bold py-3.5 px-6 rounded-full">
              <Briefcase className="w-4 h-4" aria-hidden="true" /> Karier
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
