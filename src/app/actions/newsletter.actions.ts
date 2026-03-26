"use server";

import { subscribeToNewsletter } from "@/lib/directus/newsletter";

/**
 * Subscribe a user to the newsletter in Directus.
 */
export async function subscribeToNewsletterAction(
  email: string
): Promise<{ success: boolean; error?: string }> {
  if (!email?.trim() || !email.includes("@")) {
    return { success: false, error: "Invalid email" };
  }

  try {
    await subscribeToNewsletter(email.trim());
    return { success: true };
  } catch (e: any) {
    if (e.message?.includes("RECORD_NOT_UNIQUE") || e.message?.includes("already exists")) {
      return { success: true }; // Treat already subscribed as success
    }
    const message = e instanceof Error ? e.message : "Failed to subscribe";
    return { success: false, error: message };
  }
}
