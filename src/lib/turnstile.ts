import "server-only";

import { getAllowedOrigins } from "@/lib/security/allowed-origins";

const TEST_SECRET = "1x0000000000000000000000000000000AA";

export async function verifyLeadTurnstile(token: unknown): Promise<boolean> {
  if (typeof token !== "string" || !token.trim() || token.length > 2048) {
    return false;
  }

  const isDevelopment = process.env.NODE_ENV === "development";
  const secret = isDevelopment
    ? TEST_SECRET
    : process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) return false;

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ secret, response: token }),
        signal: AbortSignal.timeout(5000),
        cache: "no-store",
      },
    );
    if (!response.ok) return false;

    const result: unknown = await response.json();
    if (
      !result ||
      typeof result !== "object" ||
      !("success" in result) ||
      result.success !== true
    ) {
      return false;
    }
    if (isDevelopment) return true;

    if (
      !("action" in result) ||
      result.action !== "lead" ||
      !("hostname" in result) ||
      typeof result.hostname !== "string"
    ) {
      return false;
    }
    const allowedHosts = getAllowedOrigins().map(
      (origin) => new URL(origin).hostname,
    );
    return allowedHosts.includes(result.hostname);
  } catch {
    return false;
  }
}
