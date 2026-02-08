import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { logAnswerSubmitted } from '../../tracking/journeyEventLogger';
import type { JourneyNode } from '../spec/journeyScript';

interface QuestionCardProps {
  node: JourneyNode;
  currentAnswer?: any;
  onAnswer: (answer: any) => void;
}

export function QuestionCard({ node, currentAnswer, onAnswer }: QuestionCardProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    currentAnswer?.options || []
  );
  const [textInputs, setTextInputs] = useState<Record<string, string>>(
    currentAnswer?.textInputs || {}
  );

  const handleOptionClick = (optionId: string) => {
    if (node.allowMultiple) {
      const newSelected = selectedOptions.includes(optionId)
        ? selectedOptions.filter(id => id !== optionId)
        : [...selectedOptions, optionId];
      setSelectedOptions(newSelected);
    } else {
      setSelectedOptions([optionId]);
    }
  };

  const handleTextInput = (optionId: string, value: string) => {
    setTextInputs(prev => ({ ...prev, [optionId]: value }));
  };

  const handleSubmit = () => {
    const answer = {
      options: selectedOptions,
      textInputs,
    };
    
    // Log the answer submission before transitioning
    logAnswerSubmitted(node.id, selectedOptions, textInputs);
    
    onAnswer(answer);
  };

  const canSubmit = selectedOptions.length > 0 || Object.keys(textInputs).some(key => textInputs[key]);

  return (
    <Card className="w-full max-w-3xl mx-auto backdrop-blur-sm bg-white/90 shadow-2xl border-2 border-rose-200">
      <CardHeader>
        {node.questionHindi && (
          <CardTitle className="text-3xl md:text-4xl font-hindi text-rose-600 mb-2">
            {node.questionHindi}
          </CardTitle>
        )}
        <CardTitle className="text-2xl md:text-3xl font-serif text-gray-800">
          {node.question}
        </CardTitle>
        {node.subtitle && (
          <CardDescription className="text-lg whitespace-pre-line">
            {node.subtitle}
          </CardDescription>
        )}
      </CardHeader>
      
      <CardContent className="space-y-4">
        {node.options?.map((option) => (
          <div key={option.id} className="space-y-2">
            <div
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-lg ${
                selectedOptions.includes(option.id)
                  ? 'border-rose-500 bg-rose-50'
                  : 'border-gray-200 hover:border-rose-300'
              }`}
              onClick={() => handleOptionClick(option.id)}
            >
              <div className="flex items-center gap-3">
                {node.allowMultiple ? (
                  <Checkbox
                    checked={selectedOptions.includes(option.id)}
                    onCheckedChange={() => handleOptionClick(option.id)}
                  />
                ) : (
                  <div className={`w-5 h-5 rounded-full border-2 ${
                    selectedOptions.includes(option.id)
                      ? 'border-rose-500 bg-rose-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedOptions.includes(option.id) && (
                      <div className="w-full h-full rounded-full bg-white scale-50" />
                    )}
                  </div>
                )}
                {option.emoji && <span className="text-2xl">{option.emoji}</span>}
                <Label className="text-lg cursor-pointer flex-1">
                  {option.label}
                </Label>
              </div>
            </div>
            
            {option.hasTextInput && selectedOptions.includes(option.id) && (
              <div className="ml-8">
                {option.placeholder && option.placeholder.length > 100 ? (
                  <Textarea
                    placeholder={option.placeholder}
                    value={textInputs[option.id] || ''}
                    onChange={(e) => handleTextInput(option.id, e.target.value)}
                    className="min-h-32"
                  />
                ) : (
                  <Input
                    placeholder={option.placeholder}
                    value={textInputs[option.id] || ''}
                    onChange={(e) => handleTextInput(option.id, e.target.value)}
                  />
                )}
              </div>
            )}
          </div>
        ))}
        
        {node.textArea && (
          <Textarea
            placeholder={node.textArea.placeholder}
            value={textInputs['main'] || ''}
            onChange={(e) => handleTextInput('main', e.target.value)}
            className="min-h-40"
            maxLength={node.textArea.maxLength}
          />
        )}
        
        <Button
          onClick={handleSubmit}
          disabled={!canSubmit}
          size="lg"
          className="w-full mt-6 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white text-xl py-6"
        >
          Continue →
        </Button>
      </CardContent>
    </Card>
  );
}
