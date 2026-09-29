import { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";

// Single source of truth: proxy config comes from routing.ts.
// as-needed → / serves Spanish (no prefix), /en serves English.
const intlMiddleware = createMiddleware(routing);

export function proxy(request: NextRequest) {
  const response = intlMiddleware(request);

  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");

  return response;
}

export const config = {
  // opengraph-image goes out with its locale prefix (/es/…) and must be served
  // as is: through the proxy, /es/… would 307 to the unprefixed path.
  matcher: ["/((?!api|_next|_vercel|.*opengraph-image|.*\\..*).*)"],
};
