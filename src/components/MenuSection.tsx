"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FAVORITE_MENU, type MenuItem } from "@/data/mochikinData";

export default function MenuSection({ items = FAVORITE_MENU }: { items?: MenuItem[] }) {
  return (
    <section className="py-16 bg-[#fafafa] border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2d2d2d] tracking-tight">
            Menu Favorit
          </h2>
          <div className="w-16 h-1 bg-[#FFD166] mx-auto mt-3 rounded-full" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/menu#${encodeURIComponent(item.category)}`}
              className="group bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between text-center"
            >
              <div>
                <div className="relative aspect-square w-full mb-4 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-extrabold text-gray-900 text-base group-hover:text-[#FF6B35] transition-colors">
                  {item.name}
                </h3>
                <span className="text-xs text-gray-400 font-medium block mt-1">
                  {item.category}
                </span>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between">
                <span className="text-xs font-bold text-gray-900">{item.price}</span>
                <span className="text-[11px] text-gray-500">{item.calories}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/menu"
            className="inline-flex items-center justify-center bg-[#FF6B35] hover:bg-[#E55A2B] text-white font-bold px-8 py-3.5 rounded-full text-sm shadow-md hover:shadow-lg transition-all"
          >
            Lihat Semua Menu
          </Link>
        </div>
      </div>
    </section>
  );
}
