"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function CelebrateBanner() {
  return (
    <section id="dunia-anak" className="relative bg-[#fff8e7] overflow-hidden py-16 lg:py-24">
      {/* Decorative melt divider */}
      <div className="absolute top-0 left-0 right-0 h-6 overflow-hidden pointer-events-none">
        <Image
          src="https://d2vuyvo9qdtgo9.cloudfront.net/assets/img/common/graphic-melt.png"
          alt="Melt Graphic"
          fill
          sizes="100vw"
          className="object-cover object-top"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3]">
            <Image
              src="https://d2vuyvo9qdtgo9.cloudfront.net/assets/img/home/img_home-birthday.jpg"
              alt="Dunia Anak McDonald's"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Text Content */}
          <div className="space-y-6 text-center lg:text-left">
            <span className="inline-block px-3 py-1 bg-yellow-400 text-red-950 font-black text-xs uppercase tracking-wider rounded-full">
              Dunia Anak McDonald&apos;s
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
              Ciptakan momen bahagia untuk si kecil
            </h2>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              Rayakan hari ulang tahun seru, bermain di Playland, atau dapatkan mainan Happy Meal favorit. Semua hal ceria dan tak terlupakan hanya ada di McDonald&apos;s Indonesia.
            </p>
            <div className="pt-2">
              <Link
                href="/promo#pesta-ulang-tahun-makin-seru"
                className="inline-flex items-center justify-center bg-[#db0007] hover:bg-[#b80006] text-white font-extrabold px-8 py-3.5 rounded-full text-sm shadow-md hover:shadow-xl transition-all"
              >
                Pelajari Selengkapnya
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
