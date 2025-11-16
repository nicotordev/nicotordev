import { routing } from '@/i18n/routing';
import type messages from '@/locales/es-cl.json';

declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}
