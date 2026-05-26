import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export function Magnetic({ children, className, strength = 0.35 }) {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    setPosition({ x, y });
  };

  const handleLeave = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      animate={reduced ? {} : { x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
    >
      {children}
    </motion.div>
  );
}
