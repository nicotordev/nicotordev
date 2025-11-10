import HeroSection, {
  type HeroSectionProps,
} from "@/components/home/hero-section";
import { getMessages } from "next-intl/server";

export default async function HomePage() {
  const messages = await getMessages();
  const translations = {
    navigation: messages.navigation,
    common: messages.common,
    hero: messages.hero,
  } as HeroSectionProps["translations"];

  return <HeroSection translations={translations} />;
}
