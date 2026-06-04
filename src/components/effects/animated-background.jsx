import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export function AnimatedBackground() {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute inset-0 bg-noise opacity-[0.03]" />
      <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent" />

      {!reduced && (
        <>
          <motion.div
            className="absolute -left-32 top-1/4 h-72 w-72 rounded-full bg-primary/20 blur-[100px]"
            animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -right-24 bottom-1/4 h-80 w-80 rounded-full bg-secondary/15 blur-[100px]"
            animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}
    </div>
  );
}
