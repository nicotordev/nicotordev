import type { MetadataRoute } from 'next'

const BASE_URL = 'https://nicotordev.com'
const locales = ['en', 'en-GB', 'es', 'es-CL', 'es-ES'] as const

const languages = Object.fromEntries([
  ['x-default', BASE_URL],
  ...locales.map(l => [l, l === 'en' ? BASE_URL : `${BASE_URL}/${l}`]),
]) as Record<string, string>

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map(locale => ({
    url: locale === 'en' ? BASE_URL : `${BASE_URL}/${locale}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 1,
    alternates: { languages },
  }))
}
