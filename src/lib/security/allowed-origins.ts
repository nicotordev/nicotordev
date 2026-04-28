const DEFAULT_DEV_ORIGINS = ["http://localhost:3000", "http://127.0.0.1:3000"];

function normalizeOrigin(value: string): string | null {
  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

export function parseAllowedOrigins(raw?: string | null): string[] {
  const fromEnv = (raw ?? "")
    .split(",")
    .map((origin) => normalizeOrigin(origin.trim()))
    .filter((origin): origin is string => Boolean(origin));

  if (fromEnv.length > 0) {
    return Array.from(new Set(fromEnv));
  }

  if (process.env.NODE_ENV !== "production") {
    return DEFAULT_DEV_ORIGINS;
  }

  return [];
}

export function getAllowedOrigins(): string[] {
  return parseAllowedOrigins(process.env.ALLOWED_ORIGINS);
}

export function resolveAllowedOrigin(
  incomingOrigin: string | null,
  allowedOrigins: string[] = getAllowedOrigins(),
): string | null {
  if (!incomingOrigin) return null;
  const normalizedIncoming = normalizeOrigin(incomingOrigin);
  if (!normalizedIncoming) return null;
  return allowedOrigins.includes(normalizedIncoming)
    ? normalizedIncoming
    : null;
}
