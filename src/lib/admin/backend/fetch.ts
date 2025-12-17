import { getAdminApiBaseUrl } from "@/lib/admin/backend/config";

export class AdminApiError extends Error {
  status: number;
  body: unknown;

  constructor(message: string, status: number, body: unknown) {
    super(message);
    this.name = "AdminApiError";
    this.status = status;
    this.body = body;
  }
}

export async function adminFetchJson<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const baseUrl = typeof window === "undefined" ? getAdminApiBaseUrl() : "";
  const normalizedPath = `${path.startsWith("/") ? "" : "/"}${path}`;
  const url = `${baseUrl}${normalizedPath}`;

  const res = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  const contentType = res.headers.get("content-type") ?? "";
  const body = contentType.includes("application/json")
    ? await res.json().catch(() => null)
    : await res.text().catch(() => null);

  if (!res.ok) {
    const message =
      typeof body === "object" && body && "message" in (body as any)
        ? String((body as any).message)
        : `Request failed (${res.status})`;
    throw new AdminApiError(message, res.status, body);
  }

  return body as T;
}
