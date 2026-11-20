import { afterEach, beforeEach, describe, expect, mock, test } from "bun:test";

mock.module("server-only", () => ({}));
mock.module("@/lib/mail", () => ({
  notifyNewLead: mock(() => Promise.resolve()),
}));

const { saveLeadAction } = await import("@/app/actions/lead.actions");
const { directusPost } = await import("@/lib/directus/client");
const originalFetch = globalThis.fetch;
const envKeys = [
  "NODE_ENV",
  "TURNSTILE_SECRET_KEY",
  "DIRECTUS_TOKEN",
  "ALLOWED_ORIGINS",
];
const originalEnv = Object.fromEntries(
  envKeys.map((key) => [key, process.env[key]]),
);
const payload = {
  name: "Test User",
  email: "test@example.com",
  message: "Hello",
  source: "lead_magnet_full",
  turnstileToken: "valid-token",
};
const validVerification = {
  success: true,
  action: "lead",
  hostname: "nicotordev.com",
};

beforeEach(() => {
  process.env.NODE_ENV = "production";
  process.env.TURNSTILE_SECRET_KEY = "turnstile-secret";
  process.env.DIRECTUS_TOKEN = "directus-secret";
  process.env.ALLOWED_ORIGINS =
    "https://nicotordev.com,https://www.nicotordev.com";
});

afterEach(() => {
  globalThis.fetch = originalFetch;
  for (const key of envKeys) {
    if (originalEnv[key] === undefined) delete process.env[key];
    else process.env[key] = originalEnv[key];
  }
});

describe("lead verification and Directus writes", () => {
  test("verifies the token before posting an authenticated lead", async () => {
    const calls = [];
    globalThis.fetch = mock(async (url, options) => {
      calls.push({ url: String(url), options });
      if (calls.length === 1) return Response.json(validVerification);
      return Response.json({ data: { id: 1 } });
    });

    expect(await saveLeadAction(payload)).toEqual({ success: true });
    expect(calls).toHaveLength(2);
    expect(calls[0].url).toBe(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    );
    expect(calls[0].options.body.get("secret")).toBe("turnstile-secret");
    expect(calls[0].options.body.get("response")).toBe("valid-token");
    expect(calls[1].url.endsWith("/items/leads")).toBe(true);
    expect(calls[1].options.headers.Authorization).toBe("Bearer directus-secret");
    expect(JSON.parse(calls[1].options.body).turnstile_validated).toBe(true);
  });

  test.each([
    { success: false, action: "lead", hostname: "nicotordev.com" },
    { ...validVerification, action: "other" },
    { ...validVerification, hostname: "attacker.example" },
    { success: true, action: "lead" },
  ])("rejects unsuccessful or mismatched verification", async (result) => {
    globalThis.fetch = mock(async () => Response.json(result));
    expect(await saveLeadAction(payload)).toEqual({ success: false });
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
  });

  test("fails closed for missing tokens, missing secrets and network errors", async () => {
    globalThis.fetch = mock(async () => {
      throw new Error("network error");
    });
    expect(await saveLeadAction({ ...payload, turnstileToken: "" })).toEqual({
      success: false,
    });
    expect(globalThis.fetch).not.toHaveBeenCalled();
    delete process.env.TURNSTILE_SECRET_KEY;
    expect(await saveLeadAction(payload)).toEqual({ success: false });
    expect(globalThis.fetch).not.toHaveBeenCalled();
    process.env.TURNSTILE_SECRET_KEY = "turnstile-secret";
    expect(await saveLeadAction(payload)).toEqual({ success: false });
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
  });

  test("does not submit a lead when the Directus token is missing", async () => {
    delete process.env.DIRECTUS_TOKEN;
    globalThis.fetch = mock(async () => Response.json(validVerification));
    expect(await saveLeadAction(payload)).toEqual({ success: false });
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
  });

  test("uses the Turnstile test secret in development", async () => {
    process.env.NODE_ENV = "development";
    const calls = [];
    globalThis.fetch = mock(async (url, options) => {
      calls.push({ url: String(url), options });
      return Response.json(
        calls.length === 1 ? { success: true } : { data: { id: 1 } },
      );
    });

    expect(await saveLeadAction(payload)).toEqual({ success: true });
    expect(calls[0].options.body.get("secret")).toBe(
      "1x0000000000000000000000000000000AA",
    );
  });

  test("leaves other Directus writes unauthenticated", async () => {
    globalThis.fetch = mock(async () => Response.json({ data: {} }));
    await directusPost("/items/newsletter", { email: "test@example.com" });
    expect(globalThis.fetch.mock.calls[0][1].headers.Authorization).toBeUndefined();
  });
});
