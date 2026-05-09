/**
 * Creates Directus collections for translated project content:
 * - `languages` (PK: `code`) — seeded with app locales (en, en-gb, es, …)
 * - `projects_translations` — name, description (HTML), tech, impact per locale
 * - Relations: projects_translations → projects (O2M alias `projects.translations`) and → languages
 *
 * Prefer running as an Admin static token or user with schema rights. After run, grant the Public
 * (or your website) policy read access to `languages` and `projects_translations` if the site API
 * should read them without a privileged token.
 *
 * Usage:
 *   DIRECTUS_URL=https://directus.nicotordev.com DIRECTUS_TOKEN=... \
 *     bun scripts/setup-directus-projects-translations.ts
 */

export {};

const BASE_URL =
  process.env.DIRECTUS_URL ?? "https://directus.nicotordev.com";
const AUTH_TOKEN = process.env.DIRECTUS_TOKEN ?? "";

const HEADERS: HeadersInit = {
  Authorization: `Bearer ${AUTH_TOKEN}`,
  "Content-Type": "application/json",
};

const APP_LOCALES = [
  { code: "en", name: "English", direction: "ltr" },
  { code: "en-gb", name: "English (UK)", direction: "ltr" },
  { code: "es", name: "Español", direction: "ltr" },
  { code: "es-es", name: "Español (España)", direction: "ltr" },
  { code: "es-cl", name: "Español (Chile)", direction: "ltr" },
  { code: "de", name: "Deutsch", direction: "ltr" },
] as const;

const LANGUAGES_FIELDS = [
  {
    field: "code",
    type: "string",
    schema: { max_length: 64, is_nullable: false, is_primary_key: true },
    meta: {
      interface: "input",
      readonly: true,
      note: "Matches Next.js locale segment (e.g. en, en-gb, es-cl)",
    },
  },
  {
    field: "name",
    type: "string",
    schema: { max_length: 255, is_nullable: true },
    meta: { interface: "input" },
  },
  {
    field: "direction",
    type: "string",
    schema: { max_length: 3, is_nullable: true },
    meta: { interface: "input", note: "ltr or rtl" },
  },
];

const PROJECTS_TRANSLATIONS_FIELDS = [
  {
    field: "projects_id",
    type: "integer",
    schema: { is_nullable: false },
    meta: { interface: "select-dropdown-m2o", note: "Parent project" },
  },
  {
    field: "languages_code",
    type: "string",
    schema: { max_length: 64, is_nullable: false },
    meta: { interface: "select-dropdown-m2o", note: "Locale code from languages" },
  },
  {
    field: "name",
    type: "string",
    schema: { max_length: 255, is_nullable: true },
    meta: { interface: "input", note: "Translated title" },
  },
  {
    field: "description",
    type: "text",
    schema: { is_nullable: true },
    meta: {
      interface: "input-rich-text-html",
      note: "Main pitch / long copy (rich HTML)",
    },
  },
  {
    field: "tech",
    type: "string",
    schema: { max_length: 255, is_nullable: true },
    meta: { interface: "input", note: "Translated stack line" },
  },
  {
    field: "impact",
    type: "text",
    schema: { is_nullable: true },
    meta: { interface: "input-multiline", note: "Translated impact line" },
  },
];

async function postJson(
  path: string,
  body: unknown,
): Promise<{ ok: boolean; status: number; text: string }> {
  const res = await fetch(`${BASE_URL.replace(/\/$/, "")}${path}`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify(body),
  });
  const text = await res.text();
  return { ok: res.ok, status: res.status, text };
}

async function ensureLanguagesCollection() {
  const res = await postJson("/collections", {
    collection: "languages",
    meta: {
      icon: "translate",
      note: "Site locales for translated content (matches app locale codes)",
    },
    schema: {},
    fields: LANGUAGES_FIELDS,
  });
  if (res.ok) {
    console.log("Created collection: languages");
    return;
  }
  if (
    res.text.includes("already exists") ||
    res.status === 409 ||
    res.text.includes("must be unique")
  ) {
    console.log("Collection 'languages' exists; syncing missing fields...");
    for (const field of LANGUAGES_FIELDS) {
      const fr = await postJson("/fields/languages", field);
      if (fr.ok) console.log(`  Added languages.${field.field}`);
    }
    return;
  }
  console.error("Failed to create languages:", res.status, res.text);
  process.exit(1);
}

