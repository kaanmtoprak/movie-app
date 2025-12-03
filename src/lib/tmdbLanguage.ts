import { type Locale } from './locales';

export function getTmdbLanguage(locale: Locale): string {
  const localeMap: Record<Locale, string> = {
    en: 'en-US',
    tr: 'tr-TR',
  };
  return localeMap[locale] || 'en-US';
}

