import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { logThinkFlowStep } from '../../tracking/journeyEventLogger';
import type { JourneyState } from '../state/journeyState';

interface ThinkFlowProps {
  state: JourneyState;
  onStateChange: (state: JourneyState) => void;
}

export function ThinkFlow({ state, onStateChange }: ThinkFlowProps) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleAnswer = (key: string, value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (step < 5) {
      const currentKey = ['hesitation', 'questions', 'needs', 'possibility', 'time'][step - 1];
      const currentAnswer = answers[currentKey] || '';
      logThinkFlowStep(step, currentAnswer);
      setStep(step + 1);
    }
  };

  const handleBackToProposal = () => {
    const currentKey = ['hesitation', 'questions', 'needs', 'possibility', 'time'][step - 1];
    const currentAnswer = answers[currentKey] || '';
    logThinkFlowStep(step, currentAnswer);
    
    onStateChange({
      ...state,
      currentNodeId: 'proposal',
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl backdrop-blur-sm bg-white/90 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-serif text-center">
            Take Your Time 💭
          </CardTitle>
          <p className="text-center text-gray-600 mt-2">
            I understand... this is huge. Let me help you think through this...
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">
                What's making you hesitate? What's the main thing holding you back?
              </h3>
              <Textarea
                placeholder="Please be completely honest. What's really making you hesitate? What are you afraid of? What do you need to figure out?"
                value={answers.hesitation || ''}
                onChange={(e) => handleAnswer('hesitation', e.target.value)}
                className="min-h-32"
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">
                Is there anything you want to know about me? Any doubts you need cleared?
              </h3>
              <Textarea
                placeholder="Ask me ANYTHING. About my intentions, my feelings, my expectations, my fears, my past, my future plans, what this means to me, what I want from this... anything at all. I'll answer completely honestly."
                value={answers.questions || ''}
                onChange={(e) => handleAnswer('questions', e.target.value)}
                className="min-h-32"
              />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">
                What do you need from me to feel more sure? To feel safer?
              </h3>
              <Textarea
                placeholder="What would help me feel safer... what I need to hear... what would ease my fears... what I need to see..."
                value={answers.needs || ''}
                onChange={(e) => handleAnswer('needs', e.target.value)}
                className="min-h-32"
              />
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">
                Do you see a possibility of US together? Even if you're not ready to say yes right now?
              </h3>
              <Textarea
                placeholder="When I think about us together, I see... I feel... I worry about... I hope for..."
                value={answers.possibility || ''}
                onChange={(e) => handleAnswer('possibility', e.target.value)}
                className="min-h-32"
              />
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">
                How much time do you need to think about this?
              </h3>
              <Textarea
                placeholder="Just tonight, a few days, a week, or until it feels right..."
                value={answers.time || ''}
                onChange={(e) => handleAnswer('time', e.target.value)}
                className="min-h-32"
              />
              
              <div className="mt-8 p-6 bg-rose-50 rounded-lg">
                <p className="text-center text-gray-700 mb-4">
                  Take all the time you need, truly ❤️
                </p>
                <p className="text-center text-gray-600 text-sm">
                  मैं यहीं रहूँगा... waiting... hoping... but never forcing.
                </p>
              </div>
            </div>
          )}

          <div className="flex gap-4">
            {step < 5 ? (
              <Button onClick={handleNext} className="flex-1" size="lg">
                Continue →
              </Button>
            ) : (
              <>
                <Button onClick={handleBackToProposal} className="flex-1" size="lg">
                  I've thought about it... I have my answer now
                </Button>
                <Button variant="outline" className="flex-1" size="lg">
                  I still need more time
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
