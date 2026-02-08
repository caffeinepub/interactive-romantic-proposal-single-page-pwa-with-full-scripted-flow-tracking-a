import { Button } from '@/components/ui/button';
import { StarsOverlay } from '../../effects/StarsOverlay';
import { HeartParticles } from '../../effects/HeartParticles';

interface LandingPageProps {
  onStart: () => void;
}

export function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-rose-50 via-purple-50 to-pink-50">
      <StarsOverlay intensity="low" />
      <HeartParticles intensity="low" />
      
      <div className="text-center z-10 px-4 max-w-2xl animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-hindi mb-6 text-rose-600 glow-text">
          कुछ सवाल हैं... जवाब देने की हिम्मत है?
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-4 font-serif italic">
          Some questions... do you dare to answer?
        </p>
        <p className="text-lg text-gray-600 mb-8">
          This will take 10-15 minutes... but it'll be worth every second 💕
        </p>
        <p className="text-sm text-gray-500 mb-12">
          Some questions test your memory of US... let's see how much you remember 😊
        </p>
        
        <Button
          onClick={onStart}
          size="lg"
          className="text-2xl px-12 py-8 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-2xl animate-pulse-glow font-hindi"
        >
          शुरू करें
        </Button>
      </div>
    </div>
  );
}
