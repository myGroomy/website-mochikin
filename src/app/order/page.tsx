"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, MessageCircle, ShoppingBag, Truck, Smartphone, ExternalLink } from "lucide-react";

const CHANNELS = [
  { id: "whatsapp", name: "WhatsApp", desc: "Pesan manual via chat WhatsApp.", href: "https://wa.me/628111002000?text=Halo%20McDonald's%2C%20saya%20ingin%20memesan...", color: "bg-green-500", icon: MessageCircle },
  { id: "gofood", name: "GoFood", desc: "Pesan antar via Gojek (GoFood).", href: "https://gofood.co.id", color: "bg-green-600", icon: Truck },
  { id: "grabfood", name: "GrabFood", desc: "Pesan antar via Grab (GrabFood).", href: "https://food.grab.com", color: "bg-green-700", icon: Truck },
  { id: "shopeefood", name: "ShopeeFood", desc: "Pesan antar via Shopee (ShopeeFood).", href: "https://shopee.co.id", color: "bg-orange-500", icon: ShoppingBag },
  { id: "mcdelivery", name: "McDelivery", desc: "Aplikasi resmi McDonald's.", href: "https://smart.link/ngzf73egtu2ip", color: "bg-[#ffbc0d] text-gray-900", icon: Smartphone },
];

export default function OrderPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const ch = CHANNELS.find((c) => c.id === selected);
  return (
    <div className="bg-[#fafafa] min-h-screen pb-20">
      <div className="bg-[#fff9e6] border-b border-amber-100 py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-xs font-semibold text-gray-500 mb-3">
            <Link href="/" className="hover:text-[#db0007]">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gray-900 font-bold">Pesan</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight mb-3">Pilih cara pesan</h1>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl">Pilih channel yang paling nyaman untukmu.</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid gap-4 sm:grid-cols-2">
          {CHANNELS.map((c) => {
            const Icon = c.icon;
            const active = selected === c.id;
            return (
              <button key={c.id} type="button" onClick={() => setSelected(c.id)}
                className={`text-left p-5 rounded-2xl border-2 transition-all bg-white shadow-sm ${active ? "border-[#db0007] ring-2 ring-red-100" : "border-gray-100 hover:border-gray-300"}`}>
                <div className="flex items-center gap-3 mb-2">
                  <span className={`inline-flex items-center justify-center w-10 h-10 rounded-xl text-white ${c.color}`}><Icon className="w-5 h-5" /></span>
                  <span className="font-bold text-gray-900 text-lg">{c.name}</span>
                </div>
                <p className="text-sm text-gray-500">{c.desc}</p>
              </button>
            );
          })}
        </div>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          {ch ? (
            <a href={ch.href} target="_blank" rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-[#db0007] hover:bg-[#b80006] text-white font-bold py-3.5 px-6 rounded-full shadow-md transition-colors">
              Pesan via {ch.name} <ExternalLink className="w-4 h-4" />
            </a>
          ) : (
            <button type="button" disabled className="flex-1 bg-gray-200 text-gray-500 font-bold py-3.5 px-6 rounded-full cursor-not-allowed">Pilih channel dulu</button>
          )}
          <Link href="/cara-pesan" className="inline-flex items-center justify-center gap-2 border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-bold py-3.5 px-6 rounded-full transition-colors">
            Cara pesan
          </Link>
        </div>
      </div>
    </div>
  );
}
