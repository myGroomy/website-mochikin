"use client";

import React from "react";
import Image from "next/image";

export default function FloatingOrderButton() {
  return (
    <aside aria-label="Quick order button" className="fixed bottom-6 right-6 z-40">
      <a
        href="/order"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center bg-[#FFD166] hover:bg-[#E6B84A] text-gray-900 font-black text-sm sm:text-base px-5 py-3 rounded-full shadow-2xl hover:shadow-[0_8px_30px_rgba(255,188,13,0.5)] transition-all transform hover:-translate-y-1 active:translate-y-0"
      >
        <span className="inline-flex items-center justify-center w-6 h-6 mr-2.5 flex-shrink-0 transition-transform group-hover:scale-110">
          <Image
            src="https://placehold.co/600x400"
            alt="MOCHIKINelivery"
            width={24}
            height={24}
            className="w-6 h-6 object-contain"
          />
        </span>
        <span className="whitespace-nowrap">Pesan Sekarang</span>
      </a>
    </aside>
  );
}
