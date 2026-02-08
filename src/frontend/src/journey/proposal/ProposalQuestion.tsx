import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { noButtonMechanics } from './noButtonMechanics';
import { logProposalDecision } from '../../tracking/journeyEventLogger';
import type { JourneyState } from '../state/journeyState';

interface ProposalQuestionProps {
  state: JourneyState;
  onStateChange: (state: JourneyState) => void;
}

export function ProposalQuestion({ state, onStateChange }: ProposalQuestionProps) {
  const [noAttempts, setNoAttempts] = useState(state.noAttempts);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const noButtonState = noButtonMechanics(noAttempts);

  const handleYes = () => {
    logProposalDecision('yes', noAttempts);
    onStateChange({
      ...state,
      finalDecision: 'yes',
      currentNodeId: 'celebration',
    });
  };

  const handleThink = () => {
    logProposalDecision('think', noAttempts);
    onStateChange({
      ...state,
      currentNodeId: 'think-flow',
    });
  };

  const handleNoAttempt = () => {
    const newNoAttempts = noAttempts + 1;
    setNoAttempts(newNoAttempts);
    logProposalDecision('no-attempt', newNoAttempts);
    onStateChange({
      ...state,
      noAttempts: newNoAttempts,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" onMouseMove={handleMouseMove}>
      <div className="text-center max-w-4xl space-y-12 animate-fade-in">
        <div className="space-y-6">
          <h1 className="text-5xl md:text-7xl font-hindi text-rose-600 glow-text">
            Will you be mine? ❤️
          </h1>
          <p className="text-2xl md:text-3xl font-serif text-gray-800">
            Not just for today, but for all the tomorrows we can create together?
          </p>
          <p className="text-3xl font-hindi text-rose-500">
            क्या तुम मेरी होगी?
          </p>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Will you let me love you the way you deserve to be loved?
            Will you be my partner, my person, my forever?
          </p>
        </div>

        <div className="flex flex-col items-center gap-6">
          <Button
            onClick={handleYes}
            size="lg"
            className="text-3xl px-16 py-10 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white shadow-2xl animate-pulse-glow min-w-[300px]"
          >
            YES! 💕
          </Button>

          <Button
            onClick={handleThink}
            size="lg"
            variant="outline"
            className="text-xl px-12 py-6 rounded-full border-2 border-purple-400 hover:bg-purple-50 min-w-[250px]"
          >
            I need to think 🤔
          </Button>

          {!noButtonState.hidden && (
            <Button
              onClick={handleNoAttempt}
              size="sm"
              variant="ghost"
              className="text-lg px-8 py-4 rounded-full text-gray-500 hover:bg-gray-100"
              style={{
                transform: noButtonState.shouldMove 
                  ? `translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px)`
                  : 'none',
                transition: 'transform 0.3s ease',
                fontSize: noButtonState.scale ? `${noButtonState.scale}rem` : '1rem',
              }}
            >
              {noButtonState.text}
            </Button>
          )}

          {noButtonState.message && (
            <p className="text-rose-500 font-hindi text-xl animate-fade-in">
              {noButtonState.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
