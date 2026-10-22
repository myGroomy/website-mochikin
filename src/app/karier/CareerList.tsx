"use client";

import React from "react";
import Link from "next/link";
import { Briefcase, MapPin, Clock3, ArrowRight, SearchX, GraduationCap, TrendingUp, Users, HandCoins, Send } from "lucide-react";
import { JOB_ITEMS, RECRUITMENT_STEPS, CAREER_FAQ } from "@/data/pagesData";

const BENEFITS = [
  { icon: GraduationCap, title: "Pelatihan Berkelanjutan", desc: "Onboarding dan pelatihan SOP untuk setiap posisi." },
  { icon: TrendingUp, title: "Jenjang Karier Jelas", desc: "Dari crew hingga manajerial dengan jalur yang terstruktur." },
  { icon: Users, title: "Lingkungan Hangat", desc: "Tim yang saling dukung, melayani dengan senang hati." },
  { icon: HandCoins, title: "Paket Remunerasasi", desc: "Gaji kompetitif dengan tunjangan sesuai peran. (TODO: detail)" },
];

const FAQS = CAREER_FAQ;

export default function CareerList() {
  const [location, setLocation] = React.useState("Semua Lokasi");
  const [dept, setDept] = React.useState("Semua Departemen");
  const [type, setType] = React.useState("Semua Tipe");
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

  const locations = React.useMemo(() => ["Semua Lokasi", ...Array.from(new Set(JOB_ITEMS.map((j) => j.location)))], []);
  const depts = React.useMemo(() => ["Semua Departemen", ...Array.from(new Set(JOB_ITEMS.map((j) => j.department)))], []);
  const types = React.useMemo(() => ["Semua Tipe", ...Array.from(new Set(JOB_ITEMS.map((j) => j.type)))], []);

  const filtered = JOB_ITEMS.filter(
    (j) =>
      (location === "Semua Lokasi" || j.location === location) &&
      (dept === "Semua Departemen" || j.department === dept) &&
      (type === "Semua Tipe" || j.type === type)
  );

  return (
    <div>
      {/* Mengapa bergabung */}
      <h2 className="text-2xl font-black text-gray-900 mb-6">Mengapa Bergabung?</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-14">
        {BENEFITS.map((b) => (
          <div key={b.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#FFD166] text-gray-900 mb-3">
              <b.icon className="w-5 h-5" aria-hidden="true" />
            </span>
            <h3 className="font-bold text-gray-900 mb-1 text-sm">{b.title}</h3>
            <p className="text-xs text-gray-500">{b.desc}</p>
          </div>
        ))}
      </div>

      {/* Budaya kerja */}
      <section className="grid md:grid-cols-2 gap-8 items-center bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8 mb-14">
        <div>
          <h2 className="text-2xl font-black text-gray-900 mb-3">Budaya Kerja Kami</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Di MOCHIKIN, &ldquo;serve with pleasure&rdquo; bukan slogan — itu cara kami bekerja setiap hari. Kami percaya tim yang bahagia membuat pelanggan juga
            bahagia, jadi kami menjaga lingkungan kerja yang hangat, disiplin, dan terbuka untuk ide baru.
          </p>
          {/* TODO: ganti dengan foto tim asli */}
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/banner/banner_mochikin-team-photography_modern-retro-2_01.jpg"
          alt="Tim MOCHIKIN (placeholder)"
          className="w-full h-52 object-cover rounded-2xl"
        />
      </section>

      {/* Daftar lowongan */}
      <h2 id="lowongan" className="text-2xl font-black text-gray-900 mb-6 scroll-mt-24">
        Lowongan Terbuka
      </h2>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="loc-filter" className="block text-sm font-semibold text-gray-700 mb-2">
              Lokasi
            </label>
            <select
              id="loc-filter"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/40 text-sm bg-white"
            >
              {locations.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="dept-filter" className="block text-sm font-semibold text-gray-700 mb-2">
              Departemen
            </label>
            <select
              id="dept-filter"
              value={dept}
              onChange={(e) => setDept(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/40 text-sm bg-white"
            >
              {depts.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="type-filter" className="block text-sm font-semibold text-gray-700 mb-2">
              Tipe
            </label>
            <select
              id="type-filter"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/40 text-sm bg-white"
            >
              {types.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        // Empty state
        <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-10 text-center mb-14">
          <SearchX className="w-10 h-10 mx-auto text-gray-300 mb-3" aria-hidden="true" />
          <p className="text-gray-600 mb-2 font-semibold">Belum ada posisi pada kombinasi filter ini.</p>
          <p className="text-sm text-gray-500 mb-4">Coba reset filter atau kirim CV kamu ke tim HR kami.</p>
          <a
            href="mailto:hr@mochikin.id"
            className="inline-flex items-center gap-2 border-2 border-[#FF6B35] text-[#FF6B35] hover:bg-[#FFF4E6] font-bold text-sm py-2.5 px-5 rounded-full"
          >
            <Send className="w-4 h-4" aria-hidden="true" /> Kirim CV ke hr@mochikin.id (TODO)
          </a>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-14">
          {filtered.map((job) => (
            <article key={job.slug} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wide bg-[#FFF4E6] text-[#FF6B35] px-2 py-0.5 rounded-md">{job.type}</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{job.title}</h3>
              <ul className="space-y-1.5 text-xs text-gray-500 mb-4">
                <li className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#FF6B35]" aria-hidden="true" /> {job.location}
                </li>
                <li className="flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-[#FF6B35]" aria-hidden="true" /> {job.department}
                </li>
                <li className="flex items-center gap-1.5">
                  <Clock3 className="w-3.5 h-3.5 text-[#FF6B35]" aria-hidden="true" /> Diposting{" "}
                  {new Date(job.postedDate).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                </li>
              </ul>
              <Link
                href={`/karier/${job.slug}`}
                className="mt-auto inline-flex items-center justify-center gap-2 bg-[#FF6B35] hover:bg-[#E55A2B] text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-colors"
              >
                Lamar Sekarang <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      )}

      {/* Proses rekrutmen */}
      <h2 className="text-2xl font-black text-gray-900 mb-6">Proses Rekrutmen</h2>
      <ol className="flex flex-col lg:flex-row gap-4 mb-14">
        {RECRUITMENT_STEPS.map((step, i) => (
          <li key={step} className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 relative">
            <p className="text-xs font-black text-[#FF6B35] mb-2">Langkah {i + 1}</p>
            <h3 className="font-bold text-gray-900 text-sm">{step}</h3>
          </li>
        ))}
      </ol>

      {/* FAQ karier */}
      <h2 className="text-2xl font-black text-gray-900 mb-6">Pertanyaan Umum</h2>
      <div className="space-y-3 mb-14">
        {FAQS.map((f, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <button
              type="button"
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              aria-expanded={openFaq === i}
              className="w-full flex items-center justify-between text-left px-5 py-4 font-bold text-gray-900 text-sm"
            >
              {f.q}
              <span className={`text-[#FF6B35] transition-transform ${openFaq === i ? "rotate-45" : ""}`} aria-hidden="true">
                +
              </span>
            </button>
            {openFaq === i && <p className="px-5 pb-4 text-sm text-gray-600">{f.a}</p>}
          </div>
        ))}
      </div>

      {/* CTA penutup */}
      <div className="text-center">
        <h2 className="text-2xl font-black text-gray-900 mb-2">Tidak menemukan posisi yang cocok?</h2>
        <p className="text-gray-600 mb-5 text-sm">Kirim CV kamu — kami akan menghubungi kamu saat posisi yang cocok terbuka.</p>
        <a
          href="mailto:hr@mochikin.id"
          className="inline-flex items-center justify-center gap-2 bg-[#FF6B35] hover:bg-[#E55A2B] text-white font-bold py-3.5 px-6 rounded-full shadow-md"
        >
          <Send className="w-4 h-4" aria-hidden="true" /> Kirim CV
        </a>
      </div>
    </div>
  );
}
