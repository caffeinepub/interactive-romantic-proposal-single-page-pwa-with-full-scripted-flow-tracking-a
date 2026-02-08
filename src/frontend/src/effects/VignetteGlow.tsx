interface VignetteGlowProps {
  intensity?: 'low' | 'medium' | 'high';
}

export function VignetteGlow({ intensity = 'medium' }: VignetteGlowProps) {
  const opacityMap = {
    low: 0.2,
    medium: 0.4,
    high: 0.6,
  };

  return (
    <div
      className="fixed inset-0 pointer-events-none z-5"
      style={{
        backgroundImage: 'url(/assets/generated/vignette-glow.dim_1920x1080.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: opacityMap[intensity],
      }}
    />
  );
}
