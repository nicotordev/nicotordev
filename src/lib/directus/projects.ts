import {
  directusFetch,
  directusFetchOptional,
  type DirectusQuery,
} from "@/lib/directus/client";
import type {
  DirectusItemsResponse,
  DirectusProject,
} from "@/lib/directus/types";
import type { AssetDTO, ProjectDTO } from "@/types/projects";

const DEFAULT_FIELDS = [
  "project_id",
  "slug",
  "name",
  "cost",
  "description",
  "tech",
  "impact",
  "image",
  "link",
  "link_text",
  "is_active",
  "sort_order",
  "assets",
  "body",
  "date_created",
  "date_updated",
] as const;

function mapAsset(a: {
  id: string;
  name: string;
  url: string;
  alt?: string;
  type: string;
}): AssetDTO {
  const dto: AssetDTO = {
    id: a.id,
    name: a.name,
    url: a.url,
    type: a.type as AssetDTO["type"],
  };
  if (a.alt != null) dto.alt = a.alt;
  return dto;
}

function mapDirectusProjectToProject(p: DirectusProject): ProjectDTO {
  const dto: ProjectDTO = {
    id: p.project_id,
    slug: p.slug ?? slugFromId(p.project_id),
    name: p.name,
    cost: p.cost,
    description: p.description,
    tech: p.tech,
    image: p.image,
    isActive: p.is_active,
    sortOrder: p.sort_order,
    createdAt: p.date_created ?? new Date().toISOString(),
    updatedAt: p.date_updated ?? new Date().toISOString(),
    assets: Array.isArray(p.assets) ? p.assets.map(mapAsset) : [],
  };
  if (p.impact != null) dto.impact = p.impact;
  if (p.link != null) dto.link = p.link;
  if (p.link_text != null) dto.linkText = p.link_text;
  return dto;
}

/** Fallback slug when Directus project has no slug (e.g. project_id "proj_1" -> "proj-1"). */
function slugFromId(projectId: string): string {
  return projectId.replace(/_/g, "-").toLowerCase();
}

export type ProjectFromCMS = ProjectDTO & {
  /** Rich HTML body from Directus (WYSIWYG). */
  body?: string | null;
};

function toProjectFromCMS(p: DirectusProject): ProjectFromCMS {
  const base = mapDirectusProjectToProject(p);
  return { ...base, body: p.body ?? null };
}

/**
 * Fetch all active projects from Directus, ordered by sort_order.
 */
export async function fetchProjects(
  query?: Partial<DirectusQuery>
): Promise<ProjectFromCMS[]> {
  const res = await directusFetch<DirectusItemsResponse<DirectusProject>>(
    "/items/projects",
    {
      fields: [...DEFAULT_FIELDS],
      filter: { is_active: true },
      sort: ["sort_order", "id"],
      limit: 100,
      ...query,
    }
  );
  const list = res.data ?? [];
  return list.map(toProjectFromCMS);
}

/**
 * Fetch projects from Directus; returns null on failure.
 */
export async function fetchProjectsOptional(): Promise<ProjectFromCMS[] | null> {
  const res = await directusFetchOptional<
    DirectusItemsResponse<DirectusProject>
  >("/items/projects", {
    fields: [...DEFAULT_FIELDS],
    filter: { is_active: true },
    sort: ["sort_order", "id"],
    limit: 100,
  });
  if (!res?.data) return null;
  return res.data.map(toProjectFromCMS);
}

/**
 * Fetch a single project by project_id.
 */
export async function fetchProjectById(
  projectId: string
): Promise<ProjectFromCMS | null> {
  try {
    const res = await directusFetch<{ data: DirectusProject[] }>(
      "/items/projects",
      {
        fields: [...DEFAULT_FIELDS],
        filter: { project_id: projectId },
        limit: 1,
      }
    );
    const item = res.data?.[0];
    return item ? toProjectFromCMS(item) : null;
  } catch {
    return null;
  }
}

/**
 * Fetch a single project by slug (e.g. "regulex", "v0-dev-mcp").
 */
export async function fetchProjectBySlug(
  slug: string
): Promise<ProjectFromCMS | null> {
  try {
    const res = await directusFetch<{ data: DirectusProject[] }>(
      "/items/projects",
      {
        fields: [...DEFAULT_FIELDS],
        filter: { slug, is_active: true },
        limit: 1,
      }
    );
    const item = res.data?.[0];
    return item ? toProjectFromCMS(item) : null;
  } catch {
    return null;
  }
}
