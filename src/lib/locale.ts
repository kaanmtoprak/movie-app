'use client';

import { locales, type Locale } from '@/lib/locales';

const LOCALE_STORAGE_KEY = 'movie-app-locale';
const LOCALE_COOKIE_KEY = 'NEXT_LOCALE';

export function getStoredLocale(): Locale {
  if (typeof window === 'undefined') return 'en';

  const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
  if (stored && locales.includes(stored as Locale)) {
    return stored as Locale;
  }

  const cookies = document.cookie.split(';');
  const localeCookie = cookies.find((c) => c.trim().startsWith(`${LOCALE_COOKIE_KEY}=`));
  if (localeCookie) {
    const locale = localeCookie.split('=')[1]?.trim();
    if (locale && locales.includes(locale as Locale)) {
      return locale as Locale;
    }
  }

  return 'en';
}

export function setStoredLocale(locale: Locale): void {
  if (typeof window === 'undefined') return;

  localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);
  document.cookie = `${LOCALE_COOKIE_KEY}=${locale}; expires=${expires.toUTCString()}; path=/`;
}

