'use client';

import { AnalyticsProvider } from '@/components/analytics-provider';
import { Toaster } from '@/components/ui/sonner';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AnalyticsProvider>
      {children}
      <Toaster />
    </AnalyticsProvider>
  );
}
