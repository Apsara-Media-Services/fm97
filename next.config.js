/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");
const nextConfig = withPWA({
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'ams.com.kh', 'fm97.ams.com.kh', 'localhost:1337', 'api.ams.com.kh'],
  },
})

module.exports = nextConfig
