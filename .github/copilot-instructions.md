**Project Snapshot**

- Next.js 16 App Router with Bun; `src/app/layout.tsx` wires NextIntl, cookie-derived prefs, and local fonts.
- Package manager is Bun (`packageManager: bun@1.2.2`); prefer `bun run …` and `bunx` over npm/yarn.
- Strict TS config (`noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`) means new types must be precise; aliases live in `tsconfig.json` (`@/*`, `@/i18n/*`, `@public/*`).

**Architecture**

- Root providers at `src/app/providers.tsx` wrap `Session`, `Currency`, and `Timezone` contexts from `src/context/*` for optimistic client state.
- Locale-aware middleware is exported from `src/proxy.ts`; every new route must work with `/[locale]/…` URLs defined by `i18n/routing.ts`.
- Server components grab translations with `next-intl/server.getMessages` (see `src/app/page.tsx`); match the shape Hero-style props expect.

**Server Actions & Sessions**

- Preference actions in `src/app/actions/*.actions.ts` use Zod, set cookies, update the latest Prisma `Session` via IP/User-Agent, then `revalidatePath("/", "layout")`; reuse this pattern for new persisted settings.
- `SessionProvider` (`src/context/SessionContext.tsx`) calls `getSession`/`signOut` actions that proxy API routes; keep their signatures intact for consumers.
- `src/lib/nodeCache.ts` exposes shared in-memory caching for server actions—extend it instead of instantiating ad-hoc caches.

**Data & Prisma**

- `prisma/schema.prisma` defines enums for locale-driven concepts and emits the client into `src/lib/generated/prisma`; rerun `bunx prisma generate` after schema edits and commit the generated package.
- Migrations sit in `prisma/migrations`; run `bunx prisma migrate dev --name <change>` locally and `bunx prisma migrate deploy` in CI/deploys.
- `src/lib/prisma.ts` memoizes the client; do not create new `PrismaClient` instances elsewhere.

**Internationalization**

- Locale, currency, and timezone helpers live under `i18n/`; `docs/I18N_CURRENCY_TIMEZONE.md` documents the full data flow—follow it when adding new options.
- Translation sources are the JSON files in `locales/`; validate coverage with `bun run check-locales` and regenerate via `bun run auto-translate` (requires `DEEPL_API_KEY`, Chilean Spanish is the source).
- `src/lib/i18n-helpers.ts` hosts reusable formatting helpers; rely on them for consistent currency/time rendering.

**UI Patterns**

- Component library in `src/components/ui/*` is shadcn-style over Radix with `class-variance-authority`; extend variants instead of scattering Tailwind classes.
- Global styling (`src/app/globals.css`) uses Tailwind v4 `@import` plus custom CSS vars; align new tokens with the existing palette/typography.
- Shared marketing components (e.g., `src/components/common/header.tsx`, `src/components/home/hero-section.tsx`) expect structured translation props—keep additions typed and locale-ready.

**Tooling & Commands**

- Common scripts: `bun run dev`, `bun run build`, `bun run lint`, `bun run type-check`, `bun run check`.
- Use `bunx prisma format`/`bunx prisma studio` when inspecting the DB; the repo trusts Bun’s binaries (see `ecosystem.config.js`).
- `next.config.ts` wraps `next-intl` and sets `experimental.staleTimes`; respect these when introducing caching or fetch revalidation.

**Deployment Notes**

- Production deploy relies on `deploy.sh` + PM2 (`ecosystem.config.js`), sharing the `.next` directory and running Prisma generate/migrate during rollout.
- NextAuth setup in `src/auth.ts` uses GitHub, Google, and Resend providers—ensure their env secrets exist before enabling auth features.
- Static assets (fonts, emojis, illustrations) are prebundled under `public/`; reference via the defined `assets` map (`src/app/assets.ts`).

**Gotchas**

- `/api/auth/register/route.ts` is currently a stub; don’t depend on it for production flows without completing the implementation.
- Locale-prefixed routing plus cookie-driven preferences means SSR/CSR must both read from cookies—mirror the `layout.tsx` pattern when building new entry points.
- The Prisma `Session` lookup uses best-effort IP/User-Agent; handle failures gracefully in new features and avoid assuming DB updates always succeed.
