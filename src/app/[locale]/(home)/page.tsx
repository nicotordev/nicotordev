import AboutMeSection from "@/components/home/about-me/about-me-section";
import HeroSection from "@/components/home/hero-section/hero-section";
import BlogSection from "@/components/home/blog/blog-section";
import LeadMagnetContactForm from "@/components/home/lead-magnet/lead-magnet";
import ProblemSolutionSection from "@/components/home/problem-solution/problem-solution-section";
import ProjectsCarousel from "@/components/home/projects/projects-carousel";
import ReviewList3DWrapper from "@/components/home/reviews/review-list-3d-wrapper";
import SocialProofSection from "@/components/home/social-proof/social-proof";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { reviews as fallbackReviews } from "@/app/data/reviews";
import type { Locale } from "@/i18n/config";
import { routing } from "@/i18n/routing";
import { getSeoMessages } from "@/lib/seo/get-seo";
import { getLocaleUrl } from "@/lib/seo/i18n";
import type { Messages } from "@/types/i18n";
import type { Metadata } from "next";
import { getMessages } from "next-intl/server";
import { fetchReviewsOptional, type ReviewFromCMS } from "@/lib/directus";

export interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const seo = await getSeoMessages(typedLocale);

  const canonical = getLocaleUrl(seo.site.url, typedLocale);

  return {
    title: { absolute: seo.title.default },
    description: seo.description,
    alternates: {
      canonical,
      languages: {
        "x-default": getLocaleUrl(seo.site.url, routing.defaultLocale),
      },
    },
    openGraph: {
      url: canonical,
      title: seo.openGraph.title,
      description: seo.openGraph.description,
    },
    twitter: {
      title: seo.twitter.title,
      description: seo.twitter.description,
    },
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const [messages, cmsReviews] = await Promise.all([
    getMessages({ locale: locale as Locale }) as Promise<Messages>,
    fetchReviewsOptional(),
  ]);

  const reviewsList: ReviewFromCMS[] =
    cmsReviews && cmsReviews.length > 0
      ? cmsReviews
      : (fallbackReviews as ReviewFromCMS[]);

  return (
    <>
      <Header messages={messages} />
      <main>
        <HeroSection messages={messages} />
        <SocialProofSection messages={messages} />
        <ProblemSolutionSection messages={messages} />
        <ProjectsCarousel messages={messages} />
        <ReviewList3DWrapper reviews={reviewsList} />
        <LeadMagnetContactForm messages={messages} />
        <AboutMeSection messages={messages} />
        <BlogSection messages={messages} />
      </main>
      <Footer messages={messages} />
    </>
  );
}
