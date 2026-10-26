import { LOGO_PATHS } from "./logoPaths";

import "./Logo.scss";

/**
 * Magaldidev logo: the "magaldi_" wordmark, with the neon "_" cursor that is
 * the site's signature.
 *
 *  - "mono": Space Mono. The default, used in header, footer and favicon.
 *  - "tag":  graffiti tag (Sedgwick Ave Display). Reward for finding every
 *            easter egg; the footer switches to it.
 *
 * The OG image draws its own glitch version (Rubik Glitch) at render time.
 */
export type LogoVariant = keyof typeof LOGO_PATHS;

interface LogoProps {
  variant?: LogoVariant;
  className?: string;
  title?: string;
}

export default function Logo({ variant = "mono", className, title = "Magaldidev" }: LogoProps) {
  const { viewBox, text, cursor } = LOGO_PATHS[variant];

  return (
    <svg
      className={`wordmark wordmark--${variant}${className ? ` ${className}` : ""}`}
      viewBox={viewBox}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <path d={text} fill="currentColor" />
      <rect className="wordmark-cursor" {...cursor} />
    </svg>
  );
}
