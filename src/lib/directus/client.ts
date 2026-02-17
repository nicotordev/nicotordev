/**
 * Directus REST client for https://directus.nicotordev.com/
 * Uses DIRECTUS_URL and optional DIRECTUS_TOKEN (for restricted collections).
 */

const DIRECTUS_URL =
  process.env.DIRECTUS_URL ??
  process.env.NEXT_PUBLIC_DIRECTUS_URL ??
  "https://directus.nicotordev.com";

const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN ?? "";

export function getDirectusUrl(): string {
  return DIRECTUS_URL.replace(/\/$/, "");
}

export function getDirectusHeaders(): HeadersInit {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (DIRECTUS_TOKEN) {
    (headers as Record<string, string>)["Authorization"] =
      `Bearer ${DIRECTUS_TOKEN}`;
  }
  return headers;
}

export type DirectusQuery = {
  fields?: string[];
  filter?: Record<string, unknown>;
  sort?: string[];
  limit?: number;
  offset?: number;
};

function buildSearchParams(query?: DirectusQuery): string {
  if (!query) return "";
  const params = new URLSearchParams();
  if (query.fields?.length) {
    params.set("fields", query.fields.join(","));
  }
  if (query.limit != null) params.set("limit", String(query.limit));
  if (query.offset != null) params.set("offset", String(query.offset));
  if (query.sort?.length) params.set("sort", query.sort.join(","));
  if (query.filter && Object.keys(query.filter).length) {
    Object.entries(query.filter).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.set(`filter[${key}][_eq]`, String(value));
      }
    });
  }
  const s = params.toString();
  return s ? `?${s}` : "";
}

export async function directusFetch<T>(
  path: string,
  query?: DirectusQuery
): Promise<T> {
  const url = `${getDirectusUrl()}${path}${buildSearchParams(query)}`;
  const res = await fetch(url, {
    headers: getDirectusHeaders(),
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Directus ${path}: ${res.status} ${text}`);
  }
  return res.json() as Promise<T>;
}

export async function directusFetchOptional<T>(
  path: string,
  query?: DirectusQuery
): Promise<T | null> {
  try {
    return await directusFetch<T>(path, query);
  } catch {
    return null;
  }
}

/** POST JSON to Directus (e.g. create item). Use server-side so DIRECTUS_TOKEN is available. */
export async function directusPost<T, B = unknown>(
  path: string,
  body: B
): Promise<T> {
  const url = `${getDirectusUrl()}${path}`;
  const res = await fetch(url, {
    method: "POST",
    headers: getDirectusHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Directus POST ${path}: ${res.status} ${text}`);
  }
  return res.json() as Promise<T>;
}
