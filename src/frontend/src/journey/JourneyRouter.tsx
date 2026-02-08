import { useState, useEffect } from 'react';
import { LandingPage } from './pages/LandingPage';
import { JourneyRenderer } from './JourneyRenderer';
import { CelebrationPage } from '../celebration/CelebrationPage';
import { AdminRouter } from '../admin/AdminRouter';
import { loadJourneyState, saveJourneyState } from './state/persistence';
import { useAutosave } from './state/useAutosave';
import type { JourneyState } from './state/journeyState';

export function JourneyRouter() {
  const [route, setRoute] = useState<'landing' | 'journey' | 'celebration' | 'admin'>('landing');
  const [journeyState, setJourneyState] = useState<JourneyState | null>(null);

  useEffect(() => {
    const path = window.location.hash.slice(1) || '/';
    if (path.startsWith('/admin') || path.startsWith('/dashboard')) {
      setRoute('admin');
    } else {
      const saved = loadJourneyState();
      if (saved && saved.currentNodeId !== 'landing') {
        setJourneyState(saved);
        if (saved.finalDecision === 'yes') {
          setRoute('celebration');
        } else {
          setRoute('journey');
        }
      }
    }
  }, []);

  useAutosave(journeyState);

  const handleStart = () => {
    const newState: JourneyState = {
      currentNodeId: 'section1-q1',
      answers: {},
      startTime: Date.now(),
      lastActiveTime: Date.now(),
      progress: 10,
      noAttempts: 0,
      finalDecision: null,
    };
    setJourneyState(newState);
    saveJourneyState(newState);
    setRoute('journey');
  };

  const handleStateChange = (newState: JourneyState) => {
    setJourneyState(newState);
    saveJourneyState(newState);
    
    if (newState.finalDecision === 'yes') {
      setRoute('celebration');
    }
  };

  if (route === 'admin') {
    return <AdminRouter />;
  }

  if (route === 'celebration' && journeyState) {
    return <CelebrationPage journeyState={journeyState} />;
  }

  if (route === 'journey' && journeyState) {
    return <JourneyRenderer state={journeyState} onStateChange={handleStateChange} />;
  }

  return <LandingPage onStart={handleStart} />;
}
