'use client';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, DollarSign, PoundSterling, Euro } from 'lucide-react';
import { Locales } from '@/app/client';
import Motion from './Motion';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';

const currencyIconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  'en': DollarSign,
  'en-gb': PoundSterling,
  'es': Euro,
  'es-cl': DollarSign,
  'es-es': Euro,
  'de': Euro,
};

function LocaleCurrencyIcon({ locale, size, className }: { locale: string; size?: number; className?: string }) {
  const Icon = currencyIconMap[locale] || DollarSign;
  return <Icon {...(size !== undefined ? { size } : {})} {...(className ? { className } : {})} />
}

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

  const currentLocale = availableLocales.find(l => l.value === locale);

  return (
    <Motion
      motionElement="div"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 glass dark:glass-dark rounded-lg px-3 py-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors border-0 bg-transparent hover:bg-transparent"
          >
            <Globe size={16} />
            <span className="hidden sm:inline">
              {currentLocale?.label}
            </span>
            <LocaleCurrencyIcon locale={locale} size={12} className="text-slate-500 dark:text-slate-400" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {availableLocales.map((localeOption) => (
            <DropdownMenuItem
              key={localeOption.value}
              onClick={() => handleLocaleChange(localeOption.value)}
              className={`flex items-center justify-between cursor-pointer ${
                localeOption.value === locale ? 'bg-accent' : ''
              }`}
            >
              <span>{localeOption.label}</span>
              <LocaleCurrencyIcon locale={localeOption.value} size={12} className="text-slate-500 dark:text-slate-400" />
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </Motion>
  );
}
