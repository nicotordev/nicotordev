"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { isTimezone, type Timezone } from "@/i18n/timezone";

const timezoneSchema = z.custom<Timezone>(
  (value) => typeof value === "string" && isTimezone(value),
  { message: "Invalid timezone" }
);

export async function setTimezoneCookie(nextTimezone: string) {
  const parsed = timezoneSchema.safeParse(nextTimezone);
  if (!parsed.success) {
    return { success: false as const, error: "Unsupported timezone" };
  }

  revalidatePath("/", "layout");

  return { success: true as const };
}
