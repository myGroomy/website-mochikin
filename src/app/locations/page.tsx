import type { Metadata } from "next";
import LocationsBrowser from "./LocationsBrowser";
import { getLocations } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Lokasi Outlet | MOCHIKIN",
  description:
    "Temukan outlet MOCHIKIN terdekat di kotamu — dine-in, drive thru, dan layanan 24 jam. Pesan juga lewat WhatsApp, GoFood, GrabFood, dan ShopeeFood.",
};

export default async function LocationsPage() {
  const locations = await getLocations();

  return <LocationsBrowser locations={locations} />;
}
