'use client';

import { useTranslations, useLocale } from 'next-intl';
import {
  useGetPopularMoviesQuery,
  useGetTrendingMoviesQuery,
  useGetNowPlayingMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetUpcomingMoviesQuery,
} from '@/features/movies/moviesApi';
import MovieSection from '@/components/movies/MovieSection';
import { type Locale } from '@/lib/locales';

export default function HomePage() {
  const t = useTranslations();
  const locale = useLocale() as Locale;

  const {
    data: trendingData,
    isLoading: isLoadingTrending,
    error: trendingError,
  } = useGetTrendingMoviesQuery({ page: 1, locale });

  const {
    data: popularData,
    isLoading: isLoadingPopular,
    error: popularError,
  } = useGetPopularMoviesQuery({ page: 1, locale });

  const {
    data: nowPlayingData,
    isLoading: isLoadingNowPlaying,
    error: nowPlayingError,
  } = useGetNowPlayingMoviesQuery({ page: 1, locale });

  const {
    data: topRatedData,
    isLoading: isLoadingTopRated,
    error: topRatedError,
  } = useGetTopRatedMoviesQuery({ page: 1, locale });

  const {
    data: upcomingData,
    isLoading: isLoadingUpcoming,
    error: upcomingError,
  } = useGetUpcomingMoviesQuery({ page: 1, locale });

  return (
    <div className="container-custom space-y-12">
      <MovieSection
        title={t('home.trending')}
        movies={trendingData?.results || []}
        isLoading={isLoadingTrending}
        error={!!trendingError}
        errorMessage={t('errors.failedToLoadTrending')}
        viewMoreLink="/trending"
      />

      <MovieSection
        title={t('home.nowPlaying')}
        movies={nowPlayingData?.results || []}
        isLoading={isLoadingNowPlaying}
        error={!!nowPlayingError}
        errorMessage={t('errors.failedToLoadNowPlaying')}
        viewMoreLink="/now-playing"
      />

      <MovieSection
        title={t('home.popular')}
        movies={popularData?.results || []}
        isLoading={isLoadingPopular}
        error={!!popularError}
        errorMessage={t('errors.failedToLoadPopular')}
        viewMoreLink="/popular"
      />

      <MovieSection
        title={t('home.topRated')}
        movies={topRatedData?.results || []}
        isLoading={isLoadingTopRated}
        error={!!topRatedError}
        errorMessage={t('errors.failedToLoadTopRated')}
        viewMoreLink="/top-rated"
      />

      <MovieSection
        title={t('home.upcoming')}
        movies={upcomingData?.results || []}
        isLoading={isLoadingUpcoming}
        error={!!upcomingError}
        errorMessage={t('errors.failedToLoadUpcoming')}
        viewMoreLink="/upcoming"
      />
    </div>
  );
}
