// src/app/global-error.tsx — Captura errores no manejados en Next.js App Router
"use client";

import { useEffect } from "react";

import * as Sentry from "@sentry/nextjs";

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
    <html>
      <body>
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          fontFamily: "monospace",
          background: "#0a0a0a",
          color: "#00ff88"
        }}>
          <h2>Algo salió mal</h2>
          <p>Se ha registrado el error automáticamente.</p>
          <button
            onClick={() => reset()}
            style={{
              padding: "0.75rem 1.5rem",
              background: "#00ff88",
              color: "#0a0a0a",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontFamily: "monospace",
              fontSize: "1rem",
              marginTop: "1rem"
            }}
          >
            Intentar de nuevo
          </button>
        </div>
      </body>
    </html>
  );
}
