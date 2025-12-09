export type BentoSize = "square" | "wide" | "tall" | "large";

export interface PortfolioItem {
  src: string;
  alt: string;
  size: BentoSize;
  description?: string; // Added optional description for the showcase view
}
