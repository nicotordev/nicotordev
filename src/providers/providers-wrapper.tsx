import { getLocale, getMessages } from "next-intl/server";
import type { ReactNode } from "react";

import { routing } from "@/i18n/routing";
import Providers from "./providers";

export default async function ProvidersWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const requestLocale = await getLocale();
  const locale = requestLocale ?? routing.defaultLocale;
  const messages = await getMessages({ locale });

  return (
    <Providers
      locale={locale}
      messages={messages}
    >
      {children}
    </Providers>
  );
}
