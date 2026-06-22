"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Forces the viewport to the top on every route change. The global
 * `scroll-behavior: smooth` interferes with Next's default scroll reset, so we
 * jump instantly here. Skipped when navigating to an in-page anchor (#hash).
 */
export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash) return; // let anchor links scroll to their target
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return null;
}
