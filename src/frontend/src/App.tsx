import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import { JourneyRouter } from './journey/JourneyRouter';
import { MusicController } from './audio/MusicController';
import { MusicProvider } from './audio/MusicProvider';
import { useEasterEggs } from './easter-eggs/useEasterEggs';
import { useEffect } from 'react';
import { registerServiceWorker } from './pwa/registerServiceWorker';

const queryClient = new QueryClient();

function AppContent() {
  useEasterEggs();

  useEffect(() => {
    registerServiceWorker();
  }, []);

  return (
    <MusicProvider>
      <div className="min-h-screen relative overflow-x-hidden">
        <MusicController />
        <JourneyRouter />
        <Toaster />
      </div>
    </MusicProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
