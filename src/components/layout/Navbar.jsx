import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navLinks, site } from '../../data/site';
import { techStack } from '../../data/tech';
import { useRef } from 'react';
import { cn } from '../../lib/utils';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [stackOpen, setStackOpen] = useState(false);
  const techNavRef = useRef(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== '/') return;
    const hash = location.hash.replace('#', '');
    if (hash) {
      setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' }), 300);
    }
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (location.pathname !== '/') return;

    const sections = navLinks.map((l) => document.getElementById(l.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [location.pathname]);

  // Drag-to-scroll for navbar tech chips
  useEffect(() => {
    const el = techNavRef.current;
    if (!el) return;
    const onPointerDown = (e) => {
      isDragging.current = true;
      let startX = 0;
      if (e.touches && e.touches[0] && typeof e.touches[0].clientX !== 'undefined') startX = e.touches[0].clientX;
      else if (typeof e.clientX !== 'undefined') startX = e.clientX;
      dragStartX.current = startX;
      dragStartScroll.current = el.scrollLeft;
    };
    const onPointerMove = (e) => {
      if (!isDragging.current) return;
      let clientX = 0;
      if (e.touches && e.touches[0] && typeof e.touches[0].clientX !== 'undefined') clientX = e.touches[0].clientX;
      else if (typeof e.clientX !== 'undefined') clientX = e.clientX;
      const dx = clientX - dragStartX.current;
      el.scrollLeft = Math.max(0, dragStartScroll.current - dx);
    };
    const onPointerUp = () => { isDragging.current = false; };
    el.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: false });
    window.addEventListener('pointerup', onPointerUp);
    el.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: false });
    window.addEventListener('touchend', onPointerUp);
    return () => {
      el.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      el.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
    };
  }, [stackOpen]);

  const scrollTo = (id) => {
    setMobileOpen(false);
    if (location.pathname !== '/') {
      navigate(`/#${id}`);
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'border-b border-border/80 bg-background/70 py-3 backdrop-blur-xl'
            : 'bg-transparent py-5'
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8">
          <Link to="/" className="group flex items-center gap-3" onClick={() => scrollTo('home')}>
            <img
              src="/chesko-logo.svg"
              alt=""
              className="h-8 w-8 opacity-90 transition-opacity group-hover:opacity-100"
            />
            <div>
              <span className="text-sm font-semibold tracking-tight text-foreground">
                {site.name}
              </span>
              <span className="block text-xs text-muted">Developer</span>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollTo(link.id)}
                className={cn(
                  'relative px-4 py-2 text-sm transition-colors',
                  activeSection === link.id ? 'text-foreground' : 'text-muted hover:text-foreground'
                )}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-3 right-3 h-px bg-primary"
                  />
                )}
              </button>
            ))}
            <div className="relative">
              <button
                type="button"
                onClick={() => setStackOpen(!stackOpen)}
                onMouseEnter={() => setStackOpen(true)}
                onMouseLeave={() => setStackOpen(false)}
                className={cn(
                  'relative px-4 py-2 text-sm transition-colors',
                  'text-muted hover:text-foreground'
                )}
              >
                Stack
              </button>
              {stackOpen && (
                <div className="absolute right-0 mt-2 w-[520px] max-w-[80vw] rounded-lg border border-border bg-surface/95 p-3 backdrop-blur-md shadow-lg">
                  <div
                    ref={techNavRef}
                    className="flex gap-2 overflow-x-auto py-1 px-1 touch-pan-x"
                    onMouseEnter={() => {/* keep open */}}
                  >
                    {techStack.map((t) => (
                      <div key={t} className="flex-shrink-0">
                        <span className="inline-block bg-muted/20 text-sm px-3 py-1 rounded-md border border-border text-foreground/90">{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 rounded-xl border border-border px-4 py-2 text-sm text-muted transition-premium hover:border-primary/40 hover:text-foreground"
            >
              GitHub
            </a>
          </nav>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="fixed inset-x-4 top-[72px] z-50 rounded-2xl border border-border bg-surface/95 p-4 backdrop-blur-xl md:hidden"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollTo(link.id)}
                className={cn(
                  'block w-full rounded-lg px-4 py-3 text-left text-sm transition-colors',
                  activeSection === link.id
                    ? 'bg-primary/10 text-foreground'
                    : 'text-muted hover:bg-surface-2'
                )}
              >
                {link.label}
              </button>
            ))}
            {/* Mobile stack chips */}
            <div className="mt-3">
              <div className="flex gap-2 overflow-x-auto py-1 px-1">
                {techStack.map((t) => (
                  <div key={t} className="flex-shrink-0">
                    <span className="inline-block bg-muted/20 text-sm px-3 py-1 rounded-md border border-border text-foreground/90">{t}</span>
                  </div>
                ))}
              </div>
            </div>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block rounded-lg px-4 py-3 text-sm text-muted hover:bg-surface-2"
            >
              GitHub
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border/80 bg-background/80 px-2 py-2 backdrop-blur-xl md:hidden">
        <div className="flex justify-around">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => scrollTo(link.id)}
              className={cn(
                'flex min-h-[44px] flex-1 flex-col items-center justify-center rounded-lg text-[10px] font-medium uppercase tracking-wider',
                activeSection === link.id ? 'text-primary' : 'text-muted'
              )}
            >
              {link.label}
            </button>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navbar;

