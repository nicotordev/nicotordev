import AboutMeSection from "@/components/home/about-me/about-me-section";
import HeroSection from "@/components/home/hero-section/hero-section";
import LeadMagnetContactForm from "@/components/home/lead-magnet/lead-magnet";
import ProblemSolutionSection from "@/components/home/problem-solution/problem-solution-section";
import ProjectsCarousel from "@/components/home/projects/projects-carousel";
import ReviewList3DWrapper from "@/components/home/reviews/review-list-3d-wrapper";
import SocialProofSection from "@/components/home/social-proof/social-proof";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/config";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <SocialProofSection />
        <ProblemSolutionSection />
        <ProjectsCarousel />
        <ReviewList3DWrapper />
        <LeadMagnetContactForm />
        <AboutMeSection />
      </main>
      <Footer />
    </>
  );
}
