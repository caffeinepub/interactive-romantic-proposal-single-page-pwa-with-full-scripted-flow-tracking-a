import { useCallback } from 'react';
import { useMusicContext } from './MusicProvider';
import type { TrackKey } from './playlist';

export function useMusicSystem() {
  const context = useMusicContext();

  const startMusic = useCallback(async (track: TrackKey) => {
    context.setTrack(track);
    await context.play();
  }, [context]);

  const changeTrack = useCallback((track: TrackKey) => {
    context.setTrack(track);
  }, [context]);

  const togglePlay = useCallback(() => {
    context.toggle();
  }, [context]);

  const changeVolume = useCallback((newVolume: number) => {
    context.setVolume(newVolume);
  }, [context]);

  return {
    isPlaying: context.isPlaying,
    currentTrack: context.currentTrack,
    volume: context.volume,
    needsUserGesture: context.needsUserGesture,
    userPaused: context.userPaused,
    startMusic,
    changeTrack,
    togglePlay,
    changeVolume,
  };
}
