/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove this line
  // output: "export",
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
