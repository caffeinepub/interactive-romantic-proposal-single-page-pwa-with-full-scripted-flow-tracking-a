interface TrackingEvent {
  type: string;
  timestamp: number;
  data: any;
}

const EVENTS_KEY = 'romantic_proposal_events';

export function recordEvent(event: TrackingEvent): void {
  try {
    const events = getEvents();
    events.push(event);
    localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
  } catch (error) {
    console.error('Failed to record event:', error);
  }
}

export function getEvents(): TrackingEvent[] {
  try {
    const stored = localStorage.getItem(EVENTS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to get events:', error);
    return [];
  }
}

export function clearEvents(): void {
  try {
    localStorage.removeItem(EVENTS_KEY);
  } catch (error) {
    console.error('Failed to clear events:', error);
  }
}

export interface ExportData {
  journey: any;
  localEvents: TrackingEvent[];
  backendEvents?: any[];
  exportedAt: string;
}

export function prepareExportData(journey: any, backendEvents?: any[]): ExportData {
  return {
    journey,
    localEvents: getEvents(),
    backendEvents,
    exportedAt: new Date().toISOString(),
  };
}
