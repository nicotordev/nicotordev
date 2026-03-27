export {
  getDirectusUrl,
  getDirectusHeaders,
  directusFetch,
  directusFetchOptional,
  type DirectusQuery,
} from "@/lib/directus/client";

export type {
  DirectusReview,
  DirectusProject,
  DirectusProjectGalleryRow,
  DirectusBlog,
  DirectusLink,
  DirectusItemsResponse,
  DirectusItemResponse,
} from "@/lib/directus/types";

export {
  fetchReviews,
  fetchReviewsOptional,
  fetchReviewById,
  type ReviewFromCMS,
} from "@/lib/directus/reviews";

export {
  fetchProjects,
  fetchProjectsOptional,
  fetchProjectById,
  fetchProjectBySlug,
  type ProjectFromCMS,
} from "@/lib/directus/projects";

export {
  fetchBlogs,
  fetchBlogsOptional,
  fetchBlogBySlug,
  type BlogPostFromCMS,
} from "@/lib/directus/blogs";

export { createLead, type CreateLeadPayload } from "@/lib/directus/leads";

export {
  fetchLinks,
  fetchLinksOptional,
  type LinkFromCMS,
} from "@/lib/directus/links";

export {
  subscribeToNewsletter,
  type DirectusNewsletterCreate,
} from "@/lib/directus/newsletter";
