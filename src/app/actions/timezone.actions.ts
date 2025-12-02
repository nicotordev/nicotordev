"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { isTimezone, type Timezone } from "@/i18n/timezone";
import { upsertUserPreferences } from "@/lib/clerk/preferences";

const timezoneSchema = z.custom<Timezone>(
  (value) => typeof value === "string" && isTimezone(value),
  { message: "Invalid timezone" }
);

export async function setTimezoneCookie(nextTimezone: string) {
  const parsed = timezoneSchema.safeParse(nextTimezone);
  if (!parsed.success) {
    return { success: false as const, error: "Unsupported timezone" };
  }

  const result = await upsertUserPreferences({ timezone: parsed.data });
  if (!result.success) {
    return { success: false as const, error: result.message };
  }

  revalidatePath("/", "layout");

  return { success: true as const };
}
