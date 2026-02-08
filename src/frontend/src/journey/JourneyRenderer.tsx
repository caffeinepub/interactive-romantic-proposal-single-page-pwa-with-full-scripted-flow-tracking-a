import { useEffect } from 'react';
import { journeyScript } from './spec/journeyScript';
import { QuestionCard } from './components/QuestionCard';
import { ProposalQuestion } from './proposal/ProposalQuestion';
import { ThinkFlow } from './proposal/ThinkFlow';
import { ProgressIndicator } from './components/ProgressIndicator';
import { StarsOverlay } from '../effects/StarsOverlay';
import { HeartParticles } from '../effects/HeartParticles';
import { RosePetals } from '../effects/RosePetals';
import { VignetteGlow } from '../effects/VignetteGlow';
import { getSectionTheme } from '../theme/sectionThemes';
import { useMusicSystem } from '../audio/useMusicSystem';
import { useActivityTracker } from '../tracking/useActivityTracker';
import { logNodeView } from '../tracking/journeyEventLogger';
import { useBackgroundSync } from '../tracking/useBackgroundSync';
import type { JourneyState } from './state/journeyState';

interface JourneyRendererProps {
  state: JourneyState;
  onStateChange: (state: JourneyState) => void;
}

export function JourneyRenderer({ state, onStateChange }: JourneyRendererProps) {
  const currentNode = journeyScript.nodes[state.currentNodeId];
  const theme = getSectionTheme(state.currentNodeId);
  const { changeTrack } = useMusicSystem();
  
  useActivityTracker(state);
  useBackgroundSync();

  useEffect(() => {
    if (theme.musicTrack) {
      changeTrack(theme.musicTrack);
    }
  }, [theme.musicTrack, changeTrack]);

  useEffect(() => {
    logNodeView(state.currentNodeId);
  }, [state.currentNodeId]);

  const handleAnswer = (answer: any) => {
    const newState: JourneyState = {
      ...state,
      answers: {
        ...state.answers,
        [state.currentNodeId]: {
          value: answer,
          timestamp: Date.now(),
          timeSpent: Date.now() - state.lastActiveTime,
        },
      },
      lastActiveTime: Date.now(),
    };

    if (currentNode.nextNode) {
      const nextNodeId = typeof currentNode.nextNode === 'function' 
        ? currentNode.nextNode(answer) 
        : currentNode.nextNode;
      
      newState.currentNodeId = nextNodeId;
      newState.progress = journeyScript.nodes[nextNodeId]?.progress || state.progress;
    }

    onStateChange(newState);
  };

  if (!currentNode) {
    return <div>Loading...</div>;
  }

  if (currentNode.type === 'proposal') {
    return (
      <div className={`min-h-screen relative ${theme.background}`}>
        <StarsOverlay intensity={theme.starsIntensity} />
        <HeartParticles intensity={theme.heartsIntensity} />
        <RosePetals intensity={theme.petalsIntensity} />
        <VignetteGlow intensity={theme.glowIntensity} />
        
        <ProposalQuestion state={state} onStateChange={onStateChange} />
      </div>
    );
  }

  if (currentNode.type === 'think-flow') {
    return (
      <div className={`min-h-screen relative ${theme.background}`}>
        <StarsOverlay intensity={theme.starsIntensity} />
        <HeartParticles intensity={theme.heartsIntensity} />
        
        <ThinkFlow state={state} onStateChange={onStateChange} />
      </div>
    );
  }

  return (
    <div className={`min-h-screen relative ${theme.background}`}>
      <StarsOverlay intensity={theme.starsIntensity} />
      <HeartParticles intensity={theme.heartsIntensity} />
      <RosePetals intensity={theme.petalsIntensity} />
      <VignetteGlow intensity={theme.glowIntensity} />
      
      <ProgressIndicator progress={state.progress} />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <QuestionCard
          node={currentNode}
          currentAnswer={state.answers[state.currentNodeId]?.value}
          onAnswer={handleAnswer}
        />
      </div>
    </div>
  );
}
