/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@buffet/core", "@buffet/shared-ui", "@buffet/shared-utils", "@buffet/shared-types"],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.dicebear.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    unoptimized: true,
  },
}

export default nextConfig
