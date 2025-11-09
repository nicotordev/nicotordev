import type { Locale } from '@/lib/locales';
import { localeNames, locales } from '@/lib/locales';

/**
 * Check if a locale is valid
 */
export function isValidLocale(locale: string | undefined): locale is Locale {
  return locales.includes(locale as Locale);
}

/**
 * Get locale from pathname
 */
export function getLocaleFromPathname(pathname: string): Locale | null {
  const segments = pathname.split('/');
  const potentialLocale = segments[1];
  
  return isValidLocale(potentialLocale) ? potentialLocale : null;
}

/**
 * Remove locale from pathname
 */
export function removeLocaleFromPathname(pathname: string): string {
  const locale = getLocaleFromPathname(pathname);
  if (locale) {
    return pathname.replace(`/${locale}`, '') || '/';
  }
  return pathname;
}

/**
 * Add locale to pathname
 */
export function addLocaleToPathname(pathname: string, locale: Locale): string {
  const cleanPathname = removeLocaleFromPathname(pathname);
  return `/${locale}${cleanPathname === '/' ? '' : cleanPathname}`;
}

/**
 * Get available locales with their display names
 */
export function getAvailableLocales(): Array<{ value: Locale; label: string }> {
  return locales.map(locale => ({
    value: locale,
    label: localeNames[locale],
  }));
}

/**
 * Get locale direction (for RTL support if needed in the future)
 */
export function getLocaleDirection(_locale: Locale): 'ltr' | 'rtl' {
  // All current locales use left-to-right direction
  // This can be extended for RTL languages in the future
  return 'ltr';
} 
