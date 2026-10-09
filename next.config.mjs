import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  experimental: {
    // Keep build memory under Vercel's 8 GB build machine limit
    turbopackFileSystemCacheForBuild: false,
    turbopackPluginRuntimeStrategy: 'workerThreads',
    cpus: 2,
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
