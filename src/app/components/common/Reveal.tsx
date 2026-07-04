"use client";

import { ReactNode } from "react";

import { motion } from "framer-motion";

/**
 * Reveal-on-scroll wrapper. Subtle fade + upward translate the first time
 * the element enters the viewport. framer-motion's `whileInView` is declarative
 * (safe with the React Compiler) and reduced-motion is handled globally in CSS.
 */
interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

export default function Reveal({ children, delay = 0, y = 14, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
