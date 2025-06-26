import { createI18nServer } from 'next-international/server'

const locales = {
  en: () => import('../locales/en.json'),
  'en-gb': () => import('../locales/en-gb.json'),
  es: () => import('../locales/es.json'),
  'es-cl': () => import('../locales/es-cl.json'),
  'es-es': () => import('../locales/es-es.json'),
} as const

export const { getI18n, getScopedI18n, getCurrentLocale } = createI18nServer(locales)

export type Locale = keyof typeof locales 