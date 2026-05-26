import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { cn } from '../../lib/utils';

export function MagneticButton({
  children,
  className,
  variant = 'primary',
  href,
  onClick,
  type = 'button',
}) {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const variants = {
    primary:
      'bg-cyber-blue/10 border-cyber-blue text-cyber-blue shadow-glow-cyber hover:bg-cyber-blue hover:text-black',
    secondary:
      'bg-transparent border-white/20 text-white hover:border-cyber-purple hover:text-cyber-purple',
  };

  const classes = cn(
    'relative inline-flex items-center justify-center gap-2 rounded-xl border px-6 py-3 font-mono text-[10px] uppercase tracking-[0.25em] transition-premium md:text-xs',
    variants[variant],
    className
  );

  const onMove = (e) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setOffset({
      x: (e.clientX - r.left - r.width / 2) * 0.2,
      y: (e.clientY - r.top - r.height / 2) * 0.2,
    });
  };

  const inner = (
    <motion.span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      animate={reduced ? {} : { x: offset.x, y: offset.y }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      className="inline-flex items-center gap-2"
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>
        {inner}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {inner}
    </button>
  );
}
