/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', '127.0.0.1'],
  },
  experimental: {
    serverActions: true,
    scrollRestoration: true,
  },
  eslint: {
    ignoreDuringBuilds: true
  }
}

module.exports = nextConfig
