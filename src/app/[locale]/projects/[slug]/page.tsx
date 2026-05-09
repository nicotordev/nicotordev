import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { ProjectDetailsView } from "@/components/projects/project-details/project-details-view";
import type { Locale } from "@/i18n/config";
import { routing } from "@/i18n/routing";
import { fetchProjectBySlug, fetchProjects } from "@/lib/directus";
import { getLocaleUrl } from "@/lib/seo/i18n";
import type { Messages } from "@/types/i18n";
import type { Metadata } from "next";
import { getMessages } from "next-intl/server";
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
      images: [{ url: project.image ?? "" }],
    },
    twitter: {
      title: project.name,
      description: metaDesc,
      images: [project.image ?? ""],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { locale, slug } = await params;
  const typedLocale = locale as Locale;

  const [messages, project, allProjects] = await Promise.all([
    getMessages({ locale: typedLocale }) as Promise<Messages>,
    fetchProjectBySlug(slug, typedLocale),
    fetchProjects(undefined, typedLocale),
  ]);

  if (!project) {
    notFound();
  }

  const relatedProjects = allProjects
    .filter((item) => item.slug !== project.slug)
    .slice(0, 3);

  return (
    <>
      <Header messages={messages} />
      <main className="relative">
        <ProjectDetailsView
          locale={typedLocale}
          project={project}
          relatedProjects={relatedProjects}
        />
      </main>
      <Footer messages={messages} />
    </>
  );
}
