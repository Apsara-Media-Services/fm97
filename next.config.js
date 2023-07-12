/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
  output: 'standalone',
  pwa: {
    dest: "public",
    runtimeCaching,
  },
  images: {
    domains: [
      "localhost",
      "ams.com.kh",
      "fm97.ams.com.kh",
      "admin.amskh.co",
      "localhost:1337",
      "api.ams.com.kh",
      "next.sovichetra.com",
    ],
  },
});
