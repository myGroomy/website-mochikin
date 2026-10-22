import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Mail, PenLine } from "lucide-react";
import { COMMITMENT_PILLARS, QUALITY_STEPS, IMPACT_STATS } from "@/data/pagesData";

export const metadata: Metadata = {
  title: "Komitmen Kami | MOCHIKIN",
  description:
    "Komitmen MOCHIKIN terhadap kualitas bahan, keamanan pangan, pelayanan, serta peduli lingkungan dan komunitas di sekitar outlet kami.",
};

export default function KomitmenPage() {
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
            <span className="text-gray-900 font-bold">Komitmen</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight mb-3">Komitmen Kami</h1>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl">
            Setiap porsi yang keluar dari dapur kami membawa janji: bahan berkualitas, proses yang disiplin, dan pelayanan dengan senang hati.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* 4 pilar komitmen */}
        <h2 className="text-2xl font-black text-gray-900 mb-6">4 Pilar Komitmen</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-14">
          {COMMITMENT_PILLARS.map((p) => (
            <article key={p.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <span className="text-3xl mb-3 inline-block" aria-hidden="true">
                {p.icon}
              </span>
              <h3 className="font-bold text-gray-900 mb-2">{p.title}</h3>
              <p className="text-sm text-gray-500">{p.description}</p>
            </article>
          ))}
        </div>

        {/* Standar kualitas (timeline stepping) */}
        <h2 className="text-2xl font-black text-gray-900 mb-6">Standar Kualitas: Dari Bahan ke Meja</h2>
        <ol className="relative border-l-2 border-[#FF6B35]/30 space-y-8 ml-3 mb-14">
          {QUALITY_STEPS.map((s) => (
            <li key={s.step} className="pl-6 relative">
              <span className="absolute -left-[15px] top-0 w-8 h-8 rounded-full bg-[#FF6B35] text-white text-sm font-black flex items-center justify-center">
                {s.step}
              </span>
              <h3 className="font-bold text-gray-900 mb-1">{s.title}</h3>
              <p className="text-sm text-gray-500 max-w-xl">{s.description}</p>
            </li>
          ))}
        </ol>

        {/* Sertifikasi & legalitas */}
        <h2 className="text-2xl font-black text-gray-900 mb-2">Sertifikasi &amp; Legalitas</h2>
        <p className="text-sm text-gray-500 mb-6">
          Daftar sertifikasi dan izin resmi MOCHIKIN. {/* TODO: konfirmasi & masukkan sertifikasi asli (halal, BPOM, dll) */}
        </p>
        <div className="grid gap-4 sm:grid-cols-3 mb-14">
          {[
            { name: "Sertifikasi Halal", note: "Menunggu konfirmasi dokumen" },
            { name: "Registrasi BPOM", note: "Menunggu konfirmasi nomor" },
            { name: "Izin Pangan (SIKM)", note: "Menunggu konfirmasi dokumen" },
          ].map((s) => (
            <div key={s.name} className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center">
              <Image src="/assets/logo/logo_mochikin-primary-logo_outline_01.png" alt="" width={48} height={48} className="mx-auto mb-3 opacity-40" />
              <h3 className="font-bold text-gray-800 text-sm">{s.name}</h3>
              <p className="text-[11px] text-gray-400 mt-1">{s.note} — TODO</p>
            </div>
          ))}
        </div>

        {/* Program komunitas / keberlanjutan */}
        <h2 className="text-2xl font-black text-gray-900 mb-6">Program Komunitas &amp; Keberlanjutan</h2>
        {/* TODO: ganti dengan program asli yang sudah berjalan */}
        <div className="grid gap-5 sm:grid-cols-3 mb-14">
          {[
            { title: "Sampah Minyak Tepat", desc: "Minyak goreng bekas dari outlet dikumpulkan untuk pengolahan ulang bersama mitra. (TODO)" },
            { title: "Kelas Gizi Anak", desc: "Edukasi pola makan seimbang untuk anak-anak di sekolah sekitar outlet. (TODO)" },
            { title: "Bakti Komunitas", desc: "Kegiatan sosial berkala bersama tim outlet di komunitas sekitar. (TODO)" },
          ].map((c) => (
            <article key={c.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-2">{c.title}</h3>
              <p className="text-sm text-gray-500">{c.desc}</p>
            </article>
          ))}
        </div>

        {/* Angka dampak — dummy */}
        <h2 className="text-2xl font-black text-gray-900 mb-2">Dampak Kami</h2>
        <p className="text-[11px] text-gray-400 mb-4 uppercase tracking-wide font-bold">⚠️ Data placeholder — ganti dengan angka riil</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {IMPACT_STATS.map((st) => (
            <div key={st.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
              <p className="text-3xl font-black text-[#FF6B35] mb-1">{st.value}</p>
              <p className="text-xs font-semibold text-gray-500">{st.label}</p>
            </div>
          ))}
        </div>

        {/* CTA penutup */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 text-center">
          <h2 className="text-2xl font-black text-gray-900 mb-2">Punya masukan untuk kami?</h2>
          <p className="text-gray-600 mb-5 text-sm">Masukan yang membangun selalu kami terima dengan senang hati.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="mailto:halo@mochikin.id"
              className="inline-flex items-center justify-center gap-2 bg-[#FF6B35] hover:bg-[#E55A2B] text-white font-bold py-3.5 px-6 rounded-full shadow-md"
            >
              <Mail className="w-4 h-4" aria-hidden="true" /> Email Kami
            </a>
            <Link
              href="/tentang"
              className="inline-flex items-center justify-center gap-2 border-2 border-[#FF6B35] text-[#FF6B35] hover:bg-[#FFF4E6] font-bold py-3.5 px-6 rounded-full"
            >
              <PenLine className="w-4 h-4" aria-hidden="true" /> Tentang MOCHIKIN
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
