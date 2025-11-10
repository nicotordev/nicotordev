"use server";

import { cookies, headers } from "next/headers";
import { revalidatePath } from "next/cache";
import type { Locale } from "@/i18n/config";
import { prisma } from "@/prisma/prisma";

async function updateSessionLanguage(locale: Locale) {
  try {
    const hdrs = await headers();
    const ip = (hdrs.get("x-forwarded-for") || "").split(",")[0] || hdrs.get("x-real-ip") || "";
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

export async function setLocaleCookie(locale: Locale) {
  const cookieStore = await cookies();
  // 365 days
  const maxAge = 60 * 60 * 24 * 365;
  cookieStore.set("NEXT_LOCALE", locale, {
    path: "/",
    maxAge,
    sameSite: "lax",
  });

  await updateSessionLanguage(locale);
  revalidatePath("/");
  return { success: true } as const;
}