async function ensureProjectsTranslationsCollection() {
  const res = await postJson("/collections", {
    collection: "projects_translations",
    meta: {
      icon: "translate",
      note: "Per-locale copy for projects",
    },
    schema: {},
    fields: PROJECTS_TRANSLATIONS_FIELDS,
  });
  if (res.ok) {
    console.log("Created collection: projects_translations");
    return;
  }
  if (
    res.text.includes("already exists") ||
    res.status === 409 ||
    res.text.includes("must be unique")
  ) {
    console.log(
      "Collection 'projects_translations' exists; syncing missing fields...",
    );
    for (const field of PROJECTS_TRANSLATIONS_FIELDS) {
      const fr = await postJson("/fields/projects_translations", field);
      if (fr.ok) console.log(`  Added projects_translations.${field.field}`);
    }
    return;
  }
  console.error(
    "Failed to create projects_translations:",
    res.status,
    res.text,
  );
  process.exit(1);
}

async function ensureRelation(opts: {
  collection: string;
  field: string;
  related_collection: string;
  one_field?: string | null;
}) {
  const base = BASE_URL.replace(/\/$/, "");
  const exists = await fetch(
    `${base}/relations/${opts.collection}/${opts.field}`,
    { headers: HEADERS },
  );
  if (exists.ok) {
    console.log(`Relation ${opts.collection}.${opts.field} already exists.`);
    return;
  }

  const res = await postJson("/relations", {
    collection: opts.collection,
    field: opts.field,
    related_collection: opts.related_collection,
    meta: {
      many_collection: opts.collection,
      many_field: opts.field,
      one_collection: opts.related_collection,
      one_field: opts.one_field ?? null,
      one_deselect_action: "delete",
    },
  });
  if (res.ok) {
    console.log(`Created relation ${opts.collection}.${opts.field}`);
    return;
  }
  if (
    res.text.includes("already exists") ||
    res.status === 409 ||
    res.text.includes("must be unique")
  ) {
    console.log(`Relation ${opts.collection}.${opts.field} already exists.`);
    return;
  }
  console.error(
    `Failed relation ${opts.collection}.${opts.field}:`,
    res.status,
    res.text,
  );
  process.exit(1);
}

async function ensureTranslationsAlias() {
  const base = BASE_URL.replace(/\/$/, "");
  const exists = await fetch(`${base}/fields/projects/translations`, {
    headers: HEADERS,
  });
  if (exists.ok) {
    console.log("Field projects.translations already exists.");
    return;
  }

  const res = await fetch(`${base}/fields/projects`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({
      field: "translations",
      type: "alias",
      schema: null,
      meta: {
        interface: "translations",
        special: ["translations"],
        note: "All localized copy — default language: English (en).",
        sort: 5,
        width: "full",
        options: {
          languageField: "name",
          languageDirectionField: "direction",
          defaultLanguage: "en",
          defaultOpenSplitView: true,
          userLanguage: false,
        },
      },
    }),
  });
  const text = await res.text();
  if (res.ok) {
    console.log("Added field: projects.translations");
    return;
  }
  if (text.includes("already exists") || res.status === 409) {
    console.log("Field projects.translations already exists.");
    return;
  }
  console.error("Failed projects.translations alias:", res.status, text);
  process.exit(1);
}

async function seedLanguages() {
  for (const row of APP_LOCALES) {
    const res = await postJson(`/items/languages`, {
      code: row.code,
      name: row.name,
      direction: row.direction,
    });
    if (res.ok) {
      console.log(`  Seeded language: ${row.code}`);
      continue;
    }
    if (res.status === 409 || res.text.includes("duplicate") || res.text.includes("unique")) {
      console.log(`  Language ${row.code} already present.`);
      continue;
    }
    console.warn(`  languages ${row.code}:`, res.status, res.text);
  }
}

async function run() {
  if (!AUTH_TOKEN) {
    console.error("Set DIRECTUS_TOKEN.");
    process.exit(1);
  }

  console.log("Setting up projects translations...");
  await ensureLanguagesCollection();
  await seedLanguages();
  await ensureProjectsTranslationsCollection();
  await ensureRelation({
    collection: "projects_translations",
    field: "projects_id",
    related_collection: "projects",
    one_field: "translations",
  });
  await ensureRelation({
    collection: "projects_translations",
    field: "languages_code",
    related_collection: "languages",
    one_field: null,
  });
  await ensureTranslationsAlias();

  console.log("\nDone. Next:");
  console.log(
    "- Settings → Access Control: allow read on `languages` and `projects_translations` for the policy used by the site token.",
  );
  console.log(
    "- Optional: bun scripts/seed-projects-translations-from-default.ts — copy base `projects` text into locale rows.",
  );
  console.log(
    "- If `projects.translations` was created earlier as list-o2m: bun scripts/configure-projects-translations-interface.ts",
  );
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
