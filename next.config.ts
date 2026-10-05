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

  // Spanish lives at / with no prefix. next-intl answers /es/* with a 307
  // (temporary), which Search Console reports as "page with redirect" and
  // keeps re-crawling; a permanent 308 settles it. opengraph-image stays out:
  // it's served at its /es/ path on purpose (see src/proxy.ts).
  async redirects() {
    return [
      { source: "/es", destination: "/", permanent: true },
      {
        source: "/es/:path((?!.*opengraph-image).*)",
        destination: "/:path",
        permanent: true,
      },
    ];
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
