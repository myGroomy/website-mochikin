"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Calendar, X, ExternalLink } from "lucide-react";
import { PROMOS_DATA, Promo } from "@/data/mcdData";

export default function PromoPage() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedPromo, setSelectedPromo] = useState<Promo | null>(null);

  const filteredPromos = PROMOS_DATA.filter((p) => {
    if (activeFilter === "all") return true;
    return p.category === activeFilter;
  });

  return (
    <div className="bg-[#fafafa] min-h-screen pb-20">
      {/* Promo Header Cover */}
      <div className="bg-gradient-to-r from-red-600 to-[#db0007] text-white py-14 lg:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center space-x-2 text-xs font-semibold text-red-200 mb-3">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-bold">Promo</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-3">
            Promo McDonald&apos;s Indonesia
          </h1>
          <p className="text-red-100 text-sm sm:text-base max-w-xl">
            Nikmati berbagai penawaran spesial, diskon menarik McDelivery, dan promo eksklusif aplikasi McDonald&apos;s untuk Anda.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Category Tabs */}
        <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-10 overflow-x-auto pb-2">
          {[
            { id: "all", label: "Semua Promo" },
            { id: "kegiatan", label: "Promo Kegiatan" },
            { id: "menu", label: "Promo Menu" },
            { id: "cashless", label: "Promo Cashless" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveFilter(tab.id)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all shadow-sm ${
                activeFilter === tab.id
                  ? "bg-[#db0007] text-white shadow-md scale-105"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Promo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPromos.map((promo) => (
            <div
              key={promo.id}
              id={promo.slug}
              onClick={() => setSelectedPromo(promo)}
              className="group flex flex-col bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-50">
                <Image
                  src={promo.image}
                  alt={promo.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-red-700 bg-red-50 mb-3">
                    {promo.categoryLabel}
                  </span>
                  <h3 className="font-extrabold text-gray-900 text-lg leading-snug group-hover:text-[#db0007] transition-colors line-clamp-2">
                    {promo.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                    {promo.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center text-xs text-gray-500 font-medium">
                  <Calendar className="w-4 h-4 mr-2 text-[#db0007]" />
                  <span>Berlaku hingga {promo.expiryDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Promo Detail Modal */}
      {selectedPromo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedPromo(null)}
        >
          <div
            className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedPromo(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden mb-6 shadow-sm">
              <Image
                src={selectedPromo.image}
                alt={selectedPromo.name}
                fill
                sizes="500px"
                className="object-cover"
              />
            </div>

            <div className="space-y-4">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-red-700 bg-red-50">
                {selectedPromo.categoryLabel}
              </span>
              <h3 className="text-2xl font-black text-gray-900 leading-tight">
                {selectedPromo.name}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {selectedPromo.description}
              </p>

              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-center text-xs text-gray-600">
                <Calendar className="w-4 h-4 mr-2 text-[#db0007]" />
                <span className="font-semibold">Masa Berlaku: Hingga {selectedPromo.expiryDate}</span>
              </div>

              <div className="pt-3 flex gap-3">
                <a
                  href="https://smart.link/ngzf73egtu2ip"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#ffbc0d] hover:bg-[#e5a80a] text-gray-900 font-extrabold py-3 px-6 rounded-full text-sm flex items-center justify-center shadow-md transition-all"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Klaim Promo di McDelivery
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
