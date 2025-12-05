import withNextIntl from "next-intl/plugin";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    domains: ["openweathermap.org", "nominatim.openstreetmap.org"],
  },
};

export default withNextIntl("./src/i18n/request.ts")(nextConfig);
