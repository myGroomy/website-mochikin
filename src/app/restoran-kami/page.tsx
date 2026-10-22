import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import { ChevronRight, Utensils, ShoppingBag, Truck, Users } from "lucide-react";
import RestaurantDirectory from "./RestaurantDirectory";
import { getLocations } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Restoran Kami | MOCHIKIN",
  description: "Temukan outlet MOCHIKIN terdekat: alamat, jam operasional, nomor telepon, dan layanan yang tersedia di setiap gerai.",
};

export default async function RestoranKamiPage() {
  const locations = await getLocations();
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
            <span className="text-gray-900 font-bold">Restoran Kami</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight mb-3">Restoran Kami</h1>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl">
            Temukan outlet MOCHIKIN terdekat untuk dine-in, takeaway, atau pesan antar.
          </p>
        </div>
      </div>

      {/* Peta placeholder */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* TODO: ganti dengan embed peta Google Maps interaktif */}
        <div className="rounded-2xl bg-gradient-to-r from-[#FFD166]/60 to-[#FF6B35]/30 border border-amber-100 h-40 mb-6 flex items-center justify-center">
          <p className="text-gray-700 text-sm font-semibold">🗺️ Peta lokasi outlet — TODO: embed Google Maps</p>
        </div>
        <RestaurantDirectory locations={locations} />
      </div>

      {/* Layanan */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14">
        <h2 className="text-2xl font-black text-gray-900 mb-6">Layanan Kami</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Utensils, title: "Dine-in", desc: "Nikmati sajian hangat di area restoran kami." },
            { icon: ShoppingBag, title: "Takeaway", desc: "Pesan dan bawa pulang dalam kemasan yang menjaga kerenyahan." },
            { icon: Truck, title: "Delivery", desc: "Pesan antar via channel delivery favoritmu." },
            { icon: Users, title: "Pesan Antar Grup", desc: "Untuk acara dan kebutuhan grup besar, hubungi outlet terdekat." },
          ].map((s) => (
            <div key={s.title} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#FFD166] text-gray-900 mb-3">
                <s.icon className="w-5 h-5" aria-hidden="true" />
              </span>
              <h3 className="font-bold text-gray-900 mb-1">{s.title}</h3>
              <p className="text-sm text-gray-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA penutup */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 text-center">
        <h2 className="text-2xl font-black text-gray-900 mb-2">Tidak menemukan outlet terdekat?</h2>
        <p className="text-gray-600 mb-5 text-sm">Pesan lewat delivery, kami kirim ke lokasimu.</p>
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
