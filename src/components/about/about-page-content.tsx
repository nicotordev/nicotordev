import { BackgroundDecoration } from "@/components/backgrounds/background-decoration";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Typography } from "@/components/ui/typography";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { formatAboutStatValue, getAboutStats } from "@/lib/about-stats";
import type { ProjectFromCMS } from "@/lib/directus";
import type { Messages } from "@/types/i18n";
import {
  CircleCheck,
  GraduationCap,
  Hand,
  Rocket,
  Sparkles,
  Briefcase,
  Eye,
  Hammer,
  Binary,
  Folder,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";

const VALUE_ICONS: LucideIcon[] = [Briefcase, Eye, Hammer, Binary, Sparkles];

export interface AboutPageContentProps {
  messages: Messages;
  projects: ProjectFromCMS[];
}

function GradientBlob({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-x-0 flex transform-gpu justify-center overflow-hidden blur-3xl",
        className,
      )}
    >
      <div
        style={{
          clipPath:
            "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
        }}
        className="aspect-1108/632 w-277 flex-none bg-linear-to-r from-accent/40 to-primary/40 opacity-60"
      />
    </div>
  );
}

export default function AboutPageContent({
  messages,
  projects,
}: AboutPageContentProps) {
  const page = messages.about.page;
  const story = page.story;
  const stats = getAboutStats(messages);

  return (
    <div className="relative bg-background text-foreground overflow-x-hidden">
      {/* Background patterns & grid */}
      <BackgroundDecoration className="opacity-40" />
      <div
        className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"
        style={{ contentVisibility: "auto" }}
      />

      <div className="relative isolate">
        <GradientBlob className="top-4 -z-10" />

        {/* Hero Section */}
        <section className="px-6 pt-10 lg:px-8">
          <div className="mx-auto max-w-4xl pt-16 text-center sm:pt-28">
            <Badge
              variant="secondary"
              className="mb-6 gap-1.5 py-1 px-3 border border-primary/20 bg-primary/5 text-primary backdrop-blur-xs font-mono tracking-wider uppercase text-xs"
            >
              <span className="flex size-2 rounded-full bg-emerald-500 animate-pulse" />
              {page.eyebrow}
            </Badge>
            <Typography
              as="h1"
              role="display"
              mood="product"
              className="text-foreground text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight"
            >
              {page.heroTitle}
            </Typography>
            <Typography
              as="p"
              role="body"
              className="mx-auto mt-8 max-w-3xl text-base text-pretty text-muted-foreground sm:text-lg md:text-xl/8 font-normal"
            >
              {page.heroSubtitle}
            </Typography>
          </div>
        </section>

        {/* Story & Stats Bento Grid */}
        <section className="mx-auto mt-24 max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Story Bento Card */}
            <div className="lg:col-span-2 rounded-3xl border border-border/40 bg-card/25 p-8 md:p-10 backdrop-blur-md hover:border-primary/20 transition-all duration-300 relative overflow-hidden group hover:bg-card/45">
              <div className="absolute top-0 right-0 size-32 bg-linear-to-bl from-primary/5 to-transparent rounded-bl-full pointer-events-none" />
              <div className="space-y-6 text-muted-foreground text-sm sm:text-base/8">
                <Typography
                  as="p"
                  role="body"
                  className="first-letter:text-4xl first-letter:font-bold first-letter:text-primary first-letter:mr-2 first-letter:float-left"
                >
                  {story.paragraph1}
                </Typography>
                <Typography as="p" role="body">
                  {story.paragraph2}
                </Typography>
                <Typography as="p" role="body">
                  {story.paragraph3}
                </Typography>
                <Typography as="p" role="body">
                  {story.paragraph4}
                </Typography>
              </div>
            </div>

            {/* Stats Bento Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 lg:col-span-1">
              {stats.map((stat, i) => {
                const StatIcon =
                  [Sparkles, GraduationCap, Hand, Rocket][i] ?? Sparkles;
                return (
                  <div
                    key={stat.label}
                    className="group relative overflow-hidden rounded-2xl border border-border/40 bg-card/25 p-5 backdrop-blur-md hover-lift transition-all hover:bg-card/50 hover:border-primary/20 flex items-center gap-4"
                  >
                    <div className="absolute -right-6 -bottom-6 size-20 bg-linear-to-br from-primary/10 to-secondary/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500" />
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 relative z-10">
                      <StatIcon className="size-6" />
                    </div>
                    <div className="relative z-10">
                      <Typography
                        as="dd"
                        role="headline"
                        className="font-display text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors"
                      >
                        {formatAboutStatValue(stat)}
                      </Typography>
                      <Typography
                        as="dt"
                        role="label"
                        className="mt-0.5 text-xs text-muted-foreground font-medium"
                      >
                        {stat.label}
                      </Typography>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Workspace Photo Section */}
        <section className="mt-32 sm:mt-40 xl:mx-auto xl:max-w-7xl xl:px-8">
          <div className="relative group overflow-hidden rounded-3xl border border-border/50 bg-card/30 p-2 shadow-2xl transition-all hover:border-primary/30">
            <div className="relative aspect-16/7 w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/nicolas/nico-pc.webp"
                alt={page.heroImageAlt}
                fill
                className="object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                sizes="(max-width: 1280px) 100vw, 1280px"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
            </div>
          </div>
        </section>

        {/* Engineering Values Section */}
        <section className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
          <div className="mx-auto max-w-3xl lg:text-center">
            <Typography
              as="h2"
              role="headline"
              mood="product"
              className="text-foreground text-3xl font-extrabold tracking-tight sm:text-4xl"
            >
              {page.values.title}
            </Typography>
            <Typography
              as="p"
              role="body"
              className="mt-4 text-base sm:text-lg text-muted-foreground"
            >
              {page.values.subtitle}
            </Typography>
          </div>

          <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {page.values.items.map((value, index) => {
              const Icon = VALUE_ICONS[index] ?? Rocket;

              return (
                <div
                  key={value.name}
                  className="group relative overflow-hidden rounded-3xl border border-border/40 bg-card/20 p-8 backdrop-blur-md hover-lift transition-all hover:bg-card/40 hover:border-primary/25"
                >
                  <div className="absolute -right-6 -bottom-6 size-28 bg-linear-to-br from-secondary/10 to-primary/5 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500" />

                  <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <Icon className="size-6" />
                  </div>

                  <Typography
                    as="dt"
                    role="title"
                    className="mt-6 text-lg font-bold text-foreground tracking-tight group-hover:text-primary transition-colors"
                  >
                    {value.name}
                  </Typography>

                  <Typography
                    as="dd"
                    role="body"
                    className="mt-3 text-sm/relaxed text-muted-foreground"
                  >
                    {value.description}
                  </Typography>
                </div>
              );
            })}
          </dl>
        </section>

        {/* Selected Project Experience Section */}
        <section className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
          <div className="mx-auto max-w-3xl lg:text-center">
            <Typography
              as="h2"
              role="headline"
              mood="product"
              className="text-foreground text-3xl font-extrabold tracking-tight sm:text-4xl"
            >
              {page.experience.title}
            </Typography>
            <Typography
              as="p"
              role="body"
              className="mt-4 text-base sm:text-lg text-muted-foreground"
            >
              {page.experience.subtitle}
            </Typography>
          </div>

          <ul className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            {projects.map((project) => (
              <li key={project.id} className="h-full">
                <Card className="relative overflow-hidden h-full border border-border/40 bg-card/30 shadow-sm backdrop-blur-md transition-all hover:bg-card/50 hover:border-primary/20 hover-lift group">
                  <div className="absolute top-0 inset-x-0 h-1 bg-linear-to-r from-primary/30 to-secondary/30 group-hover:from-primary group-hover:to-secondary transition-all duration-500" />
                  <div className="relative aspect-16/10 w-full overflow-hidden border-b border-border/30">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover group-hover:scale-103 transition-transform duration-500"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  <CardHeader className="pt-8">
                    <div className="flex items-center justify-between gap-3">
                      <Badge
                        variant="outline"
                        className="line-clamp-1 max-w-[85%] border-primary/20 bg-primary/5 text-primary text-xs uppercase tracking-wider font-mono px-2 py-0.5"
                      >
                        {project.tech}
                      </Badge>
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-border/20 text-muted-foreground group-hover:text-primary transition-colors">
                        <Folder className="size-4" />
                      </div>
                    </div>
                    <CardTitle className="mt-4 text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                      {project.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Typography
                      role="body"
                      className="line-clamp-4 text-sm/relaxed text-muted-foreground"
                    >
                      {project.description}
                    </Typography>

                    {project.costDisplay ? (
                      <p className="text-xs text-muted-foreground border-t border-border/30 pt-4">
                        <span className="font-medium text-foreground">
                          {messages.projects.caseStudy.estimatedBudget}:
                        </span>{" "}
                        {project.costDisplay}
                      </p>
                    ) : null}

                    <Button
                      asChild
                      variant="link"
                      className="h-auto p-0 text-sm font-semibold"
                    >
                      <Link href={`/projects/${project.slug}`}>
                        {messages.projects.carousel.viewProject}
                        <span aria-hidden="true">&rarr;</span>
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        </section>

        {/* CTA Card Section */}
        <section className="relative isolate mt-32 sm:mt-40">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <Card className="relative overflow-hidden mx-auto flex max-w-2xl flex-col gap-12 border border-border/50 bg-card/65 px-8 py-12 shadow-2xl backdrop-blur-xl sm:rounded-3xl sm:p-12 lg:mx-0 lg:max-w-none lg:flex-row lg:items-center xl:gap-x-16 xl:px-16 hover:border-primary/25 transition-all duration-300">
              <div className="absolute -left-20 -bottom-20 size-80 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse" />
              <div className="absolute -right-20 -top-20 size-80 bg-secondary/10 rounded-full blur-3xl -z-10 animate-pulse" />

              <div className="relative h-80 w-full shrink-0 overflow-hidden rounded-2xl border border-border/40 shadow-lg group lg:w-96 lg:h-96">
                <Image
                  src="/images/nicolas/nico-flowers.webp"
                  alt={page.cta.imageAlt}
                  fill
                  className="object-cover group-hover:scale-103 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 384px"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <CardContent className="w-full flex-auto px-0">
                <CardHeader className="px-0 pt-0">
                  <Typography
                    as="h3"
                    role="title"
                    className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground"
                  >
                    {page.cta.title}
                  </Typography>
                  <Typography
                    role="body"
                    className="mt-4 text-base/relaxed text-muted-foreground text-pretty"
                  >
                    {page.cta.description}
                  </Typography>
                </CardHeader>

                <ul className="mt-8 grid grid-cols-1 gap-x-6 gap-y-3.5 text-sm sm:grid-cols-2">
                  {page.cta.benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex gap-x-3 items-center text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <CircleCheck className="size-4" />
                      </div>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                <Separator className="my-8 opacity-50" />

                <Button
                  asChild
                  size="lg"
                  className="rounded-xl group shadow-sm bg-primary text-primary-foreground hover:bg-primary/95 transition-all"
                >
                  <Link href={page.cta.linkHref}>
                    {page.cta.linkLabel}
                    <span
                      aria-hidden="true"
                      className="group-hover:translate-x-1 transition-transform ml-1"
                    >
                      &rarr;
                    </span>
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <GradientBlob className="-top-16 -z-10 opacity-80" />
        </section>
      </div>
    </div>
  );
}
