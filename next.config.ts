import withNextIntl from "next-intl/plugin";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    domains: ["openweathermap.org", "nominatim.openstreetmap.org"],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
};

export default withNextIntl("./src/i18n/request.ts")(nextConfig);