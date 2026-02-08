import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export function useEasterEggs() {
  const [konamiIndex, setKonamiIndex] = useState(0);
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  useEffect(() => {
    let idleTimer: NodeJS.Timeout;

    const resetIdleTimer = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        toast("Still here? Still thinking? 💭\nTake your time... मैं कहीं नहीं जा रहा (I'm not going anywhere) 💕", {
          duration: 5000,
        });
      }, 30000);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === konamiCode[konamiIndex]) {
        const newIndex = konamiIndex + 1;
        setKonamiIndex(newIndex);
        
        if (newIndex === konamiCode.length) {
          toast("गुप्त संदेश मिल गया! Secret unlocked!\nYou're curious and playful... I love that about you 😊", {
            duration: 8000,
          });
          setKonamiIndex(0);
        }
      } else {
        setKonamiIndex(0);
      }
    };

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "जा रही हो? 😔 Leaving already?\nCome back soon? Your progress is saved 💕";
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        const hasLeft = sessionStorage.getItem('has_left');
        if (hasLeft === 'true') {
          toast("You came back! 💕\nI knew you would 😊", {
            duration: 5000,
          });
          sessionStorage.removeItem('has_left');
        }
      } else {
        sessionStorage.setItem('has_left', 'true');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousemove', resetIdleTimer);
    document.addEventListener('click', resetIdleTimer);
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    resetIdleTimer();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousemove', resetIdleTimer);
      document.removeEventListener('click', resetIdleTimer);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearTimeout(idleTimer);
    };
  }, [konamiIndex]);
}
