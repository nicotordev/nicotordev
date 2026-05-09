import { staticProjects } from "@/app/data/projects";
import { reviews as fallbackReviews } from "@/app/data/reviews";
import AboutMeSection from "@/components/home/about-me/about-me-section";
import BlogSection from "@/components/home/blog/blog-section";
import HeroSection from "@/components/home/hero-section/hero-section";
import LeadMagnetContactForm from "@/components/home/lead-magnet/lead-magnet";
import ProblemSolutionSection from "@/components/home/problem-solution/problem-solution-section";
import ProjectsCarousel from "@/components/home/projects/projects-carousel";
import ReviewList3DWrapper from "@/components/home/reviews/review-list-3d-wrapper";
import SocialProofSection from "@/components/home/social-proof/social-proof";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import type { Locale } from "@/i18n/config";
import { routing } from "@/i18n/routing";
import {
  fetchProjectsOptional,
  fetchReviewsOptional,
  type ProjectFromCMS,
  type ReviewFromCMS,
} from "@/lib/directus";
import { getLocaleUrl } from "@/lib/seo/i18n";
import type { Messages } from "@/types/i18n";
import type { Metadata } from "next";
import { getMessages, getTranslations } from "next-intl/server";

export interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const translation = await getTranslations({ locale: typedLocale });

  const canonical = getLocaleUrl(translation("seo.site.url"), typedLocale);

  return {
    title: { absolute: translation("seo.title.default") },
    description: translation("seo.description"),
    alternates: {
      canonical,
      languages: {
        "x-default": getLocaleUrl(
          translation("seo.site.url"),
          routing.defaultLocale,
        ),
      },
    },
    openGraph: {
      url: canonical,
      title: translation("seo.openGraph.title"),
      description: translation("seo.openGraph.description"),
    },
    twitter: {
      title: translation("seo.twitter.title"),
      description: translation("seo.twitter.description"),
    },
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const [messages, cmsReviews, cmsProjects] = await Promise.all([
    getMessages({ locale: locale as Locale }) as Promise<Messages>,
    fetchReviewsOptional(),
    fetchProjectsOptional(locale as Locale),
  ]);

  const reviewsList: ReviewFromCMS[] =
    cmsReviews && cmsReviews.length > 0
      ? cmsReviews
      : (fallbackReviews as ReviewFromCMS[]);
  const projectsList: ProjectFromCMS[] =
    cmsProjects && cmsProjects.length > 0
      ? cmsProjects
      : (staticProjects as ProjectFromCMS[]);

  return (
    <>
      <Header messages={messages} />
      <main>
        <HeroSection messages={messages} />
        <SocialProofSection messages={messages} />
        <ProblemSolutionSection messages={messages} />
        <ProjectsCarousel
          messages={messages}
          projects={projectsList}
          locale={locale as Locale}
        />
        <ReviewList3DWrapper reviews={reviewsList} />
        <LeadMagnetContactForm messages={messages} />
        <BlogSection messages={messages} />
        <AboutMeSection messages={messages} />
      </main>
      <Footer messages={messages} />
    </>
  );
}
