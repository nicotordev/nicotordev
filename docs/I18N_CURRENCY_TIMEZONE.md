# i18n Currency & Timezone Integration (Clerk-first)

## Overview

All preference data lives in Clerk `publicMetadata.preferences` on the authenticated user:
- `locale`
- `currency`
- `timezone`

Server actions validate input with Zod and persist directly to Clerk. No cookies, local storage, or app-owned tables are used for these preferences.

## Data Flow

```
User interaction → Switcher component → Server action → Clerk user metadata → revalidatePath → Zustand state refresh
```

## Key Files

- `src/app/actions/locale.actions.ts` – updates `preferences.locale` in Clerk
- `src/app/actions/currency.actions.ts` – updates `preferences.currency` in Clerk
- `src/app/actions/timezone.actions.ts` – updates `preferences.timezone` in Clerk
- `src/lib/clerk/preferences.ts` – helpers to read/write Clerk metadata safely
- `src/providers/providers-wrapper.tsx` – seeds app providers from Clerk preferences
- Switchers:
  - `src/components/language-switcher.tsx`
  - `src/components/currency-switcher.tsx`
  - `src/components/timezone-switcher.tsx`

## Usage Examples

### Server Component

```tsx
import { fetchUserPreferences } from "@/lib/clerk/preferences";
import { getFormattedPrice, getFormattedDateTime } from "@/lib/i18n-helpers";

export default async function ProjectCard({ cost, createdAt }: { cost: number; createdAt: Date }) {
  const { locale = "en", currency = "USD", timezone = "UTC" } = await fetchUserPreferences();

  const price = getFormattedPrice(cost, locale, currency);
  const created = getFormattedDateTime(createdAt, locale, timezone);

  return (
    <div>
      <p>Cost: {price}</p>
      <p>Created: {created}</p>
    </div>
  );
}
```

### Client Component

```tsx
"use client";

import { useLocale } from "next-intl";
import { useCurrencyStore } from "@/stores/currency-store";
import { useTimezoneStore } from "@/stores/timezone-store";
import { getFormattedPrice, getFormattedTime } from "@/lib/i18n-helpers";

export default function PricingCard({ amount }: { amount: number }) {
  const locale = useLocale();
  const { currency } = useCurrencyStore();
  const { timezone } = useTimezoneStore();

  const price = getFormattedPrice(amount, locale, currency);
  const now = getFormattedTime(new Date(), locale, timezone);

  return (
    <div>
      <p>Price: {price}</p>
      <p>Current time: {now}</p>
    </div>
  );
}
```

## Validation & Revalidation

- Zod schemas ensure only supported values are accepted.
- Each server action returns `{ success: boolean; error?: string }`.
- `revalidatePath("/", "layout")` is called after a successful update to refresh cached data.

## Testing Checklist

1. Switching locale/currency/timezone updates Clerk metadata.
2. Reloading the app seeds Zustand state from Clerk preferences.
3. Switchers disable while pending (via `useTransition`).
4. Invalid inputs are rejected by Zod (no metadata writes).
5. Type-check passes with `strict: true` (no `any`).
