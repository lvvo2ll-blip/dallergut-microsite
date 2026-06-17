import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/dallergut-microsite',
  assetPrefix: '/dallergut-microsite/',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
