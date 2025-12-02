"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { isCurrency, type Currency } from "@/i18n/currency";
import { upsertUserPreferences } from "@/lib/clerk/preferences";

const currencySchema = z.custom<Currency>(
  (value) => typeof value === "string" && isCurrency(value),
  { message: "Invalid currency" }
);

export async function setCurrencyCookie(nextCurrency: string) {
  const parsed = currencySchema.safeParse(nextCurrency);
  if (!parsed.success) {
    return { success: false as const, error: "Unsupported currency" };
  }

  const result = await upsertUserPreferences({ currency: parsed.data });
  if (!result.success) {
    return { success: false as const, error: result.message };
  }

  revalidatePath("/", "layout");

  return { success: true as const };
}
