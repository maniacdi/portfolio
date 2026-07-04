import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es"],
  defaultLocale: "es",
  // as-needed: Spanish (default) served at / with NO prefix, English at /en.
  // Must match middleware — split config causes redirect/canonical SEO issues.
  localePrefix: "as-needed",
});
