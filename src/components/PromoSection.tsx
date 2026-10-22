"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { PROMOS_DATA } from "@/data/mcdData";

export default function PromoSection() {
  const featuredPromos = PROMOS_DATA.slice(0, 3);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2d2d2d] tracking-tight">
            Promo Menarik
          </h2>
          <div className="w-16 h-1 bg-[#ffbc0d] mx-auto mt-3 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPromos.map((promo) => (
            <Link
              key={promo.id}
              href={`/promo#${promo.id}`}
              className="group flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5"
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
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold text-red-700 bg-red-50 mb-2">
                    {promo.categoryLabel}
                  </span>
                  <h3 className="font-bold text-gray-900 text-lg leading-snug group-hover:text-[#db0007] transition-colors line-clamp-2">
                    {promo.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                    {promo.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center text-xs text-gray-500 font-medium">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center flex-shrink-0">
                    <Image
                      src="https://d2vuyvo9qdtgo9.cloudfront.net/assets/img/icon/ic_calendar_red.svg"
                      alt="Calendar"
                      width={16}
                      height={16}
                      className="w-4 h-4 object-contain"
                    />
                  </span>
                  <span>Berlaku hingga {promo.expiryDate}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/promo"
            className="inline-flex items-center justify-center bg-[#db0007] hover:bg-[#b80006] text-white font-bold px-8 py-3.5 rounded-full text-sm shadow-md hover:shadow-lg transition-all"
          >
            Lihat Semua Promo
          </Link>
        </div>
      </div>
    </section>
  );
}
