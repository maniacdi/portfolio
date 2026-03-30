import { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware({
  locales: ["es", "en"],
  defaultLocale: "es",
  // "as-needed" means / serves Spanish directly (no redirect)
  // and /en serves English. Fixes 307 redirects and hreflang issues.
  localePrefix: "always",
});

export function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
