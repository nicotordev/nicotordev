import type { MetadataRoute } from 'next';

const BASE_URL = 'https://nicotordev.com';

// Define supported locales
const locales = ['en', 'en-gb', 'es', 'es-cl', 'es-es'] as const;
type SupportedLocale = typeof locales[number];

export default function sitemap(): MetadataRoute.Sitemap {
  // Create sitemap entries for each locale
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Generate language alternates for each URL
  const generateAlternates = (path: string = '') => {
    const languages: Record<string, string> = {};
    
    locales.forEach((locale: SupportedLocale) => {
      if (locale === 'en') {
        // Default locale doesn't need prefix
        languages[locale] = `${BASE_URL}${path}`;
      } else {
        languages[locale] = `${BASE_URL}/${locale}${path}`;
      }
    });

    return { languages };
  };

  // Homepage entries for each locale
  locales.forEach((locale: SupportedLocale) => {
    const url = locale === 'en' ? BASE_URL : `${BASE_URL}/${locale}`;
    
    sitemapEntries.push({
      url,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: generateAlternates()
    });
  });

  // Add other pages here as you expand the site
  // Example for future pages:
  /*
  const additionalPages = ['/about', '/projects', '/contact'];
  
  additionalPages.forEach(page => {
    locales.forEach((locale: SupportedLocale) => {
      const url = locale === 'en' ? `${BASE_URL}${page}` : `${BASE_URL}/${locale}${page}`;
      
      sitemapEntries.push({
        url,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: generateAlternates(page)
      });
    });
  });
  */

  return sitemapEntries;
}