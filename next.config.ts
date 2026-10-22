import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";
import path from "path";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: path.resolve(import.meta.dirname ?? "."),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Sajikan file upload Payload (local disk media/) melalui REST API
  async rewrites() {
    return [
      {
        source: "/media/:path*",
        destination: "/api/media/file/:path*",
      },
    ];
  },
};

export default withPayload(nextConfig);
