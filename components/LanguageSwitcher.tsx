'use client';

import { Dropdown, DropdownItem } from 'flowbite-react';
import { Globe } from 'lucide-react';
import { Locales } from '@/app/client';
import Motion from './Motion';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();

  const availableLocales = Object.entries(Locales).map(([value, label]) => ({
    value,
    label
  }));

  const handleLocaleChange = (newLocale: string) => {
    router.push(`/${newLocale}`);
  };

  const getCurrencySymbol = (locale: string): string => {
    const currencyMap: Record<string, string> = {
      'en': '$',
      'en-gb': '£',
      'es': '€',
      'es-cl': '$',
      'es-es': '€',
    };
    return currencyMap[locale] || '$';
  };

  const currentLocale = availableLocales.find(l => l.value === locale);

  return (
    <Motion
      motionElement="div"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Dropdown
        label=""
        dismissOnClick={true}
        renderTrigger={() => (
          <button className="flex items-center gap-2 glass dark:glass-dark rounded-lg px-3 py-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
            <Globe size={16} />
            <span className="hidden sm:inline">
              {currentLocale?.label}
            </span>
            <span className="text-xs font-medium">
              {getCurrencySymbol(locale)}
            </span>
          </button>
        )}
      >
        {availableLocales.map((localeOption) => (
          <DropdownItem
            key={localeOption.value}
            onClick={() => handleLocaleChange(localeOption.value)}
            className={`flex items-center justify-between ${localeOption.value === locale ? 'bg-slate-100 dark:bg-slate-700' : ''
              }`}
          >
            <span>{localeOption.label}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {getCurrencySymbol(localeOption.value)}
            </span>
          </DropdownItem>
        ))}
      </Dropdown>
    </Motion>
  );
} 