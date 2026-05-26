import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export function HeroSpotlight() {
  const reduced = usePrefersReducedMotion();
  const [pos, setPos] = useState({ x: '50%', y: '40%' });

  useEffect(() => {
    if (reduced) return;
    const onMove = (e) => setPos({ x: `${e.clientX}px`, y: `${e.clientY}px` });
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [reduced]);

  if (reduced) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[15] mix-blend-soft-light"
      aria-hidden
      style={{
        background: `radial-gradient(600px circle at ${pos.x} ${pos.y}, rgba(0,243,255,0.14), transparent 55%)`,
      }}
    />
  );
}
