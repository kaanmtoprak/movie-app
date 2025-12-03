import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'secondary';
  className?: string;
}

export default function Badge({
  children,
  variant = 'default',
  className = '',
}: BadgeProps) {
  const variantClasses = {
    default: 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200',
    primary: 'bg-primary-600 text-white',
    secondary: 'bg-slate-300 text-slate-800 dark:bg-slate-600 dark:text-slate-100',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

