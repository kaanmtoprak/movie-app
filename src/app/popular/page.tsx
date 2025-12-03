'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useGetPopularMoviesQuery } from '@/features/movies/moviesApi';
import MovieGrid from '@/components/movies/MovieGrid';
import Pagination from '@/components/ui/Pagination';
import { type Locale } from '@/lib/locales';

export default function PopularPage() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);

  const {
    data,
    isLoading,
    isFetching,
    error,
  } = useGetPopularMoviesQuery(
    { page, locale },
    { refetchOnMountOrArgChange: true }
  );

  return (
    <div className="container-custom space-y-8">
      <div>
        <h1 className="mb-6 text-3xl font-bold text-slate-900 dark:text-white">
          {t('home.popular')}
        </h1>
      </div>

      {error ? (
        <div className="py-12 text-center">
          <p className="text-lg text-red-400">{t('errors.failedToLoadPopular')}</p>
        </div>
      ) : (
        <>
          <MovieGrid movies={data?.results || []} isLoading={isLoading || isFetching} />

          {data && data.total_pages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={data.total_pages}
              baseUrl="/popular"
            />
          )}
        </>
      )}
    </div>
  );
}

