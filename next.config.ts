import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [{ hostname: 'storage.googleapis.com', protocol: 'https' }],
  },
};

export default nextConfig;
