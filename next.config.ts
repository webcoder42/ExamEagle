import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ ESLint errors ko ignore karega Vercel build me
  },
};

export default nextConfig;
