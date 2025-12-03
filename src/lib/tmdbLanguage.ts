import { type Locale } from './locales';

/**
 * Convert app locale to TMDB API language code
 */
export function getTmdbLanguage(locale: Locale): string {
  const localeMap: Record<Locale, string> = {
    en: 'en-US',
    tr: 'tr-TR',
  };
  return localeMap[locale] || 'en-US';
}

