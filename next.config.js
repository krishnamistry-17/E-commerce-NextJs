/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove this line
  // output: "export",
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;
