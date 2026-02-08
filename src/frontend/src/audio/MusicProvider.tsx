import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import { playlist, type TrackKey } from './playlist';

interface MusicContextValue {
  isPlaying: boolean;
  currentTrack: TrackKey;
  intendedTrack: TrackKey;
  volume: number;
  needsUserGesture: boolean;
  userPaused: boolean;
  play: () => Promise<void>;
  pause: () => void;
  toggle: () => void;
  setVolume: (volume: number) => void;
  setTrack: (track: TrackKey) => void;
}

const MusicContext = createContext<MusicContextValue | null>(null);

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<TrackKey>('opening');
  const [intendedTrack, setIntendedTrack] = useState<TrackKey>('opening');
  const [volume, setVolumeState] = useState(0.5);
  const [needsUserGesture, setNeedsUserGesture] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const autoplayAttemptedRef = useRef(false);
  const firstInteractionListenersAttachedRef = useRef(false);

  // Initialize audio element once
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
      audioRef.current.volume = volume;
      audioRef.current.src = playlist['opening'];
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  // Attempt autoplay on mount
  useEffect(() => {
    if (autoplayAttemptedRef.current || !audioRef.current) return;
    autoplayAttemptedRef.current = true;

    const attemptAutoplay = async () => {
      try {
        await audioRef.current!.play();
        setIsPlaying(true);
        setNeedsUserGesture(false);
        setUserPaused(false);
      } catch (error) {
        console.log('Autoplay blocked, will retry on first user interaction');
        setNeedsUserGesture(true);
        attachFirstInteractionListeners();
      }
    };

    attemptAutoplay();
  }, []);

  // Attach one-time listeners for first user interaction
  const attachFirstInteractionListeners = useCallback(() => {
    if (firstInteractionListenersAttachedRef.current) return;
    firstInteractionListenersAttachedRef.current = true;

    const events = ['pointerdown', 'click', 'touchstart', 'keydown'];
    
    const handleFirstInteraction = async () => {
      if (!audioRef.current || isPlaying) return;

      try {
        await audioRef.current.play();
        setIsPlaying(true);
        setNeedsUserGesture(false);
        setUserPaused(false);
        
        // Remove all listeners after successful play
        events.forEach(event => {
          document.removeEventListener(event, handleFirstInteraction);
        });
      } catch (error) {
        console.log('Play attempt failed on first interaction');
      }
    };

    events.forEach(event => {
      document.addEventListener(event, handleFirstInteraction, { once: true });
    });
  }, [isPlaying]);

  // Handle visibility/focus changes for background persistence
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden || !audioRef.current) return;
      
      // Only resume if user didn't explicitly pause and audio was playing
      if (!userPaused && intendedTrack && !isPlaying) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // Autoplay restrictions still apply, keep best-effort
        });
      }
    };

    const handleFocus = () => {
      if (!audioRef.current) return;
      
      // Only resume if user didn't explicitly pause
      if (!userPaused && intendedTrack && !isPlaying) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // Autoplay restrictions still apply
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [userPaused, intendedTrack, isPlaying]);

  const play = useCallback(async () => {
    if (!audioRef.current) return;

    try {
      await audioRef.current.play();
      setIsPlaying(true);
      setNeedsUserGesture(false);
      setUserPaused(false);
    } catch (error) {
      console.log('Play failed, user gesture may be required');
      setNeedsUserGesture(true);
    }
  }, []);

  const pause = useCallback(() => {
    if (!audioRef.current) return;
    
    audioRef.current.pause();
    setIsPlaying(false);
    setUserPaused(true);
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  const setVolume = useCallback((newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolumeState(newVolume);
    }
  }, []);

  const setTrack = useCallback((track: TrackKey) => {
    if (!audioRef.current) return;

    setIntendedTrack(track);
    setCurrentTrack(track);
    
    const wasPlaying = isPlaying;
    audioRef.current.src = playlist[track];
    
    if (wasPlaying && !userPaused) {
      audioRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, [isPlaying, userPaused]);

  const value: MusicContextValue = {
    isPlaying,
    currentTrack,
    intendedTrack,
    volume,
    needsUserGesture,
    userPaused,
    play,
    pause,
    toggle,
    setVolume,
    setTrack,
  };

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
}

export function useMusicContext() {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusicContext must be used within MusicProvider');
  }
  return context;
}
