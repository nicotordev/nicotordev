/**
 * Switch `projects.translations` to Directus **Translations** UI and set list preview template.
 * After removing duplicate root columns, use `scripts/drop-projects-slim-schema.ts` instead of
 * hiding fields.
 *
 *   DIRECTUS_URL=... DIRECTUS_TOKEN=... bun scripts/configure-projects-translations-interface.ts
 */

export {};

const BASE_URL =
  process.env.DIRECTUS_URL ?? "https://directus.nicotordev.com";
const AUTH_TOKEN = process.env.DIRECTUS_TOKEN ?? "";

const HEADERS: HeadersInit = {
  Authorization: `Bearer ${AUTH_TOKEN}`,
  "Content-Type": "application/json",
};

async function patchJson(
  path: string,
  body: unknown,
): Promise<{ ok: boolean; status: number; text: string }> {
  const res = await fetch(`${BASE_URL.replace(/\/$/, "")}${path}`, {
    method: "PATCH",
    headers: HEADERS,
    body: JSON.stringify(body),
  });
  return { ok: res.ok, status: res.status, text: await res.text() };
}

async function run() {
  if (!AUTH_TOKEN) {
    console.error("Set DIRECTUS_TOKEN.");
    process.exit(1);
  }

  const tr = await patchJson("/fields/projects/translations", {
    meta: {
      interface: "translations",
      special: ["translations"],
      note: "All localized copy here. Default language: English (en).",
      options: {
        languageField: "name",
        languageDirectionField: "direction",
        defaultLanguage: "en",
        defaultOpenSplitView: true,
        userLanguage: false,
      },
      sort: 5,
      width: "full",
    },
  });
  if (!tr.ok) {
    console.error("PATCH projects.translations failed:", tr.status, tr.text);
    process.exit(1);
  }
  console.log("Set projects.translations → interface translations");

  const col = await patchJson("/collections/projects", {
    meta: {
      display_template: "{{slug}} · {{project_id}}",
    },
  });
  if (col.ok) {
    console.log("Set projects display_template.");
  } else {
    console.warn("PATCH collections/projects:", col.status, col.text);
  }

  console.log("Done.");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
