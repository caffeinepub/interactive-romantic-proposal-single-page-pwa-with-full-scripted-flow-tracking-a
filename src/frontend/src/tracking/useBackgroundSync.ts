import { useEffect } from 'react';
import { useActor } from '../hooks/useActor';
import { flushEventQueue, clearOldFailedEvents } from './sendToBackend';

export function useBackgroundSync() {
  const { actor } = useActor();

  useEffect(() => {
    if (!actor) return;

    // Initial flush
    flushEventQueue(actor);

    // Periodic flush every 30 seconds
    const interval = setInterval(() => {
      flushEventQueue(actor);
      clearOldFailedEvents();
    }, 30000);

    // Flush on page unload
    const handleUnload = () => {
      flushEventQueue(actor);
    };
    window.addEventListener('beforeunload', handleUnload);

    return () => {
      clearInterval(interval);
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, [actor]);
}
