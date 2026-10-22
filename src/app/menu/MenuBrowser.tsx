"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ChevronRight, X, ShoppingBag, Flame, Sparkles } from "lucide-react";
import { MENU_CATEGORIES, type MenuItem } from "@/data/mochikinData";

export default function MenuBrowser({
  categories = MENU_CATEGORIES,
  items,
}: {
  categories?: string[];
  items: MenuItem[];
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const allItemsList = items;

  const filteredItems = allItemsList.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#fafafa] min-h-screen pb-20">
      {/* Menu Header Cover */}
      <div className="bg-[#FFF4E6] border-b border-amber-100 py-12 lg:py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-gray-500 mb-3">
              <Link href="/" className="hover:text-[#FF6B35]">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-gray-900 font-bold">Menu</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
              Nikmati menu <br className="hidden sm:inline" />
              pilihan terbaik
            </h1>
            <p className="text-gray-600 text-sm sm:text-base mt-2 max-w-lg">
              Kelezatan autentik dengan bahan pilihan berkualitas dan jaminan 100% Halal untuk seluruh keluarga Indonesia.
            </p>
          </div>

          <div className="relative w-64 sm:w-80 h-40 sm:h-48 self-center md:self-auto">
            <Image
              src="https://mochikin.id/assets/img/menu/menu-pages_.png"
              alt="Menu MOCHIKIN"
              fill
              sizes="(max-width: 768px) 256px, 320px"
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Search Bar & Filters */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari burger, ayam, minuman..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] shadow-sm"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="text-xs text-gray-500 font-medium">
            Menampilkan <span className="font-bold text-gray-900">{filteredItems.length}</span> pilihan menu
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 scrollbar-none mb-10">
          <button
            type="button"
            onClick={() => setSelectedCategory("All")}
            className={`flex-shrink-0 px-5 py-2 rounded-full text-xs sm:text-sm font-extrabold transition-all shadow-sm ${
              selectedCategory === "All"
                ? "bg-[#FF6B35] text-white shadow-md"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            Semua Menu
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`flex-shrink-0 px-5 py-2 rounded-full text-xs sm:text-sm font-extrabold transition-all shadow-sm ${
                selectedCategory === cat
                  ? "bg-[#FF6B35] text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 shadow-sm max-w-md mx-auto my-12">
            <div className="w-16 h-16 bg-red-50 text-[#FF6B35] rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Menu Tidak Ditemukan</h3>
            <p className="text-xs text-gray-500 mb-6">
              Tidak ada menu yang sesuai dengan kata kunci &ldquo;{searchQuery}&rdquo;.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="bg-[#FF6B35] text-white text-xs font-bold px-6 py-2.5 rounded-full"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="group bg-white rounded-3xl p-5 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-square w-full mb-4 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider block mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-extrabold text-gray-900 text-sm sm:text-base leading-snug group-hover:text-[#FF6B35] transition-colors line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-gray-50 flex items-center justify-between">
                  <span className="font-extrabold text-gray-900 text-sm">{item.price}</span>
                  <button
                    type="button"
                    className="w-8 h-8 rounded-full bg-[#FFD166] hover:bg-[#E6B84A] text-gray-900 flex items-center justify-center transition-colors shadow-sm"
                    aria-label="Lihat detail"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Item Detail Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedItem(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[4/3] w-full max-w-xs mx-auto mb-6">
              <Image
                src={selectedItem.image}
                alt={selectedItem.name}
                fill
                sizes="320px"
                className="object-contain"
              />
            </div>

            <div className="space-y-4 text-center sm:text-left">
              <div>
                <span className="inline-block px-3 py-1 bg-red-100 text-[#FF6B35] font-black text-xs uppercase tracking-wider rounded-full mb-2">
                  {selectedItem.category}
                </span>
                <h3 className="text-2xl font-black text-gray-900">{selectedItem.name}</h3>
                <p className="text-lg font-bold text-[#FF6B35] mt-1">{selectedItem.price}</p>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed">{selectedItem.description}</p>

              {/* Nutrition info pill */}
              <div className="grid grid-cols-2 gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100 text-xs text-left">
                <div className="flex items-center space-x-2">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <div>
                    <p className="text-gray-400 font-medium">Energi</p>
                    <p className="font-bold text-gray-800">{selectedItem.calories || "350 kkal"}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-yellow-500" />
                  <div>
                    <p className="text-gray-400 font-medium">Kualitas</p>
                    <p className="font-bold text-gray-800">100% Halal</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <a
                  href="/order"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#FFD166] hover:bg-[#E6B84A] text-gray-900 font-black py-3 px-6 rounded-full text-sm flex items-center justify-center shadow-md transition-all"
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Pesan Sekarang via MOCHIKINelivery
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
