import { notFound } from "next/navigation";

// Unknown URLs under a locale land here, so the 404 renders inside the locale
// layout (header, footer, translations) instead of the bare root not-found.
export default function CatchAll() {
  notFound();
}
