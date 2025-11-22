import AboutMeSection from "@/components/home/about-me/about-me-section";
import HeroSection from "@/components/home/hero-section/hero-section";
import SocialProofSection from "@/components/home/social-proof/social-proof";
import { getMessages } from "next-intl/server";
import ProblemSolutionSection from "@/components/home/problem-solution/problem-solution-section";
import ProjectsCarousel from "@/components/home/projects/projects-carousel";
import ReviewList3DWrapper from "@/components/home/reviews/review-list-3d-wrapper";
import LeadMagnetContactForm from "@/components/home/lead-magnet/lead-magnet";

export default async function HomePage() {
  const messages = await getMessages();
  const translations = {
    navigation: messages.navigation,
    common: messages.common,
    hero: messages.hero,
    about: messages.about,
    projects: messages.projects,
  };

  return (
    <main>
      <HeroSection translations={translations} />
      <SocialProofSection />
      <ProblemSolutionSection />
      <ProjectsCarousel />
      <ReviewList3DWrapper />
      <LeadMagnetContactForm />
      <AboutMeSection translations={translations.about} />
    </main>
  );
}
