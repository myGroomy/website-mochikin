import type { Metadata } from "next";
import PromoBrowser from "./PromoBrowser";
import { getPromos } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Promo | MOCHIKIN",
  description:
    "Promo dan penawaran spesial MOCHIKIN — diskon, bundling menu, dan kegiatan seru. Berlaku via outlet dan channel pesan-antar favoritmu.",
};

export default async function PromoPage() {
  const promos = await getPromos();

  return <PromoBrowser promos={promos} />;
}
