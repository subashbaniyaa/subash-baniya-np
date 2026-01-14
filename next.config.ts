/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx'],
  transpilePackages: ['next-mdx-remote'],
  allowedDevOrigins: ['*', '82812b6c-9fc8-4305-bb3a-7d69170a60c3-00-lry47mqf14f7.spock.replit.dev'],
  experimental: {
    serverActions: {
      allowedOrigins: ['*', '82812b6c-9fc8-4305-bb3a-7d69170a60c3-00-lry47mqf14f7.spock.replit.dev'],
    },
  },
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;