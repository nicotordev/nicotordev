/**
 * Create the "reviews" collection in Directus for the testimonials section.
 * Run: DIRECTUS_URL=https://directus.nicotordev.com DIRECTUS_TOKEN=... bun scripts/create-directus-reviews-collection.ts
 * Then run: bun scripts/seed-directus.ts to populate reviews.
 */

const BASE_URL =
  process.env.DIRECTUS_URL ?? "https://directus.nicotordev.com";
const AUTH_TOKEN = process.env.DIRECTUS_TOKEN ?? "";

const HEADERS: HeadersInit = {
  Authorization: `Bearer ${AUTH_TOKEN}`,
  "Content-Type": "application/json",
};

const REVIEWS_FIELDS = [
  {
    field: "review_id",
    type: "string",
    schema: { max_length: 64, is_nullable: false },
    meta: { interface: "input", required: true },
  },
  {
    field: "client_image",
    type: "string",
    schema: { max_length: 512, is_nullable: true },
    meta: { interface: "input", note: "URL or path to client avatar" },
  },
  {
    field: "title",
    type: "string",
    schema: { max_length: 255, is_nullable: true },
    meta: { interface: "input" },
  },
  {
    field: "rating",
    type: "float",
    schema: { is_nullable: true },
    meta: { interface: "input" },
  },
  {
    field: "dates",
    type: "string",
    schema: { max_length: 128, is_nullable: true },
    meta: { interface: "input", note: "e.g. Nov 6, 2023 - Jan 11, 2024" },
  },
  {
    field: "feedback",
    type: "text",
    schema: { is_nullable: true },
    meta: { interface: "input-multiline" },
  },
  {
    field: "amount",
    type: "decimal",
    schema: { numeric_precision: 12, numeric_scale: 2, is_nullable: true },
    meta: { interface: "input" },
  },
  {
    field: "payment_type",
    type: "string",
    schema: { max_length: 64, is_nullable: true },
    meta: { interface: "input", note: "e.g. Fixed price, Hourly" },
  },
  {
    field: "hours",
    type: "integer",
    schema: { is_nullable: true },
    meta: { interface: "input" },
  },
  {
    field: "hourly_rate",
    type: "float",
    schema: { is_nullable: true },
    meta: { interface: "input" },
  },
];

async function run() {
  if (!AUTH_TOKEN) {
    console.error("Set DIRECTUS_TOKEN");
    process.exit(1);
  }

  const url = `${BASE_URL.replace(/\/$/, "")}/collections`;
  const res = await fetch(url, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({
      collection: "reviews",
      meta: {
        icon: "rate_review",
        note: "Upwork/client testimonials for the home page",
      },
      schema: {},
      fields: REVIEWS_FIELDS,
    }),
  });

  if (res.ok) {
    console.log("Created collection: reviews");
    console.log("Run: DIRECTUS_TOKEN=... bun scripts/seed-directus.ts");
    return;
  }

  const err = await res.text();
  if (err.includes("already exists") || res.status === 409) {
    console.log("Collection 'reviews' already exists. Run seed-directus to add items.");
    return;
  }
  console.error("Failed:", res.status, err);
  process.exit(1);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
