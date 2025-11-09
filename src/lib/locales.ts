export const locales = ['en', 'en-gb', 'es', 'es-cl', 'es-es', 'de'] as const;
export type Locale = (typeof locales)[number];

// Currency mapping for each locale  
export const currencyMap: Record<Locale, string> = {
  'en': 'USD',        // English (US) - USD
  'en-gb': 'EUR',     // English (UK) - EUR
  'es': 'USD',        // Spanish (Latin America) - USD
  'es-cl': 'CLP',     // Spanish (Chile) - CLP
  'es-es': 'EUR',     // Spanish (Spain) - EUR
  'de': 'EUR',        // German - EUR
};

// Locale display names
export const localeNames: Record<Locale, string> = {
  'en': 'English (US)',
  'en-gb': 'English (UK)',
  'es': 'Español (Latinoamérica)',
  'es-cl': 'Español (Chile)',
  'es-es': 'Español (España)',
  'de': 'Deutsch',
}; 