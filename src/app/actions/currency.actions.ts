"use server";

import { cookies, headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { isCurrency, type Currency } from "@/i18n/currency";

const currencySchema = z.string().refine(isCurrency, "Invalid currency");

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
  const parsed = currencySchema.safeParse(nextCurrency);
  if (!parsed.success) {
    return { success: false as const, error: "Unsupported currency" };
  }

  const currency = parsed.data as Currency;
  const cookieStore = await cookies();
  const maxAge = 60 * 60 * 24 * 365; // 365 days

  cookieStore.set("NEXT_CURRENCY", currency, {
    path: "/",
    maxAge,
    sameSite: "lax",
  });

  await updateSessionCurrency(currency);

  // Revalidate both paths and currency-dependent cached data
  revalidatePath("/", "layout");

  return { success: true as const };
}
