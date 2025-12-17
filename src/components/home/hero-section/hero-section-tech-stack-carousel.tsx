import { TECH_STACK_BOTTOM, TECH_STACK_TOP } from "@/app/data/hero";
import dynamic from "next/dynamic";
import HeroSectionTechStackCarouselPill from "./hero-section-tech-stack-carousel-pill";

function TechStackCarouselFallback() {
  return (
    <div className="relative isolate w-full overflow-x-clip px-2 sm:px-4 py-6">
      <div className="flex flex-col gap-4 mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex flex-nowrap gap-3 whitespace-nowrap">
          {TECH_STACK_TOP.map((tech) => (
            <HeroSectionTechStackCarouselPill key={tech} tech={tech} />
          ))}
        </div>
        <div className="flex flex-nowrap gap-3 whitespace-nowrap">
          {TECH_STACK_BOTTOM.map((tech) => (
            <HeroSectionTechStackCarouselPill key={tech} tech={tech} />
          ))}
        </div>
      </div>
    </div>
  );
}

const HeroSectionTechStackCarouselClient = dynamic(
  async () => import("./hero-section-tech-stack-carousel-client"),
  {
    // CWV/INP: Swiper is relatively heavy; split it out of the initial bundle.
    ssr: false,
    loading: () => <TechStackCarouselFallback />,
  }
);

export default function HeroSectionTechStackCarousel() {
  return <HeroSectionTechStackCarouselClient />;
}

