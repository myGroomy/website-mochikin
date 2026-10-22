import type { MetadataRoute } from "next";

const BASE_URL = "https://mochikin.id";

const ROUTES = ["", "/menu", "/promo", "/locations", "/order", "/cara-pesan", "/tentang", "/produk-kami", "/restoran-kami", "/komitmen", "/newsroom", "/karier"];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${BASE_URL}${route || "/"}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
