import { useEffect, useRef } from 'react';
import { saveJourneyState } from './persistence';
import type { JourneyState } from './journeyState';

export function useAutosave(state: JourneyState | null) {
  const lastSaveRef = useRef<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    if (!state) return;

    // Save every 30 seconds
    intervalRef.current = setInterval(() => {
      const now = Date.now();
      if (now - lastSaveRef.current >= 30000) {
        saveJourneyState(state);
        lastSaveRef.current = now;
      }
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [state]);

  // Save on state change
  useEffect(() => {
    if (state) {
      saveJourneyState(state);
      lastSaveRef.current = Date.now();
    }
  }, [state]);
}
