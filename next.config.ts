/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx'],
  transpilePackages: ['next-mdx-remote'],
  allowedDevOrigins: ['*.pike.replit.dev', '*.sisko.replit.dev', '*.picard.replit.dev', '*.spock.replit.dev', '*.replit.dev', '*.replit.app', '127.0.0.1', 'localhost'],
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },
  // For Replit development environment iframe support
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: process.env.NODE_ENV === 'development' 
              ? "frame-ancestors 'self' *.replit.dev *.replit.app" 
              : "frame-ancestors 'self'",
          },
        ],
      },
    ];
  },
};

export default nextConfig;