'use client';

import { useTranslations } from 'next-intl';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
}

export default function Skeleton({
  className = '',
  variant = 'rectangular',
}: SkeletonProps) {
  const t = useTranslations();
  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  return (
    <div
      className={`animate-pulse bg-slate-200 dark:bg-slate-700 ${variantClasses[variant]} ${className}`}
      aria-label={t('common.loading')}
    />
  );
}

