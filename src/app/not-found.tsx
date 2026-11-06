import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import GameOver from "./components/common/GameOver";

// Fallback for URLs outside any locale (localized ones use [locale]/not-found).
export default async function NotFound() {
  const messages = await getMessages({ locale: "es" });

  return (
    <NextIntlClientProvider locale="es" messages={messages}>
      <main>
        <GameOver />
      </main>
    </NextIntlClientProvider>
  );
}
