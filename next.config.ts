import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.rawg.io',
      },
      {
        protocol: 'https',
        hostname: 'www.cheapshark.com',
      },
      {
        protocol: 'https',
        hostname: 'shared.fastly.steamstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'hb.imgix.net',
      },
      {
        protocol: 'https',
        hostname: 'sttc.gamersgate.com',
      },
      {
        protocol: 'https',
        hostname: 'images.gog-statics.com',
      },
      {
        protocol: 'https',
        hostname: 'images.greenmangaming.com',
      },
    ],
  },
};

export default nextConfig;
