"use server";

import { z } from "zod";

import { isLocale, type Locale } from "@/i18n/config";

const localeSchema = z.custom<Locale>(
  (value) => typeof value === "string" && isLocale(value),
  { message: "Invalid locale" }
);

export async function setLocaleCookie(nextLocale: string) {
  const parsed = localeSchema.safeParse(nextLocale);
  if (!parsed.success) {
    return { success: false as const, error: "Invalid locale" };
  }

  return { success: true as const };
}
