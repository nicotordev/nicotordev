export type AssetDTO = {
  id: string;
  name: string;
  url: string;
  alt?: string;
  width?: number;
  height?: number;
  blurDataUrl?: string;
  type: "IMAGE" | "VIDEO" | "AUDIO" | "DOCUMENT";
};

export type ProjectDTO = {
  id: string;
  /** URL-friendly identifier from `slugifyTitle(name)` (kebab-case, unique per project). */
  slug: string;
  name: string;
  /** Midpoint USD for estimates (e.g. from hours × rate); UI uses `costDisplay` when set. */
  cost: number;
  /** Resolved budget line (range or estimate); filled when mapping from CMS + fallbacks. */
  costDisplay?: string;
  description: string;
  tech: string; // Prisma: `@db.VarChar(255)` (comma or space separated)
  impact?: string;
  image: string;
  link?: string;
  linkText?: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  /** Rich HTML body from Directus (WYSIWYG). */
  body?: string | null;
  /** Gallery items (Directus `gallery` M2M → files, or static URLs in local data). */
  gallery: AssetDTO[];
};
