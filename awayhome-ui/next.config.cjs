// next.config.js
const withMT = require('@material-tailwind/react/utils/withMT');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
};

module.exports = withMT(nextConfig);
