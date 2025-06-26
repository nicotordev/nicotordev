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

export async function getAllTranslations() {
    const translations = await getTranslations()
    const t = (key: string) => translations(`${key}`)
    return t
}

export async function getAboutTranslations() {
    const translations = await getTranslations()
    const t = (key: string) => translations(`about.${key}`)
    return t
}

export async function getHeroTranslations() {
    const translations = await getTranslations()
    const t = (key: string) => translations(`hero.${key}`)
    return t
}

export async function getNavigationTranslations() {
    const translations = await getTranslations()
    const t = (key: string) => translations(`navigation.${key}`)
    return t
}

export async function getCommonTranslations() {
    const translations = await getTranslations()
    const t = (key: string) => translations(`common.${key}`)
    return t
}

export async function getMetadataTranslations() {
    const translations = await getTranslations()
    const t = (key: string) => translations(`metadata.${key}`)
    return t
}

export async function getNotFoundTranslations() {
    const translations = await getTranslations()
    const t = (key: string) => translations(`NotFound.${key}`)
    return t
}

export async function getThemeTranslations() {
    const translations = await getTranslations()
    const t = (key: string) => translations(`theme.${key}`)
    return t
}

export async function getResumeTranslations() {
    const translations = await getTranslations()
    const t = (key: string) => translations(`resume.${key}`)
    return t
}

export async function getProjectsTranslations() {
    const translations = await getTranslations()
    const t = (key: string) => translations(`about.projects.${key}`)
    return t
}

export async function getValidLocale(locale: string): Promise<Locale> {
    if (locales.includes(locale as Locale)) {
        return locale as Locale || 'en'
    }
    return 'en'
}