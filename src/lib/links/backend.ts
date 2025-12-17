import { z } from "zod";
import { adminFetchJson } from "@/lib/admin/backend/fetch";
import { normalizeSlug, slugSchema } from "@/lib/admin/shortlinks";

export const linkSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  destination_url: z.string().url(),
  created_at: z.union([z.string(), z.number()]).optional(),
  created_by: z.string().nullable().optional(),
  is_active: z.boolean().default(true),
  tags: z.array(z.string()).default([]),
  notes: z.string().nullable().optional(),
});

export type Link = z.infer<typeof linkSchema>;

export const linkDetailSchema = z.object({
  link: linkSchema.optional(),
  event_count: z.number().int().nonnegative().optional(),
  events_count: z.number().int().nonnegative().optional(),
});

type CreateLinkInput = {
  destination_url: string;
  slug?: string;
  tags?: string[];
  notes?: string;
};

export async function createLink({
  destination_url,
  slug,
  tags,
  notes,
  authToken,
}: CreateLinkInput & { authToken?: string }): Promise<Link> {
  const body = z
    .object({
      destination_url: z.string().url(),
      slug: z.string().trim().optional(),
      tags: z.array(z.string()).optional(),
      notes: z.string().optional(),
    })
    .parse({
      destination_url,
      ...(slug ? { slug: normalizeSlug(slug) } : {}),
      ...(tags?.length ? { tags } : {}),
      ...(notes ? { notes } : {}),
    });

  if (body.slug) slugSchema.parse(body.slug);

  const res = await adminFetchJson<unknown>("/api/links", {
    method: "POST",
    body: JSON.stringify(body),
    ...(authToken ? { headers: { Authorization: `Bearer ${authToken}` } } : {}),
  });

  return linkSchema.parse(res);
}

export async function getLinkById(
  id: string,
  authToken?: string
): Promise<{ link: Link; eventCount: number }> {
  const res = await adminFetchJson<unknown>(`/api/links/${encodeURIComponent(id)}`, {
    method: "GET",
    cache: "no-store",
    ...(authToken ? { headers: { Authorization: `Bearer ${authToken}` } } : {}),
  });

  const asLink = linkSchema.safeParse(res);
  if (asLink.success) {
    return { link: asLink.data, eventCount: 0 };
  }

  const asDetail = linkDetailSchema.safeParse(res);
  if (!asDetail.success || !asDetail.data.link) {
    throw new Error("Unexpected response from GET /api/links/{id}");
  }

  const count = asDetail.data.event_count ?? asDetail.data.events_count ?? 0;
  return { link: asDetail.data.link, eventCount: count };
}

export async function updateLinkById(
  id: string,
  patch: Partial<Pick<Link, "slug" | "destination_url" | "is_active" | "tags" | "notes">>,
  authToken?: string
): Promise<Link> {
  const body: Record<string, unknown> = {};

  if (typeof patch.slug === "string") body.slug = normalizeSlug(patch.slug);
  if (typeof patch.destination_url === "string")
    body.destination_url = patch.destination_url;
  if (typeof patch.is_active === "boolean") body.is_active = patch.is_active;
  if (Array.isArray(patch.tags)) body.tags = patch.tags;
  if (typeof patch.notes === "string") body.notes = patch.notes;

  if (typeof body.slug === "string") slugSchema.parse(body.slug);

  const res = await adminFetchJson<unknown>(`/api/links/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify(body),
    ...(authToken ? { headers: { Authorization: `Bearer ${authToken}` } } : {}),
  });

  return linkSchema.parse(res);
}

const listLinksResponseSchema = z.union([
  z.array(linkSchema),
  z.object({
    items: z.array(linkSchema),
    total: z.number().int().nonnegative().optional(),
  }),
]);

export async function listLinks(
  search: string | undefined,
  authToken?: string
): Promise<{ items: Link[]; total?: number }> {
  const qs = new URLSearchParams();
  if (search?.trim()) qs.set("search", search.trim());
  const path = `/api/links${qs.toString() ? `?${qs.toString()}` : ""}`;

  const res = await adminFetchJson<unknown>(path, {
    method: "GET",
    cache: "no-store",
    ...(authToken ? { headers: { Authorization: `Bearer ${authToken}` } } : {}),
  });

  const parsed = listLinksResponseSchema.parse(res);
  if (Array.isArray(parsed)) return { items: parsed };

  return {
    items: parsed.items,
    ...(typeof parsed.total === "number" ? { total: parsed.total } : {}),
  };
}

export function canonicalShortUrl(slug: string, origin?: string) {
  const base = origin?.replace(/\/$/, "") ?? "";
  return `${base}/r/${slug}`;
}
