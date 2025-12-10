import { cn } from "@/lib/utils";
import * as React from "react";

// ----------------------------------------------------------------------------
// Types
// ----------------------------------------------------------------------------

export type TypographyRole =
  | "display"
  | "headline"
  | "title"
  | "body"
  | "label"
  | "code"
  | "caption"
  | "overline"
  | "button";

export type TypographyMood =
  | "neutral" // Default sans (Inter)
  | "product" // Modern geometric (Sora) - often for headers
  | "serious" // Restrained sans (Inter with tighter tracking)
  | "editorial" // Serif (Source Serif 4)
  | "code" // Mono (IBM Plex or Fira)
  | "artistic" // Marker (Permanent Marker)
  | "handwritten" // Cursive (Love Light)
  | "psychedelic"; // Funky (Fontdiner Swanky)

export type TypographyAs =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "div"
  | "strong"
  | "em"
  | "code"
  | "label"
  | "pre"
  | "figcaption";

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  as?: TypographyAs;
  role?: TypographyRole;
  mood?: TypographyMood;
  className?: string;
  children: React.ReactNode;
}

// ----------------------------------------------------------------------------
// Mappings & Config
// ----------------------------------------------------------------------------

const defaultTags: Record<TypographyRole, TypographyAs> = {
  display: "h1",
  headline: "h2",
  title: "h3",
  body: "p",
  label: "span",
  code: "code",
  caption: "span",
  overline: "span",
  button: "span",
};

// Base class for each role (size, fluid scale, tracking)
const roleClasses: Record<TypographyRole, string> = {
  display: "type-display-sm md:type-display-md lg:type-display-lg",
  headline: "type-headline-sm md:type-headline-md lg:type-headline-lg",
  title: "type-title-sm md:type-title-md lg:type-title-lg",
  body: "type-body-md", // Default body is medium (16px)
  label: "type-label-md",
  code: "type-code",
  caption: "type-caption",
  overline: "type-overline",
  button: "type-button",
};

// Font family classes based on Mood
// Note: We use the utility classes we defined in CSS/Tailwind config
const moodFontClasses: Record<TypographyMood, string> = {
  neutral: "font-sans",
  product: "font-display", // Sora for "product" feel
  serious: "font-sans tracking-tight", // Inter with tighter tracking
  editorial: "font-serif",
  code: "font-mono-plex", // Default code mood uses IBM Plex
  artistic: "font-display-marker",
  handwritten: "font-display-love",
  psychedelic: "font-display-swanky",
};

// ----------------------------------------------------------------------------
// Component
// ----------------------------------------------------------------------------

export function Typography({
  as,
  role = "body",
  mood = "neutral",
  className,
  children,
  ...props
}: TypographyProps) {
  // Determine the HTML tag to render
  const Component = as || defaultTags[role];

  // Resolve classes
  const baseRoleClass = roleClasses[role];
  const moodClass = moodFontClasses[mood];

  // Specific overrides for Role + Mood combinations (optional refinements)
  // Example: If role is "display" and mood is "neutral", maybe we want Sora (Display font) regardless of mood mapping?
  // Let's rely on the mood being passed correctly.
  // However, "display" role has useful defaults in CSS that set font-family to font-display.
  // We should ensure mood overrides take precedence if strict.
  // But wait, our CSS utilities for `.type-display-*` set `font-display`.
  // If we pass `mood="editorial"`, we want `font-serif`.
  // Tailwind merge ensures the last class wins, or we handle collision.
  // Since `type-display-*` might set `font-family`, we need our mood class to be appended after or win specificity.
  // We'll trust `cn` (tailwind-merge) to handle `font-*` conflicts correctly.

  return (
    <Component className={cn(baseRoleClass, moodClass, className)} {...props}>
      {children}
    </Component>
  );
}
