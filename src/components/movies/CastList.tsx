'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { TmdbCastMember } from '@/types/tmdb';
import { getProfileUrl } from '@/lib/tmdbImage';
import Skeleton from '@/components/ui/Skeleton';

interface CastListProps {
  cast: TmdbCastMember[];
  isLoading?: boolean;
  maxItems?: number;
}

export default function CastList({
  cast,
  isLoading = false,
  maxItems = 8,
}: CastListProps) {
  const t = useTranslations();
  const displayCast = cast.slice(0, maxItems);

  if (isLoading) {
    return (
      <div className="space-y-4 w-full">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          {t('movie.cast')}
        </h2>
        <div className="flex flex-wrap gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="flex-shrink-0">
              <Skeleton className="h-32 w-24 rounded-lg" variant="rectangular" />
              <Skeleton className="mt-2 h-4 w-24" />
              <Skeleton className="mt-1 h-3 w-20" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (displayCast.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          {t('movie.cast')}
        </h2>
        <p className="text-slate-600 dark:text-slate-400">{t('movie.noCast')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 w-full">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t('movie.cast')}</h2>
      <div className="flex flex-wrap gap-4">
        {displayCast.map((member) => {
          const profileUrl = getProfileUrl(member.profile_path);

          return (
            <Link
              key={member.id}
              href={`/person/${member.id}`}
              className="flex-shrink-0 transition-transform hover:scale-105"
            >
              <div className="relative h-32 w-24 overflow-hidden rounded-lg bg-slate-200 dark:bg-slate-800">
                {profileUrl ? (
                  <Image
                    src={profileUrl}
                    alt={member.name}
                    fill
                    className="object-cover"
                    unoptimized
                    draggable={false}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-slate-500 dark:text-slate-500">
                    {t('common.noPhoto')}
                  </div>
                )}
              </div>
              <div className="mt-2 w-24">
                <p
                  className="truncate text-sm font-medium text-slate-900 dark:text-white"
                  title={member.name || t('common.unknown')}
                >
                  {member.name || t('common.unknown')}
                </p>
                {member.character && (
                  <p
                    className="truncate text-xs text-slate-600 dark:text-slate-400"
                    title={member.character}
                  >
                    {member.character}
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
