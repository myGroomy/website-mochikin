"use client";

import React from "react";
import Image from "next/image";

export default function CareerBanner() {
  return (
    <section className="bg-gradient-to-r from-[#f6b119] via-[#f6ae1a] to-[#f89e1b] py-16 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1 relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-xl border-2 border-white/50">
            <Image
              src="https://mochikin.id/assets/img/career/img_carrer_static.webp"
              alt="Karier MOCHIKIN"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="order-1 md:order-2 space-y-5 text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight text-gray-900">
              Ayo belajar dan bekerja bersama!
            </h2>
            <p className="text-gray-800 text-base sm:text-lg leading-relaxed">
              Di MOCHIKIN&apos;s, kami lebih dari sekadar bisnis. Kami adalah komunitas tempat Anda berlatih keterampilan hidup dan sebagai wadah untuk mengejar serta mewujudkan impianmu.
            </p>
            <div className="pt-2">
              <a
                href="#career"
                className="inline-flex items-center justify-center bg-[#FF6B35] hover:bg-[#E55A2B] text-white font-extrabold px-8 py-3.5 rounded-full text-sm shadow-lg hover:shadow-xl transition-all"
              >
                Lihat Lowongan Karier
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
