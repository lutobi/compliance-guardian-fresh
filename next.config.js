/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [];
  },
  async headers() {
    return [];
  }
}

module.exports = nextConfig
