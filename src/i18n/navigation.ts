import { createNavigation } from "next-intl/navigation";

import { routing } from "./routing";

// next-intl navigation APIs — locale-aware, respect routing.localePrefix.
// MUST be used (instead of plain next/link) for locale switching, otherwise
// the client soft-navigates without reloading server locale/messages.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
