'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { TmdbMovieDetails } from '@/types/tmdb';
import { getBackdropUrl, getPosterUrl } from '@/lib/tmdbImage';
import { formatDate, formatRuntime } from '@/lib/formatters';
import RatingBadge from '@/components/ui/RatingBadge';
import Badge from '@/components/ui/Badge';

interface MovieDetailsHeaderProps {
  movie: TmdbMovieDetails;
}

export default function MovieDetailsHeader({ movie }: MovieDetailsHeaderProps) {
  const t = useTranslations();
  const backdropUrl = getBackdropUrl(movie.backdrop_path, 'w1280');
  const posterUrl = getPosterUrl(movie.poster_path, 'w500');

  return (
    <div className="relative mb-8 w-full overflow-hidden">
      {/* Backdrop with gradient overlay - Full width */}
      {backdropUrl && (
        <div className="relative h-[250px] w-full sm:h-[400px] md:h-[500px] lg:h-[600px]">
          <Image
            src={backdropUrl}
            alt={movie.title || 'Movie backdrop'}
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-slate-900 dark:via-slate-900/80 dark:to-transparent" />
        </div>
      )}

      {/* Content overlay */}
      <div
        className={`container-custom ${backdropUrl ? 'relative -mt-[150px] sm:-mt-[200px] md:-mt-[250px] lg:-mt-[300px]' : 'relative mt-0'}`}
      >
        <div className="flex flex-col gap-4 sm:gap-6 md:flex-row">
          {/* Poster */}
          <div className="flex-shrink-0 flex justify-center sm:justify-start">
            {posterUrl ? (
              <div className="relative h-[225px] w-[150px] overflow-hidden rounded-lg shadow-2xl sm:h-[300px] sm:w-[200px] md:h-[400px] md:w-[267px]">
                <Image
                  src={posterUrl}
                  alt={movie.title || movie.original_title || 'Movie poster'}
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />
              </div>
            ) : (
              <div className="flex h-[225px] w-[150px] items-center justify-center rounded-lg bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400 sm:h-[300px] sm:w-[200px] md:h-[400px] md:w-[267px]">
                No Image
              </div>
            )}
          </div>

          {/* Movie Info */}
          <div className="flex-1 space-y-3 pb-4 sm:space-y-4 sm:pb-8 min-w-0">
            <div>
              <h1 className="mb-2 text-2xl font-bold text-slate-900 break-words sm:text-3xl md:text-4xl lg:text-5xl dark:text-white">
                {movie.title || movie.original_title || 'Untitled'}
              </h1>
              {movie.tagline && movie.tagline.trim() && (
                <p className="text-base italic text-slate-700 break-words sm:text-lg dark:text-slate-300">
                  {movie.tagline}
                </p>
              )}
            </div>

            {(movie.vote_average !== undefined || movie.release_date || (movie.runtime && movie.runtime > 0)) && (
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {movie.vote_average !== undefined && (
                  <RatingBadge
                    rating={movie.vote_average || 0}
                    voteCount={movie.vote_count || 0}
                  />
                )}
                {movie.release_date && (
                  <span className="text-sm text-slate-700 sm:text-base dark:text-slate-300 whitespace-nowrap">
                    {formatDate(movie.release_date)}
                  </span>
                )}
                {movie.runtime && movie.runtime > 0 && (
                  <span className="text-sm text-slate-700 sm:text-base dark:text-slate-300 whitespace-nowrap">
                    {formatRuntime(movie.runtime)}
                  </span>
                )}
              </div>
            )}

            {movie.genres && movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <Badge key={genre.id} variant="primary">
                    {genre.name}
                  </Badge>
                ))}
              </div>
            )}

            {movie.overview && movie.overview.trim() && (
              <div>
                <h2 className="mb-2 text-lg font-semibold text-slate-900 sm:text-xl dark:text-white">
                  {t('movie.overview')}
                </h2>
                <p className="text-sm leading-relaxed text-slate-700 break-words sm:text-base dark:text-slate-300">
                  {movie.overview}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

