import { useEffect, useRef } from 'react';
import type { JourneyState } from '../journey/state/journeyState';

export function useActivityTracker(state: JourneyState) {
  const clickCountRef = useRef(0);
  const lastMousePosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Minimal local tracking for UI responsiveness testing
    // High-signal journey events are now tracked via journeyEventLogger
    const handleClick = () => {
      clickCountRef.current++;
    };

    const handleMouseMove = (e: MouseEvent) => {
      lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [state.currentNodeId]);
}
