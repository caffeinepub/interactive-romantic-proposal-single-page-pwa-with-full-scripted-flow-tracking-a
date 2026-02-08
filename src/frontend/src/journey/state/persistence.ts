import type { JourneyState } from './journeyState';

const STORAGE_KEY = 'romantic_proposal_journey';

export function saveJourneyState(state: JourneyState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save journey state:', error);
  }
}

export function loadJourneyState(): JourneyState | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error('Failed to load journey state:', error);
    return null;
  }
}

export function clearJourneyState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear journey state:', error);
  }
}
