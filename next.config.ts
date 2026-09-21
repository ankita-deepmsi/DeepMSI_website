import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root — a stray lockfile in the user's home dir was
  // confusing Turbopack's root inference.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
