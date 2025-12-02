import type { ReactNode } from "react";

import { routing } from "@/i18n/routing";
import { fetchUserPreferences } from "@/lib/clerk/preferences";

export default async function NextIntlProvider({
  children,
}: {
  children: ReactNode;
}) {
  const preferences = await fetchUserPreferences();
  const locale = preferences.locale ?? routing.defaultLocale;

  // This placeholder exists for backwards compatibility with older provider wiring.
  // The real NextIntl provider is configured in `src/providers/providers-wrapper.tsx`.
  void locale;

  return <>{children}</>;
}
