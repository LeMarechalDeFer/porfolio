import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/ingest/:path*',
        destination: 'https://app.posthog.com/:path*',
      },
    ];
  },
};

export default nextConfig;
