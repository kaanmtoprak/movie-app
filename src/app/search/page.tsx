'use client';

import { useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useSearchMoviesQuery } from '@/features/movies/moviesApi';
import { useAppDispatch } from '@/features/hooks';
import { setSearchQuery, setCurrentPage } from '@/features/movies/moviesSlice';
import SearchBar from '@/components/ui/SearchBar';
import MovieGrid from '@/components/movies/MovieGrid';
import Pagination from '@/components/ui/Pagination';
import { type Locale } from '@/lib/locales';

export default function SearchPage() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  const query = searchParams.get('q') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);

  const {
    data,
    isLoading,
    isFetching,
    error,
  } = useSearchMoviesQuery(
    { query, page, locale },
    { 
      skip: !query || query.trim() === '',
      refetchOnMountOrArgChange: true 
    }
  );

  useEffect(() => {
    if (query) {
      dispatch(setSearchQuery(query));
      dispatch(setCurrentPage(page));
    }
  }, [query, page, dispatch]);

  const handleSearch = (searchTerm: string) => {
    router.push(`${pathname}?q=${encodeURIComponent(searchTerm)}&page=1`);
  };

  const handlePageChange = (newPage: number) => {
    router.push(`${pathname}?q=${encodeURIComponent(query)}&page=${newPage}`);
  };

  return (
    <div className="container-custom space-y-8">
      <div>
        <h1 className="mb-6 text-3xl font-bold text-slate-900 dark:text-white">
          {t('search.title')}
        </h1>
        <SearchBar initialValue={query} onSearch={handleSearch} />
      </div>

      {!query || query.trim() === '' ? (
        <div className="py-12 text-center">
          <p className="text-lg text-slate-600 dark:text-slate-400">
            {t('search.placeholder')}
          </p>
        </div>
      ) : error ? (
        <div className="py-12 text-center">
          <p className="text-lg text-red-400">{t('errors.failedToSearch')}</p>
        </div>
      ) : (
        <>
          {data && (
            <div className="text-slate-600 dark:text-slate-400">
              {t('search.results', { 
                count: data.total_results,
                formattedCount: data.total_results.toLocaleString() 
              })}{' '}
              {t('search.for')} &quot;{query}&quot;
            </div>
          )}

          <MovieGrid movies={data?.results || []} isLoading={isLoading || isFetching} />

          {data && data.total_pages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={data.total_pages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
}

