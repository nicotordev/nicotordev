import { directusPost } from "@/lib/directus/client";

/** Payload to subscribe to a newsletter (snake_case for Directus). */
export type DirectusNewsletterCreate = {
  email: string;
  status?: string;
};

/**
 * Create a newsletter subscription in Directus.
 */
export async function subscribeToNewsletter(email: string) {
  const payload: DirectusNewsletterCreate = {
    email,
    status: "subscribed",
  };
  return await directusPost<any, DirectusNewsletterCreate>(
    "/items/newsletter",
    payload
  );
}
