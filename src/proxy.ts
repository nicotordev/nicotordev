import { routing } from "@/i18n/routing";
import {
  getAllowedOrigins,
  resolveAllowedOrigin,
} from "@/lib/security/allowed-origins";
import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";

const nextIntlMiddleware = createMiddleware(routing);
const allowedOrigins = getAllowedOrigins();

function withCorsHeaders(
  request: NextRequest,
  response: NextResponse,
): NextResponse {
  const requestOrigin = request.headers.get("origin");
  const allowedOrigin = resolveAllowedOrigin(requestOrigin, allowedOrigins);

  if (!allowedOrigin) return response;

  const requestedHeaders = request.headers.get(
    "access-control-request-headers",
  );
  response.headers.set("Access-Control-Allow-Origin", allowedOrigin);
  response.headers.set("Access-Control-Allow-Credentials", "true");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS",
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    requestedHeaders ?? "Content-Type, Authorization",
  );
  response.headers.append("Vary", "Origin");

  return response;
}

export default function middleware(req: NextRequest) {
  if (new URL(req.url).pathname.startsWith("/api")) {
    const method = req.method.toUpperCase();
    const requestOrigin = req.headers.get("origin");
    const allowedOrigin = resolveAllowedOrigin(requestOrigin, allowedOrigins);

    if (method === "OPTIONS") {
      if (requestOrigin && !allowedOrigin) {
        return NextResponse.json(
          { error: "Origin not allowed" },
          { status: 403 },
        );
      }
      return withCorsHeaders(req, new NextResponse(null, { status: 204 }));
    }

    if (requestOrigin && !allowedOrigin) {
      return NextResponse.json(
        { error: "Origin not allowed" },
        { status: 403 },
      );
    }

    return withCorsHeaders(req, NextResponse.next());
  }

  return nextIntlMiddleware(req);
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    // Now also ignore .pdf, .md, .txt files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|pdf|md|txt)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
