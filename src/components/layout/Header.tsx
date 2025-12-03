'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import ThemeSwitcher from '@/components/ui/ThemeSwitcher';

export default function Header() {
  const t = useTranslations();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  const navLinks = [
    { href: '/', label: t('header.home') },
    { href: '/trending', label: t('header.trending') },
    { href: '/popular', label: t('header.popular') },
    { href: '/now-playing', label: t('header.nowPlaying') },
    { href: '/top-rated', label: t('header.topRated') },
    { href: '/upcoming', label: t('header.upcoming') },
    { href: '/search', label: t('header.search') },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/95 relative z-50">
      <div className="container-custom overflow-visible">
        <div className="flex items-center justify-between gap-4 py-4">
          <Link href="/" className="flex-shrink-0" onClick={closeMenu}>
            <h1 className="text-2xl font-bold text-slate-900 transition-colors hover:text-primary-600 dark:text-white dark:hover:text-primary-400">
              {t('header.title')}
            </h1>
          </Link>

          <nav className="hidden items-center gap-2 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'bg-primary-600 text-white dark:bg-primary-600'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="ml-2 flex items-center gap-2 border-l border-slate-300 pl-2 dark:border-slate-700">
              <ThemeSwitcher />
              <LanguageSwitcher />
            </div>
          </nav>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleMenu}
              className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="border-t border-slate-200 py-4 dark:border-slate-800 lg:hidden overflow-visible relative">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? 'bg-primary-600 text-white dark:bg-primary-600'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 flex items-center gap-2 border-t border-slate-200 pt-2 dark:border-slate-800 relative">
                <ThemeSwitcher />
                <div className="relative z-[100]">
                  <LanguageSwitcher />
                </div>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
