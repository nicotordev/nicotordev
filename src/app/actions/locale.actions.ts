"use server";

import { cookies, headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { isLocale, type Locale } from "@/i18n/config";
import { prisma } from "@/lib/prisma";

const localeSchema = z.string().refine(isLocale, "Invalid locale");

async function updateSessionLanguage(locale: Locale) {
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

    // Map Locale to Prisma Language enum
    const language =
      locale === "en"
        ? "EN"
        : locale === "en-gb"
        ? "EN_GB"
        : locale === "es"
        ? "ES"
        : locale === "es-es"
        ? "ES_ES"
        : locale === "es-cl"
        ? "ES_CL"
        : "DE";

    await prisma.session.update({
      where: { id: session.id },
      data: { language: language as any },
    });
  } catch {
    // best-effort only
  }
}

export async function setLocaleCookie(nextLocale: string) {
  const parsed = localeSchema.safeParse(nextLocale);
  if (!parsed.success) {
    return { success: false as const, error: "Invalid locale" };
  }

  const locale = parsed.data as Locale;
  const cookieStore = await cookies();
  const maxAge = 60 * 60 * 24 * 365; // 365 days

  cookieStore.set("NEXT_LOCALE", locale, {
    path: "/",
    maxAge,
    sameSite: "lax",
  });

  await updateSessionLanguage(locale);

  // Revalidate both paths and locale-dependent cached data
  revalidatePath("/", "layout");

  return { success: true as const };
}
