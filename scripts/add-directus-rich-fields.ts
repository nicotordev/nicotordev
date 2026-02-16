/**
 * Add rich content (WYSIWYG) fields to Directus collections.
 * Run: DIRECTUS_URL=https://directus.nicotordev.com DIRECTUS_TOKEN=... bun scripts/add-directus-rich-fields.ts
 */

const BASE_URL =
  process.env.DIRECTUS_URL ?? "https://directus.nicotordev.com";
const AUTH_TOKEN = process.env.DIRECTUS_TOKEN ?? "";

const REQ_HEADERS: HeadersInit = {
  Authorization: `Bearer ${AUTH_TOKEN}`,
  "Content-Type": "application/json",
};

async function createRichField(
  collection: string,
  field: string,
  type: string,
  interfaceName: string,
  options?: { note?: string }
) {
  const res = await fetch(`${BASE_URL.replace(/\/$/, "")}/fields/${collection}`, {
    method: "POST",
    headers: REQ_HEADERS,
    body: JSON.stringify({
      field,
      type,
      schema: type === "text" ? { nullable: true } : {},
      meta: {
        interface: interfaceName,
        note: options?.note ?? undefined,
      },
    }),
  });
  if (res.ok) {
    console.log(`  Added ${collection}.${field} (${interfaceName})`);
    return;
  }
  const err = await res.text();
  if (err.includes("already exists") || res.status === 409) {
    console.log(`  ${collection}.${field} already exists, skip`);
    return;
  }
  console.error(`  Failed ${collection}.${field}:`, res.status, err);
}

async function runAddRichFields() {
  if (!AUTH_TOKEN) {
    console.error("Set DIRECTUS_TOKEN");
    process.exit(1);
  }
  console.log("Adding rich content fields...");
  await createRichField(
    "projects",
    "body",
    "text",
    "input-rich-text-html",
    { note: "Rich HTML body (WYSIWYG) for project story/long content" }
  );
  await createRichField(
    "blogs",
    "excerpt",
    "text",
    "input-rich-text-html",
    { note: "Rich excerpt (optional)" }
  );
  console.log("Done.");
}

runAddRichFields().catch((e) => {
  console.error(e);
  process.exit(1);
});
