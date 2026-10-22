"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, SearchX, Download, Mail, Phone } from "lucide-react";
import { NEWS_ITEMS } from "@/data/pagesData";
import type { NewsItem } from "@/data/pagesData";

const CATEGORIES = ["Semua", "Siaran Pers", "Promo", "Event", "CSR"] as const;

function NewsCard({ item }: { item: NewsItem }) {
  return (
    <article className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={item.image} alt={item.title} className="w-full h-40 object-cover" />
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wide bg-[#FFF4E6] text-[#FF6B35] px-2 py-0.5 rounded-md">{item.category}</span>
          <time dateTime={item.date} className="text-[11px] text-gray-400">
            {new Date(item.date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
          </time>
        </div>
        <h3 className="font-bold text-gray-900 text-sm mb-1.5">{item.title}</h3>
        <p className="text-xs text-gray-500 line-clamp-2 mb-3">{item.excerpt}</p>
        <Link
          href={`/newsroom/${item.slug}`}
          className="mt-auto inline-flex items-center gap-1 text-xs font-bold text-[#FF6B35] hover:text-[#E55A2B]"
        >
          Baca Selengkapnya <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

export default function NewsroomList() {
  const [category, setCategory] = React.useState<string>("Semua");
  const [visible, setVisible] = React.useState(6);

  const filtered = NEWS_ITEMS.filter((n) => category === "Semua" || n.category === category);
  const featured = filtered[0];
  const rest = filtered.slice(1, visible);

  return (
    <div>
      {/* Filter kategori */}
      <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Kategori berita">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            role="tab"
            aria-selected={category === c}
            onClick={() => {
              setCategory(c);
              setVisible(6);
            }}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${
              category === c ? "bg-[#FF6B35] text-white shadow-md" : "bg-white text-gray-700 border border-gray-200 hover:bg-[#FFF4E6]"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Berita utama */}
      {featured ? (
        <article className="bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden mb-10">
          <div className="grid md:grid-cols-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={featured.image} alt={featured.title} className="w-full h-64 md:h-full object-cover" />
            <div className="p-6 lg:p-8 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wide bg-[#FF6B35] text-white px-2 py-0.5 rounded-md">Utama</span>
                <span className="text-[10px] font-bold uppercase tracking-wide bg-[#FFF4E6] text-[#FF6B35] px-2 py-0.5 rounded-md">{featured.category}</span>
                <time dateTime={featured.date} className="text-[11px] text-gray-400">
                  {new Date(featured.date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                </time>
              </div>
              <h2 className="text-xl lg:text-2xl font-black text-gray-900 mb-2">{featured.title}</h2>
              <p className="text-sm text-gray-500 mb-4">{featured.excerpt}</p>
              <Link
                href={`/newsroom/${featured.slug}`}
                className="self-start inline-flex items-center gap-2 bg-[#FF6B35] hover:bg-[#E55A2B] text-white font-bold text-sm py-2.5 px-5 rounded-full"
              >
                Baca Selengkapnya <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </article>
      ) : null}

      {/* Daftar berita */}
      {rest.length === 0 && (filtered.length > 0) ? (
        <p className="text-sm text-gray-500 text-center pb-6">Belum ada berita lain untuk kategori ini.</p>
      ) : null}
      {rest.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((item) => (
            <NewsCard key={item.slug} item={item} />
          ))}
        </div>
      ) : (filtered.length === 0) ? (
        // Empty state
        <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-10 text-center">
          <SearchX className="w-10 h-10 mx-auto text-gray-300 mb-3" aria-hidden="true" />
          <p className="text-gray-600 font-semibold">Belum ada berita pada kategori ini.</p>
        </div>
      ) : null}

      {/* Muat lebih banyak */}
      {filtered.slice(1).length > visible - 1 ? (
        <div className="text-center mt-8">
          <button
            type="button"
            onClick={() => setVisible((v) => v + 6)}
            className="inline-flex items-center justify-center border-2 border-[#FF6B35] text-[#FF6B35] hover:bg-[#FFF4E6] font-bold py-3 px-6 rounded-full"
          >
            Muat Lebih Banyak
          </button>
        </div>
      ) : null}

      {/* Media kit + kontak media */}
      <div className="grid gap-5 md:grid-cols-2 mt-12">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-gray-900 mb-2">Media Kit</h2>
          <p className="text-sm text-gray-500 mb-4">Logo, panduan brand, dan foto resmi MOCHIKIN untuk media.</p>
          {/* TODO: ganti dengan link unduhan asset resmi */}
          <a
            href="mailto:media@mochikin.id"
            className="inline-flex items-center gap-2 border-2 border-[#FF6B35] text-[#FF6B35] hover:bg-[#FFF4E6] font-bold text-sm py-2.5 px-5 rounded-full"
          >
            <Download className="w-4 h-4" aria-hidden="true" /> Unduh Media Kit (TODO)
          </a>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-gray-900 mb-2">Kontak Media</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#FF6B35]" aria-hidden="true" /> media@mochikin.id <span className="text-[10px] text-gray-400">(TODO)</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#FF6B35]" aria-hidden="true" /> (021) XXX XXXX <span className="text-[10px] text-gray-400">(TODO)</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Newsletter (UI saja) */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mt-8">
        <h2 className="font-bold text-gray-900 mb-1">Berlangganan Update</h2>
        <p className="text-sm text-gray-500 mb-4">Dapatkan promo dan berita terbaru MOCHIKIN di email kamu.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Terima kasih! (UI demo — TODO integrasi backend)");
          }}
          className="flex flex-col sm:flex-row gap-3 max-w-md"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email kamu
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            placeholder="email@contoh.com"
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/40 text-sm"
          />
          <button type="submit" className="bg-[#FF6B35] hover:bg-[#E55A2B] text-white font-bold text-sm py-2.5 px-5 rounded-xl">
            Berlangganan
          </button>
        </form>
      </div>

      {/* CTA penutup */}
      <div className="text-center mt-12">
        <Link href="/order" className="inline-flex items-center justify-center gap-2 bg-[#FF6B35] hover:bg-[#E55A2B] text-white font-bold py-3.5 px-6 rounded-full shadow-md">
          Pesan Sekarang
        </Link>
      </div>
    </div>
  );
}
