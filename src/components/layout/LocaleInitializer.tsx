'use client';

import { useEffect } from 'react';
import { useLocale } from 'next-intl';
import { getStoredLocale, setStoredLocale } from '@/lib/locale';
import { type Locale } from '@/lib/locales';

export default function LocaleInitializer() {
  const currentLocale = useLocale() as Locale;

  useEffect(() => {
    const storedLocale = getStoredLocale();
    
    if (!document.cookie.includes('NEXT_LOCALE=')) {
      setStoredLocale(currentLocale);
    } else if (storedLocale !== currentLocale) {
      setStoredLocale(currentLocale);
    }
  }, [currentLocale]);

  return null;
}

