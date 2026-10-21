"use client";

/* eslint-disable no-console -- the whole point of this component is the console */

import { useEffect } from "react";
import { useLocale } from "next-intl";

import { useContactModalStore } from "@/app/store/useContactModalStore";
import { profileData } from "@/utils/data/profileData";

const BANNER = String.raw`
     ██╗███╗   ███╗
     ██║████╗ ████║
     ██║██╔████╔██║
██   ██║██║╚██╔╝██║
╚█████╔╝██║ ╚═╝ ██║
 ╚════╝ ╚═╝     ╚═╝`;

const NEON = "color:#a259ff;font-weight:700";
const MUTED = "color:#7f7f99";
const CODE = "color:#a259ff;font-family:monospace";

const COPY = {
  es: {
    hello: "Ey, has abierto el inspector. Eso ya dice bastante de ti. 👀",
    source: "El código de esta web está aquí → https://github.com/maniacdi/portfolio",
    talk: "¿Hablamos? Escribe",
    or: "o",
    contactOpened: "Formulario abierto. Ya me cuentas. ✉️",
  },
  en: {
    hello: "Hey, you opened the inspector. That says a lot about you. 👀",
    source: "This site's source lives here → https://github.com/maniacdi/portfolio",
    talk: "Want to talk? Type",
    or: "or",
    contactOpened: "Form open. Tell me about it. ✉️",
  },
} as const;

declare global {
  interface Window {
    javi?: Record<string, () => void>;
  }
}

/** Prints a greeting for whoever opens DevTools and exposes `window.javi`. */
export default function ConsoleGreeting() {
  const locale = useLocale();

  useEffect(() => {
    const copy = COPY[locale === "en" ? "en" : "es"];
    const greeted = Boolean(window.javi);

    window.javi = {
      contact: () => {
        const { email, github, linkedin } = profileData.contact;
        console.log(`%c✉  ${email}\n⌥  https://${github}\n in https://${linkedin}`, NEON);
      },
      hire: () => {
        useContactModalStore.getState().open("employee");
        console.log(`%c${copy.contactOpened}`, MUTED);
      },
    };

    // Client navigations remount the layout on locale change: refresh the
    // commands' language but print the banner only once per page load.
    if (greeted) return;

    console.log(`%c${BANNER}`, `${NEON};font-family:monospace;line-height:1.1`);
    console.log(`%c${copy.hello}`, "font-weight:700");
    console.log(`%c${copy.source}`, MUTED);
    console.log(
      `%c${copy.talk} %cjavi.hire()%c ${copy.or} %cjavi.contact()`,
      MUTED,
      CODE,
      MUTED,
      CODE
    );
  }, [locale]);

  return null;
}
