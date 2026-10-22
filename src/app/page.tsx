import React from "react";
import HeroCarousel from "@/components/HeroCarousel";
import PromoSection from "@/components/PromoSection";
import MenuSection from "@/components/MenuSection";
import CelebrateBanner from "@/components/CelebrateBanner";
import AppSection from "@/components/AppSection";
import InstagramFeed from "@/components/InstagramFeed";
import CareerBanner from "@/components/CareerBanner";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* 1. Hero Carousel */}
      <HeroCarousel />

      {/* 2. Promo Menarik */}
      <PromoSection />

      {/* 3. Menu Favorit */}
      <MenuSection />

      {/* 4. MyM Rewards Banner Section */}
      <section className="relative w-full overflow-hidden bg-amber-500">
        <Link href="/promo" className="block w-full">
          <picture>
            <source
              srcSet="https://www.mcdonalds.co.id/assets/img/mop/img_home-mop-3.webp"
              media="(min-width: 670px)"
            />
            <source
              srcSet="https://www.mcdonalds.co.id/assets/img/mop/img_home-mop-4.webp"
              media="(max-width: 670px)"
            />
            <img
              src="https://www.mcdonalds.co.id/assets/img/mop/img_home-mop-3.webp"
              alt="MyM Rewards"
              className="w-full h-auto object-cover"
            />
          </picture>
        </Link>
      </section>

      {/* 5. Dunia Anak / Birthday Celebration */}
      <CelebrateBanner />

      {/* 6. McDonald's App Download */}
      <AppSection />

      {/* 7. Instagram Showcase */}
      <InstagramFeed />

      {/* 8. Career Banner */}
      <CareerBanner />
    </div>
  );
}
