'use client';

import { useEffect } from 'react';
import { useLocale } from 'next-intl';
import { getStoredLocale, setStoredLocale } from '@/lib/locale';
import { type Locale } from '@/lib/locales';

/**
 * Component to sync locale to localStorage and cookie
 * Runs on client-side only
 */
export default function LocaleInitializer() {
  const currentLocale = useLocale() as Locale;

  useEffect(() => {
    // On mount, check if stored locale differs from current
    const storedLocale = getStoredLocale();
    
    // If no cookie exists, set it to current locale
    if (!document.cookie.includes('NEXT_LOCALE=')) {
      setStoredLocale(currentLocale);
    } else if (storedLocale !== currentLocale) {
      // If stored locale differs, update it
      setStoredLocale(currentLocale);
    }
  }, [currentLocale]);

  return null;
}

