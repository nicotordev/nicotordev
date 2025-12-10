import AboutMeSection from "@/components/home/about-me/about-me-section";
import HeroSection from "@/components/home/hero-section/hero-section";
import LeadMagnetContactForm from "@/components/home/lead-magnet/lead-magnet";
import ProblemSolutionSection from "@/components/home/problem-solution/problem-solution-section";
import ProjectsCarousel from "@/components/home/projects/projects-carousel";
import ReviewList3DWrapper from "@/components/home/reviews/review-list-3d-wrapper";
import SocialProofSection from "@/components/home/social-proof/social-proof";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/types/i18n";
import type { Metadata } from "next";
import { getMessages, setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Home",
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const messages: Messages = (await getMessages()) as Messages;

  return (
    <>
      <Header messages={messages} />
      <main>
        <section>
          <HeroSection messages={messages} />
        </section>
        <section>
          <SocialProofSection messages={messages} />
        </section>
        <section>
          <ProblemSolutionSection messages={messages} />
        </section>
        <section>
          <ProjectsCarousel messages={messages} />
        </section>
        <section>
          <ReviewList3DWrapper messages={messages} />
        </section>
        <section>
          <LeadMagnetContactForm messages={messages} />
        </section>
        <section>
          <AboutMeSection messages={messages} />
        </section>
      </main>
      <Footer messages={messages} />
    </>
  );
}
