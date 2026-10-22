"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Send, CheckCircle2 } from "lucide-react";
import type { SiteSocials } from "@/lib/cms";

const SOCIAL_FALLBACK: SiteSocials = {
  facebook: "https://www.facebook.com/MOCHIKINID",
  twitter: "https://twitter.com/mochikin",
  instagram: "https://instagram.com/mochikin",
  youtube: "https://www.youtube.com/user/MOCHIKINID",
};

export default function Footer({
  socials,
  whatsapp,
}: {
  socials?: SiteSocials;
  whatsapp?: string;
}) {
  const s = socials ?? SOCIAL_FALLBACK;
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-white border-t border-gray-200 text-gray-700">
      {/* Footer Top */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Col 1: Links */}
          <div className="lg:col-span-5">
            <h5 className="font-extrabold text-gray-900 text-base mb-6 tracking-wide">
              MOCHIKIN&apos;s
            </h5>
            <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm font-medium">
              <Link href="/tentang" className="hover:text-[#FF6B35] transition-colors">
                Hubungi Kami
              </Link>
              <Link href="/restoran-kami" className="hover:text-[#FF6B35] transition-colors">
                Layanan
              </Link>
              <Link href="/tentang" className="hover:text-[#FF6B35] transition-colors">
                Tentang Kami
              </Link>
              <Link href="/komitmen" className="hover:text-[#FF6B35] transition-colors">
                Sertifikasi &amp; Jaminan Halal
              </Link>
              <Link href="/newsroom" className="hover:text-[#FF6B35] transition-colors">
                Newsroom
              </Link>
              <Link href="/komitmen" className="hover:text-[#FF6B35] transition-colors">
                CSR &amp; Komitmen Sosial
              </Link>
              <Link href="/karier" className="hover:text-[#FF6B35] transition-colors">
                Karier
              </Link>
              <Link href="/order" className="hover:text-[#FF6B35] transition-colors">
                Cara Pesan MOCHIKIN
              </Link>
            </div>
          </div>

          {/* Col 2: Social & App Badges */}
          <div className="lg:col-span-3">
            <h5 className="font-extrabold text-gray-900 text-base mb-6 tracking-wide">
              Hubungi Kami
            </h5>
            <div className="flex items-center space-x-3 mb-6">
              <a
                href={s.facebook || SOCIAL_FALLBACK.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-[#FF6B35] hover:text-white flex items-center justify-center text-sm font-bold transition-colors"
                aria-label="Facebook"
              >
                fb
              </a>
              <a
                href={s.twitter || SOCIAL_FALLBACK.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-[#FF6B35] hover:text-white flex items-center justify-center text-sm font-bold transition-colors"
                aria-label="Twitter"
              >
                𝕏
              </a>
              <a
                href={s.instagram || SOCIAL_FALLBACK.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-[#FF6B35] hover:text-white flex items-center justify-center text-sm font-bold transition-colors"
                aria-label="Instagram"
              >
                ig
              </a>
              <a
                href={s.youtube || SOCIAL_FALLBACK.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-[#FF6B35] hover:text-white flex items-center justify-center text-sm font-bold transition-colors"
                aria-label="YouTube"
              >
                yt
              </a>
              <a
                href={whatsapp ? `https://wa.me/${whatsapp}` : "https://wa.me/+6281110514045"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-[#25D366] hover:text-white flex items-center justify-center text-sm font-bold transition-colors"
                aria-label="WhatsApp"
              >
                wa
              </a>
            </div>

            <div className="flex flex-col space-y-2">
              <Link
                href="/order"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Image
                  src="https://mochikin.id/assets/img/common/button_appstore.png"
                  alt="App Store"
                  width={144}
                  height={40}
                  className="w-36 h-10 object-contain"
                />
              </Link>
              <Link
                href="/order"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Image
                  src="https://mochikin.id/assets/img/common/button_playstore.png"
                  alt="Google Play"
                  width={144}
                  height={40}
                  className="w-36 h-10 object-contain"
                />
              </Link>
            </div>
          </div>

          {/* Col 3: Newsletter */}
          <div className="lg:col-span-4">
            <h5 className="font-extrabold text-gray-900 text-base mb-3 tracking-wide">
              Berlangganan Newsletter
            </h5>
            <p className="text-xs text-gray-500 mb-4">
              Dapatkan informasi promo terbaru, diskon eksklusif, dan penawaran menarik langsung ke email Anda.
            </p>
            {subscribed ? (
              <div className="flex items-center text-green-700 bg-green-50 p-3 rounded-xl border border-green-200 text-xs font-semibold">
                <CheckCircle2 className="w-5 h-5 mr-2 flex-shrink-0" />
                Terima kasih telah berlangganan newsletter MOCHIKIN&apos;s!
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Masukkan alamat email Anda"
                  className="flex-1 px-4 py-2.5 text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
                />
                <button
                  type="submit"
                  className="bg-[#FF6B35] hover:bg-[#E55A2B] text-white font-bold px-4 py-2.5 rounded-xl text-sm flex items-center shadow transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-200 bg-gray-50 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <div>&copy; 2026 MOCHIKIN&apos;s Indonesia. All Rights Reserved.</div>
          <div className="flex space-x-6">
            <Link href="/syarat-ketentuan" className="hover:text-gray-900 transition-colors">
              Syarat &amp; Ketentuan
            </Link>
            <Link href="/kebijakan-privasi" className="hover:text-gray-900 transition-colors">
              Kebijakan Privasi
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
