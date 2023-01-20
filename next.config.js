/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "cdn.pixabay.com",
      "cdn.kcak11.com",
      "images.unsplash.com",
      "18.171.9.155",
      "api.appbook.e2e4gu.ru",
    ],
  },
};

module.exports = nextConfig;
