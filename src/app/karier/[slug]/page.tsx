import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, MapPin, Briefcase, CheckCircle2, Send } from "lucide-react";
import { getJobs, getJobBySlug, getKarier } from "@/lib/cms";

export async function generateStaticParams() {
  const jobs = await getJobs();
  return jobs.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  if (!job) return { title: "Lowongan tidak ditemukan | MOCHIKIN" };
  return {
    title: `${job.title} | Karier MOCHIKIN`,
    description: job.description,
  };
}

export default async function CareerDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  if (!job) notFound();

  const [allJobs, karier] = await Promise.all([getJobs(), getKarier()]);
  const otherJobs = allJobs.filter((j) => j.slug !== job.slug).slice(0, 3);
  const hrEmail = karier?.hrEmail || "hr@mochikin.id";

  return (
    <div className="bg-[#fafafa] min-h-screen pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-6">
          <Link href="/" className="hover:text-[#FF6B35]">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/karier" className="hover:text-[#FF6B35]">
            Karier
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 font-bold truncate">{job.title}</span>
        </nav>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8 mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-[10px] font-bold uppercase tracking-wide bg-[#FFF4E6] text-[#FF6B35] px-2 py-0.5 rounded-md">{job.type}</span>
            <span className="text-[10px] font-bold uppercase tracking-wide bg-[#FFF4E6] text-[#FF6B35] px-2 py-0.5 rounded-md">{job.department}</span>
            <time dateTime={job.postedDate} className="text-[11px] text-gray-400">
              Diposting {new Date(job.postedDate).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
            </time>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">{job.title}</h1>
          <ul className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-600 mb-5">
            <li className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#FF6B35]" aria-hidden="true" /> {job.location}
            </li>
            <li className="flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-[#FF6B35]" aria-hidden="true" /> {job.type}
            </li>
          </ul>

          <p className="text-gray-700 text-sm leading-relaxed mb-6">{job.description}</p>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h2 className="font-bold text-gray-900 mb-2">Tanggung Jawab</h2>
              <ul className="space-y-2 text-sm text-gray-600">
                {job.responsibilities.map((r) => (
                  <li key={r} className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#FF6B35] shrink-0 mt-0.5" aria-hidden="true" /> {r}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-bold text-gray-900 mb-2">Kualifikasi</h2>
              <ul className="space-y-2 text-sm text-gray-600">
                {job.qualifications.map((q) => (
                  <li key={q} className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#FF6B35] shrink-0 mt-0.5" aria-hidden="true" /> {q}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Benefit singkat */}
          <h2 className="font-bold text-gray-900 mt-6 mb-2">Benefit</h2>
          <p className="text-sm text-gray-600">
            {/* TODO: detail benefit per posisi */}
            Pelatihan berkala, tunjangan sesuai peran, dan makan tim. <span className="text-[11px] text-gray-400">(TODO: lengkapi detail benefit)</span>
          </p>

          <a
            href={`mailto:${hrEmail}?subject=Lamaran ${job.title}`}
            className="mt-8 inline-flex items-center gap-2 bg-[#FF6B35] hover:bg-[#E55A2B] text-white font-bold py-3.5 px-6 rounded-full shadow-md"
          >
            <Send className="w-4 h-4" aria-hidden="true" /> Lamar Sekarang
          </a>
          <p className="text-[11px] text-gray-400 mt-2">
            {/* TODO: ganti dengan form lamaran / link ATS asli */}
            Saat ini lamaran diterima via email HR. <span className="text-gray-400">(TODO)</span>
          </p>
        </div>

        {/* Posisi lain */}
        <h2 className="text-xl font-black text-gray-900 mb-5">Posisi Lainnya</h2>
        <div className="grid gap-4 sm:grid-cols-3 mb-12">
          {otherJobs.map((j) => (
            <Link key={j.slug} href={`/karier/${j.slug}`} className="group bg-white rounded-2xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-shadow">
              <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#FF6B35] mb-1">{j.title}</h3>
              <p className="text-xs text-gray-500">
                {j.location} • {j.type}
              </p>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/order" className="inline-flex items-center justify-center gap-2 bg-[#FF6B35] hover:bg-[#E55A2B] text-white font-bold py-3.5 px-6 rounded-full shadow-md">
            Coba Menu Kami Dulu
          </Link>
        </div>
      </div>
    </div>
  );
}
