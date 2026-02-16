import {
  directusFetch,
  directusFetchOptional,
  type DirectusQuery,
} from "@/lib/directus/client";
import type {
  DirectusBlog,
  DirectusItemsResponse,
} from "@/lib/directus/types";

export type BlogPostFromCMS = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  /** Rich HTML content (WYSIWYG from Directus). */
  content: string | null;
  status: string;
  datePublished: string | null;
};

const DEFAULT_FIELDS = [
  "id",
  "title",
  "slug",
  "excerpt",
  "content",
  "status",
  "date_published",
] as const;

function mapDirectusBlogToPost(b: DirectusBlog): BlogPostFromCMS {
  return {
    id: b.id,
    title: b.title,
    slug: b.slug,
    excerpt: b.excerpt,
    content: b.content,
    status: b.status,
    datePublished: b.date_published,
  };
}

/**
 * Fetch published blog posts from Directus.
 */
export async function fetchBlogs(
  query?: Partial<DirectusQuery>
): Promise<BlogPostFromCMS[]> {
  const res = await directusFetch<DirectusItemsResponse<DirectusBlog>>(
    "/items/blogs",
    {
      fields: [...DEFAULT_FIELDS],
      filter: { status: "published" },
      sort: ["-date_published", "id"],
      limit: 50,
      ...query,
    }
  );
  const list = res.data ?? [];
  return list.map(mapDirectusBlogToPost);
}

/**
 * Fetch blogs from Directus; returns null on failure.
 */
export async function fetchBlogsOptional(): Promise<BlogPostFromCMS[] | null> {
  const res = await directusFetchOptional<DirectusItemsResponse<DirectusBlog>>(
    "/items/blogs",
    {
      fields: [...DEFAULT_FIELDS],
      filter: { status: "published" },
      sort: ["-date_published", "id"],
      limit: 50,
    }
  );
  if (!res?.data) return null;
  return res.data.map(mapDirectusBlogToPost);
}

/**
 * Fetch a single blog post by slug.
 */
export async function fetchBlogBySlug(
  slug: string
): Promise<BlogPostFromCMS | null> {
  try {
    const res = await directusFetch<{ data: DirectusBlog[] }>(
      "/items/blogs",
      {
        fields: [...DEFAULT_FIELDS],
        filter: { slug, status: "published" },
        limit: 1,
      }
    );
    const item = res.data?.[0];
    return item ? mapDirectusBlogToPost(item) : null;
  } catch {
    return null;
  }
}
