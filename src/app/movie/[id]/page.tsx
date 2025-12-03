'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useGetMovieDetailsQuery, useGetMovieCreditsQuery } from '@/features/movies/moviesApi';
import MovieDetailsHeader from '@/components/movies/MovieDetailsHeader';
import MovieMeta from '@/components/movies/MovieMeta';
import CastList from '@/components/movies/CastList';
import Skeleton from '@/components/ui/Skeleton';
import { type Locale } from '@/lib/locales';

interface MovieDetailPageProps {
  params: { id: string };
}

export default function MovieDetailPage({ params }: MovieDetailPageProps) {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const { id } = params;
  const movieId = parseInt(id, 10);

  const {
    data: movie,
    isLoading: isLoadingMovie,
    error: movieError,
  } = useGetMovieDetailsQuery({ movieId, locale }, { skip: isNaN(movieId) });

  const {
    data: credits,
    isLoading: isLoadingCredits,
    error: creditsError,
  } = useGetMovieCreditsQuery({ movieId, locale }, { skip: isNaN(movieId) });

  if (isNaN(movieId)) {
    return (
      <div className="py-12 text-center">
        <p className="text-lg text-red-400">{t('movie.invalidId')}</p>
      </div>
    );
  }

  if (movieError) {
    return (
      <div className="py-12 text-center">
        <p className="text-lg text-red-400">{t('movie.failedToLoad')}</p>
      </div>
    );
  }

  if (isLoadingMovie) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-[600px] w-full" />
        <div className="space-y-4">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="py-12 text-center">
        <p className="text-lg text-slate-600 dark:text-slate-400">{t('movie.notFound')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 sm:space-y-12">
      <MovieDetailsHeader movie={movie} />

      <div className="container-custom">
        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-2">
            <CastList
              cast={credits?.cast || []}
              isLoading={isLoadingCredits}
            />
          </div>

          <div className="order-first lg:order-last">
            <MovieMeta movie={movie} />
          </div>
        </div>
      </div>
    </div>
  );
}

