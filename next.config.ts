/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx'],
  transpilePackages: ['next-mdx-remote'],
  allowedDevOrigins: ['5ada1264-a082-4372-8d27-7a2045dd4e2c-00-13iall3rqszyg.riker.replit.dev', 'localhost:5000', '127.0.0.1:5000'],
  experimental: {
    serverActions: {
      allowedOrigins: ['*'],
    },
  },
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;