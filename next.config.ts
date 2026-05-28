import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  serverExternalPackages: ["knex", "pg"],
  reactStrictMode: true
};

export default nextConfig;
