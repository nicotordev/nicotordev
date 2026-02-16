import dynamic from "next/dynamic";
import HeroTechStackCarouselFallback from "./hero-tech-stack-carousel-fallback";

const HeroSectionTechStackCarouselClient = dynamic(
  async () => import("./hero-section-tech-stack-carousel-client"),
  {
    loading: () => <HeroTechStackCarouselFallback />,
  }
);

export default function HeroSectionTechStackCarousel() {
  return <HeroSectionTechStackCarouselClient />;
}

