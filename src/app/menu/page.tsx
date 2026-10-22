import type { Metadata } from "next";
import MenuBrowser from "./MenuBrowser";
import { getAllMenuItems, getMenuCategories } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Menu | MOCHIKIN",
  description:
    "Jelajahi menu MOCHIKIN: ayam krispy Korea, topokki, burger, camilan, dan minuman. Pesan lewat channel favoritmu.",
};

export default async function MenuPage() {
  const [categories, items] = await Promise.all([getMenuCategories(), getAllMenuItems()]);

  return <MenuBrowser categories={categories} items={items} />;
}
