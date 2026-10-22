"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Clock, Navigation, SearchX } from "lucide-react";
import type { LocationItem } from "@/data/mochikinData";

const SERVICE_FILTERS = ["Dine-in", "Takeaway", "Delivery", "Drive Thru", "24 Jam"];

export default function RestaurantDirectory({ locations }: { locations: LocationItem[] }) {
  const [query, setQuery] = React.useState("");
  const [city, setCity] = React.useState("Semua Kota");
  const [service, setService] = React.useState("Semua Layanan");

  const cities = React.useMemo(() => ["Semua Kota", ...Array.from(new Set(locations.map((l) => l.city)))], [locations]);
  const services = React.useMemo(
    () => ["Semua Layanan", ...Array.from(new Set(locations.flatMap((l) => l.services))).filter((s) => SERVICE_FILTERS.includes(s))],
    [locations]
  );

  const filtered = locations.filter((l) => {
    const q = query.toLowerCase();
    const matchQ = !q || l.name.toLowerCase().includes(q) || l.address.toLowerCase().includes(q) || l.city.toLowerCase().includes(q);
    const matchCity = city === "Semua Kota" || l.city === city;
    const matchService = service === "Semua Layanan" || l.services.includes(service);
    return matchQ && matchCity && matchService;
  });

  return (
    <div>
      {/* Filter & pencarian */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="search-outlet" className="block text-sm font-semibold text-gray-700 mb-2">
              Cari outlet
            </label>
            <input
              id="search-outlet"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari nama gerai atau alamat..."
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/40 text-sm"
            />
          </div>
          <div>
            <label htmlFor="filter-city" className="block text-sm font-semibold text-gray-700 mb-2">
              Kota
            </label>
            <select
              id="filter-city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/40 text-sm bg-white"
            >
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="filter-service" className="block text-sm font-semibold text-gray-700 mb-2">
              Layanan
            </label>
            <select
              id="filter-service"
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/40 text-sm bg-white"
            >
              {services.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        // Empty state
        <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-10 text-center">
          <SearchX className="w-10 h-10 mx-auto text-gray-300 mb-3" aria-hidden="true" />
          <p className="text-gray-600 mb-2 font-semibold">Tidak ada outlet yang cocok dengan pencarianmu.</p>
          <p className="text-sm text-gray-400">Coba kata kunci lain, atau pesan lewat delivery.</p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((loc) => (
            <article key={loc.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
              <Image
                src="/assets/banner/banner_menu-catalog-a5_v2_02.png"
                alt={`Outlet ${loc.name}`}
                width={600}
                height={300}
                className="w-full h-36 object-cover"
              />
              <div className="p-5 flex-1 flex flex-col">
                <p className="text-[11px] font-bold text-[#FF6B35] uppercase tracking-wide mb-1">{loc.city}</p>
                <h3 className="font-bold text-gray-900 mb-1.5">{loc.name}</h3>
                <p className="text-sm text-gray-500 flex gap-2 mb-1.5">
                  <MapPin className="w-4 h-4 text-[#FF6B35] shrink-0 mt-0.5" aria-hidden="true" /> {loc.address}
                </p>
                <p className="text-sm text-gray-500 flex gap-2 mb-1.5">
                  <Clock className="w-4 h-4 text-[#FF6B35] shrink-0 mt-0.5" aria-hidden="true" /> {loc.hours}
                </p>
                <p className="text-sm text-gray-500 flex gap-2 mb-3">
                  <Phone className="w-4 h-4 text-[#FF6B35] shrink-0 mt-0.5" aria-hidden="true" /> {loc.phone}
                </p>
                <ul className="flex flex-wrap gap-1.5 mb-4" aria-label="Layanan outlet">
                  {loc.services.slice(0, 4).map((s) => (
                    <li key={s} className="text-[11px] font-semibold bg-[#FFF4E6] text-gray-700 px-2 py-1 rounded-md">
                      {s}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex gap-2">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.name + " " + loc.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 border border-gray-200 hover:border-gray-300 text-gray-700 font-semibold text-xs py-2.5 px-3 rounded-xl transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5" aria-hidden="true" /> Petunjuk Arah
                  </a>
                  <Link
                    href="/order"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#FF6B35] hover:bg-[#E55A2B] text-white font-semibold text-xs py-2.5 px-3 rounded-xl transition-colors"
                  >
                    Pesan Sekarang
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
