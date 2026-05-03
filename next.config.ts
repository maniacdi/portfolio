import type { NextConfig } from "next";
import withNextIntl from "next-intl/plugin";

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

    // Optimización para Three.js en producción
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

  // Performance optimizations for Vercel
  output: "standalone",

  // Compression
  compress: true,
};

export default withNextIntl("./src/i18n/request.ts")(nextConfig);

const {withSentryConfig} = require("@sentry/nextjs");

module.exports = withSentryConfig(nextConfig, {
  silent: true, 
  org: "javier-garcia-b5",
  project: "portfolio-next",
});