import type { NextConfig } from "next";
import withNextIntl from "next-intl/plugin";

import { withSentryConfig } from "@sentry/nextjs";

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

  // Webpack configuration optimizada
  webpack: (config, { isServer, dev }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    }

    // Optimización para producción
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: "all",
          cacheGroups: {
            framer: {
              test: /[\\/]node_modules[\\/](framer-motion)[\\/]/,
              name: "framer",
              priority: 9,
              chunks: "all",
            },
          },
        },
      };
    }

    return config;
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
