import type { NextConfig } from "next";
import withNextIntl from "next-intl/plugin";

const nextConfig: NextConfig = {
  // React Compiler (opcional pero recomendado si usas React 19)
  experimental: {
    optimizePackageImports: [
      "three",
      "@react-three/fiber",
      "@react-three/drei",
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
            three: {
              test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
              name: "three",
              priority: 10,
              chunks: "all",
            },
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

  typescript: {
    ignoreBuildErrors: true,
  },
};

export default withNextIntl("./src/i18n/request.ts")(nextConfig);
