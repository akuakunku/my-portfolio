import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { cn } from '../../lib/utils';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const statusStyles = {
  Live: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Beta: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Archived: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
};

export function HoverCard({ project, index }) {
  const reduced = usePrefersReducedMotion();
  const link = project.liveUrl || project.githubUrl;

  return (
    <motion.article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl',
        'border border-border bg-surface',
        'transition-premium hover:-translate-y-1.5',
        'hover:border-primary/30 hover:shadow-glow-primary'
      )}
      initial={reduced ? false : { opacity: 0, y: 32 }}
      whileInView={reduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover transition-premium group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute top-3 right-3">
          <span
            className={cn(
              'rounded-full border px-2.5 py-0.5 text-xs font-medium',
              statusStyles[project.status] || statusStyles.Live
            )}
          >
            {project.status}
          </span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-2/90 text-foreground backdrop-blur-sm transition-premium hover:bg-primary hover:text-white"
              aria-label="GitHub"
              onClick={(e) => e.stopPropagation()}
            >
              <Github size={18} />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-2/90 text-foreground backdrop-blur-sm transition-premium hover:bg-secondary hover:text-white"
              aria-label="Live demo"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3 className="text-lg font-semibold tracking-tight text-foreground md:text-xl">
          {project.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted line-clamp-2">
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-border bg-surface-2 px-2 py-0.5 text-xs text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition-premium hover:gap-2"
          >
            View project
            <ExternalLink size={14} />
          </a>
        )}
      </div>
    </motion.article>
  );
}
