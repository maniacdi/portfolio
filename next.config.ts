import type { NextConfig } from "next";
import withNextIntl from "next-intl/plugin";

import { withSentryConfig } from "@sentry/nextjs/config";

const nextConfig: NextConfig = {
  // React Compiler (opcional pero recomendado si usas React 19)
  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "lucide-react",
      "zustand",
    ],
  },

  // Images configuration
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "openweathermap.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "nominatim.openstreetmap.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },

  // Compression
  compress: true,
};


const withIntl = withNextIntl("./src/i18n/request.ts");

export default withSentryConfig(withIntl(nextConfig), {
  silent: true,
  org: "javier-garcia-b5",
  project: "portfolio-next",
});
