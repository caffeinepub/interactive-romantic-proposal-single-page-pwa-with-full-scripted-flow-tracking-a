import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';
import { Music, Pause, Play, Volume2, AlertCircle } from 'lucide-react';
import { useMusicSystem } from './useMusicSystem';
import { useState } from 'react';

export function MusicController() {
  const { isPlaying, volume, needsUserGesture, togglePlay, changeVolume } = useMusicSystem();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isExpanded ? (
        <Card className="p-4 space-y-3 backdrop-blur-sm bg-white/90 shadow-xl">
          {needsUserGesture && (
            <div className="flex items-start gap-2 text-xs text-amber-600 bg-amber-50 p-2 rounded">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>Autoplay is blocked by your browser. Music will start after your first interaction.</span>
            </div>
          )}
          <div className="flex items-center gap-3">
            <Button
              onClick={togglePlay}
              size="icon"
              variant="ghost"
              className="rounded-full"
            >
              {isPlaying ? <Pause /> : <Play />}
            </Button>
            <Button
              onClick={() => setIsExpanded(false)}
              size="icon"
              variant="ghost"
              className="rounded-full"
            >
              <Music />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4" />
            <Slider
              value={[volume * 100]}
              onValueChange={([v]) => changeVolume(v / 100)}
              max={100}
              step={1}
              className="w-32"
            />
          </div>
        </Card>
      ) : (
        <Button
          onClick={() => setIsExpanded(true)}
          size="icon"
          className="rounded-full shadow-lg bg-rose-500 hover:bg-rose-600"
        >
          <Music />
        </Button>
      )}
    </div>
  );
}
