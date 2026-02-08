import { Principal } from '@dfinity/principal';
import type { backendInterface } from '../backend';
import { getRetryableEvents, removeFromQueue, markRetry, clearOldFailedEvents } from './backendQueue';

export async function flushEventQueue(actor: backendInterface | null): Promise<void> {
  if (!actor) return;

  const events = getRetryableEvents();
  
  for (const queuedEvent of events) {
    try {
      await actor.recordActivity({
        userId: Principal.fromText(queuedEvent.event.userId),
        timestamp: queuedEvent.event.timestamp,
        eventType: queuedEvent.event.eventType,
        details: queuedEvent.event.details,
      });
      removeFromQueue(queuedEvent.id);
    } catch (error) {
      console.error('Failed to send event to backend:', error);
      markRetry(queuedEvent.id);
    }
  }
}

export { clearOldFailedEvents };
