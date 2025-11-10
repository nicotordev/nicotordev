"use server";

import { cookies, headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { isTimezone, type Timezone } from "@/i18n/timezone";

const timezoneSchema = z.string().refine(isTimezone, "Invalid timezone");

async function updateSessionTimezone(timezone: Timezone) {
  try {
    const hdrs = await headers();
    const ip =
      (hdrs.get("x-forwarded-for") || "").split(",")[0] ||
      hdrs.get("x-real-ip") ||
      "";
    const userAgent = hdrs.get("user-agent") || "";
    if (!ip || !userAgent) return;

    const session = await prisma.session.findFirst({
      where: { ip, userAgent },
      orderBy: { createdAt: "desc" },
    });
    if (!session) return;

    await prisma.session.update({
      where: { id: session.id },
      data: { timezone },
    });
  } catch {
    // best-effort only
  }
}

export async function setTimezoneCookie(nextTimezone: string) {
  const parsed = timezoneSchema.safeParse(nextTimezone);
  if (!parsed.success) {
    return { success: false as const, error: "Unsupported timezone" };
  }

  const timezone = parsed.data as Timezone;
  const cookieStore = await cookies();
  const maxAge = 60 * 60 * 24 * 365; // 365 days

  cookieStore.set("NEXT_TIMEZONE", timezone, {
    path: "/",
    maxAge,
    sameSite: "lax",
  });

  await updateSessionTimezone(timezone);

  // Revalidate both paths and timezone-dependent cached data
  revalidatePath("/", "layout");

  return { success: true as const };
}
