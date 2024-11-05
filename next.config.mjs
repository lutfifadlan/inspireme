/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      { hostname: 'images.unsplash.com' },
    ],
  },
  assetPrefix: isProd ? undefined : `http://localhost:3000`,
};

export default nextConfig;
