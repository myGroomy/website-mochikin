"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu as MenuIcon, X, MapPin, ChevronDown, ChevronRight, ShoppingBag } from "lucide-react";
import { MENU_CATEGORIES } from "@/data/mochikinData";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuDropdownOpen, setMenuDropdownOpen] = useState(false);
  const [sayangDropdownOpen, setSayangDropdownOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md border-b border-gray-100 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center group">
                <span className="block w-14 h-12 relative flex-shrink-0">
                  <Image
                    src="/assets/logo/logo_mochikin-primary-logo_outline_01.png"
                    alt="MOCHIKIN"
                    width={56}
                    height={48}
                    className="w-14 h-12 object-contain transition-transform group-hover:scale-105"
                    priority
                  />
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-3 text-sm font-bold text-gray-700">
              {/* Menu Megamenu Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setMenuDropdownOpen(true)}
                onMouseLeave={() => setMenuDropdownOpen(false)}
              >
                <Link
                  href="/menu"
                  className="flex items-center px-3 py-2 rounded-md hover:text-[#FF6B35] transition-colors"
                >
                  Menu
                  <ChevronDown className="ml-1 w-4 h-4 text-gray-400 group-hover:text-[#FF6B35]" />
                </Link>

                {/* Megamenu popup */}
                {menuDropdownOpen && (
                  <div className="absolute left-0 mt-0 w-[680px] bg-white rounded-b-xl shadow-2xl border border-gray-100 p-6 z-50 animate-slide-down">
                    <div className="grid grid-cols-12 gap-6">
                      <div className="col-span-7">
                        <h4 className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-3">
                          Kategori Menu
                        </h4>
                        <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                          {MENU_CATEGORIES.map((cat) => (
                            <Link
                              key={cat}
                              href={`/menu#${encodeURIComponent(cat)}`}
                              className="text-gray-700 hover:text-[#FF6B35] text-sm flex items-center font-medium transition-colors"
                              onClick={() => setMenuDropdownOpen(false)}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-red-600 mr-2 opacity-0 hover:opacity-100 transition-opacity" />
                              {cat}
                            </Link>
                          ))}
                        </div>
                        <div className="mt-5 pt-3 border-t border-gray-100">
                          <Link
                            href="/menu"
                            className="text-[#FF6B35] font-bold text-sm inline-flex items-center hover:underline"
                            onClick={() => setMenuDropdownOpen(false)}
                          >
                            Lihat semua menu <ChevronRight className="w-4 h-4 ml-1" />
                          </Link>
                        </div>
                      </div>

                      <div className="col-span-5 bg-gray-50 rounded-xl p-4 flex flex-col justify-between border border-gray-100">
                        <div>
                          <div className="relative h-28 w-full mb-3 flex items-center justify-center">
                            <Image
                              src="/assets/produk/produk_korean-crispy-chicken_plate_01.jpg"
                              alt="PaNas 1"
                              width={160}
                              height={112}
                              style={{ width: "auto", height: "auto" }}
                              className="h-28 w-auto object-contain"
                            />
                          </div>
                          <h5 className="font-bold text-gray-900 text-sm">PaNas 1</h5>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                            1 potong Ayam Krispy/Spicy MOCHIKIN dengan nasi hangat pulen dan Fruit Tea Lemon.
                          </p>
                        </div>
                        <a
                          href="/order"
                          className="mt-3 w-full bg-[#FF6B35] hover:bg-[#E55A2B] text-white font-bold py-2 px-3 rounded-lg text-xs flex items-center justify-center transition-colors shadow-sm"
                        >
                          <ShoppingBag className="w-3.5 h-3.5 mr-1.5" />
                          Pesan Sekarang
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Promo */}
              <Link
                href="/promo"
                className="px-3 py-2 rounded-md hover:text-[#FF6B35] transition-colors"
              >
                Promo
              </Link>

              {/* Aplikasi Info */}
              <a
                href="#app-download"
                className="px-3 py-2 rounded-md hover:text-[#FF6B35] transition-colors flex items-center"
              >
                <span className="bg-yellow-400 text-red-950 text-[10px] font-black px-1.5 py-0.5 rounded mr-1.5">
                  APP
                </span>
                Aplikasi MOCHIKIN
              </a>

              {/* Dunia Anak */}
              <Link
                href="/#dunia-anak"
                className="px-3 py-2 rounded-md hover:text-[#FF6B35] transition-colors"
              >
                Dunia Anak
              </Link>

              {/* Makin Kenal Makin Sayang Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setSayangDropdownOpen(true)}
                onMouseLeave={() => setSayangDropdownOpen(false)}
              >
                <button
                  type="button"
                  className="flex items-center px-3 py-2 rounded-md hover:text-[#FF6B35] transition-colors text-left"
                >
                  <span>Makin Kenal Makin Sayang</span>
                  <ChevronDown className="ml-1 w-4 h-4 text-gray-400" />
                </button>
                {sayangDropdownOpen && (
                  <div className="absolute left-0 mt-0 w-56 bg-white rounded-b-xl shadow-xl border border-gray-100 py-2 z-50 animate-slide-down">
                    <Link
                      href="/#produk-kami"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-[#FF6B35]"
                      onClick={() => setSayangDropdownOpen(false)}
                    >
                      Produk Kami
                    </Link>
                    <Link
                      href="/#restoran-kami"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-[#FF6B35]"
                      onClick={() => setSayangDropdownOpen(false)}
                    >
                      Restoran Kami
                    </Link>
                    <Link
                      href="/#komitmen"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-[#FF6B35]"
                      onClick={() => setSayangDropdownOpen(false)}
                    >
                      Komitmen &amp; Tanggung Jawab
                    </Link>
                  </div>
                )}
              </div>

              {/* Lokasi */}
              <Link
                href="/locations"
                className="px-3 py-2 rounded-md hover:text-[#FF6B35] transition-colors flex items-center border-l border-gray-200 pl-4"
              >
                <MapPin className="w-4 h-4 mr-1 text-[#FF6B35]" />
                Lokasi
              </Link>
            </nav>

            {/* Desktop Action Button: Pesan Sekarang */}
            <div className="hidden lg:flex items-center space-x-3">
              <a
                href="/order"
                className="bg-[#FFD166] hover:bg-[#E6B84A] text-gray-900 font-extrabold text-sm px-5 py-2.5 rounded-full flex items-center shadow-md hover:shadow-lg transition-all"
              >
                <span className="w-5 h-5 mr-2 inline-flex items-center justify-center flex-shrink-0">
                  <Image
                    src="/assets/produk/produk_korean-crispy-chicken_plate_01.jpg"
                    alt="MOCHIKINelivery"
                    width={20}
                    height={20}
                    className="w-5 h-5 object-contain"
                  />
                </span>
                <span>Pesan Sekarang</span>
              </a>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center lg:hidden space-x-2">
              <a
                href="/order"
                className="bg-[#FFD166] text-gray-900 font-bold text-xs px-3 py-2 rounded-full flex items-center"
              >
                <ShoppingBag className="w-3.5 h-3.5 mr-1" />
                Pesan
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-gray-700 hover:text-[#FF6B35] hover:bg-gray-100 focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-20 bg-black/50 z-40" onClick={() => setMobileMenuOpen(false)}>
            <div
              className="bg-white w-4/5 max-w-sm h-full overflow-y-auto p-6 shadow-2xl flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-4">
                <a
                  href="/order"
                  className="w-full bg-[#FFD166] hover:bg-[#E6B84A] text-gray-900 font-black py-3 px-4 rounded-xl flex items-center justify-center text-sm shadow mb-4"
                >
                  <span className="w-5 h-5 mr-2 inline-flex items-center justify-center flex-shrink-0">
                    <Image
                      src="/assets/produk/produk_korean-crispy-chicken_plate_01.jpg"
                      alt="MOCHIKINelivery"
                      width={20}
                      height={20}
                      className="w-5 h-5 object-contain"
                    />
                  </span>
                  <span>Pesan Sekarang</span>
                </a>

                <div className="border-t border-gray-100 pt-3">
                  <Link
                    href="/menu"
                    className="block py-2.5 font-bold text-gray-800 text-lg hover:text-[#FF6B35]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Menu
                  </Link>
                  <Link
                    href="/promo"
                    className="block py-2.5 font-bold text-gray-800 text-lg hover:text-[#FF6B35]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Promo
                  </Link>
                  <a
                    href="#app-download"
                    className="block py-2.5 font-bold text-gray-800 text-lg hover:text-[#FF6B35]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Aplikasi MOCHIKIN&apos;s
                  </a>
                  <Link
                    href="/#dunia-anak"
                    className="block py-2.5 font-bold text-gray-800 text-lg hover:text-[#FF6B35]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dunia Anak
                  </Link>
                  <Link
                    href="/locations"
                    className="flex items-center py-2.5 font-bold text-gray-800 text-lg hover:text-[#FF6B35]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <MapPin className="w-5 h-5 mr-2 text-[#FF6B35]" />
                    Lokasi Restoran
                  </Link>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 text-xs text-gray-500">
                <p>&copy; 2026 MOCHIKIN&apos;s Indonesia</p>
              </div>
            </div>
          </div>
        )}
      </header>
      {/* Spacer for fixed header */}
      <div className="h-20" />
    </>
  );
}
