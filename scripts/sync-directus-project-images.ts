/**
 * Upload local project screenshots to Directus and attach them to `projects`.
 *
 * - Reads each project's legacy `image` path (`/images/projects/<folder>/<file>`).
 * - Resolves files under PROJECTS_IMAGES_ROOT (WSL: /mnt/c/Users/nicot/Documents/projects).
 * - Sets `image_file` + `image` (full asset URL) from the hero file.
 * - Replaces `gallery` with the rest of the images in that folder (sorted), excluding the hero.
 *
 * Usage:
 *   DIRECTUS_URL=https://directus.nicotordev.com \
 *   DIRECTUS_TOKEN=... \
 *   PROJECTS_IMAGES_ROOT=/mnt/c/Users/nicot/Documents/projects \
 *   bun scripts/sync-directus-project-images.ts
 *
 * Dry run (no uploads / no PATCH):
 *   ... bun scripts/sync-directus-project-images.ts --dry-run
 */

export {};

import { readdirSync, readFileSync, statSync } from "node:fs";
import { basename, join } from "node:path";

const BASE_URL = (
  process.env.DIRECTUS_URL ?? "https://directus.nicotordev.com"
).replace(/\/$/, "");
const AUTH_TOKEN = process.env.DIRECTUS_TOKEN ?? "";
const PROJECTS_ROOT =
  process.env.PROJECTS_IMAGES_ROOT ?? "/mnt/c/Users/nicot/Documents/projects";

const DRY_RUN = process.argv.includes("--dry-run");
const FORCE = process.argv.includes("--force");

const IMAGE_EXT = new Set([".webp", ".jpg", ".jpeg", ".png", ".gif", ".avif"]);

const MIME: Record<string, string> = {
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".avif": "image/avif",
};

const HEADERS: HeadersInit = {
  Authorization: `Bearer ${AUTH_TOKEN}`,
};

const LEGACY_IMAGE_RE = /^\/images\/projects\/([^/]+)\/([^/]+)$/i;

/**
 * Same paths as `staticProjects` in `src/app/data/projects.ts`.
 * Used when `projects.image` is already a Directus asset URL after a previous sync.
 */
const LEGACY_IMAGE_BY_PROJECT_ID: Record<string, string> = {
  proj_1: "/images/projects/regulex/home-1.webp",
  proj_2: "/images/projects/v0-dev-mcp/main.webp",
  proj_3: "/images/projects/conexus-space-planner/calculator.webp",
  proj_4: "/images/projects/seguidoress/1.webp",
  proj_5: "/images/projects/sexyconce/main.webp",
  proj_6: "/images/projects/flowcl-pagos/1.webp",
  proj_8: "/images/projects/spiritory/home.webp",
  proj_9: "/images/projects/funpicai/chat-1.webp",
  proj_10: "/images/projects/crypto-asset-screener/home-1.webp",
  proj_11: "/images/projects/classpro/home-1.webp",
};

function resolveFolderAndHero(row: {
  image: string | null;
  project_id: string;
}): { folder: string; hero: string } | null {
  const img = row.image?.trim() ?? "";
  const fromCurrent = img.match(LEGACY_IMAGE_RE);
  if (fromCurrent) {
    return { folder: fromCurrent[1]!, hero: fromCurrent[2]! };
  }
  const legacy = LEGACY_IMAGE_BY_PROJECT_ID[row.project_id];
  if (!legacy) return null;
  const fromStatic = legacy.match(LEGACY_IMAGE_RE);
  if (!fromStatic) return null;
  return { folder: fromStatic[1]!, hero: fromStatic[2]! };
}

type ProjectRow = {
  id: number;
  project_id: string;
  image: string | null;
  gallery: Array<{ id: number; directus_files_id?: string }> | null;
};

function extOf(name: string): string {
  const i = name.lastIndexOf(".");
  return i >= 0 ? name.slice(i).toLowerCase() : "";
}

function mimeFor(name: string): string {
  return MIME[extOf(name)] ?? "application/octet-stream";
}

function listImageFiles(dir: string): string[] {
  const names = readdirSync(dir);
  const files: string[] = [];
  for (const n of names) {
    if (n.startsWith(".")) continue;
    const full = join(dir, n);
    if (!statSync(full).isFile()) continue;
    if (!IMAGE_EXT.has(extOf(n))) continue;
    files.push(n);
  }
  files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  return files;
}

