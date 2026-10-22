import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import { ChevronRight, ArrowDown } from "lucide-react";
import CareerList from "./CareerList";

export const metadata: Metadata = {
  title: "Karier | MOCHIKIN",
  description: "Bergabung bersama tim MOCHIKIN: temukan lowongan kerja crew dapur, marketing, hingga posisi korporat. Tumbuh bersama brand yang berkembang.",
};

export default function KarierPage() {
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
            <span className="text-gray-900 font-bold">Karier</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight mb-3">Bergabung Bersama Kami</h1>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mb-6">
            Bergabunglah bersama tim yang melayani dengan senang hati — dan tumbuh bersama brand ayam crispy Korea yang berkembang pesat. Berikut lowongan yang sedang terbuka.
          </p>
          <a href="#lowongan" className="inline-flex items-center gap-2 bg-[#FF6B35] hover:bg-[#E55A2B] text-white font-bold py-3.5 px-6 rounded-full shadow-md">
            Lihat Lowongan <ArrowDown className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <CareerList />
      </div>
    </div>
  );
}
