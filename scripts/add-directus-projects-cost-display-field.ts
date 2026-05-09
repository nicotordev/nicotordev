/**
 * Adds nullable `cost_display` (varchar) on `projects` for CMS overrides of budget labels.
 * Run once, then append `"cost_display"` to `DEFAULT_FIELDS` in
 * `src/lib/directus/projects.ts` so REST queries include overrides.
 *
 * Usage:
 *   DIRECTUS_URL=https://directus.example.com DIRECTUS_TOKEN=... bun scripts/add-directus-projects-cost-display-field.ts
 */

const BASE =
  process.env.DIRECTUS_URL ?? process.env.NEXT_PUBLIC_DIRECTUS_URL ?? "";
const TOKEN = process.env.DIRECTUS_TOKEN ?? "";

async function main() {
  if (!BASE || !TOKEN) {
    console.error("Set DIRECTUS_URL and DIRECTUS_TOKEN");
    process.exit(1);
  }
  const url = `${BASE.replace(/\/$/, "")}/fields`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      collection: "projects",
      field: "cost_display",
      type: "string",
      meta: {
        interface: "input",
        note:
          "Optional human-readable budget label (e.g. $11k–$15k USD est.). Overrides auto formatting when set.",
        width: "full",
      },
      schema: {
        name: "cost_display",
        table: "projects",
        data_type: "varchar",
        max_length: 255,
        is_nullable: true,
      },
    }),
  });

  const text = await res.text();
  if (!res.ok) {
    console.error(res.status, text);
    process.exit(1);
  }
  console.log("OK:", text);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

export {};
