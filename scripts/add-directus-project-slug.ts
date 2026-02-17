/**
 * Add the "slug" field to the Directus "projects" collection.
 * Run: DIRECTUS_URL=https://directus.nicotordev.com DIRECTUS_TOKEN=... bun scripts/add-directus-project-slug.ts
 */

const SLUG_BASE_URL =
  process.env.DIRECTUS_URL ?? "https://directus.nicotordev.com";
const SLUG_AUTH_TOKEN = process.env.DIRECTUS_TOKEN ?? "";

const SLUG_HEADERS: HeadersInit = {
  Authorization: `Bearer ${SLUG_AUTH_TOKEN}`,
  "Content-Type": "application/json",
};

async function runAddProjectSlug() {
  if (!SLUG_AUTH_TOKEN) {
    console.error("Set DIRECTUS_TOKEN");
    process.exit(1);
  }

  const res = await fetch(
    `${SLUG_BASE_URL.replace(/\/$/, "")}/fields/projects`,
    {
      method: "POST",
      headers: SLUG_HEADERS,
      body: JSON.stringify({
        field: "slug",
        type: "string",
        schema: {},
        meta: {
          interface: "input",
          note: "URL-friendly identifier (e.g. regulex, v0-dev-mcp)",
        },
      }),
    }
  );

  if (res.ok) {
    console.log("Added field: projects.slug");
    return;
  }
  const err = await res.text();
  if (err.includes("already exists") || res.status === 409) {
    console.log("Field projects.slug already exists.");
    return;
  }
  console.error("Failed:", res.status, err);
  process.exit(1);
}

runAddProjectSlug().catch((e) => {
  console.error(e);
  process.exit(1);
});
