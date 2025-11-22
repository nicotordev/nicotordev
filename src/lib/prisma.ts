import { PrismaClient } from "./generated/prisma";

declare global {
   
  var prisma: PrismaClient | undefined;
}

function resolveDatabaseUrl() {
  const rawUrl = process.env.DATABASE_URL;

  if (!rawUrl) {
    throw new Error("DATABASE_URL is not defined");
  }

  try {
    const url = new URL(rawUrl);
    const params = url.searchParams;

    if (!params.has("connection_limit")) {
      params.set("connection_limit", "5");
    }

    if (!params.has("pool_timeout")) {
      params.set("pool_timeout", "30");
    }

    return url.toString();
  } catch (error) {
    throw new Error(
      `Invalid DATABASE_URL provided: ${
        error instanceof Error ? error.message : "unknown error"
      }`
    );
  }
}

const prismaClient =
  globalThis.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "warn", "error"]
        : ["warn", "error"],
    datasources: {
      db: {
        url: resolveDatabaseUrl(),
      },
    },
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prismaClient;
}

export const prisma = prismaClient;
