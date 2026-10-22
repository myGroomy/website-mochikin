import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ArrowRight } from "lucide-react";
import { getNewsBySlug, getNewsList } from "@/lib/cms";

export async function generateStaticParams() {
  const items = await getNewsList();
  return items.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);
  if (!item) return { title: "Berita tidak ditemukan | MOCHIKIN" };
  return {
    title: `${item.title} | Newsroom MOCHIKIN`,
    description: item.excerpt,
  };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);
  if (!item) notFound();

  const allNews = await getNewsList();
  const related = allNews.filter((n) => n.slug !== item.slug).slice(0, 3);

  return (
    <div className="bg-[#fafafa] min-h-screen pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-6">
          <Link href="/" className="hover:text-[#FF6B35]">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/newsroom" className="hover:text-[#FF6B35]">
            Newsroom
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 font-bold truncate">{item.title}</span>
        </nav>

        <article>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-bold uppercase tracking-wide bg-[#FFF4E6] text-[#FF6B35] px-2 py-0.5 rounded-md">{item.category}</span>
            <time dateTime={item.date} className="text-[11px] text-gray-400">
              {new Date(item.date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
            </time>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight mb-4">{item.title}</h1>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.image} alt={item.title} className="w-full h-64 sm:h-80 object-cover rounded-2xl mb-6" />
          <div className="space-y-4 text-gray-700 leading-relaxed text-sm sm:text-base">
            {item.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </article>

        {/* Artikel terkait */}
        <h2 className="text-xl font-black text-gray-900 mt-12 mb-5">Berita Terkait</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {related.map((r) => (
            <Link
              key={r.slug}
              href={`/newsroom/${r.slug}`}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={r.image} alt={r.title} className="w-full h-28 object-cover" />
              <div className="p-4">
                <h3 className="text-xs font-bold text-gray-900 group-hover:text-[#FF6B35] line-clamp-2 mb-1">{r.title}</h3>
                <time dateTime={r.date} className="text-[10px] text-gray-400">
                  {new Date(r.date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                </time>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link href="/order" className="inline-flex items-center gap-2 bg-[#FF6B35] hover:bg-[#E55A2B] text-white font-bold py-3.5 px-6 rounded-full shadow-md">
            Pesan Sekarang <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
