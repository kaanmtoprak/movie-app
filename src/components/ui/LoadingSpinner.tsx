'use client';

import { useTranslations } from 'next-intl';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function LoadingSpinner({
  size = 'md',
  className = '',
}: LoadingSpinnerProps) {
  const t = useTranslations();
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-slate-300 border-t-primary-600 dark:border-slate-600 dark:border-t-primary-400`}
        role="status"
        aria-label={t('common.loading')}
      >
        <span className="sr-only">{t('common.loading')}</span>
      </div>
    </div>
  );
}

