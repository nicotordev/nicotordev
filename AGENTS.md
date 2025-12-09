# Repository Guidelines

## Project Structure & Module Organization
- `src/app`: Next.js App Router entry (layouts, routes, API routes, assets/metadata). Locale-aware pages live under `src/app/[locale]/`.
- `src/components`: Reusable UI (Radix + Tailwind); `components/ui` for primitives, `components/home` for page sections, `components/layout` for shell parts.
- `src/lib`, `src/stores`, `src/schemas`, `src/types`: Shared utilities, Zustand stores, Zod schemas, and TypeScript types.
- `locales/` and `i18n/`: Translation dictionaries and routing helpers; keep structures in sync with `bun run sync-locales`.
- `public/` + `docs/`: Static assets and design examples; avoid placing secrets here. Automation lives in `scripts/` (image conversion, locale tools).
- Copy `.env.example` to `.env.local` before running anything that touches external services.

## Build, Test, and Development Commands
- `bun dev` — Run the app with Turbopack in dev mode.
- `bun run build` / `bun run start` — Production build and serve (listens on port 3090 by default).
- `bun run lint`, `bun run type-check`, `bun run check` — ESLint (Next config), TypeScript noEmit, then both.
- `bun run check-locales` / `bun run sync-locales` — Validate and align locale files.
- `bun run format` — Prettier across the repo. Use `bun` (Node >= 20.9, Bun >= 1.0).

## Coding Style & Naming Conventions
- TypeScript + React functional components; prefer PascalCase components (`HeroSection.tsx`), `use*` hooks, and `*-store.ts` for Zustand stores.
- Tailwind CSS v4 for styling; keep globals in `src/app/globals.css` and favor utility-first classes. Avoid inline magic numbers when tokens exist.
- Path alias `@/` maps to `src/`. Keep imports absolute from there.
- 2-space indentation, trailing commas, and prettier formatting; run `bun run lint` before pushing to catch Radix/Next best practices.

## Testing Guidelines
- No automated test suite is present yet; add focused unit/integration tests where you touch logic (e.g., `src/lib`, stores, server actions).
- Prefer colocated `*.test.ts`/`*.test.tsx` or a nearby `__tests__` folder; mock network/Clerk usage.
- Minimum bar for PRs today: `bun run check` must pass. Document any untested areas in the PR description.

## Commit & Pull Request Guidelines
- Follow the existing Conventional Commit style seen in history (`feat:`, `fix:`, `chore:`, `build:`). Keep subjects short and imperative.
- PRs should include: concise summary, linked issue (if any), screenshots/GIFs for UI changes, and notes on locale updates or new env vars.
- Re-run `bun run check` after touching translations, scripts, or configs; mention any follow-up tasks or rollout risks.
