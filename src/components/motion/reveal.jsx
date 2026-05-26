import { motion } from 'framer-motion';
import { fadeUp } from '../../constants/motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export function Reveal({ children, className, delay = 0 }) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
