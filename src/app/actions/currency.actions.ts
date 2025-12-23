"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { isCurrency, type Currency } from "@/i18n/currency";

const currencySchema = z.custom<Currency>(
  (value) => typeof value === "string" && isCurrency(value),
  { message: "Invalid currency" }
);

export async function setCurrencyCookie(nextCurrency: string) {
  const parsed = currencySchema.safeParse(nextCurrency);
  if (!parsed.success) {
    return { success: false as const, error: "Unsupported currency" };
  }

  revalidatePath("/", "layout");

  return { success: true as const };
}
