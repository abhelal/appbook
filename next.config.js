/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "cdn.pixabay.com",
      "cdn.kcak11.com",
      "images.unsplash.com",
      "18.171.9.155",
      "api.app-book.co.uk",
    ],
  },
};

module.exports = nextConfig;
