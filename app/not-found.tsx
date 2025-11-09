'use client'

import { defaultTranslations } from '@/types/translations';
import type { Translations } from '@/types/translations';
import { getLocaleFromCookie, getTranslationsFromCookie } from './actions/language.actions';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Header from '@/components/Layout/Header';
import type { Locale } from '@/lib/locales';
import { NextIntlClientProvider } from 'next-intl';
import { SessionProvider } from '@/context/SessionContext';

export default function NotFoundPage() {
    const [locale, setLocale] = useState<Locale>('en')
    const [translations, setTranslations] = useState<Translations>(defaultTranslations)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getTranslationsFromCookie().then((translations) => {
            setTranslations(translations)
            setIsLoading(false)
        }).catch((error) => {
            console.error(error)
            setIsLoading(false)
        })
        getLocaleFromCookie().then((locale) => {
            setLocale(locale)
        })
    }, [])

    if (isLoading) {
        return (
            <NextIntlClientProvider locale={locale} messages={translations}>
                <SessionProvider>
                <Header />
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
                    <div className="text-center space-y-6">
                        <div className="space-y-2">
                            {/* 404 number skeleton */}
                            <div className="h-20 w-32 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse mx-auto"></div>
                            {/* Title skeleton */}
                            <div className="h-8 w-64 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse mx-auto"></div>
                            {/* Description skeleton */}
                            <div className="space-y-2 max-w-md mx-auto">
                                <div className="h-6 w-full bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse"></div>
                                <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse mx-auto"></div>
                            </div>
                        </div>
                        <div className="pt-4">
                            {/* Button skeleton */}
                            <div className="h-12 w-32 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse mx-auto"></div>
                        </div>
                    </div>
                </div>
                </SessionProvider>
            </NextIntlClientProvider>
        )
    }

    return (
        <NextIntlClientProvider locale={locale} messages={translations}>
            <SessionProvider>
            <Header />
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
                <div className="text-center space-y-6">
                    <div className="space-y-2">
                        <h1 className="text-6xl font-bold text-slate-900 dark:text-slate-100">
                            404
                        </h1>
                        <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-300">
                            {translations?.NotFound.title || '404'}
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                            {translations?.NotFound.description || 'Page not found'}
                        </p>
                    </div>
                    <div className="pt-4">
                        <Link
                            href="/"
                            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            {translations?.NotFound.goHome || 'Go home'}
                        </Link>
                        </div>
                    </div>
                </div>
            </SessionProvider>
        </NextIntlClientProvider>
    );
} 
