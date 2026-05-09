"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { ProjectFromCMS } from "@/lib/directus";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  CalendarClock,
  CircleDollarSign,
  ExternalLink,
  Github,
  Globe,
  Layers2,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { IconName } from "tech-stack-icons";
import StackIcon from "tech-stack-icons";
import { motion, AnimatePresence } from "framer-motion";

type ProjectDetailsViewProps = {
  locale: string;
  project: ProjectFromCMS;
  relatedProjects: ProjectFromCMS[];
};

type GalleryImage = {
  id: string;
  url: string;
  alt: string;
};

const TECH_ICON_MAP: Record<string, IconName> = {
  typescript: "typescript",
  javascript: "javascript",
  react: "reactjs",
  nextjs: "nextjs2",
  next: "nextjs2",
  tailwind: "tailwindcss",
  "tailwind css": "tailwindcss",
  node: "nodejs",
  "node.js": "nodejs",
  bun: "bun",
  prisma: "prisma",
  postgres: "postgresql",
  postgresql: "postgresql",
  mysql: "mysql",
  mongodb: "mongodb",
  docker: "docker",
  aws: "aws",
  vercel: "vercel",
  github: "github",
  redis: "redis",
  gcp: "googlecloud",
  "google cloud": "googlecloud",
  figma: "figma",
};

function parseTechList(tech: string): string[] {
  if (!tech.trim()) return [];
  return Array.from(
    new Set(
      tech
        .split(/[,\n|/]/)
        .map((item) => item.trim())
        .filter(Boolean),
    ),
  );
}

function plainTextFromHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function formatDate(value: string, locale: string): string {
  return new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(
    new Date(value),
  );
}

