import { z } from "zod";
import { compactUuid } from "@/lib/ids";

export const slugSchema = z
  .string()
  .trim()
  .min(3)
  .max(64)
  .regex(/^[a-z0-9][a-z0-9-_]*[a-z0-9]$/i);

export function normalizeSlug(input: string): string {
  return input.trim().replace(/\s+/g, "-").toLowerCase();
}

export function generateSlug(signature = "nico", length = 10): string {
  const raw = compactUuid().slice(0, Math.max(6, Math.min(length, 24)));
  const sig = signature.trim().toLowerCase().replace(/[^a-z0-9]+/g, "") || "nico";
  return `${sig}-${raw}`.toLowerCase();
}

export function shortlinkKey(prefix: string, slug: string): string {
  const normalizedPrefix = prefix.replace(/^\/+|\/+$/g, "");
  return `${normalizedPrefix}/${slug}.json`;
}

