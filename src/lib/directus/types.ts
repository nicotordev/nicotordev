/**
 * Directus API response types (snake_case as returned by REST API).
 * Rich content fields may contain HTML from WYSIWYG.
 */

export type DirectusReview = {
  id: number;
  review_id: string;
  client_image: string;
  title: string;
  rating: number | null;
  dates: string;
  feedback: string | null;
  amount: number;
  payment_type: string;
  hours: number | null;
  hourly_rate: number | null;
};

/** Row in `languages` (string PK `code`; matches app `Locale` codes). */
export type DirectusLanguage = {
  code: string;
  name?: string | null;
  direction?: string | null;
};

/** Locale row for `projects` (copy lives here — not on `projects`). */
export type DirectusProjectTranslation = {
  id?: number;
  projects_id?: number | null;
  languages_code?: string | DirectusLanguage | null;
  name?: string | null;
  description?: string | null;
  tech?: string | null;
  impact?: string | null;
};

/** Junction row from `projects.gallery` (M2M to `directus_files`). */
export type DirectusProjectGalleryRow = {
  id?: number;
  directus_files_id:
    | string
    | {
        id: string;
        title?: string | null;
        type?: string | null;
        description?: string | null;
      }
    | null;
  sort?: number | null;
};

export type DirectusProject = {
  id: number;
  project_id: string;
  slug?: string | null;
  cost: number;
  /** Override for portfolio budget label; see `resolveProjectCostDisplay`. */
  cost_display?: string | null;
  image: string | null;
  link: string | null;
  is_active: boolean;
  sort_order: number;
  /** M2M files field; may be IDs only or expanded via `fields`. */
  gallery?: DirectusProjectGalleryRow[] | number[] | null;
  /** Per-locale title, pitch, tech, impact (canonical copy — not stored on root). */
  translations?: DirectusProjectTranslation[] | null;
  date_created?: string | null;
  date_updated?: string | null;
};

export type DirectusBlog = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  /** Rich HTML content (WYSIWYG) */
  content: string | null;
  status: string;
  date_published: string | null;
};

export type DirectusLink = {
  id: number;
  title: string;
  url: string;
  icon: string | null;
  icon_image: string | null;
  is_active: boolean;
  sort: number | null;
};

export type DirectusItemsResponse<T> = {
  data: T[] | null;
  meta?: { total_count?: number; filter_count?: number };
};

export type DirectusItemResponse<T> = {
  data: T | null;
};

/** Payload to create a lead (snake_case for Directus). */
export type DirectusLeadCreate = {
  name: string;
  email: string;
  message: string;
  source: string;
  turnstile_validated: boolean;
};

export type DirectusLead = DirectusLeadCreate & {
  id: number;
  date_created?: string | null;
};
