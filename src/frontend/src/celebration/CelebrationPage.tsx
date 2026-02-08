import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HeartParticles } from '../effects/HeartParticles';
import { RosePetals } from '../effects/RosePetals';
import { StarsOverlay } from '../effects/StarsOverlay';
import { useMusicSystem } from '../audio/useMusicSystem';
import type { JourneyState } from '../journey/state/journeyState';

interface CelebrationPageProps {
  journeyState: JourneyState;
}

export function CelebrationPage({ journeyState }: CelebrationPageProps) {
  const { changeTrack } = useMusicSystem();

  useEffect(() => {
    changeTrack('celebration');
  }, [changeTrack]);

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-yellow-100 via-pink-100 to-rose-100 overflow-hidden">
      <StarsOverlay intensity="high" />
      <HeartParticles intensity="extreme" />
      <RosePetals intensity="extreme" />
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-hindi text-rose-600 mb-4 glow-text animate-bounce">
            SHE SAID YES! 🎉💕✨
          </h1>
          <p className="text-3xl font-hindi text-rose-500 mb-2">
            तुमने हाँ कह दी! 💕
          </p>
          <p className="text-2xl text-gray-700">
            तुमने मेरी दुनिया रोशन कर दी
          </p>
          <p className="text-xl text-gray-600 mt-4">
            You have no idea how happy you just made me...
          </p>
        </div>

        <Card className="max-w-4xl mx-auto backdrop-blur-sm bg-white/90 shadow-2xl mb-8">
          <CardHeader>
            <CardTitle className="text-3xl font-serif text-center">
              Our Journey Timeline 💕
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-rose-50 rounded-lg">
                <span className="text-2xl">📅</span>
                <span className="text-lg">First Met: The beginning</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-rose-50 rounded-lg">
                <span className="text-2xl">📓</span>
                <span className="text-lg">Class 8th: When you drew hearts in my notebook</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-rose-50 rounded-lg">
                <span className="text-2xl">📸</span>
                <span className="text-lg">First Selfie: A captured moment</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-rose-50 rounded-lg">
                <span className="text-2xl">💋</span>
                <span className="text-lg">First Kiss: Unforgettable</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-yellow-100 rounded-lg border-2 border-yellow-400">
                <span className="text-2xl">💕</span>
                <span className="text-lg font-bold">TODAY - SHE SAID YES: {new Date().toLocaleDateString()}</span>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-rose-100 to-pink-100 rounded-lg">
              <p className="text-center text-xl font-hindi text-rose-600 mb-4">
                ये हमेशा मेरे दिल में रहेगा 💕
              </p>
              <p className="text-center text-gray-700">
                This will stay in my heart forever
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center space-y-6">
          <p className="text-2xl font-serif text-gray-800">
            This is just the beginning, love...
          </p>
          <p className="text-xl text-gray-700">
            Thank you for saying yes ❤️
          </p>
          <p className="text-lg text-gray-600">
            Now close this, text me, call me, come see me...
          </p>
          <p className="text-lg text-gray-600">
            Let's start our REAL story 💕
          </p>
          
          <div className="mt-8">
            <p className="text-2xl font-hindi text-rose-600">
              मोहब्बत हमेशा के लिए ❤️
            </p>
            <p className="text-lg text-gray-600 italic">
              Love, forever
            </p>
          </div>

          <div className="mt-12 space-y-2 text-sm text-gray-500">
            <p>P.S. - I'm still going to keep that selfie 📸</p>
            <p>P.P.S. - And I'll never forget those hearts you drew in Class 8th 📓❤️</p>
            <p>P.P.P.S. - I love you 💕</p>
          </div>
        </div>
      </div>
    </div>
  );
}
