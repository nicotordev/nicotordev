
export const Locales = {
  en: 'en',
  'en-gb': 'en-gb',
  es: 'es',
  'es-cl': 'es-cl',
  'es-es': 'es-es',
}

export const localesJson = {
  en: () => import('../locales/en.json'),
  'en-gb': () => import('../locales/en-gb.json'),
  es: () => import('../locales/es.json'),
  'es-cl': () => import('../locales/es-cl.json'),
  'es-es': () => import('../locales/es-es.json'),
} as const


export type Locale = 'en' | 'en-gb' | 'es' | 'es-cl' | 'es-es' 