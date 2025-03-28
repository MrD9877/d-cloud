import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "1024mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "webnovel-d.s3.eu-north-1.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "robohash.org",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
