"use server";

import { cookies, headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { prisma } from "@/prisma/prisma";
import { isCurrency, type Currency } from "@/i18n/currency";

async function updateSessionCurrency(currency: Currency) {
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
      data: { currency },
    });
  } catch {
    // best-effort only
  }
}

export async function setCurrencyCookie(nextCurrency: string) {
  const cookieStore = await cookies();
  const maxAge = 60 * 60 * 24 * 365; // 365 days

  if (!isCurrency(nextCurrency)) {
    return { success: false as const, error: "Unsupported currency" };
  }

  cookieStore.set("NEXT_CURRENCY", nextCurrency, {
    path: "/",
    maxAge,
    sameSite: "lax",
  });

  await updateSessionCurrency(nextCurrency);
  revalidatePath("/");

  return { success: true as const };
}
