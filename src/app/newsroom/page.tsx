import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import { ChevronRight, Newspaper } from "lucide-react";
import NewsroomList from "./NewsroomList";

export const metadata: Metadata = {
  title: "Newsroom | MOCHIKIN",
  description: "Siaran pers, promo, event, dan kegiatan CSR resmi dari MOCHIKIN.",
};

export default function NewsroomPage() {
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
            <span className="text-gray-900 font-bold">Newsroom</span>
          </nav>
          <div className="flex items-center gap-3 mb-3">
            <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[#FFD166] text-gray-900">
              <Newspaper className="w-6 h-6" aria-hidden="true" />
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">Newsroom</h1>
          </div>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl">
            Kabar resmi dari MOCHIKIN: siaran pers, promo terbaru, event, dan kegiatan sosial.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <NewsroomList />
      </div>
    </div>
  );
}
