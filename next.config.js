/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
  pwa: {
    dest: "public",
    runtimeCaching,
  },
  images: {
    domains: [
      "localhost",
      "ams.com.kh",
      "fm97.ams.com.kh",
      "localhost:1337",
      "api.ams.com.kh",
    ],
  },
});
