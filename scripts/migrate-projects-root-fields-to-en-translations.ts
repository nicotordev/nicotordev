/**
 * **[Legacy]** Copies root fields into `projects_translations` (`en`), then clears the root —
 * run **before** `drop-projects-slim-schema.ts` deletes those columns. If root columns are
 * already gone, skip this script.
 *
 * Copies root text from `projects` into `projects_translations` for `languages_code = en`,
 * then clears those root fields so the single source of truth is the Translations UI.
 *
 * Fields: name, description, tech, impact, body, link_text, cost_display (when readable).
 *
 *   DIRECTUS_URL=... DIRECTUS_TOKEN=... bun scripts/migrate-projects-root-fields-to-en-translations.ts
 */

export {};

const BASE_URL =
  process.env.DIRECTUS_URL ?? "https://directus.nicotordev.com";
const AUTH_TOKEN = process.env.DIRECTUS_TOKEN ?? "";
const EN = "en";

const HEADERS: HeadersInit = {
  Authorization: `Bearer ${AUTH_TOKEN}`,
  "Content-Type": "application/json",
};

type ProjectRow = {
  id: number;
  name?: string | null;
  description?: string | null;
  tech?: string | null;
  impact?: string | null;
  body?: string | null;
  link_text?: string | null;
  cost_display?: string | null;
};

async function run() {
  if (!AUTH_TOKEN) {
    console.error("Set DIRECTUS_TOKEN.");
    process.exit(1);
  }

  const base = BASE_URL.replace(/\/$/, "");

  const fieldGroups = [
    "id,name,description,tech,impact,body,link_text",
    "id,name,description,tech,impact,body,link_text,cost_display",
  ];

  let projects: ProjectRow[] | null = null;
  for (const fields of fieldGroups) {
    const res = await fetch(
      `${base}/items/projects?limit=250&fields=${encodeURIComponent(fields)}`,
      { headers: HEADERS },
    );
    if (res.ok) {
      projects = ((await res.json()) as { data: ProjectRow[] }).data;
      console.log(`Fetched projects with fields: ${fields}`);
      break;
    }
    const err = await res.text();
    console.warn(`GET projects (${fields})`, res.status, err);
  }

  if (!projects) {
    console.error("Could not list projects.");
    process.exit(1);
  }

  const hasCostDisplay = projects.some((row) =>
    Object.prototype.hasOwnProperty.call(row, "cost_display"),
  );

  const trIndex = await fetch(
    `${base}/items/projects_translations?filter[languages_code][_eq]=${EN}&limit=500&fields=id,projects_id`,
    { headers: HEADERS },
  );
  const trData = trIndex.ok
    ? (((await trIndex.json()) as {
        data?: { id: number; projects_id?: number | null }[];
      }).data ?? [])
    : [];
  const translationIdByProject = new Map<number, number>();
  for (const row of trData) {
    if (row.projects_id != null)
      translationIdByProject.set(row.projects_id, row.id);
  }

  let updated = 0;
  let cleared = 0;

  for (const p of projects) {
    const existingId = translationIdByProject.get(p.id);

    const payload = {
      name: p.name,
      description: p.description,
      tech: p.tech,
      impact: p.impact,
      body: p.body,
      link_text: p.link_text,
      ...(hasCostDisplay && p.cost_display !== undefined
        ? { cost_display: p.cost_display }
        : {}),
    };

    let saveOk = false;
    if (existingId != null) {
      const patch = await fetch(
        `${base}/items/projects_translations/${existingId}`,
        {
          method: "PATCH",
          headers: HEADERS,
          body: JSON.stringify(payload),
        },
      );
      saveOk = patch.ok;
      if (!patch.ok) {
        console.warn(`PATCH translation id=${existingId}`, await patch.text());
      }
    } else {
      const post = await fetch(`${base}/items/projects_translations`, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify({
          projects_id: p.id,
          languages_code: EN,
          ...payload,
        }),
      });
      saveOk = post.ok;
      if (!post.ok) {
        console.warn(`POST translation project id=${p.id}`, await post.text());
      }
    }

    if (saveOk) updated += 1;

    const clearPayload: Record<string, null> = {
      name: null,
      description: null,
      tech: null,
      impact: null,
      body: null,
      link_text: null,
    };
    if (hasCostDisplay) clearPayload.cost_display = null;

    const clear = await fetch(`${base}/items/projects/${p.id}`, {
      method: "PATCH",
      headers: HEADERS,
      body: JSON.stringify(clearPayload),
    });
    if (clear.ok) {
      cleared += 1;
    } else {
      console.warn(`PATCH clear project id=${p.id}`, await clear.text());
    }
  }

  console.log(
    `Done. Upserted EN translations for ${updated}/${projects.length} projects; cleared roots for ${cleared}/${projects.length}.`,
  );
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
