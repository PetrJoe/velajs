import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: false,
  serverExternalPackages: ["knex", "pg"],
  reactStrictMode: true
};

export default nextConfig;
