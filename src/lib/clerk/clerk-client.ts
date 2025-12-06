// src/lib/clerkClient.ts
import { clerkClient as baseClerkClient } from "@clerk/nextjs/server";

declare global {
  // Necesario para que TS no se queje con `var` en global

  var __clerkClient: Awaited<ReturnType<typeof baseClerkClient>>;
}

const clerkClient = globalThis.__clerkClient ?? (await baseClerkClient());

// Solo cacheamos en desarrollo para evitar problemas en lambdas/serverless
if (process.env.NODE_ENV !== "production") {
  globalThis.__clerkClient = clerkClient;
}

export { clerkClient };
