'use server'

import { Locale, locales } from '@/lib/locales'
import { getTranslations } from 'next-intl/server'
import { cookies } from 'next/headers'

export async function setLanguage(language: Locale) {
    const cookieStore = await cookies()
    cookieStore.set('NEXT_LOCALE', language)
}

export async function getLanguage(): Promise<Locale> {
    const cookieStore = await cookies()
    return cookieStore.get('NEXT_LOCALE')?.value as Locale || 'en'
}
export async function getAboutTranslations(language: Locale) {
    const translations = await getTranslations(language)
    const t = (key: string) => translations(`about.${key}`)
    return t
}

export async function getHeroTranslations(language: Locale) {
    const translations = await getTranslations(language)
    const t = (key: string) => translations(`hero.${key}`)
    return t
}

export async function getNavigationTranslations(language: Locale) {
    const translations = await getTranslations(language)
    const t = (key: string) => translations(`navigation.${key}`)
    return t
}

export async function getCommonTranslations(language: Locale) {
    const translations = await getTranslations(language)
    const t = (key: string) => translations(`common.${key}`)
    return t
}

export async function getMetadataTranslations(language: Locale) {
    const translations = await getTranslations(language)
    const t = (key: string) => translations(`metadata.${key}`)
    return t
}

export async function getNotFoundTranslations(language: Locale) {
    const translations = await getTranslations(language)
    const t = (key: string) => translations(`NotFound.${key}`)
    return t
}

export async function getThemeTranslations(language: Locale) {
    const translations = await getTranslations(language)
    const t = (key: string) => translations(`theme.${key}`)
    return t
}

export async function getResumeTranslations(language: Locale) {
    const translations = await getTranslations(language)
    const t = (key: string) => translations(`resume.${key}`)
    return t
}

export async function getProjectsTranslations(language: Locale) {
    const translations = await getTranslations(language)
    const t = (key: string) => translations(`about.projects.${key}`)
    return t
}

export async function getValidLocale(locale: string): Promise<Locale> {
    if (locales.includes(locale as Locale)) {
        return locale as Locale || 'en'
    }
    return 'en'
}