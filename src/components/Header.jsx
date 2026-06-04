import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  FaGithub,
  FaHome,
  FaMicrochip,
  FaCode,
  FaEnvelope,
  FaUserShield,
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { scrollToSection } from './providers/smooth-scroll';
import { cn } from '../lib/utils';

const navItems = [
  { id: 'home', label: 'Home', icon: FaHome },
  { id: 'skills', label: 'Stack', icon: FaCode },
  { id: 'portfolio', label: 'Projects', icon: FaMicrochip },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navigate = useNavigate();
  const location = useLocation();

  const allowHashScroll = useRef(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);

    window.addEventListener('scroll', onScroll, { passive: true });

    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    allowHashScroll.current = false;

    const timer = setTimeout(() => {
      allowHashScroll.current = true;
    }, 1500);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    if (
      location.pathname !== '/' ||
      !location.hash ||
      !allowHashScroll.current
    )
      return;

    const hash = location.hash.replace('#', '');

    if (!hash) return;

    const timer = setTimeout(() => scrollToSection(hash), 200);

    return () => clearTimeout(timer);
  }, [location.hash, location.pathname]);

  useEffect(() => {
    // Hanya jalankan observer jika di halaman home
    if (location.pathname !== '/') {
      return;
    }

    const isMobile = window.innerWidth < 768;

    const sections = navItems
      .map((n) => document.getElementById(n.id))
      .filter(Boolean);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: isMobile
          ? '-15% 0px -65% 0px'
          : '-35% 0px -55% 0px',
        threshold: 0,
      }
    );

    sections.forEach((s) => observer.observe(s));

    return () => observer.disconnect();
  }, [location.pathname]);

  // Update active section berdasarkan path ketika tidak di home
  useEffect(() => {
    if (location.pathname !== '/') {
      const path = location.pathname.replace('/', '');
      
      // Cek apakah path cocok dengan salah satu nav item
      const matchingNav = navItems.find(item => item.id === path);
      if (matchingNav) {
        setActiveSection(matchingNav.id);
      }
    }
  }, [location.pathname]);

  const go = (id, e) => {
    if (e) e.preventDefault();

    if (location.pathname !== '/') {
      navigate(`/#${id}`);
      return;
    }

    scrollToSection(id);
  };

  const goHome = (e) => {
    e.preventDefault();

    if (location.pathname !== '/') {
      navigate('/');
      return;
    }

    scrollToSection('home');
  };

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: 0 }}
        className={cn(
          'fixed top-0 left-0 z-50 flex w-full items-center justify-between px-5 py-4 transition-all duration-500 md:px-8 md:py-5',
          scrolled ? 'nav-glass' : 'bg-transparent'
        )}
      >
        <Link
          to="/"
          onClick={goHome}
          className="group flex items-center gap-3"
        >
          <img
            src="/chesko-logo.svg"
            alt="Logo"
            className="h-8 w-8 brightness-200 transition-transform group-hover:scale-105"
          />

          <div className="flex flex-col">
            <span className="text-lg font-black uppercase leading-none tracking-tighter text-white">
              CHESKO
            </span>

            <span className="font-mono text-[8px] uppercase tracking-[0.35em] text-cyber-blue/60 group-hover:text-cyber-blue">
              Portfolio_2026
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={(e) => go(item.id, e)}
              className={cn(
                'link-cyber relative px-4 py-2 transition-all duration-300',
                activeSection === item.id
                  ? 'text-cyber-blue'
                  : 'text-white/70 hover:text-white'
              )}
            >
              {item.label}

              {activeSection === item.id && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute bottom-0 left-3 right-3 h-px bg-gradient-to-r from-cyber-blue to-cyber-purple"
                />
              )}
            </button>
          ))}

          <a
            href="https://github.com/chesko21"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 rounded-lg border border-white/10 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-white/60 transition-premium hover:border-cyber-blue/40 hover:text-cyber-blue"
          >
            GitHub
          </a>

          <Link
            to="/admin-login"
            className="ml-1 rounded-lg px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-white/30 transition-premium hover:text-white/60"
          >
            Admin
          </Link>
        </nav>
      </motion.header>

      {/* Bottom Mobile Navigation */}
      <div className="fixed bottom-0 left-0 z-[100] w-full border-t border-white/5 bg-black/80 px-2 py-2 backdrop-blur-xl md:hidden">
        <div className="flex justify-around">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={(e) => go(item.id, e)}
              className={cn(
                'flex min-h-[44px] flex-1 flex-col items-center justify-center gap-0.5 font-mono text-[8px] uppercase tracking-wider transition-all duration-300',
                activeSection === item.id
                  ? 'text-cyber-blue'
                  : 'text-gray-500 hover:text-gray-300'
              )}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              navigate('/admin-login');
            }}
            className="flex min-h-[44px] flex-1 flex-col items-center justify-center gap-0.5 font-mono text-[8px] uppercase text-gray-600 transition-all duration-300 hover:text-gray-400"
          >
            <FaUserShield size={18} />
            Admin
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;