import {
  directusFetch,
  directusFetchOptional,
  getDirectusUrl,
  type DirectusQuery,
} from "@/lib/directus/client";
import type {
  DirectusItemsResponse,
  DirectusProject,
  DirectusProjectGalleryRow,
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
  "body",
  "gallery.directus_files_id.id",
  "gallery.directus_files_id.title",
  "gallery.directus_files_id.type",
  "gallery.directus_files_id.description",
  "date_created",
  "date_updated",
] as const;

function mimeToAssetType(mime: string | null | undefined): AssetDTO["type"] {
  if (!mime) return "IMAGE";
  const m = mime.toLowerCase();
  if (m.startsWith("image/")) return "IMAGE";
  if (m.startsWith("video/")) return "VIDEO";
  if (m.startsWith("audio/")) return "AUDIO";
  return "DOCUMENT";
}

function directusFileToAsset(
  file: {
    id: string;
    title?: string | null;
    type?: string | null;
    description?: string | null;
  },
  baseUrl: string,
): AssetDTO {
  const dto: AssetDTO = {
    id: file.id,
    name: file.title?.trim() || file.id,
    url: `${baseUrl}/assets/${file.id}`,
    type: mimeToAssetType(file.type),
  };
  const alt = file.description?.trim();
  if (alt) dto.alt = alt;
  return dto;
}

function mapGalleryToAssets(
  gallery: DirectusProject["gallery"],
  baseUrl: string,
): AssetDTO[] {
  if (!Array.isArray(gallery) || gallery.length === 0) return [];

  const out: AssetDTO[] = [];
  for (const row of gallery) {
    if (row == null || typeof row !== "object") continue;
    const junction = row as DirectusProjectGalleryRow;
    const fid = junction.directus_files_id;
    if (typeof fid === "string") {
      out.push({
        id: fid,
        name: fid,
        url: `${baseUrl}/assets/${fid}`,
        type: "IMAGE",
      });
    } else if (fid && typeof fid === "object" && "id" in fid) {
      out.push(directusFileToAsset(fid, baseUrl));
    }
  }
  return out;
}

function mapDirectusProjectToProject(p: DirectusProject): ProjectDTO {
  const baseUrl = getDirectusUrl();
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
    gallery: mapGalleryToAssets(p.gallery, baseUrl),
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
  query?: Partial<DirectusQuery>,
): Promise<ProjectFromCMS[]> {
  const res = await directusFetch<DirectusItemsResponse<DirectusProject>>(
    "/items/projects",
    {
      fields: [...DEFAULT_FIELDS],
      filter: { is_active: true },
      sort: ["sort_order", "id"],
      limit: 100,
      ...query,
    },
  );
  const list = res.data ?? [];
  return list.map(toProjectFromCMS);
}

/**
 * Fetch projects from Directus; returns null on failure.
 */
export async function fetchProjectsOptional(): Promise<
  ProjectFromCMS[] | null
> {
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
  projectId: string,
): Promise<ProjectFromCMS | null> {
  try {
    const res = await directusFetch<{ data: DirectusProject[] }>(
      "/items/projects",
      {
        fields: [...DEFAULT_FIELDS],
        filter: { project_id: projectId },
        limit: 1,
      },
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
  slug: string,
): Promise<ProjectFromCMS | null> {
  try {
    const res = await directusFetch<{ data: DirectusProject[] }>(
      "/items/projects",
      {
        fields: [...DEFAULT_FIELDS],
        filter: { slug, is_active: true },
        limit: 1,
      },
    );
    const item = res.data?.[0];
    return item ? toProjectFromCMS(item) : null;
  } catch {
    return null;
  }
}
