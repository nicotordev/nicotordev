import { Locale, currencyMap } from '@/lib/locales';

export interface CurrencyFormatOptions {
  locale: Locale;
  amount: number;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

/**
 * Format currency based on locale and currency mapping
 */
export function formatCurrency({
  locale,
  amount,
  minimumFractionDigits = 2,
  maximumFractionDigits = 2,
}: CurrencyFormatOptions): string {
  const currency = currencyMap[locale];

  // Locale mapping for Intl.NumberFormat
  const localeMap: Record<Locale, string> = {
    'en': 'en-US',
    'en-gb': 'en-GB',
    'es': 'es-US',
    'es-cl': 'es-CL',
    'es-es': 'es-ES',
    'de': 'de-DE',
  };

  // Custom formatting for amounts >= 1000
  if (amount >= 1000) {
    const kAmount = amount / 1000;
    const formattedK = kAmount.toFixed(0);

    try {
      const currencySymbol = new Intl.NumberFormat(localeMap[locale], {
        style: 'currency',
        currency,
      }).formatToParts(0).find(part => part.type === 'currency')?.value || currency;

      return `${currencySymbol}${formattedK}k`;
    } catch (error) {
      console.warn(`Currency formatting failed for locale ${locale}:`, error);
      return `${currency} ${formattedK}k`;
    }
  }

  try {
    return new Intl.NumberFormat(localeMap[locale], {
      style: 'currency',
      currency,
      minimumFractionDigits,
      maximumFractionDigits,
    }).format(amount);
  } catch (error) {
    // Fallback to basic formatting if Intl.NumberFormat fails
    console.warn(`Currency formatting failed for locale ${locale}:`, error);
    return `${currency} ${amount.toFixed(minimumFractionDigits)}`;
  }
}

/**
 * Get currency symbol for a locale
 */
export function getCurrencySymbol(locale: Locale): string {
  const currency = currencyMap[locale];

  const symbolMap: Record<string, string> = {
    'USD': '$',
    'EUR': '€',
    'CLP': '$',
  };

  return symbolMap[currency] || currency;
}

/**
 * Format number without currency symbol
 */
export function formatNumber(locale: Locale, amount: number): string {
  const localeMap: Record<Locale, string> = {
    'en': 'en-US',
    'en-gb': 'en-GB',
    'es': 'es-US',
    'es-cl': 'es-CL',
    'es-es': 'es-ES',
    'de': 'de-DE',
  };

  try {
    return new Intl.NumberFormat(localeMap[locale]).format(amount);
  } catch (error) {
    console.warn(`Number formatting failed for locale ${locale}:`, error);
    return amount.toString();
  }
} 