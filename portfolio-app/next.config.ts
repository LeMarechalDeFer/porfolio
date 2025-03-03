import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      // {
      //   source: '/ingest/:path*',
      //   destination: 'https://app.posthog.com/:path*',
      // },
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
      {
        source: "/ingest/decide",
        destination: "https://us.i.posthog.com/decide",
      },
    ];
  },
  // async headers() {
  //   return [
  //     {
  //       source: "/ingest/:path*", // Applique les headers pour éviter les blocages
  //       headers: [
  //         { key: "Access-Control-Allow-Origin", value: "*" },
  //         { key: "Access-Control-Allow-Methods", value: "GET, POST, OPTIONS" },
  //         { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" },
  //       ],
  //     },
  //   ];
  // },
  // trailingSlash: false,
  skipTrailingSlashRedirect: true, 

};

export default nextConfig;
