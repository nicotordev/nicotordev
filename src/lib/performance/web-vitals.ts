export type WebVitalsMetric = Parameters<
  Parameters<typeof import("next/web-vitals").useReportWebVitals>[0]
>[0];

export type WebVitalsName = "CLS" | "LCP" | "INP" | "TTFB";

export type WebVitalsPayload = Readonly<{
  id: string;
  name: WebVitalsName;
  value: number;
  delta: number;
  rating?: "good" | "needs-improvement" | "poor";
  navigationType?: string;
  href?: string;
  timestamp: number;
  attribution?: Record<string, unknown>;
}>;

export type WebVitalsTransport = (payload: WebVitalsPayload) => void;

const CAPTURED: ReadonlySet<WebVitalsName> = new Set([
  "CLS",
  "LCP",
  "INP",
  "TTFB",
]);

function isWebVitalsName(name: string): name is WebVitalsName {
  return (CAPTURED as Set<string>).has(name);
}

function getNodeSummary(value: unknown): string | undefined {
  if (typeof Element === "undefined") return undefined;
  if (!(value instanceof Element)) return undefined;

  const tag = value.tagName.toLowerCase();
  const id = value.id ? `#${value.id}` : "";
  const className =
    typeof value.className === "string" && value.className.trim().length > 0
      ? `.${value.className.trim().split(/\s+/).slice(0, 3).join(".")}`
      : "";

  return `${tag}${id}${className}`;
}

function sanitizeAttribution(attribution: unknown): Record<string, unknown> {
  if (typeof attribution !== "object" || attribution === null) return {};

  const record = attribution as Record<string, unknown>;
  const out: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(record)) {
    const nodeSummary = getNodeSummary(value);
    if (nodeSummary) {
      out[key] = nodeSummary;
      continue;
    }

    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean" ||
      value === null
    ) {
      out[key] = value;
      continue;
    }

    if (typeof value === "object" && value !== null) {
      out[key] = "[object]";
    }
  }

  return out;
}

function buildPayload(metric: WebVitalsMetric): WebVitalsPayload | null {
  if (!isWebVitalsName(metric.name)) return null;

  const href = typeof location !== "undefined" ? location.href : null;

  const unsafe = metric as unknown as {
    attribution?: unknown;
    navigationType?: unknown;
    rating?: unknown;
  };

  const rating =
    unsafe.rating === "good" ||
    unsafe.rating === "needs-improvement" ||
    unsafe.rating === "poor"
      ? unsafe.rating
      : undefined;

  const navigationType =
    typeof unsafe.navigationType === "string" ? unsafe.navigationType : undefined;

  const attribution =
    unsafe.attribution !== undefined
      ? sanitizeAttribution(unsafe.attribution)
      : undefined;

  return {
    id: String(metric.id),
    name: metric.name,
    value: Number(metric.value),
    delta: Number(metric.delta),
    timestamp: Date.now(),
    ...(href ? { href } : {}),
    ...(rating ? { rating } : {}),
    ...(navigationType ? { navigationType } : {}),
    ...(attribution && Object.keys(attribution).length > 0
      ? { attribution }
      : {}),
  };
}

function defaultEndpoint(): string | null {
  // First-party endpoint keeps this dependency-free and easy to swap later.
  if (process.env.NEXT_PUBLIC_WEB_VITALS_ENDPOINT) {
    return process.env.NEXT_PUBLIC_WEB_VITALS_ENDPOINT;
  }

  if (process.env.NODE_ENV === "production") return "/api/web-vitals";
  return null;
}

function sendBeaconTransport(endpoint: string): WebVitalsTransport {
  return (payload) => {
    const body = JSON.stringify(payload);

    // sendBeacon is the most CWV-friendly transport (async, non-blocking, keepalive).
    if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
      const ok = navigator.sendBeacon(endpoint, new Blob([body], { type: "application/json" }));
      if (ok) return;
    }

    // Fallback: keepalive fetch (still avoids blocking unload).
    void fetch(endpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body,
      keepalive: true,
    });
  };
}

function consoleTransport(): WebVitalsTransport {
  return (payload) => {
    // Developer diagnostics: keep logs compact and attribution-friendly.
    // NOTE: production builds remove most console calls via `next.config.ts`.
    console.debug("[web-vitals]", payload.name, {
      value: payload.value,
      delta: payload.delta,
      rating: payload.rating,
      navigationType: payload.navigationType,
      attribution: payload.attribution,
    });
  };
}

export function getWebVitalsReporter(options?: {
  debug?: boolean;
  endpoint?: string | null;
}): (metric: WebVitalsMetric) => void {
  const endpoint = options?.endpoint ?? defaultEndpoint();
  const debug =
    options?.debug ??
    (process.env.NODE_ENV !== "production" ||
      process.env.NEXT_PUBLIC_WEB_VITALS_DEBUG === "1");

  const transports: WebVitalsTransport[] = [];
  if (endpoint) transports.push(sendBeaconTransport(endpoint));
  if (debug) transports.push(consoleTransport());

  return (metric) => {
    const payload = buildPayload(metric);
    if (!payload) return;
    for (const transport of transports) transport(payload);
  };
}
