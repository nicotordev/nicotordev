import { TECH_META } from "@/app/data/hero";
import { Typography } from "@/components/ui/typography";
import type { TechName } from "@/types/misc";
import StackIcon from "tech-stack-icons";
  
export default function HeroSectionTechStackCarouselPill({ tech }: { tech: TechName }) {
  const meta = TECH_META[tech];
  return (
    <div className="group relative flex h-full items-center gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-xl text-foreground/80 transition-all duration-300 ease-out hover:-translate-y-1 hover:text-primary">
      <div className="relative">
        <span className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-primary/20 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <StackIcon
          name={tech}
          className="relative w-8 h-8 sm:w-9 sm:h-9 drop-shadow-[0_12px_30px_rgba(0,0,0,0.12)]"
        />
      </div>
      <Typography as="span" mood="artistic" role="label">
        {meta.label}
      </Typography>
      <span className="pointer-events-none absolute inset-x-2 bottom-0 h-px bg-linear-to-r from-transparent via-secondary/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
}
