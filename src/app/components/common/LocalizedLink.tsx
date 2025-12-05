"use client";

import Link from "next/link";
import { useLocale } from "next-intl";

interface LocalizedLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function LocalizedLink({ href, children, className }: LocalizedLinkProps) {
  const locale = useLocale();

  const finalHref = href.startsWith(`/${locale}`) ? href : `/${locale}${href}`;

  return (
    <Link href={finalHref} className={className}>
      {children}
    </Link>
  );
}
