// src/app/global-error.tsx — Captura errores no manejados en Next.js App Router
"use client";

import { useEffect } from "react";

import * as Sentry from "@sentry/nextjs";

// This boundary replaces the root layout, so globals.scss and the fonts never
// load here. It carries its own copy of the brand tokens (same values as
// src/styles/variables.scss) and only uses them through var().
const GLOBAL_ERROR_CSS = `
:root {
  --bg: #0a0a12;
  --text: #ecebf5;
  --text-secondary: #a3a3bd;
  --neon: #6f00ff;
  --neon-mid: #a259ff;
  --on-neon: #ffffff;
  --font-mono: ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;
}
html,
body {
  margin: 0;
  overflow-x: clip;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-mono);
}
.global-error {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 1rem;
  min-height: 100dvh;
  max-width: 60ch;
  margin: 0 auto;
  padding: 2rem clamp(1rem, 4vw, 2rem);
}
.global-error h2 {
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  color: var(--text);
}
.global-error h2::after {
  content: "_";
  color: var(--neon-mid);
}
.global-error p {
  margin: 0;
  color: var(--text-secondary);
}
.global-error button {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  border: 1px solid var(--neon);
  border-radius: 0;
  background: var(--neon);
  color: var(--on-neon);
  font: inherit;
  cursor: pointer;
}
.global-error button:focus-visible {
  outline: 2px solid var(--neon-mid);
  outline-offset: 2px;
}
`;

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="es">
      <body>
        <style>{GLOBAL_ERROR_CSS}</style>
        <div className="global-error">
          <h2>Algo salió mal</h2>
          <p>Se ha registrado el error automáticamente.</p>
          <button type="button" onClick={() => reset()}>
            Intentar de nuevo
          </button>
        </div>
      </body>
    </html>
  );
}
