import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';
import { locales, type Locale } from './lib/locales';

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get('NEXT_LOCALE')?.value;
  
  let locale = 'en';
  if (localeCookie && locales.includes(localeCookie as Locale)) {
    locale = localeCookie;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});

