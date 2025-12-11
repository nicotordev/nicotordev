# Design Specification & Engineering Standards

**Status**: Living Document
**Version**: 1.0
**Context**: Source of Truth for LLM Code Generation

---

## 1. The "Soul" of the Site (Aesthetic Vibe)

**"Psychedelic-Glass Minimalism"**

The design philosophy balances professional clarity with vibrant, chaotic artistic expression.

- **Content Layer**: Clean, minimalist, high-contrast, professional typography (Inter/Sora).
- **Atmosphere Layer**: Deep, vibrant, blurred backgrounds using "OKLCH" coloring to ensure perception uniformity.
- **Interaction Layer**: Highly responsive, scale-based animations (`active:scale-95`), and "blooming" glow effects on hover.

### Key Visual Signatures

- **The "Glow"**: Buttons and interactive elements often contain an internal `span` with `blur-xl` that lights up on hover.
- **Bento Grids**: The primary layout strategy for content. Cards are highly rounded (`rounded-3xl`) with complex hover states involving image scaling and text sliding.
- **Text Styling**:
  - `text-balance` is mandatory for headlines.
  - `font-display` (Sora?) for headings.
  - `text-muted-foreground` for secondary text (never pure gray).
- **Backgrounds**:
  - `BackgroundDecoration`: A specific 16-point polygon with `blur-3xl` and `bg-linear-to-tr from-accent to-primary`.
  - `PsychedelicBackground`: Uses a specific texture image (`/images/background/pscyehdelic-texture.webp`) with `opacity-70`, `blur-sm` and subtle border lines.

---

## 2. Visual Language System

### Colors (OKLCH Only)

We use the OKLCH color space for perceptually uniform gradients.

- **Primary**: `oklch(68% 0.28 340)` (Vibrant Pink/Magenta)
- **Secondary**: `oklch(65% 0.3 300)` (Deep Purple)
- **Accent**: `oklch(72% 0.24 320)`
- **Background**: `oklch(98.5% 0.008 320)` (Warm White) / Dark Mode equivalent.
- **Success**: `oklch(65% 0.22 145)` (Green)

### Typography

- **UI / Body**: `var(--font-inter)` (Variable weight)
- **Headings / Display**: `var(--font-display)` (Likely Sora or Space Grotesk - bold, technical)
- **Code / Technical**: `var(--font-ibm-plex-mono)` or `var(--font-jetbrains-mono)`
- **Creative Accents**: `Fontdiner Swanky`, `Love Light`, `Permanent Marker` (Use sparingly for "handwritten" feel).

### Radius & Spacing

- **Buttons**: `rounded-full` for `sm`/`lg` sizes. Standard buttons may use default radius.
- **Cards**: `rounded-3xl` (Aggressively rounded).
- **Containers**: `max-w-7xl` is the standard content width.

---

## 3. Component Architecture

### The "Atomic" Button (`src/components/ui/button.tsx`)

Never create a plain `<button>`. Use the custom `Button` component which includes:

- **Internal Glow**: `<span className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-60 ..." />`
- **Variants**: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`.
- **Behavior**: `active:scale-95` transition built-in.

### The "Bento" Card (`src/components/bento-card.tsx`)

A complex interactive organism.

- **Wrapper**: `motion.div` with `layoutId` for shared layout animations.
- **Styles**: `bg-neutral-100 dark:bg-neutral-900 border border-transparent dark:border-white/10`.
- **Hover State**:
  - Image scales up (1.05).
  - Overlay opacity increases.
  - Text translates Y (2 -> 0) and fades in.
- **Cursor**: `cursor-zoom-in`.

### Background Composition

Always wrap main sections with `relative z-10` and place `BackgroundDecoration` or `PsychedelicBackground` as `absolute` children with lower z-index.

---

## 4. Engineering Standards

### Tech Stack

- **Framework**: Next.js (App Router).
- **Styling**: Tailwind CSS (v4 alpha syntax observed: `@import "tailwindcss";`).
- **Animation**: `framer-motion` (Mandatory for enter/exit/hover states).
- **Icons**: `lucide-react`.
- **Internationalization**: `next-intl` (Mandatory. All text must be in `messages` objects).

### Code Pattern Rules

1.  **I18n First**: Never hardcode English text. Always inject `messages` prop.
    ```tsx
    interface Props {
      messages: Messages;
    }
    ```
2.  **Styles**: Use `cn(...)` for class merging.
3.  **Client Components**: Use `"use client"` only when necessary (e.g., for `framer-motion` or interactivity). wrapper patterns are encouraged.
4.  **Tailwind**: Use CSS variables (e.g., `bg-primary`) not arbitrary hex codes.

### Animation Standard

- **Entry**: `initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}`.
- **Hover**: `hover-lift` class or `whileHover={{ scale: 1.05 }}`.

---

## 5. Implementation Prompt (Copy/Paste this for new tasks)

"Create this component following the 'Psychedelic-Glass Minimalism' aesthetic. Use OKLCH colors, `framer-motion` for interactions, and ensure the button has the internal glow span. All text must be internationalized via `messages` props."
