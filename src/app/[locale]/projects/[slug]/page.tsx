import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ImageDialog } from "@/components/ui/image-dialog";
import type { Locale } from "@/i18n/config";
import { routing } from "@/i18n/routing";
import { fetchProjectBySlug } from "@/lib/directus";
import { getLocaleUrl } from "@/lib/seo/i18n";
import { cn } from "@/lib/utils";
import type { Messages } from "@/types/i18n";
import type { Metadata } from "next";
import { getMessages, getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export interface ProjectPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

function plainFromHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const typedLocale = locale as Locale;
  const messages = (await getMessages({ locale: typedLocale })) as Messages;
  const project = await fetchProjectBySlug(slug, typedLocale);

  const baseCanonical = getLocaleUrl(messages.seo.site.url, typedLocale);
  const canonical = `${baseCanonical}/projects/${slug}`;

  if (!project) {
    return {
      title: { absolute: "Project" },
      description: messages.seo.description,
      alternates: {
        canonical,
        languages: {
          "x-default": `${getLocaleUrl(messages.seo.site.url, routing.defaultLocale)}/projects/${slug}`,
        },
      },
    };
  }

  const descPlain = plainFromHtml(project.description);
  const metaDesc =
    descPlain.length > 0 ? descPlain.slice(0, 160) : messages.seo.description;

  return {
    title: { absolute: project.name },
    description: metaDesc,
    alternates: {
      canonical,
      languages: {
        "x-default": `${getLocaleUrl(messages.seo.site.url, routing.defaultLocale)}/projects/${slug}`,
      },
    },
    openGraph: {
      url: canonical,
      title: project.name,
      description: metaDesc,
      images: [{ url: project.image }],
    },
    twitter: {
      title: project.name,
      description: metaDesc,
      images: [project.image],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { locale, slug } = await params;
  const typedLocale = locale as Locale;

  const [messages, project, tProjects] = await Promise.all([
    getMessages({ locale: typedLocale }) as Promise<Messages>,
    fetchProjectBySlug(slug, typedLocale),
    getTranslations({ locale: typedLocale, namespace: "projects" }),
  ]);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Header messages={messages} />
      <main className="relative pb-24">
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

        <section className="mx-auto max-w-5xl px-4 py-16 sm:py-20">
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <Badge variant="outline">Project</Badge>
            <span className="text-sm text-muted-foreground">
              {project.tech}
            </span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {project.name}
          </h1>

          <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
            {project.description}
          </p>

          {project.costDisplay ? (
            <div className="mt-4 rounded-lg border border-border/80 bg-muted/40 px-4 py-3">
              <p className="text-sm font-medium text-foreground">
                {messages.projects.caseStudy.estimatedBudget}
              </p>
              <p className="mt-1 text-muted-foreground">{project.costDisplay}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                {messages.projects.caseStudy.budgetDisclaimer}
              </p>
            </div>
          ) : null}

          <div className="relative mt-10 aspect-16/10 overflow-hidden rounded-xl border bg-muted">
            <Image
              src={project.image}
              alt={project.name}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 960px, 100vw"
              priority
            />
          </div>

          {project.gallery.length > 0 ? (
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {project.gallery.map((item) => (
                <div
                  key={item.id}
                  className="relative aspect-video overflow-hidden rounded-lg border bg-muted"
                >
                  {item.type === "VIDEO" ? (
                    <video
                      src={item.url}
                      className="h-full w-full object-cover"
                      controls
                      playsInline
                      preload="metadata"
                    />
                  ) : (
                    <ImageDialog
                      src={item.url}
                      alt={item.alt ?? item.name}
                      width={1920}
                      height={1080}
                    >
                      <Image
                        src={item.url}
                        alt={item.alt ?? item.name}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 480px, 100vw"
                      />
                    </ImageDialog>
                  )}
                </div>
              ))}
            </div>
          ) : null}

          <Card className="mt-10 border-border/70 bg-card/80 backdrop-blur-sm">
            <CardContent className="p-6 sm:p-10">
              {project.description ? (
                <article
                  className="blog-content text-foreground [&_a]:text-primary [&_a]:underline [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6"
                  dangerouslySetInnerHTML={{ __html: project.description }}
                />
              ) : (
                <div className="space-y-4 text-muted-foreground">
                  {project.impact ? <p>{project.impact}</p> : null}
                  <p>{project.tech}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="mt-10 flex flex-wrap gap-3">
            {project.link ? (
              <Button asChild>
                <Link href={project.link} target="_blank" rel="noreferrer">
                  {tProjects("carousel.viewProject")}
                </Link>
              </Button>
            ) : null}
            <Button asChild variant="outline">
              <Link href={`/${typedLocale}/projects`}>Back to projects</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer messages={messages} />
    </>
  );
}
