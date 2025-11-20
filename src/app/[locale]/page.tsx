import AboutMeSection from "@/components/home/about-me-section";
import HeroSection from "@/components/home/hero-section";
import ProjectsSection from "@/components/home/projects-section";
import SocialProofSection from "@/components/home/social-proof";
import { getMessages } from "next-intl/server";
import ProblemSolutionSection from "@/components/home/problem-solution/problem-solution-section";
import RegulexCaseStudy from "@/components/home/regulex-case-study";

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
      <RegulexCaseStudy />
      <ProjectsSection translations={translations.projects} />
      <AboutMeSection translations={translations.about} />
    </main>
  );
}
