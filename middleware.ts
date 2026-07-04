import { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";

import { routing } from "./src/i18n/routing";

// Single source of truth: middleware config comes from routing.ts.
// as-needed → / serves Spanish (no prefix), /en serves English.
const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
