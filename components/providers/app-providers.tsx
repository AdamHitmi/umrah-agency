"use client";

import {NextIntlClientProvider} from "next-intl";
import {ReactNode} from "react";

type AppProvidersProps = {
  children: ReactNode;
  messages: Record<string, unknown>;
  locale: string;
};

export function AppProviders({children, messages, locale}: AppProvidersProps) {
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone="Africa/Casablanca"
    >
      {children}
    </NextIntlClientProvider>
  );
}
