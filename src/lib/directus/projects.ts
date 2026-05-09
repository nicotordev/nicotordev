import { defaultLocale, type Locale } from "@/i18n/config";
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
  DirectusProjectTranslation,
} from "@/lib/directus/types";
import { resolveProjectCostDisplay } from "@/lib/projects/cost-display";
import type { AssetDTO, ProjectDTO } from "@/types/projects";

const DEFAULT_FIELDS = [
  "project_id",
  "slug",
  "cost",
  "image",
  "link",
  "is_active",
  "sort_order",
  "gallery.directus_files_id.id",
  "gallery.directus_files_id.title",
  "gallery.directus_files_id.type",
  "gallery.directus_files_id.description",
  "date_created",
  "date_updated",
  "translations.id",
  "translations.languages_code",
  "translations.name",
  "translations.description",
  "translations.tech",
  "translations.impact",
] as const;
const DEFAULT_PROJECT_IMAGE = "/images/projects/regulex/home-1.webp";

function readLanguagesCode(
  v: DirectusProjectTranslation["languages_code"],
): string | null {
  if (v == null) return null;
  if (typeof v === "string") return v;
  if (typeof v === "object" && "code" in v && typeof v.code === "string") {
    return v.code;
  }
  return null;
}

function pickTranslation(
  rows: DirectusProject["translations"],
  locale: Locale,
): DirectusProjectTranslation | null {
  if (!Array.isArray(rows) || rows.length === 0) return null;
  for (const row of rows) {
    if (readLanguagesCode(row.languages_code) === locale) return row;
  }
  return null;
}

/** Prefer requested locale, then English (`en`). */
function pickTranslationForLocale(
  rows: DirectusProject["translations"],
  locale: Locale,
): DirectusProjectTranslation | null {
  const primary = pickTranslation(rows, locale);
  if (primary) return primary;
  return pickTranslation(rows, defaultLocale);
}

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

function toDirectusAssetUrl(
  value: string | null | undefined,
  baseUrl: string,
): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return trimmed;
  if (/^https?:\/\//i.test(trimmed) || trimmed.startsWith("/")) {
    return trimmed;
  }
  return `${baseUrl}/assets/${trimmed}`;
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

/** Structural fields only; titles and copy come from `translations`. */
function mapDirectusProjectToProject(p: DirectusProject): ProjectDTO {
  const baseUrl = getDirectusUrl();
  const gallery = mapGalleryToAssets(p.gallery, baseUrl);
  const resolvedImage =
    toDirectusAssetUrl(p.image, baseUrl) ??
    gallery[0]?.url ??
    DEFAULT_PROJECT_IMAGE;
  const slug = p.slug ?? slugFromId(p.project_id);
  const dto: ProjectDTO = {
    id: p.project_id,
    slug,
    name: slug,
    cost: p.cost,
    costDisplay: resolveProjectCostDisplay(slug, p.cost, p.cost_display),
    description: "",
    tech: "",
    image: resolvedImage,
    isActive: p.is_active,
    sortOrder: p.sort_order,
    createdAt: p.date_created ?? new Date().toISOString(),
    updatedAt: p.date_updated ?? new Date().toISOString(),
    gallery,
  };
  if (p.link != null) dto.link = p.link;
  return dto;
}

/** Fallback slug when Directus project has no slug (e.g. project_id "proj_1" -> "proj-1"). */
function slugFromId(projectId: string): string {
  return projectId.replace(/_/g, "-").toLowerCase();
}

export type ProjectFromCMS = ProjectDTO & {
  /** Kept for compatibility with static fallback data; CMS does not supply HTML body anymore. */
  body?: string | null;
};

function mergeCopyFromTranslation(
  base: ProjectDTO,
  row: DirectusProjectTranslation | null,
): ProjectDTO {
  if (!row) return base;
  const name = row.name?.trim() || base.name;
  const description = row.description?.trim() || base.description;
  const tech = row.tech?.trim() || base.tech;
  const next: ProjectDTO = {
    ...base,
    name,
    description,
    tech,
  };
  const impact =
    row.impact != null && row.impact.trim() !== ""
      ? row.impact.trim()
      : base.impact;
  if (impact !== undefined) next.impact = impact;
  return next;
}

function toProjectFromCMS(
  p: DirectusProject,
  locale: Locale = defaultLocale,
): ProjectFromCMS {
  const base = mapDirectusProjectToProject(p);
  const row = pickTranslationForLocale(p.translations, locale);
  const merged = mergeCopyFromTranslation(base, row);

  return {
    ...merged,
    costDisplay: resolveProjectCostDisplay(
      merged.slug,
      merged.cost,
      p.cost_display,
    ),
  };
}

/**
 * Fetch all active projects from Directus, ordered by sort_order.
 */
export async function fetchProjects(
  query?: Partial<DirectusQuery>,
  locale: Locale = defaultLocale,
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
  return list.map((p) => toProjectFromCMS(p, locale));
}

/**
 * Fetch projects from Directus; returns null on failure.
 */
export async function fetchProjectsOptional(
  locale: Locale = defaultLocale,
): Promise<ProjectFromCMS[] | null> {
  const res = await directusFetchOptional<
    DirectusItemsResponse<DirectusProject>
  >("/items/projects", {
    fields: [...DEFAULT_FIELDS],
    filter: { is_active: true },
    sort: ["sort_order", "id"],
    limit: 100,
  });
  if (!res?.data) return null;
  return res.data.map((p) => toProjectFromCMS(p, locale));
}

/**
 * Fetch a single project by project_id.
 */
export async function fetchProjectById(
  projectId: string,
  locale: Locale = defaultLocale,
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
    return item ? toProjectFromCMS(item, locale) : null;
  } catch {
    return null;
  }
}

/**
 * Fetch a single project by slug (kebab-case, matches CMS `slug`).
 */
export async function fetchProjectBySlug(
  slug: string,
  locale: Locale = defaultLocale,
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
    return item ? toProjectFromCMS(item, locale) : null;
  } catch {
    return null;
  }
}
