import { Reveal } from '../motion/reveal';

export function SectionReveal({ children, className, delay = 0 }) {
  return (
    <Reveal className={className} delay={delay}>
      {children}
    </Reveal>
  );
}
