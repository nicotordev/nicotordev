export function getAdminApiBaseUrl() {
  const fromEnv =
    (typeof window === "undefined"
      ? process.env.ADMIN_API_BASE_URL ?? process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL
      : process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL) ?? "http://localhost:3001";

  return fromEnv.replace(/\/$/, "");
}

