"use server";

import { createLead } from "@/lib/directus/leads";

export type SubmitLeadPayload = {
  name: string;
  email: string;
  message: string;
  source: "lead_magnet_minimal" | "lead_magnet_full";
  turnstileToken?: string;
};

/**
 * Save a lead to Directus (leads collection).
 * Call this from the lead-magnet form before or after sending to ConceAI.
 */
export async function saveLeadAction(
  payload: SubmitLeadPayload
): Promise<{ success: boolean; error?: string }> {
  const { name, email, message, source, turnstileToken } = payload;
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return { success: false, error: "Missing name, email or message" };
  }
  try {
    const lead = await createLead({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      source,
      turnstileValidated: Boolean(turnstileToken),
    });
    return { success: lead != null };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to save lead";
    return { success: false, error: message };
  }
}
