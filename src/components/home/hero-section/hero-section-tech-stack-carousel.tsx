"use client";

import StackIcon from "tech-stack-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const TECH_META = {
  typescript: { label: "TypeScript" },
  nextjs: { label: "Next.js" },
  react: { label: "React" },
  nodejs: { label: "Node.js" },
  tailwindcss: { label: "Tailwind CSS" },
  postgresql: { label: "PostgreSQL" },
  openai: { label: "OpenAI" },
  github: { label: "GitHub" },
  vercel: { label: "Vercel" },
  prisma: { label: "Prisma" },
  azure: { label: "Azure" },
  docker: { label: "Docker" },
  aws: { label: "AWS" },
  linux: { label: "Linux" },
  figma: { label: "Figma" },
  vscode: { label: "VS Code" },
  npm: { label: "npm" },
  css3: { label: "CSS3" },
  html5: { label: "HTML5" },
  git: { label: "Git" },
  netlify: { label: "Netlify" },
  sass: { label: "Sass" },
  firebase: { label: "Firebase" },
  expressjs: { label: "Express" },
  nestjs: { label: "NestJS" },
  supabase: { label: "Supabase" },
  redis: { label: "Redis" },
  mongodb: { label: "MongoDB" },
  graphql: { label: "GraphQL" },
  cloudflare: { label: "Cloudflare" },
  kubernetes: { label: "Kubernetes" },
  vitest: { label: "Vitest" },
  playwright: { label: "Playwright" },
  cypress: { label: "Cypress" },
  ubuntu: { label: "Ubuntu" },
  python: { label: "Python" },
} as const;

type TechName = keyof typeof TECH_META;

const TECH_STACK_TOP: TechName[] = [
  "typescript",
  "nextjs",
  "react",
  "nodejs",
  "tailwindcss",
  "postgresql",
  "prisma",
  "supabase",
  "openai",
  "vercel",
  "cloudflare",
  "graphql",
  "azure",
  "vitest",
  "playwright",
  "cypress",
  "ubuntu",
  "python",
];

const TECH_STACK_BOTTOM: TechName[] = [
  "docker",
  "aws",
  "linux",
  "figma",
  "vscode",
  "npm",
  "css3",
  "html5",
  "git",
  "netlify",
  "sass",
  "firebase",
  "expressjs",
  "nestjs",
  "redis",
  "mongodb",
  "kubernetes",
];

function TechPill({ tech }: { tech: TechName }) {
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
      <span className="text-sm sm:text-base font-semibold leading-none">
        {meta.label}
      </span>
      <span className="pointer-events-none absolute inset-x-2 bottom-0 h-px bg-gradient-to-r from-transparent via-secondary/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
}

export default function HeroSectionTechStackCarousel() {
  return (
    <div className="relative isolate w-full overflow-x-clip px-2 sm:px-4 py-6">
      <div className="flex flex-col gap-4 mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={14}
          slidesPerView={3.2}
          loop
          speed={2200}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            reverseDirection: true,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 5,
            },
            1024: {
              slidesPerView: 7,
            },
          }}
          className="w-full"
        >
          {TECH_STACK_TOP.map((tech) => (
            <SwiperSlide key={tech} className="!h-auto">
              <TechPill tech={tech} />
            </SwiperSlide>
          ))}
        </Swiper>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={14}
          slidesPerView={3.2}
          loop
          speed={2000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            reverseDirection: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 5,
            },
            1024: {
              slidesPerView: 7,
            },
          }}
          className="w-full"
        >
          {TECH_STACK_BOTTOM.map((tech) => (
            <SwiperSlide key={tech} className="!h-auto">
              <TechPill tech={tech} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
