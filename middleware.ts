// src/middleware.ts
import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware({
  locales: ["en", "es"],
  defaultLocale: "es",
  localePrefix: "always",
});

export function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");

  return response;
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g., `favicon.ico`)
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
