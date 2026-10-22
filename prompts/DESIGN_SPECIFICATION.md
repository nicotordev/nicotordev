# Design Specification & Engineering Standards

**Status**: Living Document
**Version**: 2.0
**Context**: Source of Truth for LLM Code Generation & Visual Design

---

## 1. Codebase Purpose, Critical Files & Goals

### 1.1 Purpose of the Codebase
This repository is the production web application and digital portfolio of **Nicolás Torres (@nicotordev)**, a Full-Stack Web Engineer from Concepción, Chile. It is an interactive, high-performance showcase and client conversion platform engineered to demonstrate technical rigor, architectural clarity, and creative distinction. It bridges full-stack enterprise capabilities (Next.js App Router, TypeScript, PostgreSQL, AI system integration) with a distinct aesthetic identity.

### 1.2 Critical Files & Architecture Map
- **Manifesto & Core Voice**: [`README.md`](file:///home/nicotordev/nicotordev/README.md) — Taglines, everyday arsenal, solution philosophy, biographical origin.
- **Engineering Guidelines**: [`AGENTS.md`](file:///home/nicotordev/nicotordev/AGENTS.md) — Bun toolchain, Next.js App Router conventions, path aliases (`@/*`), Tailwind CSS v4 guidelines.
- **Design System & Global Tokens**: [`src/app/globals.css`](file:///home/nicotordev/nicotordev/src/app/globals.css) — Canonical source for OKLCH color palettes, `@theme` inline definitions, fluid typography utility scales, and CSS animations.
- **Page Assembly (Root Route)**: [`src/app/[locale]/(home)/page.tsx`](file:///home/nicotordev/nicotordev/src/app/[locale]/(home)/page.tsx) — Main pipeline composing Header, Hero, Social Proof, Problem/Solution, Project Carousel, 3D Reviews, Lead Magnet, Blog, About Me, and Footer.
- **Data & Content Truth**:
  - [`locales/en.json`](file:///home/nicotordev/nicotordev/locales/en.json) & companion locale dictionaries (`es.json`, `de.json`, `es-cl.json`) — The single source of truth for all labels, headings, error messages, and UI copy.
  - [`src/app/data/projects.ts`](file:///home/nicotordev/nicotordev/src/app/data/projects.ts) & [`src/types/projects.ts`](file:///home/nicotordev/nicotordev/src/types/projects.ts) — Real project catalog seeds (`ProjectDTO`) with exact budgets, tech stacks, GitHub links, and gallery assets.
  - [`src/app/data/reviews.ts`](file:///home/nicotordev/nicotordev/src/app/data/reviews.ts) — Verifiable client testimonials, hours logged, and contract rates.
  - [`src/lib/about-stats.ts`](file:///home/nicotordev/nicotordev/src/lib/about-stats.ts) — Verified business metrics ($50K+ total earnings, ~3.6K hrs, 99.99% success rate, 4+ years experience).
- **Core Primitives & Backgrounds**:
  - [`src/components/ui/button.tsx`](file:///home/nicotordev/nicotordev/src/components/ui/button.tsx) — Custom button with blurred ambient glow layer and `active:scale-95`.
  - [`src/components/bento-card.tsx`](file:///home/nicotordev/nicotordev/src/components/bento-card.tsx) — Interactive card organism with `layoutId` and scale/translate transitions.
  - [`src/components/backgrounds/background-decoration.tsx`](file:///home/nicotordev/nicotordev/src/components/backgrounds/background-decoration.tsx) — 16-point SVG polygon with `blur-3xl` gradient.
  - [`src/components/backgrounds/psychedelic-background.tsx`](file:///home/nicotordev/nicotordev/src/components/backgrounds/psychedelic-background.tsx) — WebP texture overlay (`/images/background/pscyehdelic-texture.webp`).
- **Lead Capture & Verification**:
  - [`src/components/home/lead-magnet/lead-magnet.tsx`](file:///home/nicotordev/nicotordev/src/components/home/lead-magnet/lead-magnet.tsx) — Dual form (Quick Message vs Full Inquiry) + 3-step interactive gamified gift dialog.
  - [`src/actions/`](file:///home/nicotordev/nicotordev/src/actions/) & [`src/lib/mail.ts`](file:///home/nicotordev/nicotordev/src/lib/mail.ts) — Resend API integration, Cloudflare Turnstile token validation.

### 1.3 Core Goals
1. **Zero Placeholders & Total Authenticity**: Every label, testimonial, rate, and project must stem from repository data or locale dictionaries.
2. **High-Conversion Dual Lead Pipeline**: Facilitate direct client engagement via low-friction quick messages and structured project scoping, backed by interactive gamification.
3. **Flawless Type Safety & Internationalization**: Strict TypeScript without `any`, full i18n coverage across 6 locale variants (`en`, `en-gb`, `es`, `es-cl`, `es-es`, `de`).
4. **Perceptual Polish & Performance**: WCAG AA contrast compliance in OKLCH, fluid typography without layout shift, and optimized WebP media delivery.

---

## 2. The Dominant Lead Feature & Real Content Inventory

### 2.1 What the README Leads With (The Dominant Feature)
The application leads with the statement of identity and engineering ethos:
> **"NicoTorDev — Full-Stack Problem Solver"**
> *"Next.js Specialist · TypeScript Artisan ❤️ · AI 🤖"*
> *"I don’t just code — I engineer clarity from chaos. My craft is transforming complex systems into elegant, scalable realities. I live in the intersection between art, logic, and rebellion, where clean architecture meets restless curiosity."*

**Visual Hierarchy Rule**: This core identity dominates the page header and hero. Before presenting project catalogs or metrics ("what measures"), the interface establishes identity, philosophy, and current operational state ("what matters"):
- Live availability indicator (`Available for hire` with pulsing green ping animation).
- Origin badge: *"a full-stack web engineer from Concepción, Chile"*.
- The Solution Philosophy:
  1. *Prototype first, polish later* — speed reveals truth.
  2. *Force meets finesse* — make it work, then make it sing.
  3. *Build like it’ll outlive you* — scale is a consequence of integrity.
  4. *Learn until mastery* — ignorance is only a temporary state.
- The Everyday Arsenal: `Next.js` · `TypeScript` · `Prisma` · `PostgreSQL` · `Tailwind` · `Docker` · `ChatGPT` · `Claude` · `Cursor`.

### 2.2 Native Shape of the Product: An Interactive Proof Pipeline
The page is organized not as an arbitrary template, but as a sequential **Proof & Conversion Pipeline**:
1. **Hero & Manifesto**: Identity anchor, core ethos, live availability status, and primary CTAs (`Let's talk 🚀`, `Download CV`).
2. **Social Proof & Verifiable Metrics**: Upwork Top Rated status, 100% Job Success Score, international delivery footprint (Chile, US, Germany, Singapore), verified metrics ($50K+ earned, ~3.6K hours, 99.99% success rate).
3. **Problem / Solution Matrix**: Confronting common client pain points (Spaghetti Code, Executors without Vision, Ghost Deadlines, "Works on my Machine" Excuses) versus engineering assets (Scalable Architecture, Product Partner, Full Ownership, Radical Transparency) paired with a rotating titles badge reel.
4. **Production Project Showcase**: Deep case studies (e.g., `Regulex: AI-Powered Legal Compliance`, `V0.dev MCP Context Protocol`, `Conexus Space Planner`, `Seguidoress SaaS`, `SexyConce Bot`, `FlowCL Pagos SDK`) displaying exact real-world estimated budgets (~USD 28/h base), verified tech stacks, and lightbox galleries.
5. **Interactive 3D Review Ledger**: Infinite perspective marquee with user-interactive pause on hover, featuring real quotes (e.g., Goce S., Former CTO at Spiritory GmbH).
6. **Conversion Engine (Lead Magnet)**: Dual-mode inquiry (minimalist Quick Message vs. full scoping form) coupled with an interactive 3-step psychological gift experience protected by Cloudflare Turnstile.
7. **Founder Backstory Bento Grid**: Personal narrative blending engineering, natural balance, Conce AI, and cyberpunk aesthetics.

### 2.3 Real Terminology & Error Messages (From Schemas & Locales)
- **Form Actions & Prompts**: `"Let's talk"`, `"Quick message"`, `"Full form"`, `"Claim gift"`, `"Verify you're human and get exclusive access to your gift. No spam—just real value."`.
- **Validation Messages**:
  - `errors.required`: `"Required field"`
  - `errors.name_min`: `"Name must be at least 2 characters"`
  - `errors.name_max`: `"Name must be at most 100 characters"`
  - `errors.email_invalid`: `"Invalid email address"`
  - `errors.message_min`: `"Message must be at least 2 characters"`
  - `errors.message_max`: `"Message must be at most 1000 characters"`
- **Budget & Scoping Copy**:
  - `"Indicative estimate based on typical scope (~USD 28/h); not a quote or invoice."`

---

## 3. Visual Language System & Design Tokens

### 3.1 The "Soul": Psychedelic-Glass Minimalism
A synthesis of clean high-contrast readability and vibrant atmospheric depth:
- **Content Layer**: Clean, crisp, high-contrast typography using Inter and Sora.
- **Atmosphere Layer**: Deep, vibrant, blurred backgrounds using perceptually uniform OKLCH gradients.
- **Interaction Layer**: Micro-interactions with tactile physical feedback (`active:scale-95`, `hover-lift`, blooming hover glows).

### 3.2 Canonical Color Tokens (OKLCH Only from `src/app/globals.css`)
We use the OKLCH color space for perceptually uniform lightness and chroma across both themes:

#### Light Mode
- `--background`: `oklch(98.5% 0.008 320)` (Warm off-white)
- `--background-secondary`: `oklch(96% 0.01 320)`
- `--foreground`: `oklch(18% 0.03 280)` (Deep plum/charcoal)
- `--card`: `oklch(97.5% 0.015 330)`
- `--card-foreground`: `oklch(18% 0.03 280)`
- `--primary`: `oklch(56% 0.24 340)` (Vibrant Pink/Magenta tuned for WCAG AA contrast)
- `--primary-foreground`: `oklch(98% 0.02 320)`
- `--secondary`: `oklch(52% 0.24 300)` (Deep Neon Purple)
- `--secondary-foreground`: `oklch(98% 0.02 320)`
- `--accent`: `oklch(58% 0.2 320)`
- `--muted`: `oklch(94% 0.03 310)`
- `--muted-foreground`: `oklch(42% 0.05 300)`
- `--border`: `oklch(90% 0.04 310)`
- `--success`: `oklch(65% 0.22 145)` (Emerald)

#### Dark Mode
- `--background`: `oklch(20% 0.02 300)` (Deep obsidian/violet)
- `--background-secondary`: `oklch(24% 0.06 310)`
- `--foreground`: `oklch(94% 0.03 320)` (Luminous white/lavender)
- `--card`: `oklch(24% 0.06 310)`
- `--card-foreground`: `oklch(96% 0.02 320)`
- `--primary`: `oklch(70% 0.3 340)` (Luminous electric pink)
- `--secondary`: `oklch(68% 0.33 300)` (Intense neon purple)
- `--accent`: `oklch(73% 0.28 320)`
- `--muted`: `oklch(25% 0.1 305)`
- `--muted-foreground`: `oklch(80% 0.1 310)`
- `--border`: `oklch(30% 0.14 305)`
- `--success`: `oklch(70% 0.22 145)`

### 3.3 Typography Hierarchy & Fluid Scales
Configured in `@theme` and `@utility` rules in `globals.css`:
- **UI / Body Sans**: `var(--font-inter)` (`--font-sans`)
- **Display & Headlines**: `var(--font-sora)` (`--font-display`)
- **Editorial Serif**: `var(--font-source-serif4)` (`--font-serif`)
- **Code & Tech Mono**: `var(--font-fira-code)` (`--font-mono`), `var(--font-jetbrains-mono)`, `var(--font-ibm-plex-mono)`
- **Creative Accents**: `var(--font-fontdiner-swanky)`, `var(--font-love-light)`, `var(--font-permanent-marker)`

#### Fluid Utilities
- `type-display-lg`: `clamp(3rem, 2.647rem + 4.706vw, 4.5rem)` (48px → 72px, line-height 1.1)
- `type-display-md`: `clamp(2.25rem, 1.912rem + 4.235vw, 3.75rem)` (36px → 60px, line-height 1.1)
- `type-display-sm`: `clamp(1.75rem, 1.559rem + 3.13vw, 3rem)` (28px → 48px, line-height 1.15)
- `type-headline-lg`: `clamp(2rem, 1.789rem + 2.817vw, 3.5rem)` (32px → 56px, line-height 1.2)
- `type-headline-md`: `clamp(1.75rem, 1.574rem + 2.347vw, 3rem)` (28px → 48px, line-height 1.25)
- `type-headline-sm`: `clamp(1.5rem, 1.359rem + 1.878vw, 2.5rem)` (24px → 40px, line-height 1.3)
- `type-title-lg` / `md` / `sm`: 20px → 30px, 18px → 24px, 16px → 18px
- `type-body-lg` / `md` / `sm`: 16px → 20px, 16px fixed, 14px fixed
- `type-label-lg` / `md` / `sm`: 14px, 12px, 11px
- `type-caption` / `type-overline` / `type-code`

### 3.4 Radius & Spacing Tokens
- Container constraint: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Button radius: `rounded-full` for compact pill buttons; standard buttons use `rounded-lg` / `var(--radius)` (0.625rem).
- Bento cards & showcase containers: `rounded-3xl` (24px) for prominent organic curves.
- Modal dialogs & interactive popovers: `rounded-2xl` with glass backdrop filters.

---

## 4. Component Architecture & Animation Signatures

### 4.1 The "Atomic" Button (`src/components/ui/button.tsx`)
Never render raw `<button>` elements. Use the project primitive which features:
- **Internal Glow**:
  ```tsx
  <span className="absolute inset-0 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-60 bg-linear-to-r from-primary to-secondary pointer-events-none" />
  ```
- **Physical Press**: `active:scale-95` transition.
- **Variants**: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`, `success`.

### 4.2 Bento Card Organism (`src/components/bento-card.tsx`)
- Card wrapper utilizes `motion.div` with layout animation support.
- Neutral backdrop with subtle dark borders: `bg-card border border-border/50 dark:border-white/10`.
- Hover behavior: image zoom (`scale-105`), subtle elevation shadow (`shadow-primary`), overlay transition, text translateY slide.

### 4.3 Background Composition
- Main sections wrap content with `relative z-10`.
- Atmosphere backgrounds placed as absolute children:
  - `<BackgroundDecoration />`: 16-point SVG polygon with `blur-3xl` gradient from `accent` to `primary`.
  - `<PsychedelicBackground />`: Low-opacity textured noise with `blur-sm`.

### 4.4 Keyframe Animations (Defined in `globals.css`)
- `animate-gradient-x`: Smooth 3s horizontal gradient cycle.
- `animate-float`: Subtle 3s vertical levitation for decorative badges.
- `animate-morph`: 8s morphing border-radius animation.
- `animate-marquee` & `animate-marquee-vertical`: Linear infinite review ticker.

---

## 5. Engineering Standards & LLM Implementation Contract

1. **Bun as Package Manager**: Always use `bun` (`bun run check`, `bun run dev`, `bun run build`). Never use `npm`.
2. **I18n First**: Never hardcode English strings into JSX. All copy, labels, placeholders, and aria-texts must come from `messages` prop injected from `locales/*.json`.
3. **Tailwind CSS v4 & OKLCH**: Use semantic CSS tokens (`bg-primary`, `text-muted-foreground`, `border-border`). Do not introduce arbitrary hex codes.
4. **No Invention / No Placeholders**: Use real projects, real metrics, real reviews, and real copy verified in the repository.
5. **Implementation Prompt**:
   > *"Create this component adhering to the 'Psychedelic-Glass Minimalism' aesthetic. Inherit OKLCH tokens, fluid type utilities (`type-headline-*`, `type-body-*`), and framer-motion micro-interactions. Ensure buttons include the internal glow span and all copy is passed via typed `messages` props."*

