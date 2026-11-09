import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use standalone output for Docker, but let Netlify
  // use its own Next.js runtime.
  ...(process.env.NETLIFY ? {} : { output: "standalone" }),

  experimental: {
    agentFeedback: true,
  },

  cacheComponents: true,
  partialPrefetching: true,

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;