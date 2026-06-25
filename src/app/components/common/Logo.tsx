"use client";

import { useId } from "react";

/**
 * Magaldidev logo — monograma "M + 6 en espejo" en SVG vectorial.
 *
 * Dos variantes intercambiables:
 *  - "mark": monograma suelto (C). Limpio, moderno, ocupa poco. Recomendado.
 *  - "hex":  monograma dentro de hexágono perfilado (A). Continuidad con la marca anterior.
 *
 * Para cambiar el logo de TODO el sitio de golpe, edita DEFAULT_LOGO_VARIANT.
 * Para forzar una variante en un sitio concreto, pasa la prop `variant`.
 */
export type LogoVariant = "mark" | "hex";

// 👇 Cambia esto para intercalar el logo en cabecera/footer/favicon de un plumazo.
export const DEFAULT_LOGO_VARIANT: LogoVariant = "mark";

interface LogoProps {
  variant?: LogoVariant;
  className?: string;
  title?: string;
}

export default function Logo({
  variant = DEFAULT_LOGO_VARIANT,
  className,
  title = "Magaldidev",
}: LogoProps) {
  // useId evita colisiones del id del degradado cuando hay varios logos en la página.
  const gid = useId().replace(/:/g, "");

  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#9b4dff" />
          <stop offset="1" stopColor="#6f00ff" />
        </linearGradient>
      </defs>

      {variant === "hex" ? (
        <>
          <path
            d="M32 3 L57 17.5 L57 46.5 L32 61 L7 46.5 L7 17.5 Z"
            fill="none"
            stroke={`url(#${gid})`}
            strokeWidth="2.2"
          />
          <path
            d="M16 46 L16 21 L32 38 L48 21"
            fill="none"
            stroke={`url(#${gid})`}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M48 21 L48 37 L37 43 L48 49 L48 37"
            fill="none"
            stroke={`url(#${gid})`}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      ) : (
        <>
          <path
            d="M12 50 L12 18 L32 41 L52 18"
            fill="none"
            stroke={`url(#${gid})`}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M52 18 L52 37 L38 44 L52 51 L52 37"
            fill="none"
            stroke={`url(#${gid})`}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
    </svg>
  );
}
