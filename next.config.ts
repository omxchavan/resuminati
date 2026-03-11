import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["pdf-parse"],
  typescript: {
    // We handle type checking ourselves
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
