'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useGetPersonDetailsQuery, useGetPersonMovieCreditsQuery } from '@/features/movies/moviesApi';
import { getProfileUrl } from '@/lib/tmdbImage';
import { formatDate } from '@/lib/formatters';
import Skeleton from '@/components/ui/Skeleton';
import MovieGrid from '@/components/movies/MovieGrid';
import { type Locale } from '@/lib/locales';
import { type TmdbMovie } from '@/types/tmdb';

interface PersonDetailPageProps {
  params: { id: string };
}

export default function PersonDetailPage({ params }: PersonDetailPageProps) {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const { id } = params;
  const personId = parseInt(id, 10);

  const {
    data: person,
    isLoading: isLoadingPerson,
    error: personError,
  } = useGetPersonDetailsQuery({ personId, locale }, { skip: isNaN(personId) });

  const {
    data: credits,
    isLoading: isLoadingCredits,
    error: creditsError,
  } = useGetPersonMovieCreditsQuery({ personId, locale }, { skip: isNaN(personId) });

  if (isNaN(personId)) {
    return (
      <div className="container-custom py-12 text-center">
        <p className="text-lg text-red-400">{t('person.invalidId')}</p>
      </div>
    );
  }

  if (personError) {
    return (
      <div className="container-custom py-12 text-center">
        <p className="text-lg text-red-400">{t('person.failedToLoad')}</p>
      </div>
    );
  }

  if (isLoadingPerson) {
    return (
      <div className="container-custom space-y-8">
        <div className="flex flex-col gap-6 sm:flex-row">
          <Skeleton className="h-[400px] w-[267px] rounded-lg" />
          <div className="flex-1 space-y-4">
            <Skeleton className="h-12 w-64" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  if (!person) {
    return (
      <div className="container-custom py-12 text-center">
        <p className="text-lg text-slate-600 dark:text-slate-400">{t('person.notFound')}</p>
      </div>
    );
  }

  const profileUrl = getProfileUrl(person.profile_path, 'w500');
  
  const castMovies: TmdbMovie[] = (credits?.cast || []).map((movie) => ({
    id: movie.id,
    title: movie.title,
    overview: '',
    poster_path: movie.poster_path,
    backdrop_path: null,
    release_date: movie.release_date,
    vote_average: movie.vote_average,
    vote_count: movie.vote_count,
    genre_ids: [],
    original_language: '',
    popularity: 0,
    adult: false,
    video: false,
    original_title: movie.title,
  })).sort((a, b) => {
    const dateA = a.release_date ? new Date(a.release_date).getTime() : 0;
    const dateB = b.release_date ? new Date(b.release_date).getTime() : 0;
    return dateB - dateA;
  });

  return (
    <div className="container-custom space-y-8 sm:space-y-12">
      <div className="flex flex-col gap-4 sm:gap-6 sm:flex-row">
        <div className="flex-shrink-0 flex justify-center sm:justify-start">
          {profileUrl ? (
            <div className="relative h-[300px] w-[200px] overflow-hidden rounded-lg shadow-2xl sm:h-[400px] sm:w-[267px]">
              <Image
                src={profileUrl}
                alt={person.name}
                fill
                className="object-cover"
                priority
                unoptimized
              />
            </div>
          ) : (
            <div className="flex h-[300px] w-[200px] items-center justify-center rounded-lg bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400 sm:h-[400px] sm:w-[267px]">
              {t('common.noPhoto')}
            </div>
          )}
        </div>

        <div className="flex-1 space-y-3 sm:space-y-4 min-w-0">
          <div>
            <h1 className="mb-2 text-2xl font-bold text-slate-900 break-words sm:text-3xl md:text-4xl dark:text-white">
              {person.name}
            </h1>
            {person.known_for_department && (
              <p className="text-base text-slate-700 sm:text-lg dark:text-slate-300">
                {person.known_for_department}
              </p>
            )}
          </div>

          <div className="space-y-2">
            {person.birthday && (
              <div>
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  {t('person.birthday')}:{' '}
                </span>
                <span className="text-sm text-slate-800 dark:text-slate-200">
                  {formatDate(person.birthday)}
                  {person.deathday && ` - ${formatDate(person.deathday)}`}
                </span>
              </div>
            )}
            {person.place_of_birth && (
              <div>
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  {t('person.placeOfBirth')}:{' '}
                </span>
                <span className="text-sm text-slate-800 dark:text-slate-200">
                  {person.place_of_birth}
                </span>
              </div>
            )}
          </div>

          {person.biography && (
            <div>
              <h2 className="mb-2 text-lg font-semibold text-slate-900 sm:text-xl dark:text-white">
                {t('person.biography')}
              </h2>
              <p className="text-sm leading-relaxed text-slate-700 break-words sm:text-base dark:text-slate-300">
                {person.biography}
              </p>
            </div>
          )}
        </div>
      </div>

      {credits && (credits.cast.length > 0 || credits.crew.length > 0) && (
        <div className="space-y-6">
          {credits.cast.length > 0 && (
            <div>
              <h2 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">
                {t('person.asActor')} ({credits.cast.length})
              </h2>
              <MovieGrid movies={castMovies} isLoading={isLoadingCredits} />
            </div>
          )}
          {credits.crew.length > 0 && (
            <div>
              <h2 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">
                {t('person.asCrew')} ({credits.crew.length})
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {credits.crew.slice(0, 12).map((movie) => (
                  <Link
                    key={movie.id}
                    href={`/movie/${movie.id}`}
                    className="rounded-lg bg-slate-100 p-3 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"
                  >
                    <p className="text-sm font-medium text-slate-900 break-words dark:text-white">
                      {movie.title}
                    </p>
                    {movie.job && (
                      <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                        {movie.job}
                      </p>
                    )}
                    {movie.release_date && (
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">
                        {formatDate(movie.release_date)}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {!isLoadingCredits && (!credits || (credits.cast.length === 0 && credits.crew.length === 0)) && (
        <div className="py-12 text-center">
          <p className="text-lg text-slate-600 dark:text-slate-400">{t('person.noMovies')}</p>
        </div>
      )}
    </div>
  );
}

