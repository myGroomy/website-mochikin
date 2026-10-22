"use client";

import React from "react";
import Link from "next/link";
import { Flame, Star, ChevronDown, SearchX, Search } from "lucide-react";
import { ALL_MENU_ITEMS, MENU_CATEGORIES } from "@/data/mochikinData";
import type { MenuItem } from "@/data/mochikinData";
function Label({ item }: { item: MenuItem }) {
  const name = item.name.toLowerCase();
  if (name.includes("spicy") || name.includes("pedas") || name.includes("hot"))
    return (
      <span className="absolute top-3 left-3 inline-flex items-center gap-1 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
        <Flame className="w-3 h-3" aria-hidden="true" /> Pedas
      </span>
    );
  return null;
}

export default function ProductCatalog({
  items = Object.values(ALL_MENU_ITEMS).flat(),
  categories: inputCategories = MENU_CATEGORIES,
}: {
  items?: MenuItem[];
  categories?: string[];
}) {
  const all = items;
  const [category, setCategory] = React.useState("Semua");
  const [query, setQuery] = React.useState("");
  const [openNutrition, setOpenNutrition] = React.useState<string | null>(null);

  const categories = React.useMemo(() => ["Semua", ...inputCategories], [inputCategories]);

  const filtered = all.filter((item) => {
    const matchCat = category === "Semua" || item.category === category;
    const q = query.toLowerCase();
    const matchQ = !q || item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);
    return matchCat && matchQ;
  });

  // Best seller: item favorit ditandai berdasar nama (id CMS bisa berubah)
  const bestSellerNames = new Set(["Mochi Burger®", "PaNas 1"]);

  return (
    <div>
      {/* Tab/filter kategori + pencarian */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
        <div className="relative mb-4">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
          <label htmlFor="search-menu" className="sr-only">
            Cari menu
          </label>
          <input
            id="search-menu"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari menu favoritmu..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/40 text-sm"
          />
        </div>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Kategori menu">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={category === c}
              onClick={() => setCategory(c)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${
                category === c ? "bg-[#FF6B35] text-white shadow-md" : "bg-[#FFF4E6] text-gray-700 hover:bg-[#FFE4CC]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        // Empty state
        <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-10 text-center">
          <SearchX className="w-10 h-10 mx-auto text-gray-300 mb-3" aria-hidden="true" />
          <p className="text-gray-600 mb-2 font-semibold">Menu tidak ditemukan.</p>
          <p className="text-sm text-gray-400">Coba kata kunci atau kategori lain.</p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((item) => (
            <article key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt={item.name} className="w-full h-40 object-cover" />
                <Label item={item} />
                {bestSellerNames.has(item.name) && (
                  <span className="absolute top-3 right-3 inline-flex items-center gap-1 bg-[#FFD166] text-gray-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    <Star className="w-3 h-3" aria-hidden="true" /> Best Seller
                  </span>
                )}
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-bold text-gray-900 text-sm mb-1">{item.name}</h3>
                <p className="text-xs text-gray-500 line-clamp-2 mb-2">{item.description}</p>
                <p className="text-sm font-bold text-[#FF6B35] mb-3">{item.price ?? "Cek channel pesan"}</p>

                {/* Info gizi accordion */}
                <button
                  type="button"
                  onClick={() => setOpenNutrition(openNutrition === item.id ? null : item.id)}
                  aria-expanded={openNutrition === item.id}
                  className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-500 hover:text-[#FF6B35] mb-2"
                >
                  Info gizi
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openNutrition === item.id ? "rotate-180" : ""}`} aria-hidden="true" />
                </button>
                {openNutrition === item.id && (
                  <div className="bg-[#FFF9F0] rounded-xl p-3 text-[11px] text-gray-600 mb-3">
                    {/* TODO: ganti dengan data gizi & alergen resmi */}
                    <p>
                      <strong>Kalori:</strong> {item.calories ?? "info segera"}
                    </p>
                    <p className="mt-1 text-gray-400">
                      Alergen: silakan cek halaman kontak resmi MOCHIKIN. (TODO: data alergen)
                    </p>
                  </div>
                )}

                <Link
                  href="/order"
                  className="mt-auto inline-flex items-center justify-center bg-[#FF6B35] hover:bg-[#E55A2B] text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-colors"
                >
                  Pesan
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
