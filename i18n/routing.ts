import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'en-gb', 'es', 'es-cl', 'es-es', 'de'],
 
  // Used when no locale matches
  defaultLocale: 'en'
});