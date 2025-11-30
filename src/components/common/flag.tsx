import UnitedStatesFlag from "@/components/emojis/united-states-flag";

import UnitedKingdomFlag from "@/components/emojis/united-kingdom-flag";
import SpainFlag from "@/components/emojis/spain-flag";
import MexicoFlag from "@/components/emojis/mexico-flag";
import ChileFlag from "@/components/emojis/chile-flag";
import GermanyFlag from "@/components/emojis/germany-flag";
import type { Locale } from "next-intl";
import { localeNames } from "@/i18n/config";

function Flag({ locale, size = 16 }: { locale: Locale; size?: number }) {
  const alt = `${localeNames[locale]} flag`;
  switch (locale) {
    case "en":
      return <UnitedStatesFlag width={size} alt={alt} />;
    case "en-gb":
      return <UnitedKingdomFlag width={size} alt={alt} />;
    case "es":
      return <MexicoFlag width={size} alt={alt} />;
    case "es-es":
      return <SpainFlag width={size} alt={alt} />;
    case "es-cl":
      return <ChileFlag width={size} alt={alt} />;
    case "de":
      return <GermanyFlag width={size} alt={alt} />;
    default:
      return null;
  }
}

export default Flag;
