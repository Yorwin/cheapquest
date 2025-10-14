import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverComponentsExternalPackages: ['firebase-admin'],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        net: false,
        tls: false,
        fs: false,
      };
    }
    return config;
  },
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
      {
        protocol: 'https',
        hostname: 'cdn.fanatical.com',
      },
    ],
  },
};

export default nextConfig;
