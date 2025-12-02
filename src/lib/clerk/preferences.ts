import { auth, clerkClient } from "@clerk/nextjs/server";

import { isCurrency, type Currency } from "@/i18n/currency";
import { isLocale, type Locale } from "@/i18n/config";
import { isTimezone, type Timezone } from "@/i18n/timezone";

export type UserPreferences = {
  currency?: Currency;
  locale?: Locale;
  timezone?: Timezone;
};

type PreferenceUpdateResult =
  | { success: true; preferences: UserPreferences }
  | {
      success: false;
      reason: "unauthenticated";
      message: string;
    };

function sanitizePreferences(value: unknown): UserPreferences {
  if (typeof value !== "object" || value === null) {
    return {};
  }

  const record: Record<string, unknown> = value;
  const prefs: UserPreferences = {};

  if (typeof record.currency === "string" && isCurrency(record.currency)) {
    prefs.currency = record.currency;
  }

  if (typeof record.locale === "string" && isLocale(record.locale)) {
    prefs.locale = record.locale;
  }

  if (typeof record.timezone === "string" && isTimezone(record.timezone)) {
    prefs.timezone = record.timezone;
  }

  return prefs;
}

function getAuthenticatedUserId(): string | null {
  const { userId } = auth();
  return userId ?? null;
}

export async function fetchUserPreferences(): Promise<UserPreferences> {
  const userId = getAuthenticatedUserId();
  if (!userId) {
    return {};
  }

  const user = await clerkClient.users.getUser(userId);
  return sanitizePreferences(user.publicMetadata.preferences);
}

export async function upsertUserPreferences(
  patch: Partial<UserPreferences>
): Promise<PreferenceUpdateResult> {
  const userId = getAuthenticatedUserId();
  if (!userId) {
    return {
      success: false,
      reason: "unauthenticated",
      message: "You need to be signed in to update preferences.",
    };
  }

  const user = await clerkClient.users.getUser(userId);
  const existing = sanitizePreferences(user.publicMetadata.preferences);
  const preferences: UserPreferences = { ...existing, ...patch };

  await clerkClient.users.updateUser(userId, {
    publicMetadata: { ...user.publicMetadata, preferences },
  });

  return { success: true, preferences };
}
