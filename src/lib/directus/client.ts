/**
 * Directus REST client for https://directus.nicotordev.com/
 * Uses DIRECTUS_URL for public, unauthenticated reads.
 */

const DIRECTUS_URL =
  process.env.DIRECTUS_URL ??
  process.env.NEXT_PUBLIC_DIRECTUS_URL ??
  "https://directus.nicotordev.com";

export function getDirectusUrl(): string {
  return DIRECTUS_URL.replace(/\/$/, "");
}

export function getDirectusHeaders(): HeadersInit {
  return {
    "Content-Type": "application/json",
  };
}

export type DirectusQuery = {
  fields?: string[];
  filter?: Record<string, unknown>;
  sort?: string[];
  limit?: number;
  offset?: number;
};

/** Serialize a filter object into Directus REST query params (nested keys, not JSON). */
function appendDirectusFilter(
  params: URLSearchParams,
  filter: Record<string, unknown>,
  keyPrefix: string,
): void {
  for (const [key, value] of Object.entries(filter)) {
    if (value === undefined || value === null) continue;
    const path = `${keyPrefix}[${key}]`;

    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (item != null && typeof item === "object" && !Array.isArray(item)) {
          appendDirectusFilter(
            params,
            item as Record<string, unknown>,
            `${keyPrefix}[${key}][${index}]`,
          );
        }
      });
      continue;
    }

    if (typeof value === "object" && !Array.isArray(value)) {
      const sub = value as Record<string, unknown>;
      const subKeys = Object.keys(sub);
      const operatorsOnly =
        subKeys.length > 0 && subKeys.every((k) => k.startsWith("_"));
      if (operatorsOnly) {
        for (const [op, v] of Object.entries(sub)) {
          if (v === undefined || v === null) continue;
          if (op === "_in" && Array.isArray(v)) {
            params.append(`${path}[${op}]`, v.map(String).join(","));
          } else if (typeof v === "boolean") {
            params.append(`${path}[${op}]`, v ? "true" : "false");
          } else {
            params.append(`${path}[${op}]`, String(v));
          }
        }
      } else {
        appendDirectusFilter(params, sub, path);
      }
      continue;
    }

    params.append(`${path}[_eq]`, String(value));
  }
}

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
    const formattedFilter: Record<string, unknown> = {};
    Object.entries(query.filter).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (
          typeof value === "object" &&
          value !== null &&
          !Array.isArray(value)
        ) {
          formattedFilter[key] = value;
        } else {
          formattedFilter[key] = { _eq: value };
        }
      }
    });
    appendDirectusFilter(params, formattedFilter, "filter");
  }
  const s = params.toString();
  return s ? `?${s}` : "";
}

export async function directusFetch<T>(
  path: string,
  query?: DirectusQuery,
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
  query?: DirectusQuery,
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
  body: B,
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
