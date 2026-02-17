import { directusPost } from "@/lib/directus/client";
import type {
  DirectusItemResponse,
  DirectusLead,
  DirectusLeadCreate,
} from "@/lib/directus/types";

export type CreateLeadPayload = {
  name: string;
  email: string;
  message: string;
  source: "lead_magnet_minimal" | "lead_magnet_full";
  turnstileValidated?: boolean;
};

/**
 * Create a lead in Directus (server-side only; requires DIRECTUS_TOKEN).
 */
export async function createLead(
  payload: CreateLeadPayload
): Promise<DirectusLead | null> {
  const body: DirectusLeadCreate = {
    name: payload.name,
    email: payload.email,
    message: payload.message,
    source: payload.source,
    turnstile_validated: payload.turnstileValidated ?? true,
  };
  try {
    const res = await directusPost<DirectusItemResponse<DirectusLead>>(
      "/items/leads",
      body
    );
    return res.data ?? null;
  } catch {
    return null;
  }
}
