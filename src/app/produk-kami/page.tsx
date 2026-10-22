import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import { ChevronRight, Star } from "lucide-react";
import ProductCatalog from "./ProductCatalog";
import { getAllMenuItems, getFeaturedMenuItems } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Produk Kami | MOCHIKIN",
  description:
    "Jelajahi menu lengkap MOCHIKIN: ayam krispy Korea, topokki, burger, camilan, minuman, sampai paket keluarga. Lihat harga dan pesan lewat channel favoritmu.",
};

export default async function ProdukKamiPage() {
  const [all, featured] = await Promise.all([getAllMenuItems(), getFeaturedMenuItems()]);

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
            <span className="text-gray-900 font-bold">Produk Kami</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight mb-3">Produk Kami</h1>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl">
            Dari ayam krispy Korea hingga dessert, semua menu MOCHIKIN ada di sini. {all.length} menu siap dikulik!
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Produk unggulan */}
        <h2 className="text-2xl font-black text-gray-900 mb-1">Produk Unggulan</h2>
        <p className="text-sm text-gray-500 mb-6">Menu yang paling dicari pelanggan.</p>
        <div className="grid gap-5 sm:grid-cols-3 mb-12">
          {featured.map((item) => (
            <article key={`featured-${item.id}`} className="bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
              <div className="p-5">
                <span className="inline-flex items-center gap-1 bg-[#FFD166] text-gray-900 text-[10px] font-bold px-2 py-0.5 rounded-full mb-2">
                  <Star className="w-3 h-3" aria-hidden="true" /> Unggulan
                </span>
                <h3 className="font-bold text-gray-900 mb-1">{item.name}</h3>
                <p className="text-xs text-gray-500 mb-3">{item.description}</p>
                <p className="text-lg font-black text-[#FF6B35]">{item.price}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Katalog lengkap */}
        <h2 className="text-2xl font-black text-gray-900 mb-6">Semua Menu</h2>
        <ProductCatalog items={all} />

        {/* Paket & promo */}
        <h2 className="text-2xl font-black text-gray-900 mt-14 mb-2">Paket &amp; Promo</h2>
        <p className="text-sm text-gray-500 mb-5">Bundling hemat untuk makan bareng keluarga atau teman.</p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/promo"
            className="inline-flex items-center justify-center bg-[#FFD166] hover:bg-[#E6B84A] text-gray-900 font-bold py-3 px-6 rounded-full shadow-md"
          >
            Lihat Promo Aktif
          </Link>
          <Link
            href="/menu"
            className="inline-flex items-center justify-center border-2 border-[#FF6B35] text-[#FF6B35] hover:bg-[#FFF4E6] font-bold py-3 px-6 rounded-full"
          >
            Halaman Menu Lengkap
          </Link>
        </div>
      </div>

      {/* CTA penutup */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 text-center">
        <h2 className="text-2xl font-black text-gray-900 mb-2">Lapar? Pesan sekarang.</h2>
        <p className="text-gray-600 mb-5 text-sm">Pilih channel pesan favoritmu: WhatsApp, GoFood, GrabFood, atau ShopeeFood.</p>
        <Link
          href="/order"
          className="inline-flex items-center justify-center gap-2 bg-[#FF6B35] hover:bg-[#E55A2B] text-white font-bold py-3.5 px-6 rounded-full shadow-md"
        >
          Pesan Sekarang
        </Link>
      </div>
    </div>
  );
}
