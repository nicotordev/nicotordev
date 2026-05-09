/**
 * Drops redundant Directus fields after moving copy to `projects_translations`:
 *
 * - `projects`: name, description, tech, impact, body, link_text
 * - `projects_translations`: body, link_text, cost_display
 *
 * Keeps on `projects`: slug, cost, cost_display, image, link, gallery, sort_order, …
 * Keeps on `projects_translations`: name, description, tech, impact (+ relations)
 *
 *   DIRECTUS_URL=... DIRECTUS_TOKEN=... bun scripts/drop-projects-slim-schema.ts
 */

export {};

const BASE_URL =
  process.env.DIRECTUS_URL ?? "https://directus.nicotordev.com";
const AUTH_TOKEN = process.env.DIRECTUS_TOKEN ?? "";

const HEADERS: HeadersInit = {
  Authorization: `Bearer ${AUTH_TOKEN}`,
  "Content-Type": "application/json",
};

const DROP_PROJECTS = [
  "name",
  "description",
  "tech",
  "impact",
  "body",
  "link_text",
] as const;

const DROP_TRANSLATIONS = ["body", "link_text", "cost_display"] as const;

async function dropField(collection: string, field: string): Promise<boolean> {
  const res = await fetch(
    `${BASE_URL.replace(/\/$/, "")}/fields/${collection}/${field}`,
    { method: "DELETE", headers: HEADERS },
  );
  const text = await res.text();
  if (res.ok || res.status === 204) {
    console.log(`  Dropped ${collection}.${field}`);
    return true;
  }
  if (res.status === 404 || text.includes("doesn't exist")) {
    console.log(`  ${collection}.${field} already absent`);
    return true;
  }
  console.error(`  ${collection}.${field}:`, res.status, text);
  return false;
}

async function run() {
  if (!AUTH_TOKEN) {
    console.error("Set DIRECTUS_TOKEN.");
    process.exit(1);
  }

  let ok = true;

  console.log("Dropping projects_translations fields…");
  for (const f of DROP_TRANSLATIONS) {
    if (!(await dropField("projects_translations", f))) ok = false;
  }

  console.log("Dropping projects root text fields…");
  for (const f of DROP_PROJECTS) {
    if (!(await dropField("projects", f))) ok = false;
  }

  console.log(ok ? "Done." : "Finished with errors.");
  if (!ok) process.exit(1);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
