import { motion } from 'framer-motion';
import { ArrowDown, Github } from 'lucide-react';
import { FaInstagram } from 'react-icons/fa';
import { site } from '../../data/site';
import { EASE_PREMIUM } from '../../constants/motion';
import { AnimatedBackground } from '../effects/animated-background';
import { MouseGlow } from '../effects/mouse-glow';
import { Stagger, StaggerItem } from '../motion/stagger';
import { MagneticButton } from '../ui/magnetic-button';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const HeroSection = () => {
  const reduced = usePrefersReducedMotion();

  const scrollToProjects = () => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-32 md:pb-20"
    >
      <AnimatedBackground />
      <MouseGlow />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 px-5 md:grid-cols-2 md:items-center md:gap-16 md:px-8">
        <Stagger className="order-2 md:order-1">
          <StaggerItem>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              {site.badge}
            </span>
          </StaggerItem>

          <StaggerItem>
            <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              Building modern digital{' '}
              <span className="gradient-text">experiences</span> for the web.
            </h1>
          </StaggerItem>

          <StaggerItem>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted md:text-lg">
              {site.description}
            </p>
          </StaggerItem>

          <StaggerItem>
            <div className="mt-8 flex flex-wrap gap-3">
              <MagneticButton variant="primary" onClick={scrollToProjects}>
                View projects
              </MagneticButton>
              <MagneticButton variant="secondary" href={site.github}>
                GitHub
              </MagneticButton>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="mt-8 flex items-center gap-4">
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted transition-premium hover:text-primary"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted transition-premium hover:text-primary"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </StaggerItem>
        </Stagger>

        <motion.div
          className="relative order-1 flex justify-center md:order-2"
          initial={reduced ? false : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE_PREMIUM, delay: 0.2 }}
        >
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-primary/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-2xl border border-border bg-surface p-2 shadow-glow-primary">
              <img
                src={site.avatar}
                alt={site.fullName}
                className="h-64 w-64 rounded-xl object-cover md:h-80 md:w-80"
                loading="eager"
              />
              <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-border/80 bg-background/80 px-4 py-3 backdrop-blur-md">
                <p className="text-sm font-semibold text-foreground">{site.fullName}</p>
                <p className="text-xs text-muted">{site.title}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.button
        type="button"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-28 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-muted md:bottom-12"
        animate={reduced ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        aria-label="Scroll down"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <ArrowDown size={18} />
      </motion.button>
    </section>
  );
};

export default HeroSection;
