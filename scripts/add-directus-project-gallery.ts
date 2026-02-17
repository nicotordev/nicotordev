/**
 * Configure a proper multi-file "gallery" relation for "projects".
 *
 * This creates:
 * - junction collection: projects_gallery
 * - relation: projects_gallery.projects_id -> projects.id (one_field: gallery)
 * - relation: projects_gallery.directus_files_id -> directus_files.id
 * - alias field: projects.gallery (interface: files, special: ["files"])
 *
 * Usage:
 * DIRECTUS_URL=https://directus.nicotordev.com \
 * DIRECTUS_TOKEN=... \
 *   bun scripts/add-directus-project-gallery.ts
 */

const GALLERY_BASE_URL =
  process.env.DIRECTUS_URL ?? "https://directus.nicotordev.com";
const GALLERY_AUTH_TOKEN = process.env.DIRECTUS_TOKEN ?? "";

const GALLERY_HEADERS: HeadersInit = {
  Authorization: `Bearer ${GALLERY_AUTH_TOKEN}`,
  "Content-Type": "application/json",
};

const JUNCTION_COLLECTION = "projects_gallery";

async function ensureJunctionCollection(baseUrl: string) {
  const existsRes = await fetch(`${baseUrl}/collections/${JUNCTION_COLLECTION}`, {
    headers: GALLERY_HEADERS,
  });
  if (existsRes.ok) {
    console.log(`Collection ${JUNCTION_COLLECTION} already exists.`);
    return;
  }

  const createRes = await fetch(`${baseUrl}/collections`, {
    method: "POST",
    headers: GALLERY_HEADERS,
    body: JSON.stringify({
      collection: JUNCTION_COLLECTION,
      meta: {
        icon: "photo_library",
        note: "Junction for projects.gallery multi-file relation",
        hidden: true,
      },
      schema: {},
      fields: [
        {
          field: "projects_id",
          type: "integer",
          schema: { is_nullable: true },
          meta: { interface: "select-dropdown-m2o", hidden: true },
        },
        {
          field: "directus_files_id",
          type: "uuid",
          schema: { is_nullable: true },
          meta: { interface: "select-dropdown-m2o", hidden: true },
        },
        {
          field: "sort",
          type: "integer",
          schema: { is_nullable: true },
          meta: { interface: "input", hidden: true },
        },
      ],
    }),
  });

  if (createRes.ok) {
    console.log(`Created collection: ${JUNCTION_COLLECTION}`);
    return;
  }

  const err = await createRes.text();
  if (err.includes("already exists") || createRes.status === 409) {
    console.log(`Collection ${JUNCTION_COLLECTION} already exists.`);
    return;
  }

  console.error(
    `Failed to create ${JUNCTION_COLLECTION}:`,
    createRes.status,
    err
  );
  process.exit(1);
}

async function ensureRelation(opts: {
  manyField: "projects_id" | "directus_files_id";
  relatedCollection: "projects" | "directus_files";
  oneCollection: "projects" | "directus_files";
  oneField?: string;
  junctionField: "projects_id" | "directus_files_id";
}) {
  const baseUrl = GALLERY_BASE_URL.replace(/\/$/, "");
  const existsRes = await fetch(
    `${baseUrl}/relations/${JUNCTION_COLLECTION}/${opts.manyField}`,
    {
      headers: GALLERY_HEADERS,
    }
  );
  if (existsRes.ok) {
    console.log(
      `Relation ${JUNCTION_COLLECTION}.${opts.manyField} already exists.`
    );
    return;
  }

  const createRes = await fetch(`${baseUrl}/relations`, {
    method: "POST",
    headers: GALLERY_HEADERS,
    body: JSON.stringify({
      collection: JUNCTION_COLLECTION,
      field: opts.manyField,
      related_collection: opts.relatedCollection,
      meta: {
        many_collection: JUNCTION_COLLECTION,
        many_field: opts.manyField,
        one_collection: opts.oneCollection,
        one_field: opts.oneField ?? null,
        junction_field: opts.junctionField,
        one_deselect_action: "nullify",
      },
    }),
  });

  if (createRes.ok) {
    console.log(`Created relation for ${JUNCTION_COLLECTION}.${opts.manyField}`);
    return;
  }

  const err = await createRes.text();
  if (
    err.includes("already exists") ||
    createRes.status === 409 ||
    err.includes("must be unique")
  ) {
    console.log(
      `Relation ${JUNCTION_COLLECTION}.${opts.manyField} already exists.`
    );
    return;
  }

  console.error(
    `Failed relation ${JUNCTION_COLLECTION}.${opts.manyField}:`,
    createRes.status,
    err
  );
  process.exit(1);
}

async function ensureGalleryAliasField(baseUrl: string) {
  const existsRes = await fetch(`${baseUrl}/fields/projects/gallery`, {
    headers: GALLERY_HEADERS,
  });
  if (existsRes.ok) {
    console.log("Field projects.gallery already exists.");
    return;
  }

  const createRes = await fetch(`${baseUrl}/fields/projects`, {
    method: "POST",
    headers: GALLERY_HEADERS,
    body: JSON.stringify({
      field: "gallery",
      type: "alias",
      schema: {},
      meta: {
        interface: "files",
        special: ["files"],
        note: "Gallery of images for this project.",
        sort: 30,
      },
    }),
  });

  if (createRes.ok) {
    console.log("Added field: projects.gallery");
    return;
  }

  const err = await createRes.text();
  if (err.includes("already exists") || createRes.status === 409) {
    console.log("Field projects.gallery already exists.");
    return;
  }

  console.error("Failed to add projects.gallery:", createRes.status, err);
  process.exit(1);
}

async function runAddProjectGallery() {
  if (!GALLERY_AUTH_TOKEN) {
    console.error("Set DIRECTUS_TOKEN");
    process.exit(1);
  }

  const baseUrl = GALLERY_BASE_URL.replace(/\/$/, "");

  await ensureJunctionCollection(baseUrl);

  await ensureRelation({
    manyField: "projects_id",
    relatedCollection: "projects",
    oneCollection: "projects",
    oneField: "gallery",
    junctionField: "directus_files_id",
  });

  await ensureRelation({
    manyField: "directus_files_id",
    relatedCollection: "directus_files",
    oneCollection: "directus_files",
    junctionField: "projects_id",
  });

  await ensureGalleryAliasField(baseUrl);
}

runAddProjectGallery().catch((e) => {
  console.error(e);
  process.exit(1);
});
