/**
 * Create the "newsletter" collection in Directus.
 * Run: DIRECTUS_URL=https://directus.nicotordev.com DIRECTUS_TOKEN=... bun scripts/create-directus-newsletter-collection.ts
 */

export {};

const BASE_URL =
  process.env.DIRECTUS_URL ?? "https://directus.nicotordev.com";
const AUTH_TOKEN = process.env.DIRECTUS_TOKEN ?? "";

const HEADERS: HeadersInit = {
  Authorization: `Bearer ${AUTH_TOKEN}`,
  "Content-Type": "application/json",
};

const NEWSLETTER_FIELDS = [
  {
    field: "email",
    type: "string",
    schema: { max_length: 255, is_nullable: false, is_unique: true },
    meta: { interface: "input", required: true },
  },
  {
    field: "status",
    type: "string",
    schema: { default_value: "subscribed", max_length: 32 },
    meta: { 
      interface: "select-dropdown", 
      options: {
        choices: [
          { text: "Subscribed", value: "subscribed" },
          { text: "Unsubscribed", value: "unsubscribed" }
        ]
      }
    },
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
      collection: "newsletter",
      meta: {
        icon: "email",
        note: "Newsletter subscribers",
      },
      schema: {},
      fields: NEWSLETTER_FIELDS,
    }),
  });

  if (res.ok) {
    console.log("Created collection: newsletter");
    return;
  }

  const err = await res.text();
  if (err.includes("already exists") || res.status === 409) {
    console.log("Collection 'newsletter' already exists. Synchronizing fields...");
    
    for (const field of NEWSLETTER_FIELDS) {
      const fieldRes = await fetch(`${BASE_URL.replace(/\/$/, "")}/fields/newsletter`, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify(field),
      });
      
      if (fieldRes.ok) {
        console.log(`Added missing field: ${field.field}`);
      } else {
        const fieldErr = await fieldRes.text();
        if (!fieldErr.includes("has to be unique") && !fieldErr.includes("already exists") && fieldRes.status !== 409) {
          console.error(`Failed to add field ${field.field}:`, fieldRes.status, fieldErr);
        }
      }
    }
    
    console.log("Synchronization complete.");
    return;
  }
  console.error("Failed:", res.status, err);
  process.exit(1);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
