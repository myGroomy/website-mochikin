"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, MapPin, Phone, Clock, Search, Navigation } from "lucide-react";
import { RESTAURANT_LOCATIONS, type LocationItem } from "@/data/mochikinData";

export default function LocationsBrowser({
  locations = RESTAURANT_LOCATIONS,
}: {
  locations?: LocationItem[];
}) {
  const [searchCity, setSearchCity] = useState<string>("All");
  const [selectedService, setSelectedService] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const cities = ["All", ...Array.from(new Set(locations.map((l) => l.city)))];
  const allServices = ["All", "24 Jam", "Drive Thru", "Mochi Cafe", "Playland", "Wi-Fi"];

  const filteredLocations = locations.filter((loc) => {
    const matchesCity = searchCity === "All" || loc.city === searchCity;
    const matchesService =
      selectedService === "All" || loc.services.includes(selectedService);
    const matchesQuery =
      loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesService && matchesQuery;
  });

  return (
    <div className="bg-[#fafafa] min-h-screen pb-20">
      {/* Locations Header Cover */}
      <div className="bg-white border-b border-gray-200 py-12 lg:py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-center space-x-2 text-xs font-semibold text-gray-500 mb-3">
            <Link href="/" className="hover:text-[#FF6B35]">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gray-900 font-bold">Lokasi</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight mb-3">
            Temukan MOCHIKIN&apos;s di dekatmu
          </h1>
          <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto">
            Cari gerai MOCHIKIN&apos;s terdekat untuk dine-in santai, drive-thru cepat, atau menikmati kopi hangat di Mochi Cafe.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Search & Filters Toolbar */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm mb-10 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            {/* Search Input */}
            <div className="sm:col-span-6 relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari nama gerai atau jalan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
              />
            </div>

            {/* City Selector */}
            <div className="sm:col-span-3">
              <select
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                className="w-full py-2.5 px-3 text-sm bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] font-semibold text-gray-700"
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city === "All" ? "Semua Kota" : city}
                  </option>
                ))}
              </select>
            </div>

            {/* Service Facility Selector */}
            <div className="sm:col-span-3">
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full py-2.5 px-3 text-sm bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] font-semibold text-gray-700"
              >
                {allServices.map((srv) => (
                  <option key={srv} value={srv}>
                    {srv === "All" ? "Semua Fasilitas" : srv}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Locations List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLocations.map((loc) => (
            <div
              key={loc.id}
              className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="font-extrabold text-gray-900 text-lg leading-tight">
                    {loc.name}
                  </h3>
                  <span className="flex-shrink-0 text-xs px-2.5 py-1 rounded-full bg-yellow-100 text-yellow-800 font-extrabold">
                    {loc.city}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-gray-600 mb-4">
                  <div className="flex items-start">
                    <MapPin className="w-4 h-4 mr-2 text-[#FF6B35] flex-shrink-0 mt-0.5" />
                    <span>{loc.address}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                    <span>{loc.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-green-600 flex-shrink-0" />
                    <span className="font-bold text-green-700">{loc.hours}</span>
                  </div>
                </div>

                {/* Facility Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {loc.services.map((srv) => (
                    <span
                      key={srv}
                      className="px-2.5 py-1 rounded-lg bg-gray-100 text-gray-600 text-[11px] font-medium"
                    >
                      {srv}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    loc.name + " " + loc.address
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#FF6B35] hover:bg-[#E55A2B] text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center transition-colors shadow-sm"
                >
                  <Navigation className="w-3.5 h-3.5 mr-1.5" />
                  Petunjuk Arah Google Maps
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
