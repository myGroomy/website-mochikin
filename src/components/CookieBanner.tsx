"use client";

import React, { useState, useEffect } from "react";

export default function CookieBanner() {
  const [agreed, setAgreed] = useState(true);

  useEffect(() => {
    const isAgreed = localStorage.getItem("mcd_cookie_agreed");
    if (!isAgreed) {
      setAgreed(false);
    }
  }, []);

  const handleAgree = () => {
    localStorage.setItem("mcd_cookie_agreed", "true");
    setAgreed(true);
  };

  if (agreed) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md bg-white border border-gray-200 rounded-2xl p-5 shadow-2xl z-50 animate-slide-down">
      <h5 className="font-extrabold text-sm text-gray-900 mb-1">
        Situs Ini Menggunakan Cookies
      </h5>
      <p className="text-xs text-gray-600 leading-relaxed mb-4">
        Kami menggunakan cookies untuk memberikan Anda pengalaman browsing yang terbaik. Dengan mengakses situs ini lebih lanjut, Anda menyetujui penggunaan cookies dari kami.
      </p>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleAgree}
          className="bg-[#db0007] hover:bg-[#b80006] text-white font-bold text-xs px-6 py-2 rounded-full transition-colors shadow-sm"
        >
          Setuju
        </button>
      </div>
    </div>
  );
}
