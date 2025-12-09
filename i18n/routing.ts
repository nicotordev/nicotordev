import { defineRouting } from "next-intl/routing";
import { locales, defaultLocale } from "./config";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: [...locales],

  // Used when no locale matches
  defaultLocale,

  // Always include the locale in the URL to match the `/[locale]` app directory
  localePrefix: "always",
});
