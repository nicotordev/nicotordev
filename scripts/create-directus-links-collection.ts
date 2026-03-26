/**
 * Create the "links" collection in Directus for the linktr.ee style page.
 * Run: DIRECTUS_URL=https://directus.nicotordev.com DIRECTUS_TOKEN=... bun scripts/create-directus-links-collection.ts
 */

export {};

const BASE_URL =
  process.env.DIRECTUS_URL ?? "https://directus.nicotordev.com";
const AUTH_TOKEN = process.env.DIRECTUS_TOKEN ?? "";

const HEADERS: HeadersInit = {
  Authorization: `Bearer ${AUTH_TOKEN}`,
  "Content-Type": "application/json",
};

const LINKS_FIELDS = [
  {
    field: "title",
    type: "string",
    schema: { max_length: 255, is_nullable: false },
    meta: { interface: "input", required: true },
  },
  {
    field: "url",
    type: "string",
    schema: { max_length: 512, is_nullable: false },
    meta: { interface: "input", required: true },
  },
  {
    field: "icon",
    type: "string",
    schema: { max_length: 64, is_nullable: true },
    meta: { interface: "input", note: "Icon name (e.g. github, twitter, linkedin)" },
  },
  {
    field: "is_active",
    type: "boolean",
    schema: { default_value: true },
    meta: { interface: "boolean" },
  },
  {
    field: "sort",
    type: "integer",
    schema: { is_nullable: true },
    meta: { interface: "input", hidden: true },
  },
];

async function run() {
  if (!AUTH_TOKEN) {
    console.error("Set DIRECTUS_TOKEN to run this script.");
    process.exit(1);
  }

  const url = `${BASE_URL.replace(/\/$/, "")}/collections`;
  const res = await fetch(url, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({
      collection: "links",
      meta: {
        icon: "link",
        note: "Links for linktr.ee style page",
        sort_field: "sort",
      },
      schema: {},
      fields: LINKS_FIELDS,
    }),
  });

  if (res.ok) {
    console.log("Created collection: links");
    return;
  }

  const err = await res.text();
  if (err.includes("already exists") || res.status === 409) {
    console.log("Collection 'links' already exists.");
    return;
  }
  console.error("Failed:", res.status, err);
  process.exit(1);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
