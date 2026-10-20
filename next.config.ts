import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Bundle scraped metadata for the build; images are served from GitHub LFS
  // (media.githubusercontent.com), not the filesystem, so they are excluded.
  outputFileTracingIncludes: {
    "/**": ["./data/scraped/metadata/**"],
  },

  // fs-extra and sharp use native Node modules — keep them server-side only.
  serverExternalPackages: ["fs-extra", "sharp"],

  // Allow the /api/img route to serve images without size restrictions.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
