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

export type DirectusProjectAsset = {
  id: string;
  name: string;
  url: string;
  alt?: string;
  type: string;
};

export type DirectusProject = {
  id: number;
  project_id: string;
  name: string;
  cost: number;
  description: string;
  tech: string;
  impact: string | null;
  image: string;
  link: string | null;
  link_text: string | null;
  is_active: boolean;
  sort_order: number;
  assets: DirectusProjectAsset[] | null;
  /** Rich HTML content (WYSIWYG) */
  body?: string | null;
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

export type DirectusItemsResponse<T> = {
  data: T[] | null;
  meta?: { total_count?: number; filter_count?: number };
};

export type DirectusItemResponse<T> = {
  data: T | null;
};
