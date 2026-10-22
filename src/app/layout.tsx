import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import SecurityModal from "@/components/SecurityModal";
import FloatingOrderButton from "@/components/FloatingOrderButton";

export const metadata: Metadata = {
  title: "Home | MOCHIKIN",
  description:
    "Nikmati menu pilihan terbaik dengan kualitas makanan yang terjamin bersama teman dan keluargamu hanya di MOCHIKIN.",
  icons: {
    icon: "/assets/logo/logo_mochikin-primary-logo_outline_01.png",
    apple: "/assets/logo/logo_mochikin-primary-logo_outline_01.png",
  },
  openGraph: {
    title: "Home | MOCHIKIN",
    description:
      "Nikmati menu pilihan terbaik dengan kualitas makanan yang terjamin bersama teman dan keluargamu hanya di MOCHIKIN.",
    url: "https://mochikin.id",
    images: ["/assets/logo/logo_mochikin-primary-logo_outline_01.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased bg-white text-gray-900 selection:bg-red-600 selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieBanner />
        <SecurityModal />
        <FloatingOrderButton />
      </body>
    </html>
  );
}
