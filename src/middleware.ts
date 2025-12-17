import {
  clerkMiddleware as clerkMiddlewareImpl,
  createRouteMatcher,
} from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import { getLocaleFromPath } from "@/i18n/config";
import { routing } from "@/i18n/routing";

const nextIntlMiddleware = createMiddleware(routing);

// Match public routes - include locale prefix patterns
// Since routes are under [locale], we need to match both /sign-in and /:locale/sign-in
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/:locale/sign-in(.*)",
  "/:locale",
  "/:locale/about",
  "/:locale/projects",
  "/:locale/blog",
  "/:locale/contact",
]);

export default clerkMiddlewareImpl(async (auth, req) => {
  // Do not run i18n middleware on API routes
  if (req.nextUrl.pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  if (!isPublicRoute(req)) {
    const locale =
      getLocaleFromPath(req.nextUrl.pathname) ?? routing.defaultLocale;

    await auth.protect(undefined, {
      unauthenticatedUrl: `/${locale}/sign-in`,
      unauthorizedUrl: `/${locale}/sign-in`,
    });
  }

  return nextIntlMiddleware(req);
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
