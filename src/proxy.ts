import createMiddleware from "next-intl/middleware";
import { routing } from "../i18n/routing";
import { clerkMiddleware as clerkMiddlewareImpl } from "@clerk/nextjs/server";

const nextIntlMiddleware = createMiddleware(routing);

export default clerkMiddlewareImpl((auth, req) => {
  // Do not run i18n middleware on API routes
  if (req.nextUrl.pathname.startsWith("/api")) {
    return; // Let the request pass through without localization
  }

  return nextIntlMiddleware(req);
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, but keep API
    "/((?!_next|.*\\..*).*)",
    "/",
    "/(api|trpc)(.*)",
  ],
};