async function uploadFile(
  absolutePath: string,
): Promise<{ id: string } | null> {
  const name = basename(absolutePath);
  const buf = readFileSync(absolutePath);
  const blob = new Blob([buf], { type: mimeFor(name) });
  const form = new FormData();
  form.append("file", blob, name);
  form.append("title", name);

  const res = await fetch(`${BASE_URL}/files`, {
    method: "POST",
    headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
    body: form,
  });
  if (!res.ok) {
    console.error("  Upload failed:", name, res.status, await res.text());
    return null;
  }
  const json = (await res.json()) as { data?: { id: string } };
  return json.data?.id ? { id: json.data.id } : null;
}

async function fetchProjects(): Promise<ProjectRow[]> {
  const params = new URLSearchParams();
  params.set(
    "fields",
    "id,project_id,image,gallery.id,gallery.directus_files_id",
  );
  params.set("limit", "-1");
  const res = await fetch(`${BASE_URL}/items/projects?${params}`, {
    headers: { ...HEADERS, "Content-Type": "application/json" },
  });
  if (!res.ok) {
    console.error("GET projects failed:", res.status, await res.text());
    process.exit(1);
  }
  const json = (await res.json()) as { data: ProjectRow[] };
  return json.data ?? [];
}

async function patchProject(
  id: number,
  body: Record<string, unknown>,
): Promise<boolean> {
  const res = await fetch(`${BASE_URL}/items/projects/${id}`, {
    method: "PATCH",
    headers: { ...HEADERS, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    console.error("  PATCH failed:", res.status, await res.text());
    return false;
  }
  return true;
}

async function main() {
  if (!AUTH_TOKEN) {
    console.error("Set DIRECTUS_TOKEN");
    process.exit(1);
  }

  const projects = await fetchProjects();
  console.log(
    `Start sync (${projects.length} projects). root=${PROJECTS_ROOT} dryRun=${DRY_RUN}`,
  );

  for (const p of projects) {
    const resolved = resolveFolderAndHero(p);
    if (!resolved) {
      console.warn(
        `Skip id=${p.id} project_id=${p.project_id}: cannot resolve folder/hero from image or static map`,
        p.image,
      );
      continue;
    }
    const { folder, hero: heroName } = resolved;

    const imgTrim = p.image?.trim() ?? "";
    const alreadyMigrated = imgTrim.startsWith(`${BASE_URL}/assets/`);
    if (alreadyMigrated && !FORCE) {
      console.log(
        `Skip id=${p.id} (${folder}): already uses Directus asset URL. Pass --force to re-upload.`,
      );
      continue;
    }
    const dir = join(PROJECTS_ROOT, folder);
    const heroPath = join(dir, heroName);

    try {
      if (!statSync(dir).isDirectory()) {
        console.warn(`Skip id=${p.id}: missing folder`, dir);
        continue;
      }
      if (!statSync(heroPath).isFile()) {
        console.warn(`Skip id=${p.id}: missing hero file`, heroPath);
        continue;
      }
    } catch {
      console.warn(`Skip id=${p.id}: cannot stat`, dir);
      continue;
    }

    const allNames = listImageFiles(dir);
    if (allNames.length === 0) {
      console.warn(`Skip id=${p.id}: no images in`, dir);
      continue;
    }

    const galleryNames = allNames.filter((n) => n !== heroName);

    console.log(
      `Project id=${p.id} folder=${folder} hero=${heroName} +${galleryNames.length} gallery`,
    );

    if (DRY_RUN) continue;

    const heroUploaded = await uploadFile(heroPath);
    if (!heroUploaded) continue;
    const heroId = heroUploaded.id;
    const assetUrl = `${BASE_URL}/assets/${heroId}`;

    const galleryIds: string[] = [];
    for (const gn of galleryNames) {
      const up = await uploadFile(join(dir, gn));
      if (up) galleryIds.push(up.id);
    }

    const existingJunctionIds = (p.gallery ?? [])
      .map((row) => row.id)
      .filter((n) => typeof n === "number");

    const galleryPayload: Record<string, unknown> = {};
    if (existingJunctionIds.length > 0) {
      galleryPayload.delete = existingJunctionIds;
    }
    if (galleryIds.length > 0) {
      galleryPayload.create = galleryIds.map((directus_files_id, index) => ({
        directus_files_id,
        sort: index + 1,
      }));
    }

    const body: Record<string, unknown> = {
      image_file: heroId,
      image: assetUrl,
    };
    if (Object.keys(galleryPayload).length > 0) {
      body.gallery = galleryPayload;
    }

    const ok = await patchProject(p.id, body);
    if (ok) {
      console.log(
        `  OK image_file=${heroId} gallery_files=${galleryIds.length}`,
      );
    }
  }

  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
