'use client';

import { useTranslations } from 'next-intl';
import { TmdbMovieDetails } from '@/types/tmdb';
import { formatDate, formatCurrency, formatNumber } from '@/lib/formatters';
import Badge from '@/components/ui/Badge';

interface MovieMetaProps {
  movie: TmdbMovieDetails;
}

export default function MovieMeta({ movie }: MovieMetaProps) {
  const t = useTranslations();
  const metaItems = [
    { label: t('movie.releaseDate'), value: formatDate(movie.release_date) },
    { label: t('movie.status'), value: movie.status || 'N/A' },
    {
      label: t('movie.originalLanguage'),
      value: movie.original_language ? movie.original_language.toUpperCase() : 'N/A',
    },
    { label: t('movie.budget'), value: formatCurrency(movie.budget) },
    { label: t('movie.revenue'), value: formatCurrency(movie.revenue) },
  ].filter((item) => item.value && item.value !== 'N/A');

  return (
    <div className="space-y-4 sm:space-y-6">
      {metaItems.length > 0 && (
        <div>
          <h2 className="mb-3 text-xl font-bold text-slate-900 sm:mb-4 sm:text-2xl dark:text-white">
            {t('movie.information')}
          </h2>
          <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-1">
            {metaItems.map((item) => (
              <div key={item.label}>
                <dt className="text-xs font-medium text-slate-600 sm:text-sm dark:text-slate-400">
                  {item.label}
                </dt>
                <dd className="mt-1 text-sm text-slate-800 sm:text-base dark:text-slate-200">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {movie.production_companies && movie.production_companies.length > 0 && (
        <div>
          <h3 className="mb-2 text-base font-semibold text-slate-900 sm:mb-3 sm:text-lg dark:text-white">
            {t('movie.productionCompanies')}
          </h3>
          <div className="flex flex-wrap gap-2">
            {movie.production_companies
              .filter((company) => company.name && company.name.trim())
              .map((company) => (
                <Badge key={company.id} variant="secondary">
                  {company.name}
                </Badge>
              ))}
          </div>
        </div>
      )}

      {movie.production_countries && movie.production_countries.length > 0 && (
        <div>
          <h3 className="mb-2 text-base font-semibold text-slate-900 sm:mb-3 sm:text-lg dark:text-white">
            {t('movie.productionCountries')}
          </h3>
          <div className="flex flex-wrap gap-2">
            {movie.production_countries
              .filter((country) => country.name && country.name.trim())
              .map((country, index) => (
                <Badge key={index} variant="secondary">
                  {country.name}
                </Badge>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

