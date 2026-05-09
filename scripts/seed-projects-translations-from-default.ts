/**
 * Creates a missing `projects_translations` row for locale `PROJECT_TRANSLATION_SEED_LOCALE`
 * (default `en`) when the project has none. Use after `projects` exist and after duplicate
 * root text fields were dropped (copy is only under Translations).
 *
 *   DIRECTUS_URL=... DIRECTUS_TOKEN=... bun scripts/seed-projects-translations-from-default.ts
 */

export {};

const BASE_URL =
  process.env.DIRECTUS_URL ?? "https://directus.nicotordev.com";
const AUTH_TOKEN = process.env.DIRECTUS_TOKEN ?? "";
const SOURCE_LOCALE = process.env.PROJECT_TRANSLATION_SEED_LOCALE ?? "en";

const HEADERS: HeadersInit = {
  Authorization: `Bearer ${AUTH_TOKEN}`,
  "Content-Type": "application/json",
};

async function run() {
  if (!AUTH_TOKEN) {
    console.error("Set DIRECTUS_TOKEN.");
    process.exit(1);
  }

  const base = BASE_URL.replace(/\/$/, "");

  const projRes = await fetch(`${base}/items/projects?limit=250&fields=id`, {
    headers: HEADERS,
  });
  if (!projRes.ok) {
    console.error("Failed to list projects:", projRes.status, await projRes.text());
    process.exit(1);
  }
  const projects = ((await projRes.json()) as { data: { id: number }[] }).data;

  const mapRes = await fetch(
    `${base}/items/projects_translations?filter[languages_code][_eq]=${encodeURIComponent(SOURCE_LOCALE)}&limit=500&fields=projects_id`,
    { headers: HEADERS },
  );
  if (!mapRes.ok) {
    console.error(
      "Failed to list projects_translations:",
      mapRes.status,
      await mapRes.text(),
    );
    process.exit(1);
  }
  const existing = new Set<number>();
  const mapData = (
    (await mapRes.json()) as { data?: { projects_id?: number | null }[] }
  ).data;
  for (const row of mapData ?? []) {
    if (row.projects_id != null) existing.add(row.projects_id);
  }

  let created = 0;
  let skipped = 0;

  for (const p of projects) {
    if (existing.has(p.id)) {
      skipped += 1;
      continue;
    }

    const res = await fetch(`${base}/items/projects_translations`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({
        projects_id: p.id,
        languages_code: SOURCE_LOCALE,
      }),
    });
    if (res.ok) {
      console.log(
        `  Created empty ${SOURCE_LOCALE} row for projects.id=${p.id}`,
      );
      created += 1;
    } else {
      console.warn(
        `  Skip projects.id=${p.id}:`,
        res.status,
        await res.text(),
      );
    }
  }

  console.log(`Done. Created ${created}, skipped ${skipped}.`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
