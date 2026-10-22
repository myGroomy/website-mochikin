import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "d2vuyvo9qdtgo9.cloudfront.net" },
      { protocol: "https", hostname: "www.mcdonalds.co.id" },
      { protocol: "https", hostname: "mcdonalds.co.id" },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
