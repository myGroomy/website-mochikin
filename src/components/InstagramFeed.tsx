"use client";

import React from "react";
import Image from "next/image";
import { INSTAGRAM_POSTS } from "@/data/mcdData";

export default function InstagramFeed() {
  return (
    <section className="bg-[#da291c] py-14 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4 text-center sm:text-left">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Instagram McDonald&apos;s Indonesia
            </h2>
            <p className="text-red-100 text-sm mt-1">
              Bagikan momen bahagiamu dan tag @mcdonaldsid
            </p>
          </div>
          <a
            href="https://www.instagram.com/mcdonaldsid"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-white text-[#da291c] hover:bg-yellow-400 hover:text-gray-900 font-extrabold text-sm px-6 py-2.5 rounded-full transition-colors shadow-md"
          >
            Ikuti @mcdonaldsid
          </a>
        </div>

        {/* Feed Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {INSTAGRAM_POSTS.map((url, i) => (
            <a
              key={i}
              href="https://www.instagram.com/mcdonaldsid"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden shadow-md bg-red-900/40"
            >
              <Image
                src={url}
                alt={`Instagram Post ${i + 1}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center font-bold text-xs text-white">
                Lihat di Instagram
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
