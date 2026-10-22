import type { Metadata } from "next";
import OrderChannelPicker from "./OrderChannelPicker";
import { getOrderChannels } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Cara Pesan | MOCHIKIN",
  description:
    "Pesan MOCHIKIN lewat WhatsApp, GoFood, GrabFood, ShopeeFood, atau aplikasi MOCHIKIN — pilih channel favoritmu.",
};

export default async function OrderPage() {
  const ch = await getOrderChannels();

  const channels = [
    {
      id: "whatsapp",
      name: "WhatsApp",
      desc: "Pesan manual via chat WhatsApp.",
      href: `https://wa.me/${ch.whatsappNumber}?text=${encodeURIComponent(ch.whatsappPesan)}`,
      color: "bg-green-500",
    },
    {
      id: "gofood",
      name: "GoFood",
      desc: "Pesan antar via Gojek (GoFood).",
      href: ch.gofoodLink,
      color: "bg-green-600",
    },
    {
      id: "grabfood",
      name: "GrabFood",
      desc: "Pesan antar via Grab (GrabFood).",
      href: ch.grabfoodLink,
      color: "bg-green-700",
    },
    {
      id: "shopeefood",
      name: "ShopeeFood",
      desc: "Pesan antar via Shopee (ShopeeFood).",
      href: ch.shopeefoodLink,
      color: "bg-orange-500",
    },
    {
      id: "mochikinapp",
      name: "Mochikin App",
      desc: "Aplikasi resmi MOCHIKIN.",
      href: ch.appLink,
      color: "bg-[#FFD166] text-gray-900",
    },
  ];

  return <OrderChannelPicker channels={channels} />;
}
