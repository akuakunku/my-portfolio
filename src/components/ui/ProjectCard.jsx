import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { cn } from '../../lib/utils';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const statusClass = {
  LIVE: 'text-green-400 border-green-500/30 bg-green-500/10',
  BETA: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10',
  ARCHIVED: 'text-gray-400 border-gray-500/30 bg-gray-500/10',
};

export function ProjectCard({
  project,
  index,
  isMobile,
  expandedProject,
  onCardClick,
  gridClass,
}) {
  const reduced = usePrefersReducedMotion();
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const isExpanded = isMobile && expandedProject === project.id;
  const isHovered = !isMobile && hovered;

  const handleMove = (e) => {
    if (reduced || isMobile || !cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: y * -8, y: x * 8 });
  };

  const motionProps = reduced
    ? {}
    : {
        initial: { y: 32 },
        whileInView: { y: 0 },
        viewport: { once: true, amount: 0.15 },
        transition: { duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] },
      };

  return (
    <motion.article
      ref={cardRef}
      className={cn(
        'project-card-premium group relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-xl md:min-h-0',
        gridClass,
        isMobile && 'cursor-pointer active:scale-[0.98]',
        isMobile && (isExpanded ? 'min-h-[400px]' : 'min-h-[280px]')
      )}
      style={
        !isMobile && !reduced
          ? { transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }
          : undefined
      }
      onMouseMove={handleMove}
      onMouseLeave={() => {
        setHovered(false);
        setTilt({ x: 0, y: 0 });
      }}
      onMouseEnter={() => !isMobile && setHovered(true)}
      onClick={() => onCardClick(project.id)}
      {...motionProps}
    >
      <div className="gradient-border pointer-events-none absolute inset-0 z-[1] rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-0 flex h-full min-h-[inherit] flex-col overflow-hidden rounded-xl border border-white/5 bg-[#0a0a0c] transition-premium group-hover:-translate-y-1.5 group-hover:border-cyber-blue/40 group-hover:shadow-glow-cyber">
        <div className="absolute inset-0 z-0 min-h-[200px]">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className={cn(
              'h-full w-full object-cover transition-premium duration-500',
              isMobile ? 'opacity-50' : 'opacity-40 grayscale',
              (isHovered || isExpanded) && 'scale-105 opacity-60 grayscale-0'
            )}
          />
          <div
            className={cn(
              'absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent transition-opacity',
              isExpanded ? 'opacity-100' : 'opacity-90'
            )}
          />
          <div
            className={cn(
              'absolute inset-0 bg-gradient-to-br from-cyber-blue/0 via-transparent to-cyber-purple/0 transition-opacity duration-500',
              isHovered && 'from-cyber-blue/10 to-cyber-purple/10 opacity-100'
            )}
          />
        </div>

        <div
          className={cn(
            'absolute top-3 right-3 z-20 flex flex-wrap justify-end gap-1 transition-all duration-500',
            isMobile ? '' : 'translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100'
          )}
        >
          {project.tech?.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-md border border-cyber-blue/25 bg-black/60 px-2 py-0.5 font-mono text-[6px] uppercase tracking-wider text-cyber-blue backdrop-blur-sm md:text-[7px]"
            >
              {t}
            </span>
          ))}
        </div>

        <div
          className={cn(
            'absolute top-3 left-3 z-20 rounded-full border px-2 py-0.5 font-mono text-[7px] font-bold uppercase tracking-wider',
            statusClass[project.status] || statusClass.LIVE
          )}
        >
          {project.status}
        </div>

        <div
          className={cn(
            'relative z-10 flex h-full flex-col p-4 md:p-6 transition-all duration-500',
            isExpanded ? 'justify-start pt-12' : 'justify-end'
          )}
        >
          <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
            <span className="font-mono text-[7px] uppercase tracking-widest text-cyber-blue md:text-[9px]">
              {project.subtitle}
            </span>
            <span className="hidden font-mono text-[8px] text-gray-500 md:block">{project.date}</span>
          </div>

          <h3
            className={cn(
              'font-black uppercase tracking-tighter transition-all duration-500 group-hover:text-cyber-blue',
              project.size === 'large' ? 'text-2xl md:text-5xl' : 'text-lg md:text-2xl',
              isMobile && 'text-xl'
            )}
          >
            {project.title.replace(/_/g, ' ')}
          </h3>

          {(!isMobile || isExpanded) && (
            <div
              className={cn(
                'mt-3 border-l-2 border-cyber-blue/30 pl-3 transition-all duration-500 md:pl-4',
                !isMobile && 'translate-x-[-8px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
              )}
            >
              <p className="line-clamp-3 font-mono text-[9px] uppercase leading-relaxed tracking-wider text-gray-400 md:text-xs">
                {project.description}
              </p>
              {isMobile && project.tech && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded border border-cyber-blue/20 bg-cyber-blue/10 px-1.5 py-0.5 font-mono text-[6px] text-cyber-blue"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-[7px] uppercase tracking-[0.2em] text-white/50 transition-premium hover:gap-3 hover:text-cyber-blue md:text-[9px]"
              onClick={(e) => e.stopPropagation()}
            >
              [ ACCESS ]
              <ExternalLink size={12} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            {project.link?.includes('github') && (
              <FaGithub className="text-gray-600 transition-colors group-hover:text-cyber-blue" size={14} />
            )}
            <span className="font-mono text-[7px] text-gray-600">#{project.id}</span>
          </div>
        </div>

        <div className="absolute top-0 left-0 z-20 h-px w-full -translate-y-full bg-gradient-to-r from-transparent via-cyber-blue to-transparent transition-transform duration-500 group-hover:translate-y-0" />
      </div>
    </motion.article>
  );
}
