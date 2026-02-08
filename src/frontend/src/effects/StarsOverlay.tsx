interface StarsOverlayProps {
  intensity?: 'low' | 'medium' | 'high';
}

export function StarsOverlay({ intensity = 'medium' }: StarsOverlayProps) {
  const opacityMap = {
    low: 0.3,
    medium: 0.5,
    high: 0.7,
  };

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 animate-twinkle"
      style={{
        backgroundImage: 'url(/assets/generated/stars-overlay.dim_1920x1080.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: opacityMap[intensity],
      }}
    />
  );
}
