interface QueuedEvent {
  id: string;
  event: {
    userId: string;
    timestamp: bigint;
    eventType: string;
    details: string;
  };
  retryCount: number;
  lastAttempt?: number;
}

const QUEUE_KEY = 'romantic_proposal_event_queue';
const MAX_RETRIES = 3;
const RETRY_DELAY = 5000; // 5 seconds

export function enqueueEvent(event: QueuedEvent['event']): void {
  try {
    const queue = getQueue();
    const queuedEvent: QueuedEvent = {
      id: `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      event,
      retryCount: 0,
    };
    queue.push(queuedEvent);
    localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
  } catch (error) {
    console.error('Failed to enqueue event:', error);
  }
}

export function getQueue(): QueuedEvent[] {
  try {
    const stored = localStorage.getItem(QUEUE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to get queue:', error);
    return [];
  }
}

export function removeFromQueue(eventId: string): void {
  try {
    const queue = getQueue().filter(e => e.id !== eventId);
    localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
  } catch (error) {
    console.error('Failed to remove from queue:', error);
  }
}

export function markRetry(eventId: string): void {
  try {
    const queue = getQueue();
    const event = queue.find(e => e.id === eventId);
    if (event) {
      event.retryCount++;
      event.lastAttempt = Date.now();
      localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
    }
  } catch (error) {
    console.error('Failed to mark retry:', error);
  }
}

export function getRetryableEvents(): QueuedEvent[] {
  const queue = getQueue();
  const now = Date.now();
  return queue.filter(e => {
    if (e.retryCount >= MAX_RETRIES) return false;
    if (!e.lastAttempt) return true;
    return now - e.lastAttempt > RETRY_DELAY;
  });
}

export function clearOldFailedEvents(): void {
  try {
    const queue = getQueue().filter(e => e.retryCount < MAX_RETRIES);
    localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
  } catch (error) {
    console.error('Failed to clear old events:', error);
  }
}
