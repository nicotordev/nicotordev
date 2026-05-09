/**
 * Portfolio “budget” labels: midpoint in `cost` (USD) for sorting/SEO; optional
 * human string in `costDisplay` (ranges or “~$Xk”) for client-sensitive work.
 *
 * Estimates use ~$28/h USD as a guideline; commercial ranges aggregate hours bands.
 */

/** When Directus has no `cost_display`, use this by slug (privacy + OSS symbolic). */
const COST_DISPLAY_BY_SLUG: Record<string, string> = {
  // Commercial — ranges (Jun 29–Nov 15, 2025 ≈ 20 weeks @ ~20–27 h/w → ~$11k–$15k at $28/h)
  "regulex-ai-powered-legal-compliance-and-auditing-platform": "$11k–$15k USD est.",
  "seguidoress-full-stack-saas-for-social-media-services": "$11k–$15k USD est.",
  "spiritory-collectible-whisky-and-spirits-e-commerce-platform": "$14k–$18k USD est.",
  // OSS / demos — symbolic vs typical freelance build bands for similar scope
  "v0-dev-mcp-ai-agent-context-protocol-integration": "~$800 USD est.",
  "conexus-ai-assisted-workspace-planning-calculator": "~$2.1k USD est.",
  "sexyconce-telegram-community-automation-bot": "~$1.5k USD est.",
  "flowcl-pagos-typescript-sdk-for-payment-integration": "~$1k USD est.",
  // Concept / portfolio exercises — illustrative vs market comps for MVPs
  "funpicai-ai-powered-creative-image-generator": "~$3.5k USD est.",
  "crypto-asset-screener-real-time-market-analytics-platform": "~$2.5k–$3k USD est.",
  "classpro-education-management-platform": "~$1.5k–$2k USD est.",
};

/** Compact USD from an integer midpoint (e.g. 14000 → $14k USD est.). */
export function formatUsdEstimate(costUsd: number): string {
  if (!Number.isFinite(costUsd) || costUsd <= 0) return "";
  if (costUsd >= 1_000_000) {
    const m = costUsd / 1_000_000;
    const rounded = Math.round(m * 10) / 10;
    return `$${rounded % 1 === 0 ? rounded.toFixed(0) : rounded.toFixed(1)}M USD est.`;
  }
  if (costUsd >= 1000) {
    const k = costUsd / 1000;
    const rounded = Math.round(k * 10) / 10;
    const num =
      rounded % 1 === 0 ? rounded.toFixed(0) : rounded.toFixed(1).replace(/\.0$/, "");
    return `$${num}k USD est.`;
  }
  return `$${Math.round(costUsd)} USD est.`;
}

/**
 * Prefer CMS `cost_display`, then slug fallback, then formatted midpoint from `cost`.
 */
export function resolveProjectCostDisplay(
  slug: string,
  costUsd: number,
  cmsCostDisplay?: string | null,
): string {
  const fromCms = cmsCostDisplay?.trim();
  if (fromCms) return fromCms;
  const fb = COST_DISPLAY_BY_SLUG[slug];
  if (fb) return fb;
  return formatUsdEstimate(costUsd);
}
