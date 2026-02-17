/**
 * Create the "leads" collection in Directus for the lead-magnet form.
 * Run: DIRECTUS_URL=https://directus.nicotordev.com DIRECTUS_TOKEN=... bun scripts/create-directus-leads-collection.ts
 */

const LEADS_BASE_URL =
  process.env.DIRECTUS_URL ?? "https://directus.nicotordev.com";
const LEADS_AUTH_TOKEN = process.env.DIRECTUS_TOKEN ?? "";

const LEADS_HEADERS: HeadersInit = {
  Authorization: `Bearer ${LEADS_AUTH_TOKEN}`,
  "Content-Type": "application/json",
};

async function runCreateLeadsCollection() {
  if (!LEADS_AUTH_TOKEN) {
    console.error("Set DIRECTUS_TOKEN");
    process.exit(1);
  }

  const res = await fetch(`${LEADS_BASE_URL.replace(/\/$/, "")}/collections`, {
    method: "POST",
    headers: LEADS_HEADERS,
    body: JSON.stringify({
      collection: "leads",
      meta: {
        icon: "person_add",
        note: "Leads from lead-magnet and contact forms",
      },
      schema: {},
      fields: [
        { field: "name", type: "string", schema: {}, meta: { interface: "input" } },
        { field: "email", type: "string", schema: {}, meta: { interface: "input" } },
        { field: "message", type: "text", schema: {}, meta: { interface: "input" } },
        { field: "source", type: "string", schema: {}, meta: { interface: "input", note: "e.g. lead_magnet_minimal, lead_magnet_full" } },
        {
          field: "turnstile_validated",
          type: "boolean",
          schema: { default_value: true },
          meta: { interface: "boolean" },
        },
      ],
    }),
  });

  if (res.ok) {
    console.log("Created collection: leads");
    return;
  }
  const err = await res.text();
  if (err.includes("already exists") || res.status === 409) {
    console.log("Collection 'leads' already exists.");
    return;
  }
  console.error("Failed:", res.status, err);
  process.exit(1);
}

runCreateLeadsCollection().catch((e) => {
  console.error(e);
  process.exit(1);
});
