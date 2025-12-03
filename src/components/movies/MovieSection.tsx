'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { TmdbMovie } from '@/types/tmdb';
import MovieGrid from './MovieGrid';

interface MovieSectionProps {
  title: string;
  movies: TmdbMovie[];
  isLoading?: boolean;
  error?: boolean;
  errorMessage?: string;
  viewMoreLink: string;
  showViewMore?: boolean;
}

export default function MovieSection({
  title,
  movies,
  isLoading = false,
  error = false,
  errorMessage,
  viewMoreLink,
  showViewMore = true,
}: MovieSectionProps) {
  const t = useTranslations();
  // Show only first 5 movies on home page
  const displayMovies = movies.slice(0, 5);

  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{title}</h2>
        {showViewMore && !isLoading && !error && movies.length >= 5 && (
          <Link
            href={viewMoreLink}
            className="text-sm font-medium text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            {t('home.viewMore')} →
          </Link>
        )}
      </div>
      {error ? (
        <div className="py-12 text-center">
          <p className="text-lg text-red-400">{errorMessage}</p>
        </div>
      ) : (
        <MovieGrid movies={displayMovies} isLoading={isLoading} skeletonCount={5} />
      )}
    </section>
  );
}

