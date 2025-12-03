'use client';

import { Provider } from 'react-redux';
import { store } from '@/features/store';
import { ThemeProvider } from '@/contexts/ThemeContext';
import MainLayout from '@/components/layout/MainLayout';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <MainLayout>{children}</MainLayout>
      </ThemeProvider>
    </Provider>
  );
}

