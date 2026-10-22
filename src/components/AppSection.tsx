"use client";

import React from "react";
import Image from "next/image";

export default function AppSection() {
  return (
    <section id="app-download" className="relative bg-white py-16 lg:py-20 border-t border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left Text */}
          <div className="md:col-span-7 space-y-6 text-center md:text-left">
            <span className="inline-block px-3 py-1 bg-red-100 text-[#FF6B35] font-black text-xs uppercase tracking-wider rounded-full">
              Mobile App
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
              Makin Hemat &amp; Praktis dengan Aplikasi MOCHIKIN’s.
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              Kumpulkan poin Mochikin Rewards, nikmati diskon khusus member, dan pesan makanan langsung lewat smartphone Anda kapan saja, di mana saja.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-105 inline-block"
              >
                <Image
                  src="https://mochikin.id/assets/img/common/button_appstore.png"
                  alt="Download on the App Store"
                  width={160}
                  height={48}
                  className="w-40 h-12 object-contain"
                />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-105 inline-block"
              >
                <Image
                  src="https://mochikin.id/assets/img/common/button_playstore.png"
                  alt="Get it on Google Play"
                  width={160}
                  height={48}
                  className="w-40 h-12 object-contain"
                />
              </a>
            </div>
          </div>

          {/* Right Phone Mockup */}
          <div className="md:col-span-5 flex justify-center md:justify-end">
            <div className="relative w-72 sm:w-80 h-[380px] sm:h-[420px]">
              <Image
                src="/assets/produk/produk_korean-crispy-chicken_plate_01.jpg"
                alt="MOCHIKIN App Phone Mockup"
                fill
                sizes="(max-width: 768px) 100vw, 320px"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
