import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Bundle the scraped data directory so it's available at runtime after build.
  outputFileTracingIncludes: {
    "/**": ["./data/scraped/metadata/**", "./data/scraped/images/**"],
  },

  // fs-extra and sharp use native Node modules — keep them server-side only.
  serverExternalPackages: ["fs-extra", "sharp"],

  // Allow the /api/img route to serve images without size restrictions.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
