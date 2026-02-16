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
  DirectusProjectAsset,
  DirectusBlog,
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
  type ProjectFromCMS,
} from "@/lib/directus/projects";

export {
  fetchBlogs,
  fetchBlogsOptional,
  fetchBlogBySlug,
  type BlogPostFromCMS,
} from "@/lib/directus/blogs";
