import createMiddleware from "next-intl/middleware";
import { routing } from "../i18n/routing";

export default createMiddleware(routing);

// Versión alternativa más legible (recomendada)
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - Common static file extensions (ico, png, jpg, jpeg, gif, svg, webp, avif, bmp, tiff, woff, woff2, ttf, otf, eot, css, js, map, pdf, txt, xml, json, csv)
     */
    {
      source:
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.webmanifest|.*\\.ico|.*\\.png|.*\\.xml|.*\\.jpeg|.*\\.jpg|.*\\.svg|.*\\.gif|.*\\.webp|.*\\.css|.*\\.js|.*\\.woff|.*\\.woff2|.*\\.ttf|.*\\.eot).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },

    {
      source:
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.webmanifest|.*\\.ico|.*\\.png|.*\\.xml|.*\\.jpeg|.*\\.jpg|.*\\.svg|.*\\.gif|.*\\.webp|.*\\.css|.*\\.js|.*\\.woff|.*\\.woff2|.*\\.ttf|.*\\.eot).*)",
      has: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },

    {
      source:
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.webmanifest|.*\\.ico|.*\\.png|.*\\.xml|.*\\.jpeg|.*\\.jpg|.*\\.svg|.*\\.gif|.*\\.webp|.*\\.css|.*\\.js|.*\\.woff|.*\\.woff2|.*\\.ttf|.*\\.eot).*)",
      has: [{ type: "header", key: "x-present" }],
      missing: [{ type: "header", key: "x-missing", value: "prefetch" }],
    },
  ],
};
