import { motion } from 'framer-motion';
import { EASE_PREMIUM } from '../../constants/motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export function TextReveal({ text, className, as: Tag = 'span', delay = 0 }) {
  const reduced = usePrefersReducedMotion();
  const words = text.split(' ');

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: delay + i * 0.04,
              ease: EASE_PREMIUM,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
