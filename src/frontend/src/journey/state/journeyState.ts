export interface JourneyState {
  currentNodeId: string;
  answers: Record<string, {
    value: any;
    timestamp: number;
    timeSpent: number;
  }>;
  startTime: number;
  lastActiveTime: number;
  progress: number;
  noAttempts: number;
  finalDecision: 'yes' | 'no' | 'think' | null;
}
