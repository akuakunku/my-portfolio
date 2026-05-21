import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaGithub, FaHome, FaMicrochip, FaUserShield, FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const headerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleScrollTo = (e, targetId) => {
    if (e) e.preventDefault();
    setIsMenuOpen(false);
    
    if (location.pathname !== '/') {
      navigate('/#' + targetId);
      return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      const offset = 0; 
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    if (!isMenuOpen) {
      window.addEventListener('scroll', handleScroll);
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isMenuOpen]);

  const menuItems = [
    { id: 'home', label: 'Home', icon: FaHome, to: '/', action: (e) => { e.preventDefault(); navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); } },
    { id: 'portfolio', label: 'Projects', icon: FaMicrochip, to: '#portfolio', action: (e) => handleScrollTo(e, 'portfolio') },
    { id: 'admin', label: 'Admin', icon: FaUserShield, to: '/admin-login', action: (e) => { e.preventDefault(); navigate('/admin-login'); } },
    { id: 'github', label: 'GitHub', icon: FaGithub, to: 'https://github.com/chesko21', action: () => window.open('https://github.com/chesko21', '_blank') },
  ];

  return (
    <>
      {/* PC Header - Original Style */}
      <motion.header
        ref={headerRef}
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.5, ease: "circOut" }}
        className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center mix-blend-difference"
      >
        <Link to="/" className="group flex items-center space-x-4">
          <img src="/chesko-logo.svg" alt="Logo" className="w-8 h-8 filter brightness-200 logo-glitch-effect transition-all" />
          <div className="flex flex-col">
            <span className="text-white font-black tracking-tighter text-xl leading-none uppercase">CHESKO</span>
            <span className="text-white font-mono text-[8px] tracking-[0.4em] uppercase opacity-50 group-hover:opacity-100 transition-opacity">Portfolio_2026</span>
          </div>
        </Link>

        {/* Desktop Nav - Visible only on MD and up */}
        <nav className="hidden md:flex items-center space-x-12">
          {menuItems.map((item) => (
            item.id === 'portfolio' ? (
              <a
                key={item.id}
                href={item.to}
                onClick={item.action}
                className="text-white font-mono text-[10px] uppercase tracking-[0.3em] hover:text-gray-400 transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
            ) : (
              <Link
                key={item.id}
                to={item.to}
                className="text-white font-mono text-[10px] uppercase tracking-[0.3em] hover:text-gray-400 transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
            )
          ))}
        </nav>
      </motion.header>

      {/* Mobile Bottom Navbar - Fixed at bottom */}
      <div className="md:hidden fixed bottom-0 left-0 w-full z-[100] px-4 pb-6">
        <div className="glassmorphism rounded-2xl border border-white/10 flex justify-around items-center py-4 px-2 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={item.action}
              className="flex flex-col items-center space-y-1 group"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 group-hover:text-cyber-primary group-hover:bg-cyber-primary/10 transition-all duration-300">
                <item.icon size={20} />
              </div>
              <span className="text-[9px] font-mono uppercase tracking-widest text-gray-500 group-hover:text-cyber-primary transition-colors">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Background Blur Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm pointer-events-none"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
