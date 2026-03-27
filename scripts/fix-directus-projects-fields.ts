/**
 * Fix Directus `projects` for the Next.js app (Fields + Permissions API):
 *
 * 1) GET /fields/projects — detect missing columns.
 * 2) POST /fields/projects — ensure:
 *    - `date_created` / `date_updated` (timestamp + special date-created / date-updated)
 *      if the collection was created without system timestamps (common when collections
 *      are added via API without defaults).
 * 3) PATCH /permissions/:id — merge read rules that use an explicit field list so
 *    `gallery`, `date_created`, `date_updated` are included (skip when `fields` is ["*"]).
 *
 * Gallery is a native Directus M2M/files field (`gallery`); it is not created here.
 *
 * Use an admin token (or one that can manage fields + permissions), not a public read token.
 *
 * DIRECTUS_URL=https://directus.nicotordev.com DIRECTUS_TOKEN=... bun scripts/fix-directus-projects-fields.ts
 */

const BASE_URL = (
  process.env.DIRECTUS_URL ?? "https://directus.nicotordev.com"
).replace(/\/$/, "");
const AUTH_TOKEN = process.env.DIRECTUS_TOKEN ?? "";

const HEADERS: HeadersInit = {
  Authorization: `Bearer ${AUTH_TOKEN}`,
  "Content-Type": "application/json",
};

const REQUIRED_READ_FIELDS = [
  "gallery",
  "date_created",
  "date_updated",
] as const;

async function getProjectFieldNames(): Promise<Set<string>> {
  const listRes = await fetch(`${BASE_URL}/fields/projects?limit=-1`, {
    headers: HEADERS,
  });
  if (!listRes.ok) {
    console.error(
      "GET /fields/projects failed:",
      listRes.status,
      await listRes.text(),
    );
    process.exit(1);
  }
  const listJson = (await listRes.json()) as {
    data?: Array<{ field: string }>;
  };
  return new Set((listJson.data ?? []).map((f) => f.field));
}

async function ensureSystemTimestampField(
  names: Set<string>,
  field: "date_created" | "date_updated",
  special: "date-created" | "date-updated",
): Promise<void> {
  if (names.has(field)) {
    console.log(`Field projects.${field} already exists.`);
    return;
  }

  const createRes = await fetch(`${BASE_URL}/fields/projects`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({
      field,
      type: "timestamp",
      schema: {},
      meta: {
        interface: "datetime",
        readonly: true,
        hidden: true,
        width: "half",
        special: [special],
      },
    }),
  });
  if (createRes.ok) {
    console.log(`Created field: projects.${field} (timestamp, ${special}).`);
    names.add(field);
    return;
  }
  const err = await createRes.text();
  if (err.includes("already exists") || createRes.status === 409) {
    console.log(`Field projects.${field} already exists.`);
    names.add(field);
    return;
  }
  console.error(
    `POST /fields/projects (${field}) failed:`,
    createRes.status,
    err,
  );
  process.exit(1);
}

function mergeReadFields(current: string[] | null | undefined): string[] {
  if (current == null || current.length === 0) return ["*"];
  if (current.includes("*")) return ["*"];
  return Array.from(new Set([...current, ...REQUIRED_READ_FIELDS]));
}

function readFieldsAlreadyOk(current: string[] | null | undefined): boolean {
  if (current == null || current.length === 0) return false;
  if (current.includes("*")) return true;
  return REQUIRED_READ_FIELDS.every((f) => current.includes(f));
}

type PermissionRow = {
  id: number;
  collection: string;
  action: string;
  fields: string[] | null;
};

async function patchProjectsReadPermissions(): Promise<void> {
  const params = new URLSearchParams();
  params.set("filter[collection][_eq]", "projects");
  params.set("filter[action][_eq]", "read");
  params.set("limit", "-1");

  const res = await fetch(`${BASE_URL}/permissions?${params}`, {
    headers: HEADERS,
  });
  if (!res.ok) {
    console.error("GET /permissions failed:", res.status, await res.text());
    process.exit(1);
  }
  const json = (await res.json()) as { data?: PermissionRow[] };
  const rows = json.data ?? [];
  if (rows.length === 0) {
    console.warn(
      'No read permission rules for collection "projects". Create one in Directus (Settings → Access Control) or use an admin token.',
    );
    return;
  }

  for (const row of rows) {
    if (readFieldsAlreadyOk(row.fields)) {
      console.log(
        `Permission id=${row.id} (read projects): fields already allow gallery + timestamps or "*".`,
      );
      continue;
    }

    const next = mergeReadFields(row.fields ?? undefined);

    const patchRes = await fetch(`${BASE_URL}/permissions/${row.id}`, {
      method: "PATCH",
      headers: HEADERS,
      body: JSON.stringify({ fields: next }),
    });
    if (!patchRes.ok) {
      console.error(
        `PATCH /permissions/${row.id} failed:`,
        patchRes.status,
        await patchRes.text(),
      );
      process.exit(1);
    }
    console.log(
      `Updated permission id=${row.id} (read projects): fields ->`,
      JSON.stringify(next),
    );
  }
}

async function main() {
  if (!AUTH_TOKEN) {
    console.error(
      "Set DIRECTUS_TOKEN (admin or permission to manage fields + permissions).",
    );
    process.exit(1);
  }
  const names = await getProjectFieldNames();

  if (!names.has("gallery")) {
    console.warn(
      "Field projects.gallery is missing. Add a Files/M2M gallery field in Directus; this script does not create it.",
    );
  }

  console.log("Ensuring projects.date_created / date_updated...");
  await ensureSystemTimestampField(names, "date_created", "date-created");
  await ensureSystemTimestampField(names, "date_updated", "date-updated");

  console.log(
    "Updating read permissions for projects (explicit field lists only)...",
  );
  await patchProjectsReadPermissions();
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
