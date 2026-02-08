import { useEffect, useRef } from 'react';

interface RosePetalsProps {
  intensity?: 'low' | 'medium' | 'high' | 'extreme';
}

export function RosePetals({ intensity = 'medium' }: RosePetalsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const countMap = {
      low: 15,
      medium: 30,
      high: 50,
      extreme: 80,
    };

    const petals: Array<{
      x: number;
      y: number;
      size: number;
      speed: number;
      rotation: number;
      rotationSpeed: number;
    }> = [];

    for (let i = 0; i < countMap[intensity]; i++) {
      petals.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 15 + 10,
        speed: Math.random() * 2 + 1,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2,
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      petals.forEach((petal) => {
        ctx.save();
        ctx.translate(petal.x, petal.y);
        ctx.rotate((petal.rotation * Math.PI) / 180);
        ctx.fillStyle = '#ff69b4';
        ctx.font = `${petal.size}px Arial`;
        ctx.fillText('🌸', -petal.size / 2, petal.size / 2);
        ctx.restore();

        petal.y += petal.speed;
        petal.rotation += petal.rotationSpeed;

        if (petal.y > canvas.height) {
          petal.y = -petal.size;
          petal.x = Math.random() * canvas.width;
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
    />
  );
}
