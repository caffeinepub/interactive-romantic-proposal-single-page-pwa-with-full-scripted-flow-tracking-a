import { getOrCreateVisitorId } from './visitorId';
import { enqueueEvent } from './backendQueue';
import { recordEvent } from './storage';

interface JourneyEventPayload {
  nodeId?: string;
  selectedOptions?: string[];
  textInputs?: Record<string, string>;
  decision?: string;
  noAttempts?: number;
  step?: number;
  stepText?: string;
  [key: string]: any;
}

export function logJourneyEvent(eventType: string, payload: JourneyEventPayload): void {
  const visitorId = getOrCreateVisitorId();
  const timestamp = Date.now();
  
  // Record locally for immediate UI feedback
  recordEvent({
    type: eventType,
    timestamp,
    data: { ...payload, visitorId },
  });

  // Enqueue for backend submission
  const details = JSON.stringify({
    visitorId,
    ...payload,
  });

  enqueueEvent({
    userId: visitorId,
    timestamp: BigInt(timestamp * 1000000), // Convert to nanoseconds
    eventType,
    details,
  });
}

export function logNodeView(nodeId: string): void {
  logJourneyEvent('node-view', { nodeId });
}

export function logAnswerSubmitted(nodeId: string, selectedOptions: string[], textInputs: Record<string, string>): void {
  logJourneyEvent('answer-submitted', {
    nodeId,
    selectedOptions,
    textInputs,
  });
}

export function logProposalDecision(decision: 'yes' | 'think' | 'no-attempt', noAttempts?: number): void {
  logJourneyEvent('proposal-decision', {
    decision,
    noAttempts,
  });
}

export function logThinkFlowStep(step: number, stepText: string): void {
  logJourneyEvent('think-flow-step', {
    step,
    stepText,
  });
}
