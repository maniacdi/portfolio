import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es"],
  defaultLocale: "es",
  // as-needed: Spanish (default) served at / with NO prefix, English at /en.
  // Must match proxy.ts — split config causes redirect/canonical SEO issues.
  localePrefix: "as-needed",
  // No hreflang Link header: next-intl would build it assuming the same path
  // in both languages, which is wrong for the service pages (/servicios/… vs
  // /en/services/…). Every page already declares its alternates in <head>.
  alternateLinks: false,
});
