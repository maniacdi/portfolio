"use client";

import { useEffect } from "react";

import { useThemeStore } from "@/app/store/useThemeStore";

/**
 * ThemeProvider — syncs the Zustand theme state to the <html> element.
 * Place this in your root layout (e.g., [locale]/layout.tsx).
 *
 * Usage:
 *   <ThemeProvider />
 *
 * It sets `data-theme="dark"` or `data-theme="light"` on <html>,
 * which your CSS variables in variables.scss will respond to.
 */
export default function ThemeProvider() {
  const theme = useThemeStore((s) => s.theme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Also handle initial flash — check stored value before hydration
  useEffect(() => {
    const stored = localStorage.getItem("portfolio-theme");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed?.state?.theme) {
          document.documentElement.setAttribute("data-theme", parsed.state.theme);
        }
      } catch {
        // ignore
      }
    }
  }, []);

  return null;
}
