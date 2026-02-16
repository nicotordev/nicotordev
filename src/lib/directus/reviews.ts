import {
  directusFetch,
  directusFetchOptional,
  type DirectusQuery,
} from "@/lib/directus/client";
import type { DirectusItemsResponse, DirectusReview } from "@/lib/directus/types";

export type ReviewFromCMS = {
  id: string;
  clientImage: string;
  title: string;
  rating: number | null;
  dates: string;
  feedback: string | null;
  amount: number;
  paymentType: string;
  hours: number | null;
  hourlyRate: number | null;
};

function mapDirectusReviewToReview(r: DirectusReview): ReviewFromCMS {
  return {
    id: r.review_id,
    clientImage: r.client_image,
    title: r.title,
    rating: r.rating,
    dates: r.dates,
    feedback: r.feedback,
    amount: Number(r.amount),
    paymentType: r.payment_type,
    hours: r.hours,
    hourlyRate: r.hourly_rate,
  };
}

const DEFAULT_FIELDS = [
  "review_id",
  "client_image",
  "title",
  "rating",
  "dates",
  "feedback",
  "amount",
  "payment_type",
  "hours",
  "hourly_rate",
] as const;

/**
 * Fetch all reviews from Directus.
 */
export async function fetchReviews(
  query?: Partial<DirectusQuery>
): Promise<ReviewFromCMS[]> {
  const res = await directusFetch<DirectusItemsResponse<DirectusReview>>(
    "/items/reviews",
    {
      fields: [...DEFAULT_FIELDS],
      sort: ["id"],
      limit: 500,
      ...query,
    }
  );
  const list = res.data ?? [];
  return list.map(mapDirectusReviewToReview);
}

/**
 * Fetch reviews from Directus; returns null on failure (e.g. CMS down).
 */
export async function fetchReviewsOptional(): Promise<ReviewFromCMS[] | null> {
  const res = await directusFetchOptional<
    DirectusItemsResponse<DirectusReview>
  >("/items/reviews", {
    fields: [...DEFAULT_FIELDS],
    sort: ["id"],
    limit: 500,
  });
  if (!res?.data) return null;
  return res.data.map(mapDirectusReviewToReview);
}

/**
 * Fetch a single review by review_id (e.g. "review-01").
 */
export async function fetchReviewById(
  reviewId: string
): Promise<ReviewFromCMS | null> {
  try {
    const res = await directusFetch<{ data: DirectusReview[] }>(
      "/items/reviews",
      {
        fields: [...DEFAULT_FIELDS],
        filter: { review_id: reviewId },
        limit: 1,
      }
    );
    const item = res.data?.[0];
    return item ? mapDirectusReviewToReview(item) : null;
  } catch {
    return null;
  }
}
