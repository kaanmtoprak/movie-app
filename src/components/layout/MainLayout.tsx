import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import LocaleInitializer from './LocaleInitializer';
import PageLoader from '@/components/ui/PageLoader';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <PageLoader />
      <LocaleInitializer />
      <Header />
      <main className="flex-1 py-8">{children}</main>
      <Footer />
    </div>
  );
}

