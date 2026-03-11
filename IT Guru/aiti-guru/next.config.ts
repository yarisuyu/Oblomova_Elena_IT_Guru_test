import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('https://cdn.dummyjson.com/product-images/**')],
  },
  async rewrites() {
    return [
      {
        source: '/auth/login', // запросы к /api/proxy/...
        destination: 'https://dummyjson.com/auth/login', // будут направлены сюда
      },
      {
        source: '/products-dummy/:path*',
        destination: "https://dummyjson.com/products/:path*"
      }
    ];
  }
};

export default nextConfig;
