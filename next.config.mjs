/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  // Prevents build trace manifest bugs in Next.js App Router route groups
  outputFileTracingIncludes: {
    "/*": ["./app/**/*"],
  },
};

module.exports = nextConfig;