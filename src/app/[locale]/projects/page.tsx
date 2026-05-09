import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Locale } from "@/i18n/config";
import { routing } from "@/i18n/routing";
import { fetchProjectsOptional, type ProjectFromCMS } from "@/lib/directus";
import { getLocaleUrl } from "@/lib/seo/i18n";
import { cn } from "@/lib/utils";
import type { Messages } from "@/types/i18n";
import type { Metadata } from "next";
import { getMessages } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

export interface ProjectsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ProjectsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const messages = (await getMessages({ locale: typedLocale })) as Messages;

  const canonical = `${getLocaleUrl(messages.seo.site.url, typedLocale)}/projects`;

  return {
    title: { absolute: "Projects" },
    description:
      "A selection of software projects focused on product quality, scalability and real-world impact.",
    alternates: {
      canonical,
      languages: {
        "x-default": `${getLocaleUrl(messages.seo.site.url, routing.defaultLocale)}/projects`,
      },
    },
    openGraph: {
      url: canonical,
      title: "Projects",
      description:
        "A selection of software projects focused on product quality, scalability and real-world impact.",
    },
    twitter: {
      title: "Projects",
      description:
        "A selection of software projects focused on product quality, scalability and real-world impact.",
    },
  };
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const [messages, cmsProjects] = await Promise.all([
    getMessages({ locale: typedLocale }) as Promise<Messages>,
    fetchProjectsOptional(typedLocale),
  ]);

  const projects: ProjectFromCMS[] = cmsProjects ?? [];

  return (
    <>
      <Header messages={messages} />
      <main className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-8 -z-10 transform-gpu overflow-x-clip blur-3xl sm:top-24"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className={cn(
              "relative left-1/2 -translate-x-1/2",
              "aspect-1155/678 w-96 rotate-30",
              "bg-linear-to-tr from-primary to-secondary opacity-20",
              "sm:w-160",
            )}
          />
        </div>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
          <Badge variant="outline" className="mb-4">
            Projects
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Project case studies
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
            A curated selection of products built end-to-end: architecture,
            implementation and measurable impact.
          </p>
          <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
            {messages.projects.caseStudy.budgetDisclaimer}
          </p>

          {projects.length > 0 ? (
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((project) => (
                <Card
                  key={project.id}
                  className="flex h-full flex-col overflow-hidden border-border/70 bg-card/80 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-accent hover:shadow-lg"
                >
                  <div className="relative aspect-16/10 w-full shrink-0 bg-muted">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-2 text-xl">
                      {project.name}
                    </CardTitle>
                    {project.costDisplay ? (
                      <p className="mt-2 text-sm font-medium text-foreground">
                        {messages.projects.caseStudy.estimatedBudget}:{" "}
                        <span className="text-muted-foreground font-normal">
                          {project.costDisplay}
                        </span>
                      </p>
                    ) : null}
                    <CardDescription className="line-clamp-3 mt-2">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto">
                    <Button asChild variant="outline" className="w-full">
                      <Link href={`/${typedLocale}/projects/${project.slug}`}>
                        View project
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="mt-10 border-dashed border-border bg-muted/30 py-16 text-center">
              <CardContent className="p-0 text-muted-foreground">
                Projects will be published soon.
              </CardContent>
            </Card>
          )}
        </section>
      </main>
      <Footer messages={messages} />
    </>
  );
}
