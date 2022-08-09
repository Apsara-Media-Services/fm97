/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'ams.com.kh', 'fm97.ams.com.kh', 'localhost:1337', 'api.ams.com.kh'],
  },
}

module.exports = nextConfig
