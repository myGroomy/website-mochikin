"use client";

import React, { useState, useEffect } from "react";
import { X, ShieldAlert } from "lucide-react";
import Image from "next/image";

export default function SecurityModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("mcd_security_alert_seen");
    if (!seen) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    sessionStorage.setItem("mcd_security_alert_seen", "true");
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-red-100 text-[#db0007] rounded-full flex items-center justify-center mx-auto mb-5 shadow-inner">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-4">
            Pemberitahuan Resmi
          </h3>

          <div className="space-y-3 text-xs sm:text-sm text-gray-600 leading-relaxed text-left bg-gray-50 p-5 rounded-2xl border border-gray-100">
            <p>
              Mohon untuk selalu waspada dan berhati-hati terhadap segala bentuk penipuan berkedok undian berhadiah atau lowongan kerja yang mengatasnamakan McDonald’s Indonesia.
            </p>
            <p>
              McDonald’s Indonesia tidak bertanggung jawab atas informasi ataupun kegiatan yang dilakukan oleh pihak lain selain yang secara resmi diberikan melalui situs web dan kanal media sosial resmi McDonald’s Indonesia.
            </p>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={handleClose}
              className="bg-[#db0007] hover:bg-[#b80006] text-white font-extrabold text-sm px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-all"
            >
              Saya Mengerti
            </button>
          </div>
        </div>

        {/* Graphic melt accent */}
        <div className="relative h-3 w-full bg-yellow-400">
          <Image
            src="https://d2vuyvo9qdtgo9.cloudfront.net/assets/img/common/graphic-melt.png"
            alt="Melt Graphic"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
