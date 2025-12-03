'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { TmdbMovie } from '@/types/tmdb';
import { getPosterUrl } from '@/lib/tmdbImage';
import { formatYear } from '@/lib/formatters';
import RatingBadge from '@/components/ui/RatingBadge';
import styles from '@/styles/MovieCard.module.scss';

interface MovieCardProps {
  movie: TmdbMovie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const t = useTranslations();
  const posterUrl = getPosterUrl(movie.poster_path);
  const releaseYear = formatYear(movie.release_date);

  return (
    <Link href={`/movie/${movie.id}`} className="h-full block">
      <div className={styles.card}>
        {posterUrl ? (
          <Image
            src={posterUrl}
            alt={movie.title}
            width={500}
            height={750}
            className={styles.poster}
            unoptimized
          />
        ) : (
          <div className={styles.posterPlaceholder}>
            <span>{t('common.noImage')}</span>
          </div>
        )}
        <div className={styles.content}>
          <h3 className={styles.title} title={movie.title}>
            {movie.title}
          </h3>
          <div className={styles.meta}>
            <span>{releaseYear}</span>
            <RatingBadge rating={movie.vote_average} size="sm" />
          </div>
        </div>
      </div>
    </Link>
  );
}

