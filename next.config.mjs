import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  experimental: {
    // Keep build memory under the 8 GB build machine limit (Amplify Standard)
    turbopackFileSystemCacheForBuild: false,
    cpus: 2,
    turbopackSourceMaps: false,
    // Amplify SSR compute has 1 GB; preloading every route at startup exhausts it
    preloadEntriesOnStart: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'dyz1pdcuffwr5.cloudfront.net',
        pathname: '/**',
      },
    ],
  },
};

export default withMDX(config);