function GalleryLightbox({
  images,
  title,
  labels,
}: {
  images: GalleryImage[];
  title: string;
  labels: {
    openGalleryImage: string;
    previousImage: string;
    nextImage: string;
    closeGalleryLightbox: string;
    previous: string;
    next: string;
    close: string;
  };
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const current = activeIndex == null ? null : images[activeIndex];

  useEffect(() => {
    if (activeIndex == null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowRight") {
        setActiveIndex((prev) =>
          prev == null ? 0 : (prev + 1) % images.length,
        );
      }
      if (event.key === "ArrowLeft") {
        setActiveIndex((prev) =>
          prev == null ? 0 : (prev - 1 + images.length) % images.length,
        );
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, images.length]);

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {images.map((image, index) => (
          <motion.button
            key={image.id}
            type="button"
            className="group relative mb-4 block w-full overflow-hidden rounded-[var(--radius-card)] border border-border/60 bg-card text-left"
            onClick={() => setActiveIndex(index)}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            aria-label={labels.openGalleryImage.replace(
              "{index}",
              String(index + 1),
            )}
          >
            <Image
              src={image.url}
              alt={image.alt}
              width={1200}
              height={900}
              className="h-auto w-full object-cover transition duration-500 group-hover:scale-105"
              sizes="(min-width: 1280px) 32vw, (min-width: 640px) 48vw, 100vw"
            />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {current ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveIndex(null)}
          >
            <motion.div
              className="glass-panel relative w-full max-w-5xl rounded-[var(--radius-dialog)] p-3 sm:p-5"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{title}</p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setActiveIndex((prev) =>
                        prev == null
                          ? 0
                          : (prev - 1 + images.length) % images.length,
                      )
                    }
                    aria-label={labels.previousImage}
                  >
                    {labels.previous}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setActiveIndex((prev) =>
                        prev == null ? 0 : (prev + 1) % images.length,
                      )
                    }
                    aria-label={labels.nextImage}
                  >
                    {labels.next}
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setActiveIndex(null)}
                    aria-label={labels.closeGalleryLightbox}
                  >
                    {labels.close}
                  </Button>
                </div>
              </div>
              <Image
                src={current.url}
                alt={current.alt}
                width={1800}
                height={1200}
                className="max-h-[70vh] w-full rounded-[var(--radius-card)] object-contain"
                sizes="100vw"
                priority
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export function ProjectDetailsView({
  locale,
  project,
  relatedProjects,
}: ProjectDetailsViewProps) {
  const tProjects = useTranslations("projects");
  const tDetails = useTranslations("projects.details");
  const tA11y = useTranslations("common.a11y");
  const subtitle = plainTextFromHtml(project.description).slice(0, 240);
  const techList = parseTechList(project.tech);
  const galleryImages = project.gallery
    .filter((item) => item.type === "IMAGE")
    .map((item) => ({
      id: item.id,
      url: item.url,
      alt: item.alt ?? item.name,
    }));
  const sourceUrl =
    project.link && project.link.includes("github.com") ? project.link : null;
  const groupedTech = useMemo(
    () => ({
      core: techList.slice(0, 4),
      platform: techList.slice(4, 8),
      delivery: techList.slice(8),
    }),
    [techList],
  );

  return (
    <div className="project-shell pb-24">
      <section className="relative mx-auto max-w-6xl px-4 pt-14 sm:px-6 sm:pt-24 lg:px-8 text-center flex flex-col items-center">
        <div
          className="project-glow absolute inset-x-0 top-0 -z-10 h-96 opacity-60"
          aria-hidden
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 flex flex-col items-center"
        >
          <Badge
            variant="outline"
            className="rounded-full border-primary/30 bg-primary/5 px-4 py-1.5 text-xs tracking-[0.15em] text-primary uppercase shadow-sm"
          >
            {tDetails("projectShowcase")}
          </Badge>
          <h1 className="type-display-lg max-w-4xl text-balance font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl">
            {project.name}
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl leading-relaxed">
            {subtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {techList.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center rounded-full border border-border/50 bg-background/50 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm"
              >
                {tech}
              </span>
            ))}
            {techList.length > 5 && (
              <span className="inline-flex items-center rounded-full border border-border/50 bg-background/50 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm">
                +{techList.length - 5}
              </span>
            )}
          </div>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            {project.link ? (
              <Button
                asChild
                size="lg"
                className="rounded-full px-8 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
              >
                <Link href={project.link} target="_blank" rel="noreferrer">
                  {tProjects("carousel.viewProject")}
                  <ExternalLink className="ml-2 size-4" />
                </Link>
              </Button>
            ) : null}
            {sourceUrl ? (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full px-8 border-border/80 bg-background/50 backdrop-blur-md hover:bg-muted/50 transition-all duration-300"
              >
                <Link href={sourceUrl} target="_blank" rel="noreferrer">
                  {tDetails("viewSource")}
                  <Github className="ml-2 size-4" />
                </Link>
              </Button>
            ) : null}
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="rounded-full px-8 hover:bg-muted/50 transition-all duration-300"
            >
              <Link href={`/${locale}/projects`}>
                {tDetails("backToProjects")}
              </Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="relative mt-16 w-full overflow-hidden rounded-[2rem] border border-border/50 bg-muted/20 p-2 shadow-2xl shadow-black/10 sm:p-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="absolute inset-0 bg-linear-to-b from-transparent to-background/10" />
          <Image
            src={project.image}
            alt={project.name}
            width={1920}
            height={1080}
            className="aspect-[16/9] w-full rounded-[1.5rem] object-cover border border-white/10 dark:border-white/5"
            priority
            sizes="(min-width: 1280px) 1200px, 100vw"
          />
        </motion.div>
      </section>

      <section className="mx-auto mt-20 max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between border-b border-border/40 pb-4">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            {tDetails("projectMeta")}
          </h2>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: CircleDollarSign,
              label: tProjects("caseStudy.estimatedBudget"),
              value: project.costDisplay ?? `$${project.cost.toLocaleString()}`,
            },
            {
              icon: CalendarClock,
              label: tDetails("timeline"),
              value: `${formatDate(project.createdAt, locale)} - ${formatDate(project.updatedAt, locale)}`,
            },
            {
              icon: Zap,
              label: tDetails("status"),
              value: project.isActive
                ? tDetails("statusActive")
                : tDetails("statusArchived"),
            },
            {
              icon: Layers2,
              label: tDetails("stack"),
              value:
                techList.slice(0, 3).join(" / ") || tDetails("customStack"),
            },
            {
              icon: Globe,
              label: tDetails("locale"),
              value: locale.toUpperCase(),
            },
            {
              icon: TrendingUp,
              label: tDetails("updated"),
              value: formatDate(project.updatedAt, locale),
            },
          ].map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              key={item.label}
              className="group flex items-center gap-4 rounded-2xl border border-border/40 bg-muted/10 p-5 transition-all hover:bg-muted/30 hover:shadow-md"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <item.icon className="size-5" />
              </div>
              <div>
                <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  {item.label}
                </p>
                <p className="mt-1 font-medium text-foreground">{item.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-border/40 pb-4">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            {tDetails("gallery")}
          </h2>
          <Badge
            variant="secondary"
            className="rounded-full bg-muted text-muted-foreground"
          >
            {tDetails("assetsCount", { count: String(galleryImages.length) })}
          </Badge>
        </div>
        {galleryImages.length > 0 ? (
          <GalleryLightbox
            images={galleryImages}
            title={project.name}
            labels={{
              openGalleryImage: tDetails("openGalleryImage", {
                index: "{index}",
              }),
              previousImage: tDetails("previousImage"),
              nextImage: tDetails("nextImage"),
              closeGalleryLightbox: tDetails("closeGalleryLightbox"),
              previous: tA11y("previous"),
              next: tA11y("next"),
              close: tA11y("close"),
            }}
          />
        ) : (
          <div className="flex h-48 items-center justify-center rounded-2xl border border-dashed border-border/60 bg-muted/10">
            <p className="text-muted-foreground">
              {tDetails("noGalleryAssets")}
            </p>
          </div>
        )}
      </section>

      <section className="mx-auto mt-24 max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="border-b border-border/40 pb-4">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            {tDetails("projectDescription")}
          </h2>
        </div>
        <div className="mt-8 rounded-3xl border border-border/50 bg-background/40 p-6 sm:p-10 lg:p-12 shadow-sm backdrop-blur-md">
          <div
            className="prose prose-lg prose-zinc dark:prose-invert max-w-none text-muted-foreground prose-headings:text-foreground prose-a:text-primary prose-a:decoration-primary/30 hover:prose-a:decoration-primary"
            dangerouslySetInnerHTML={{
              __html:
                project.description ||
                `<p className="text-lg">${tDetails("descriptionFallback")}</p>`,
            }}
          />
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="border-b border-border/40 pb-4">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            {tDetails("techStack")}
          </h2>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {Object.entries(groupedTech).map(([groupName, items], index) => (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              key={groupName}
              className="flex flex-col rounded-3xl border border-border/40 bg-muted/10 p-6 sm:p-8"
            >
              <h3 className="text-lg font-semibold capitalize text-foreground">
                {groupName}
              </h3>
              <div className="mt-6 flex-1">
                {items.length > 0 ? (
                  <div className="flex flex-wrap gap-3">
                    {items.map((item) => {
                      const normalized = item.toLowerCase();
                      const iconName = TECH_ICON_MAP[normalized];
                      return (
                        <div
                          key={item}
                          className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-background px-4 py-2 text-sm font-medium text-foreground shadow-xs transition-colors hover:border-primary/40 hover:bg-primary/5"
                        >
                          {iconName ? (
                            <StackIcon
                              name={iconName}
                              className="size-4 shrink-0"
                            />
                          ) : (
                            <span
                              className="size-2 shrink-0 rounded-full bg-primary/70"
                              aria-hidden
                            />
                          )}
                          <span>{item}</span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {tDetails("noItemsInGroup")}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <Separator className="bg-border/40" />
        <div className="mt-12 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            {tDetails("nextProject")}
          </h2>
          <ArrowRight className="size-5 text-primary" />
        </div>
        {relatedProjects.length > 0 ? (
          <div className="mt-8 grid gap-6 md:grid-cols-3 items-stretch justify-center">
            {relatedProjects.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link
                  href={`/${locale}/projects/${item.slug}`}
                  className={cn(
                    "group block overflow-hidden rounded-3xl border border-border/40 bg-muted/5 p-3 transition-all duration-300 h-full",
                    "hover:-translate-y-1 hover:border-primary/30 hover:bg-muted/20 hover:shadow-lg hover:shadow-primary/5",
                  )}
                >
                  <div className="overflow-hidden rounded-2xl">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={720}
                      height={420}
                      className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="px-2 py-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {item.tech || tDetails("caseStudy")}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
                      {item.name}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="mt-8 flex h-32 items-center justify-center rounded-2xl border border-dashed border-border/60 bg-muted/10">
            <p className="text-muted-foreground">
              {tDetails("moreProjectsComing")}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
