# i18n Currency & Timezone Integration

## Overview

Complete implementation of locale, currency, and timezone preferences with:
- ✅ Prisma Session model with `currency` and `timezone` fields
- ✅ Server actions with Zod validation
- ✅ React contexts and providers
- ✅ User-facing switcher components
- ✅ Header integration (desktop + mobile)
- ✅ SSR-friendly with cookie persistence and DB sync
- ✅ Optimistic UI updates with `useTransition`

## Architecture

### Data Flow

```
User Interaction → Switcher Component → Server Action → Cookie + DB → revalidatePath → Re-render
                         ↓
                  Context setState (optimistic UI)
```

### Files

**Schema & DB:**
- `prisma/schema.prisma` - Session model with `currency: Currency` and `timezone: String`

**i18n Config:**
- `i18n/config.ts` - Locale definitions and utilities
- `i18n/currency.ts` - Currency types, defaults, formatting, labels
- `i18n/timezone.ts` - Timezone types, defaults, formatting, labels

**Server Actions:**
- `src/app/actions/locale.actions.ts` - setLocaleCookie (with Zod validation)
- `src/app/actions/currency.actions.ts` - setCurrencyCookie (with Zod validation)
- `src/app/actions/timezone.actions.ts` - setTimezoneCookie (with Zod validation)

**Contexts:**
- `src/context/CurrencyContext.tsx` - Client-side currency state
- `src/context/TimezoneContext.tsx` - Client-side timezone state

**Components:**
- `src/components/language-switcher.tsx` - Locale switcher (dropdown)
- `src/components/currency-switcher.tsx` - Currency switcher (select)
- `src/components/timezone-switcher.tsx` - Timezone switcher (select)
- `src/components/common/header.tsx` - Wired with all three switchers

**Providers:**
- `src/app/providers.tsx` - Wraps CurrencyProvider and TimezoneProvider
- `src/app/layout.tsx` - Reads cookies, passes initial values to providers

**Utilities:**
- `src/lib/i18n-helpers.ts` - Convenience functions with usage examples

## Usage Examples

### Server Component

```tsx
import { cookies } from "next/headers";
import { formatCurrency } from "@/i18n/currency";
import { formatInTimeZone } from "@/i18n/timezone";
import type { Locale } from "@/i18n/config";
import type { Currency } from "@/i18n/currency";
import type { Timezone } from "@/i18n/timezone";

export default async function ProjectCard({ cost, createdAt }: { cost: number; createdAt: Date }) {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value || "en") as Locale;
  const currency = (cookieStore.get("NEXT_CURRENCY")?.value || "USD") as Currency;
  const timezone = (cookieStore.get("NEXT_TIMEZONE")?.value || "UTC") as Timezone;

  const formattedCost = formatCurrency(cost, { locale, currency });
  const formattedDate = formatInTimeZone(createdAt, timezone, locale, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div>
      <p>Cost: {formattedCost}</p>
      <p>Created: {formattedDate}</p>
    </div>
  );
}
```

### Client Component

```tsx
"use client";

import { useLocale } from "next-intl";
import { useCurrency } from "@/context/CurrencyContext";
import { useTimezone } from "@/context/TimezoneContext";
import { formatCurrency } from "@/i18n/currency";
import { formatInTimeZone } from "@/i18n/timezone";
import type { Locale } from "@/i18n/config";

export default function PricingCard({ amount }: { amount: number }) {
  const locale = useLocale() as Locale;
  const { currency } = useCurrency();
  const { timezone } = useTimezone();

  const price = formatCurrency(amount, { locale, currency });
  const now = formatInTimeZone(new Date(), timezone, locale, { timeStyle: "short" });

  return (
    <div>
      <p>Price: {price}</p>
      <p>Current time: {now}</p>
    </div>
  );
}
```

### With Helper Utilities

```tsx
import { getFormattedPrice, getFormattedDateTime } from "@/lib/i18n-helpers";

// Server or client component
const price = getFormattedPrice(1500, locale, currency);
const date = getFormattedDateTime(new Date(), locale, timezone);
```

