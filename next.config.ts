import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // Tailwind CSS v4 is compiled by @tailwindcss/postcss (see postcss.config.mjs).
};

export default nextConfig;
