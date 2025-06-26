import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function NotFoundPage() {
  const t = useTranslations('NotFound');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-slate-900 dark:text-slate-100">
            404
          </h1>
          <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-300">
            {t('title')}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            {t('description')}
          </p>
        </div>
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {t('goHome')}
          </Link>
        </div>
      </div>
    </div>
  );
} 