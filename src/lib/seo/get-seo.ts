import type { Locale } from "@/i18n/config";
import { getMessages } from "next-intl/server";

import type { SeoMessages } from "./types";

export async function getSeoMessages(locale: Locale): Promise<SeoMessages> {
  const messages = (await getMessages({ locale })) as unknown as {
    seo?: SeoMessages;
  };

  if (!messages.seo) {
    throw new Error(`Missing SEO messages for locale: ${locale}`);
  }

  return messages.seo;
}

