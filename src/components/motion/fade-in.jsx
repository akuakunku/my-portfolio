import { motion } from 'framer-motion';
import { fadeUp } from '../../constants/motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export function FadeIn({ children, className, delay = 0, as = 'div', ...props }) {
  const reduced = usePrefersReducedMotion();
  const Component = motion[as] || motion.div;

  if (reduced) {
    const Tag = as === 'div' ? 'div' : as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Component
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay }}
      {...props}
    >
      {children}
    </Component>
  );
}
