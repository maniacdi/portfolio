import withNextIntl from "next-intl/plugin";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
};

// Asegúrate de que la ruta sea correcta
const withNextIntlConfig = withNextIntl("./src/i18n/request.ts");

export default withNextIntlConfig(nextConfig);
