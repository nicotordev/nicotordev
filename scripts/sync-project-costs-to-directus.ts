/**
 * PATCH `cost` on each `projects` row in Directus from `src/app/data/projects.ts`
 * (same values as static fallback / seed source of truth).
 *
 * Usage:
 *   DIRECTUS_URL=https://directus.nicotordev.com DIRECTUS_TOKEN=... bun scripts/sync-project-costs-to-directus.ts
 */

const BASE =
  process.env.DIRECTUS_URL ??
  process.env.NEXT_PUBLIC_DIRECTUS_URL ??
  "https://directus.nicotordev.com";
const TOKEN = process.env.DIRECTUS_TOKEN ?? "";

async function main() {
  if (!TOKEN) {
    console.error("Set DIRECTUS_TOKEN (and optionally DIRECTUS_URL).");
    process.exit(1);
  }

  const root = BASE.replace(/\/$/, "");
  const headers: HeadersInit = {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  };

  const { staticProjects } = await import("../src/app/data/projects");

  const listRes = await fetch(
    `${root}/items/projects?fields=id,project_id,cost&limit=100`,
    { headers },
  );
  if (!listRes.ok) {
    console.error("GET projects failed:", listRes.status, await listRes.text());
    process.exit(1);
  }

  const { data: rows } = (await listRes.json()) as {
    data: Array<{ id: number; project_id: string; cost: number }>;
  };

  const byPid = new Map(staticProjects.map((p) => [p.id, p.cost]));

  let ok = 0;
  let skip = 0;
  let missing = 0;

  for (const row of rows) {
    const next = byPid.get(row.project_id);
    if (next === undefined) {
      console.warn("No local cost for project_id:", row.project_id);
      missing++;
      continue;
    }
    if (row.cost === next) {
      skip++;
      continue;
    }

    const patchRes = await fetch(`${root}/items/projects/${row.id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ cost: next }),
    });
    if (!patchRes.ok) {
      console.error(
        "PATCH failed",
        row.project_id,
        patchRes.status,
        await patchRes.text(),
      );
      process.exit(1);
    }
    console.log(`cost ${row.cost} → ${next} (${row.project_id})`);
    ok++;
  }

  console.log(`Done. Updated: ${ok}, unchanged: ${skip}, unmatched rows: ${missing}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

export {};
