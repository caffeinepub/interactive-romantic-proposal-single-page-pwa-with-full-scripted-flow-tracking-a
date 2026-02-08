import type { TrackKey } from '../audio/playlist';

export interface SectionTheme {
  background: string;
  starsIntensity: 'low' | 'medium' | 'high';
  heartsIntensity: 'low' | 'medium' | 'high' | 'extreme';
  petalsIntensity: 'low' | 'medium' | 'high' | 'extreme';
  glowIntensity: 'low' | 'medium' | 'high';
  musicTrack?: TrackKey;
}

export function getSectionTheme(nodeId: string): SectionTheme {
  if (nodeId.startsWith('section1')) {
    return {
      background: 'bg-gradient-to-br from-rose-50 via-purple-50 to-pink-50',
      starsIntensity: 'low',
      heartsIntensity: 'low',
      petalsIntensity: 'low',
      glowIntensity: 'low',
      musicTrack: 'opening',
    };
  }

  if (nodeId.startsWith('section2')) {
    return {
      background: 'bg-gradient-to-br from-yellow-50 via-rose-50 to-pink-100',
      starsIntensity: 'medium',
      heartsIntensity: 'medium',
      petalsIntensity: 'medium',
      glowIntensity: 'medium',
      musicTrack: 'early',
    };
  }

  if (nodeId.startsWith('section3')) {
    return {
      background: 'bg-gradient-to-br from-amber-100 via-orange-50 to-rose-100 sepia',
      starsIntensity: 'medium',
      heartsIntensity: 'medium',
      petalsIntensity: 'medium',
      glowIntensity: 'medium',
      musicTrack: 'memory',
    };
  }

  if (nodeId.startsWith('section4')) {
    return {
      background: 'bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900',
      starsIntensity: 'high',
      heartsIntensity: 'low',
      petalsIntensity: 'low',
      glowIntensity: 'high',
      musicTrack: 'memory',
    };
  }

  if (nodeId.startsWith('section5') || nodeId.startsWith('section6')) {
    return {
      background: 'bg-gradient-to-br from-rose-100 via-pink-100 to-purple-100',
      starsIntensity: 'medium',
      heartsIntensity: 'high',
      petalsIntensity: 'high',
      glowIntensity: 'medium',
      musicTrack: 'buildup',
    };
  }

  if (nodeId.startsWith('section7') || nodeId === 'proposal') {
    return {
      background: 'bg-gradient-to-br from-purple-200 via-pink-200 to-rose-200',
      starsIntensity: 'high',
      heartsIntensity: 'high',
      petalsIntensity: 'high',
      glowIntensity: 'high',
      musicTrack: 'proposal',
    };
  }

  return {
    background: 'bg-gradient-to-br from-rose-50 to-pink-50',
    starsIntensity: 'medium',
    heartsIntensity: 'medium',
    petalsIntensity: 'medium',
    glowIntensity: 'medium',
  };
}