## Switcher Components

All switchers use `useTransition` for pending states and optimistic UI updates:

- **LanguageSwitcher** - Dropdown with flag icons, supports desktop/mobile sizes
- **CurrencySwitcher** - Select with currency symbols (e.g., $, €, £)
- **TimezoneSwitcher** - Select with human-readable labels

## Validation

All server actions use Zod schemas:

```ts
const currencySchema = z.string().refine(isCurrency, "Invalid currency");
const timezoneSchema = z.string().refine(isTimezone, "Invalid timezone");
const localeSchema = z.string().refine(isLocale, "Invalid locale");
```

Actions return `{ success: true }` or `{ success: false, error: string }`.

## Caching & Revalidation

Each action calls:
```ts
revalidatePath("/", "layout");
```

This ensures the entire app re-renders with new preferences. For more granular control, use cache tags in your data fetchers:

```ts
// In your data-fetching function
export async function getProjects() {
  const data = await fetch("...", {
    next: { tags: ["projects", "currency-dependent"] },
  });
  return data;
}
```

Then revalidate with:
```ts
revalidateTag("currency-dependent");
```

## Defaults by Locale

**Currency:**
- en → USD
- en-gb → GBP
- es, es-es, de → EUR
- es-cl → CLP

**Timezone:**
- en → America/New_York
- en-gb → Europe/London
- es, es-es → Europe/Madrid
- es-cl → America/Santiago
- de → Europe/Berlin

## Testing Checklist

1. ✅ Switch locale → cookie updated, DB session updated, page revalidated
2. ✅ Switch currency → cookie updated, DB session updated, formatted prices change
3. ✅ Switch timezone → cookie updated, DB session updated, formatted times change
4. ✅ Switchers disabled while pending (useTransition)
5. ✅ Optimistic UI (context updates immediately)
6. ✅ Mobile menu includes all three switchers
7. ✅ Desktop header includes all three switchers
8. ✅ Type-check passes (no TS errors)
9. ✅ Invalid inputs rejected by Zod schemas

## Migration Commands

If schema was modified:

```bash
bunx prisma migrate dev --name add_currency_timezone_to_session
bunx prisma generate
```

## Development Commands

```bash
# Type check
bun run type-check

# Lint
bun run lint

# Full check
bun run check

# Dev server
bun run dev
```

## Trade-offs & Notes

1. **No external timezone library** - Using built-in Intl.DateTimeFormat (zero deps)
2. **Curated timezone list** - Only 6 common zones (expandable in `i18n/timezone.ts`)
3. **Session tracking** - Uses IP + UserAgent (consider UUIDs for production)
4. **Best-effort DB sync** - Actions don't fail if DB update fails (cookie takes precedence)
5. **Layout-level revalidation** - `revalidatePath("/", "layout")` is broad; optimize if needed
6. **Optimistic updates** - Context updates before server action completes (better UX)

## Adding New Currencies

1. Add to Prisma enum in `schema.prisma`:
   ```prisma
   enum Currency {
     USD
     EUR
     GBP
     CLP
     JPY  // NEW
   }
   ```

2. Add to `i18n/currency.ts`:
   ```ts
   export const currencies = ["USD", "EUR", "GBP", "CLP", "JPY"] as const;
   
   export const CURRENCY_LABELS: Record<Currency, string> = {
     // ...
     JPY: "Japanese Yen",
   };
   
   export const CURRENCY_SYMBOLS: Record<Currency, string> = {
     // ...
     JPY: "¥",
   };
   ```

3. Run migration:
   ```bash
   bunx prisma migrate dev
   bunx prisma generate
   ```

## Adding New Timezones

1. Add to `i18n/timezone.ts`:
   ```ts
   export const timezones = [
     "UTC",
     "America/New_York",
     // ...
     "Asia/Tokyo",  // NEW
   ] as const;
   
   export const TIMEZONE_LABELS: Record<Timezone, string> = {
     // ...
     "Asia/Tokyo": "Tokyo",
   };
   ```

No migration needed (timezone is a String field).
