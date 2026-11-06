import { CSSProperties, ReactNode } from "react";

/**
 * Reveal-on-scroll wrapper: subtle fade + upward slide as the element enters
 * the viewport. Pure CSS (scroll-driven animation, see `.reveal` in
 * globals.scss), so the content is never left invisible waiting for JS, for
 * crawlers or for a slow hydration. Browsers without support just show it.
 */
interface RevealProps {
  children: ReactNode;
  y?: number;
  className?: string;
}

export default function Reveal({ children, y = 14, className = "" }: RevealProps) {
  return (
    <div className={`reveal ${className}`} style={{ "--reveal-y": `${y}px` } as CSSProperties}>
      {children}
    </div>
  );
}
