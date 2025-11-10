"use server";

export type GetSessionResult<T = unknown> = {
  success: boolean;
  session: T | null;
};

export async function getSession<T = any>(): Promise<GetSessionResult<T>> {
  try {
    const res = await fetch("/api/session", {
      method: "GET",
      credentials: "include",
      cache: "force-cache",
    });
    if (!res.ok) return { success: false, session: null };
    const data = await res.json().catch(() => null);
    const session = data?.session ?? data ?? null;
    return { success: Boolean(session), session };
  } catch {
    return { success: false, session: null };
  }
}

export async function signOut(): Promise<void> {
  try {
    await fetch("/api/signout", {
      method: "POST",
      credentials: "include",
    });
  } catch {
    // no-op: ignore network errors for signOut stub
  }
}
