import {
  directusFetch,
  directusFetchOptional,
  type DirectusQuery,
} from "@/lib/directus/client";
import type { DirectusItemsResponse, DirectusLink } from "@/lib/directus/types";

export type LinkFromCMS = {
  id: number;
  title: string;
  url: string;
  icon: string | null;
  isActive: boolean;
  sort: number | null;
};

function mapDirectusLink(l: DirectusLink): LinkFromCMS {
  return {
    id: l.id,
    title: l.title,
    url: l.url,
    icon: l.icon,
    isActive: l.is_active,
    sort: l.sort,
  };
}

const DEFAULT_FIELDS = [
  "id",
  "title",
  "url",
  "icon",
  "is_active",
  "sort",
] as const;

/**
 * Fetch all links from Directus.
 */
export async function fetchLinks(
  query?: Partial<DirectusQuery>
): Promise<LinkFromCMS[]> {
  const res = await directusFetch<DirectusItemsResponse<DirectusLink>>(
    "/items/links",
    {
      fields: [...DEFAULT_FIELDS],
      filter: { is_active: { _eq: true } },
      sort: ["sort", "title"],
      limit: 100,
      ...query,
    }
  );
  const list = res.data ?? [];
  return list.map(mapDirectusLink);
}

/**
 * Fetch links from Directus; returns null on failure.
 */
export async function fetchLinksOptional(): Promise<LinkFromCMS[] | null> {
  const res = await directusFetchOptional<
    DirectusItemsResponse<DirectusLink>
  >("/items/links", {
    fields: [...DEFAULT_FIELDS],
    filter: { is_active: { _eq: true } },
    sort: ["sort", "title"],
    limit: 100,
  });
  if (!res?.data) return null;
  return res.data.map(mapDirectusLink);
}
