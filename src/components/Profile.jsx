import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { FaSatellite, FaSatelliteDish, FaChevronDown, FaCode, FaCrown, FaRocket, FaHeartbeat, FaGlobe, FaBolt, FaStar, FaGithub } from 'react-icons/fa';
import { HeroSpotlight } from './effects/HeroSpotlight';
import { MagneticButton } from './ui/MagneticButton';
import { scrollToSection } from './providers/smooth-scroll';
import { EASE_PREMIUM } from '../constants/motion';
import { techStack } from '../data/tech';

const heroCtaStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.55 } },
};

const heroCtaItem = {
  hidden: { opacity: 0, y: 16, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: EASE_PREMIUM },
  },
};

gsap.registerPlugin(ScrollTrigger);

const Profile = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const imageRef = useRef(null);
  const containerRef = useRef(null);
  const spaceRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const badgeRef = useRef(null);
  const profileImgRef = useRef(null);
  const [hoveredChar, setHoveredChar] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const techScrollRef = useRef(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);

  const name = "CHESKO";

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (reduced) {
        gsap.set(
          [
            '.title-char',
            '.subtitle-line',
            '.profile-desc',
            '.hud-text',
            badgeRef.current,
            profileImgRef.current,
            scrollIndicatorRef.current,
          ],
          { opacity: 1, y: 0, x: 0, scale: 1, filter: 'none', clearProps: 'transform' }
        );
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      if (!isMobile) {
        tl.fromTo(
          imageRef.current,
          { scale: 1.35, filter: 'blur(28px)', opacity: 0 },
          { scale: 1.15, filter: 'blur(0px)', opacity: 0.35, duration: 1, ease: 'power2.out' },
          0
        )
          .fromTo('.overlay-gradient', { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0)
          .fromTo(
            '.floating-orb',
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 0.12, stagger: 0.04, duration: 0.7 },
            0.08
          )
          .fromTo(
            '.hud-corner',
            { strokeDashoffset: 150, strokeDasharray: 150 },
            { strokeDashoffset: 0, duration: 0.7, stagger: 0.05, ease: 'power2.inOut' },
            0.12
          );
      } else {
        gsap.set(imageRef.current, { scale: 1, opacity: 0.4 });
        gsap.set('.overlay-gradient', { opacity: 1 });
        gsap.set('.floating-orb', { scale: 0.6, opacity: 0.08 });
        tl.fromTo(imageRef.current, { opacity: 0 }, { opacity: 0.4, duration: 0.4 }, 0);
      }

      const titleChars = gsap.utils.toArray('.title-char');
      const charStagger = isMobile ? 0.045 : 0.058;
      const charDur = isMobile ? 0.5 : 0.58;

      gsap.set(titleChars, { transformOrigin: '50% 100%' });

      // Konten utama — easing halus, tetap cepat
      tl.fromTo(
        badgeRef.current,
        { y: -10, opacity: 0, scale: 0.94 },
        { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: 'expo.out' },
        0.08
      )
        .fromTo(
          titleChars,
          {
            yPercent: 115,
            opacity: 0,
            rotationX: -14,
            scale: 0.96,
            filter: 'blur(8px)',
          },
          {
            yPercent: 0,
            opacity: 1,
            rotationX: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: charDur,
            stagger: { each: charStagger, from: 'center', ease: 'power1.out' },
            ease: 'expo.out',
          },
          '-=0.35'
        )
        .to(
          titleChars,
          {
            y: -5,
            duration: 0.32,
            stagger: { each: 0.04, from: 'center' },
            ease: 'sine.inOut',
          },
          '-=0.22'
        )
        .to(
          titleChars,
          {
            y: 0,
            duration: 0.5,
            stagger: { each: 0.04, from: 'center' },
            ease: 'expo.out',
          },
          '-=0.28'
        )
        .fromTo(
          '.subtitle-line',
          { y: 18, opacity: 0, skewX: -4 },
          {
            y: 0,
            opacity: 1,
            skewX: 0,
            stagger: 0.07,
            duration: 0.5,
            ease: 'expo.out',
          },
          '-=0.35'
        )
        .fromTo(
          profileImgRef.current,
          { scale: 0.88, opacity: 0, y: 8 },
          { scale: 1, opacity: 1, y: 0, duration: 0.55, ease: 'expo.out' },
          '-=0.42'
        )
        .fromTo(
          '.profile-desc',
          { opacity: 0, y: 12, filter: 'blur(4px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.5, ease: 'expo.out' },
          '-=0.4'
        )
        .fromTo(
          '.hud-text',
          { opacity: 0, x: -8 },
          { opacity: 1, x: 0, stagger: 0.06, duration: 0.45, ease: 'expo.out' },
          '-=0.45'
        )
        .fromTo(
          '.radar-container',
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.55, ease: 'expo.out' },
          '-=0.5'
        )
        .fromTo(
          scrollIndicatorRef.current,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.45, ease: 'expo.out' },
          '-=0.38'
        )
        .add(() => {
          gsap.set(titleChars, { clearProps: 'transform,filter' });
          titleRef.current?.classList.add('title-idle');
          // Replace per-character motion with a single subtle 'breathe' on the title
          if (!isMobile && titleRef.current) {
            gsap.to(titleRef.current, {
              y: 2,
              duration: 6,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut'
            });

            gsap.to(titleRef.current, {
              scale: 1.01,
              duration: 8,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
              delay: 1
            });
          }
        });

      // Floating animations (optimized for mobile)
      if (!isMobile) {
        gsap.to(".floating-orb", {
          y: "random(-12, 12)",
          x: "random(-8, 8)",
          duration: "random(10, 20)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.4
        });
      } else {
        // Subtle movement on mobile to save battery
        gsap.to(".floating-orb", {
          y: "random(-6, 6)",
          duration: "random(12, 25)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.5
        });
      }

      // Parallax scroll effects
      gsap.to(imageRef.current, {
        yPercent: isMobile ? 8 : 18,
        scale: isMobile ? 1.05 : 1.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: isMobile ? 0.8 : 1.5,
          immediateRender: false
        }
      });

      gsap.to(containerRef.current, {
        yPercent: isMobile ? 8 : 18,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: isMobile ? 0.6 : 1
        }
      });

      // Space objects animation (simplified for mobile)
      const objects = gsap.utils.toArray('.space-obj');
      objects.forEach((obj) => {
        const speed = parseFloat(obj.dataset.speed) || 1;
        const direction = obj.dataset.dir === 'left' ? -1 : 1;
        
        if (isMobile) {
          // Simplified mobile animation
          const startX = direction * -120;
          const endX = direction * 120;
          gsap.to(obj, {
            x: endX,
            duration: (25 / speed),
            repeat: -1,
            yoyo: true,
            ease: "none",
            delay: Math.random() * 10
          });
        } else {
          // Full desktop animation
          const startX = parseInt(obj.dataset.startX) || -180;
          const endX = parseInt(obj.dataset.endX) || 180;
          const bezierPath = [
            { x: `${direction * startX}vw`, y: `${Math.random() * 80 + 10}vh` },
            { x: `${direction * (startX * 0.2)}vw`, y: `${Math.random() * 70 + 15}vh` },
            { x: `${direction * (endX * 0.7)}vw`, y: `${Math.random() * 50 + 25}vh` },
            { x: `${direction * endX}vw`, y: `${Math.random() * 80 + 10}vh` }
          ];
          gsap.to(obj, {
            motionPath: {
              path: bezierPath,
              curviness: 2,
              autoRotate: true
            },
            duration: (30 / speed),
            repeat: -1,
            ease: "none",
            delay: Math.random() * 15,
            modifiers: {
              x: gsap.utils.unitize(x => parseFloat(x) % (direction * 350))
            }
          });
        }
      });

      // Mouse move effect (desktop only) — disabled by default for professional feel
      const enableParallax = false;
      const handleMouseMove = (e) => {
        if (isMobile) return;
        if (!enableParallax) return;
        const { clientX, clientY } = e;
        const xPercent = (clientX / window.innerWidth - 0.5) * 2;
        const yPercent = (clientY / window.innerHeight - 0.5) * 2;
        
        gsap.to(containerRef.current, {
          x: xPercent * 10,
          y: yPercent * 6,
          rotationX: yPercent * 1.5,
          rotationY: xPercent * 1.5,
          duration: 0.8,
          ease: "power2.out"
        });
        
        gsap.to(imageRef.current, {
          x: xPercent * 8,
          y: yPercent * 6,
          duration: 1,
          ease: "power2.out"
        });
        
        gsap.to(".floating-orb", {
          x: xPercent * 10,
          y: yPercent * 8,
          duration: 1.2,
          ease: "power2.out",
          stagger: 0.06
        });
      };

      if (!isMobile) {
        window.addEventListener('mousemove', handleMouseMove);
      }
      
      // Scroll indicator animation
      gsap.to(scrollIndicatorRef.current, {
        y: 6,
        duration: isMobile ? 1 : 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });

      // Scan line animation (disabled on mobile for performance)
      if (!isMobile) {
        gsap.to(".scan-line", {
          y: "100%",
          duration: 12,
          repeat: -1,
          ease: "none",
          modifiers: {
            y: gsap.utils.unitize(y => parseFloat(y) % 100)
          }
        });
      }

      return () => {
        if (!isMobile) {
          window.removeEventListener('mousemove', handleMouseMove);
        }
      };
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  // Drag-to-scroll for tech chips (mouse + touch)
  useEffect(() => {
    const el = techScrollRef.current;
    if (!el) return;

    const onPointerDown = (e) => {
      isDragging.current = true;
      el.classList.add('dragging');
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

    const onPointerUp = () => {
      isDragging.current = false;
      el.classList.remove('dragging');
    };

    el.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: false });
    window.addEventListener('pointerup', onPointerUp);

    // touch fallbacks
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
  }, []);

  const handleCharHover = (index) => {
    if (isMobile) return;
    setHoveredChar(index);
    const el = document.querySelector(`.title-char-${index}`);
    if (el) el.style.animation = 'none';
    gsap.to(`.title-char-${index}`, {
      y: -6,
      scale: 1.04,
      rotationX: -4,
      textShadow: "0 0 12px rgba(0, 180, 180, 0.45)",
      duration: 0.4,
      ease: "expo.out",
    });
  };

  const handleCharLeave = (index) => {
    if (isMobile) return;
    setHoveredChar(null);
    gsap.to(`.title-char-${index}`, {
      y: 0,
      scale: 1,
      rotationX: 0,
      textShadow: "0 0 6px rgba(0, 160, 160, 0.2)",
      duration: 0.5,
      ease: "expo.out",
      onComplete: () => {
        const el = document.querySelector(`.title-char-${index}`);
        if (el) el.style.animation = '';
      },
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#010105]"
      style={{ perspective: isMobile ? "800px" : "2500px" }}
    >
      <div className="pointer-events-none absolute inset-0 z-[2] bg-hero-noise" aria-hidden />
      <HeroSpotlight />
      {/* Background Image */}
      <div ref={imageRef} className="absolute inset-0 z-0" aria-hidden>
        <div className="overlay-gradient absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-[#010105] z-10"></div>
        {!isMobile && <div className="scan-line absolute inset-0 w-full h-full bg-gradient-to-b from-transparent via-cyber-primary/5 to-transparent pointer-events-none z-10" style={{ transform: "translateY(-100%)", opacity: 0.06 }}></div>}
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
          alt="Tech Background"
          className="w-full h-full object-cover transform-gpu"
          style={{ willChange: "transform" }}
          loading="lazy"
        />
      </div>

      {/* Floating Orbs */}
      <div className="absolute inset-0 pointer-events-none -z-10" aria-hidden="true">
        {/* star field + nebula (CSS-first, performant) */}
        <div className="star-field">
          {[...Array(isMobile ? 60 : 180)].map((_, i) => {
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const size = Math.random() * 2.5 + 0.8; // 0.8 - 3.3px
            const delay = Math.random() * 6;
            const dur = 2 + Math.random() * 5;
            return (
              <div
                key={`star-${i}`}
                className="star"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  animationDelay: `${delay}s`,
                  animationDuration: `${dur}s`,
                  opacity: 0.5 + Math.random() * 0.5
                }}
              />
            );
          })}
        </div>

        {/* soft nebula blobs for depth */}
        <div className="nebula nebula-1" />
        <div className="nebula nebula-2" />
        <div className="nebula nebula-3" />

        {/* subtle shooting stars */}
        <div className="shooting-container">
          {[...Array(5)].map((_, i) => (
            <div
              key={`shoot-${i}`}
              className={`shooting-star shooting-${i}`}
              style={{ animationDelay: `${i * 2 + 1}s`, left: `${Math.random() * 80 + 10}%`, top: `${Math.random() * 30}%` }}
            />
          ))}
        </div>
      </div>

      {/* Space Objects */}
      <div ref={spaceRef} className="absolute inset-0 z-10 pointer-events-none overflow-hidden" aria-hidden>
        <div className="space-obj absolute top-[10%] left-[-20%] text-cyber-primary/40" data-speed="0.2" data-dir="right" data-start-x="-200" data-end-x="200" aria-hidden>
          <FaSatellite size={isMobile ? 25 : 45} className="drop-shadow-glow animate-float" />
        </div>
        <div className="space-obj absolute top-[75%] right-[-20%] text-purple-500/30" data-speed="0.15" data-dir="left" data-start-x="200" data-end-x="-200" aria-hidden>
          <FaSatelliteDish size={isMobile ? 20 : 40} className="drop-shadow-glow" />
        </div>
        
        <div className="space-obj absolute top-[25%] left-[-30%] text-cyan-400/25" data-speed="2" data-dir="right" data-start-x={isMobile ? "-250" : "-300"} data-end-x={isMobile ? "250" : "300"} aria-hidden>
          <div className="relative">
            <div className="absolute -left-10 top-1/2 w-10 h-px bg-gradient-to-r from-transparent to-current animate-pulse"></div>
            <svg width={isMobile ? 35 : 60} height={isMobile ? 20 : 35} viewBox="0 0 60 35" fill="currentColor">
              <path d="M0 17.5 L20 0 L60 17.5 L20 35 Z" />
              <circle cx="40" cy="17.5" r="4" fill="#fff" opacity="0.9">
                <animate attributeName="opacity" values="0.9;0.3;0.9" dur="1s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>
        </div>
        
        <div className="space-obj absolute top-[85%] left-[15%] text-yellow-500/20" data-speed="1.5" data-dir="right" data-start-x="-150" data-end-x="150" aria-hidden>
          <FaStar size={isMobile ? 15 : 30} className="animate-spin-slow" />
        </div>
        
        {/* Spacecraft - Outer Space Vibe */}
        <div className="space-obj absolute top-[20%] right-[-25%] text-emerald-400/40" data-speed="0.3" data-dir="left" data-start-x="250" data-end-x="-250" aria-hidden>
          <div className="relative">
            <svg width={isMobile ? 40 : 70} height={isMobile ? 30 : 50} viewBox="0 0 100 70" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 35 L45 10 L85 25 L100 35 L85 45 L45 60 L20 35Z" fill="currentColor" fillOpacity="0.6" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="65" cy="35" r="6" fill="#fff" fillOpacity="0.9">
                <animate attributeName="r" values="6;7;6" dur="2s" repeatCount="indefinite" />
              </circle>
              <path d="M20 35 L5 20 M20 35 L5 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        <div className="space-obj absolute top-[60%] left-[-15%] text-rose-400/30" data-speed="0.25" data-dir="right" data-start-x="-180" data-end-x="180" aria-hidden>
          <svg width={isMobile ? 35 : 55} height={isMobile ? 25 : 40} viewBox="0 0 80 60" fill="none">
            <ellipse cx="40" cy="30" rx="30" ry="15" fill="currentColor" fillOpacity="0.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M40 15 L40 5 M40 45 L40 55" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <circle cx="40" cy="30" r="3" fill="#fff" />
          </svg>
        </div>
      </div>

      {/* HUD Corners */}
      <div className="absolute inset-0 z-20 pointer-events-none p-5 md:p-12">
        {!isMobile && (
          <>
            <svg className="absolute top-8 md:top-12 left-8 md:left-12 w-16 md:w-32 h-16 md:h-32" viewBox="0 0 100 100">
              <path className="hud-corner" d="M15 0 L15 15 L0 15" stroke="#00ffff" strokeWidth="2.5" fill="none" strokeDasharray="150" strokeDashoffset="150" />
              <path className="hud-corner" d="M85 0 L85 15 L100 15" stroke="#00ffff" strokeWidth="2.5" fill="none" strokeDasharray="150" strokeDashoffset="150" />
            </svg>
            <svg className="absolute bottom-8 md:bottom-12 left-8 md:left-12 w-16 md:w-32 h-16 md:h-32" viewBox="0 0 100 100">
              <path className="hud-corner" d="M15 100 L15 85 L0 85" stroke="#00ffff" strokeWidth="2.5" fill="none" strokeDasharray="150" strokeDashoffset="150" />
              <path className="hud-corner" d="M85 100 L85 85 L100 85" stroke="#00ffff" strokeWidth="2.5" fill="none" strokeDasharray="150" strokeDashoffset="150" />
            </svg>
          </>
        )}
        
        {/* HUD Status Texts */}
        <div className={`absolute ${isMobile ? 'top-20 left-3' : 'top-24 left-14'} space-y-1 md:space-y-4 font-mono z-30`}>
          {[
            { icon: FaHeartbeat, label: "SYS_STATUS", value: "ONLINE", pulse: true, color: "text-green-400" },
            { icon: FaGlobe, label: isMobile ? "NODE" : "NODE_NETWORK", value: "CONNECTED", pulse: false, color: "text-cyan-400" },
            { icon: FaBolt, label: "CORE_SYNC", value: "99.9%", pulse: true, color: "text-yellow-400" }
          ].slice(0, isMobile ? 3 : 4).map((item, i) => (
            <div key={i} className="hud-text flex items-center space-x-2 md:space-x-4 group cursor-default backdrop-blur-sm bg-black/20 px-1.5 py-0.5 md:px-2 md:py-1 rounded">
              <item.icon className={`${item.color} ${item.pulse ? 'animate-pulse' : ''} text-[8px] md:text-xs`} />
              <div className={`w-1 h-1 md:w-1.5 md:h-1.5 ${item.pulse ? 'bg-cyber-primary animate-ping' : 'bg-cyber-primary/30'} rounded-full`}></div>
              <span className={`${isMobile ? 'text-[6px]' : 'text-[10px]'} text-cyber-primary/70 tracking-[0.25em] md:tracking-[0.4em]`}>{item.label}</span>
              <span className={`${isMobile ? 'text-[6px]' : 'text-[10px]'} ${item.color} font-bold tracking-wider`}>{item.value}</span>
            </div>
          ))}
        </div>

        {/* Radar Container - Desktop only */}
        {!isMobile && (
          <div className="radar-container absolute bottom-24 right-16 w-28 md:w-40 h-28 md:h-40 rounded-full border-2 border-cyber-primary/30 overflow-hidden bg-black/20 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-cyber-primary/0 via-cyber-primary/15 to-cyber-primary/0 transform origin-center animate-radar"></div>
            <div className="absolute top-1/2 left-1/2 w-0.5 h-0.5 bg-cyber-primary rounded-full"></div>
            <div className="absolute inset-0 rounded-full border border-cyber-primary/20" style={{ transform: "scale(0.5)" }}></div>
            <div className="absolute inset-0 rounded-full border border-cyber-primary/10" style={{ transform: "scale(0.75)" }}></div>
          </div>
        )}
      </div>

      {/* Main Content Container */}
      <div ref={containerRef} className="relative z-30 text-center px-4 max-w-7xl mx-auto w-full transform-gpu" style={{ transformStyle: "preserve-3d" }}>
        <div ref={badgeRef} className="flex justify-center mb-4 md:mb-8">
          <div className="inline-flex items-center space-x-2 md:space-x-4 px-3 md:px-6 py-1 md:py-2 border border-cyber-primary/40 rounded-full bg-cyber-primary/10 backdrop-blur-md shadow-glow">
            <FaCrown className="text-cyber-primary text-[8px] md:text-sm animate-pulse" />
            <span className={`font-mono ${isMobile ? 'text-[6px]' : 'text-[10px]'} text-cyber-primary tracking-[0.2em] md:tracking-[0.4em] uppercase font-bold`}>
              {isMobile ? "ELITE DEV 2026" : "✦ FEATURED DEVELOPER 2026 ✦"}
            </span>
            <FaRocket className="text-cyber-primary text-[8px] md:text-sm animate-bounce" />
          </div>
        </div>

        <h1 
          ref={titleRef}
          className={`${isMobile ? 'text-[10vw]' : 'text-[8vw] md:text-[6.5vw]'} font-extrabold tracking-tight mb-3 md:mb-6 leading-[0.9] flex justify-center flex-wrap relative text-white title-breathe`}
          style={{ perspective: "900px" }}
        >
          {name.split("").map((char, i) => (
            <div key={i} className="title-char-wrap relative inline-block overflow-hidden pb-0.5">
              <span
                role="button"
                tabIndex={isMobile ? -1 : 0}
                aria-label={`Letter ${char}`}
                className={`title-char title-char-${i} inline-block px-0.5 md:px-2 cyber-text-gradient cursor-default will-change-transform focus:outline-none`}
                onMouseEnter={() => handleCharHover(i)}
                onMouseLeave={() => handleCharLeave(i)}
                onFocus={() => handleCharHover(i)}
                onBlur={() => handleCharLeave(i)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleCharHover(i); setTimeout(() => handleCharLeave(i), 600); } }}
                style={{
                  transformStyle: "preserve-3d",
                  transform: !isMobile && hoveredChar === i ? "translateY(-6px) scale(1.05)" : "none",
                  filter: !isMobile && hoveredChar === i ? "drop-shadow(0 0 10px rgba(0, 200, 200, 0.5))" : "none",
                  display: "inline-block",
                  textShadow: "0 0 8px rgba(0, 200, 200, 0.2)"
                }}
              >
                {char}
              </span>
            </div>
          ))}
        </h1>

        <div ref={subtitleRef} className={`mb-4 md:mb-8 ${isMobile ? 'px-2' : ''}`}>
          <p className={`${isMobile ? 'text-[10px]' : 'text-sm md:text-base'} text-white/80 font-medium font-sans`}>Web Developer — Software Engineer</p>
        </div>
        
        <div className={`profile-desc max-w-3xl mx-auto border-t border-cyber-primary/20 ${isMobile ? 'pt-6' : 'pt-12 md:pt-16'} ${isMobile ? 'px-2' : 'px-6'}`}>
          <p className="font-light leading-relaxed text-gray-300 font-mono uppercase tracking-[0.12em] sm:tracking-[0.18em] md:tracking-[0.28em] text-[8px] sm:text-[10px] md:text-xs lg:text-sm">
            {['✦', 'Building', 'modern', 'digital', 'experiences', 'for', 'the', 'web', 'and', 'applications', '✦'].map((word, i) => (
              <span key={i} className="inline-block transition-all duration-300 hover:scale-105 hover:text-cyber-primary mx-0.5 sm:mx-1">
                {word}
              </span>
            ))}
          </p>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            <div
              ref={techScrollRef}
              className="tech-scroll w-full flex gap-2 overflow-x-auto snap-x snap-mandatory py-2 px-2 touch-pan-x"
              role="list"
            >
              {techStack.map((tech) => (
                <div key={tech} role="listitem" className="flex-shrink-0 snap-start">
                  <span className="font-sans text-[10px] md:text-sm uppercase bg-white/4 px-3 py-1 rounded-md border border-white/10 text-white/90 inline-block">
                    {tech}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator Button */}
      <div
        className="
          absolute
          left-1/2
          -translate-x-1/2
          bottom-24
          md:bottom-10
          z-20
          pointer-events-auto
        "
      >
        <button
          type="button"
          ref={scrollIndicatorRef}
          onClick={() => scrollToSection('skills')}
          aria-label="Scroll Down"
          className="
            group
            flex
            flex-col
            items-center
            gap-2
            opacity-60
            transition-all
            duration-300
            hover:opacity-100
            active:scale-95
          "
        >
          {/* Text */}
          <span
            className="
              font-mono
              text-[9px]
              uppercase
              tracking-[0.35em]
              text-cyber-blue/60
              transition-colors
              duration-300
              group-hover:text-cyber-blue
            "
          >
            Scroll
          </span>

          {/* Mouse Shape */}
          <div
            className="
              relative
              flex
              h-10
              w-6
              items-start
              justify-center
              rounded-full
              border
              border-cyber-blue/30
              bg-black/20
              backdrop-blur-sm
              p-1
              transition-all
              duration-300
              group-hover:border-cyber-blue/60
              group-hover:bg-black/40
            "
          >
            {/* Dot */}
            <div
              className="
                mt-0.5
                h-2
                w-1
                rounded-full
                bg-cyber-blue
                animate-bounce
              "
            />
          </div>
        </button>
      </div>

      {/* Profile Card - RAISED HIGHER ON MOBILE */}
      <div className={`hud-text absolute z-40 group cursor-pointer ${
        isMobile 
          ? 'top-6 right-4 left-auto bottom-auto' 
          : 'bottom-6 md:bottom-10 left-5 md:left-10'
      }`}>
        <div
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { window.open('https://github.com/chesko21', '_blank'); } }}
          onClick={() => window.open('https://github.com/chesko21', '_blank')}
          aria-label="Open profile on GitHub"
          className={`flex items-center space-x-2 md:space-x-5 backdrop-blur-xl bg-black/40 border border-white/15 rounded-xl transition-all duration-500 hover:border-cyber-primary/60 hover:bg-black/60 hover:scale-105 ${
            isMobile ? 'p-2' : 'p-2 md:p-4'
          }`}
        >
          <div className="relative">
            <img
              ref={profileImgRef}
              src="/img/aku.jpg"
              alt="CHESKO AFIQ"
              className={`${isMobile ? 'w-10 h-10' : 'w-14 h-14 md:w-20 md:h-20'} object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110 group-hover:rounded-2xl`}
              style={{ borderRadius: '12px' }}
              loading="lazy"
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://via.placeholder.com/150?text=CH'; }}
            />
            <div className="absolute -top-1 -right-1 w-2 h-2 md:w-3.5 md:h-3.5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse border-2 border-black"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-cyber-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
          </div>
          <div className="text-left font-mono">
            <p className={`text-white ${isMobile ? 'text-[9px]' : 'text-[11px] md:text-sm'} font-black tracking-widest uppercase group-hover:text-cyber-primary transition-colors duration-300`}>
              CHESKO_AFIQ
            </p>
            <p className={`text-cyber-primary/50 ${isMobile ? 'text-[5px]' : 'text-[8px] md:text-[10px]'} mt-0.5 md:mt-1.5 tracking-wider uppercase flex items-center gap-1 md:gap-2.5`}>
              <span className={`inline-block w-2 md:w-5 h-px bg-cyber-primary/50 animate-pulse`}></span>
              {isMobile ? "EST. 2026" : "ESTABLISHED 2026 // PORTFOLIO_V4"}
              <span className={`inline-block w-2 md:w-5 h-px bg-cyber-primary/50 animate-pulse`}></span>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shooting-star {
          0% {
            transform: translateX(-100px) translateY(-100px) rotate(-35deg);
            opacity: 0;
          }
          15% {
            opacity: 0.8;
          }
          85% {
            opacity: 0.6;
          }
          100% {
            transform: translateX(300px) translateY(300px) rotate(-35deg);
            opacity: 0;
          }
        }
        
        @keyframes radar {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-8px) translateX(4px); }
          75% { transform: translateY(8px) translateX(-4px); }
        }
        
        .animate-radar {
          animation: radar 4s linear infinite;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .drop-shadow-glow {
          filter: drop-shadow(0 0 10px rgba(0, 255, 255, 0.5));
        }
        
        .cyber-text-gradient {
          background: linear-gradient(90deg, #ffffff 0%, #0fd3d3 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradientShift 8s ease infinite;
        }

        .title-breathe {
          animation: titleGlow 8s ease-in-out infinite;
        }

        @keyframes titleGlow {
          0% { filter: drop-shadow(0 0 0 rgba(0,160,160,0)); }
          50% { filter: drop-shadow(0 8px 18px rgba(0,160,160,0.06)); }
          100% { filter: drop-shadow(0 0 0 rgba(0,160,160,0)); }
        }

        /* Star field and nebula styles */
        .star-field {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .star {
          position: absolute;
          background: radial-gradient(circle at 30% 30%, #fff 0%, rgba(255,255,255,0.6) 40%, rgba(255,255,255,0.15) 70%, transparent 100%);
          border-radius: 50%;
          transform-origin: center;
          will-change: opacity, transform;
          animation-name: twinkle;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
        }

        @keyframes twinkle {
          0% { opacity: 0.2; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.2); }
          100% { opacity: 0.25; transform: scale(0.95); }
        }

        .nebula {
          position: absolute;
          width: 45vmin;
          height: 45vmin;
          filter: blur(45px) saturate(150%);
          transform: translate3d(0,0,0);
          opacity: 0.15;
          border-radius: 50%;
          mix-blend-mode: screen;
          pointer-events: none;
        }

        .nebula-1 { left: -6%; top: 0%; background: radial-gradient(circle at 30% 40%, rgba(40,50,140,0.9) 0%, rgba(90,40,140,0.7) 30%, rgba(20,10,40,0.02) 80%); animation: nebPulse 20s ease-in-out infinite; }
        .nebula-2 { right: -4%; bottom: 2%; width: 38vmin; height: 38vmin; background: radial-gradient(circle at 60% 60%, rgba(5,80,80,0.85) 0%, rgba(0,40,80,0.5) 30%, rgba(0,0,0,0.02) 80%); animation: nebPulse 25s ease-in-out infinite reverse; }
        .nebula-3 { left: 20%; top: 40%; width: 30vmin; height: 30vmin; background: radial-gradient(circle at 40% 40%, rgba(120,30,100,0.7) 0%, rgba(70,10,70,0.4) 40%, rgba(0,0,0,0) 80%); animation: nebPulse 18s ease-in-out infinite 2s; }

        @keyframes nebPulse {
          0% { transform: scale(0.96); opacity: 0.1; }
          50% { transform: scale(1.06); opacity: 0.2; }
          100% { transform: scale(0.96); opacity: 0.1; }
        }

        .shooting-container { position: absolute; inset: 0; pointer-events: none; }
        .shooting-star {
          position: absolute;
          width: 2.5px;
          height: 2.5px;
          background: linear-gradient(90deg, rgba(255,255,255,0.9), rgba(255,255,255,0.06));
          filter: drop-shadow(0 0 10px rgba(255,255,255,0.2));
          transform: translate3d(-10vw, -10vh, 0) rotate(-35deg);
          animation-name: shoot;
          animation-duration: 2.4s;
          animation-timing-function: cubic-bezier(.2,.9,.1,1);
          animation-iteration-count: infinite;
        }

        @keyframes shoot {
          0% { opacity: 0; transform: translate3d(0,0,0) scaleX(0.6) rotate(-35deg); }
          12% { opacity: 1; }
          100% { opacity: 0; transform: translate3d(-70vw, 50vh, 0) scaleX(1.3) rotate(-35deg); }
        }

        /* Tech scroll styles */
        .tech-scroll {
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none; /* firefox */
          -ms-overflow-style: none; /* ie 10+ */
          cursor: grab;
        }
        .tech-scroll::-webkit-scrollbar { display: none; }
        .tech-scroll.dragging { cursor: grabbing; user-select: none; }
        
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .shadow-glow {
          box-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
        }
        
        @media (max-width: 768px) {
          .cyber-text-gradient {
            background: linear-gradient(90deg, #fff 0%, #0fd3d3 100%);
            background-size: 200% 200%;
            -webkit-background-clip: text;
            background-clip: text;
            animation: gradientShift 5s ease infinite;
          }
          
          .drop-shadow-glow {
            filter: drop-shadow(0 0 6px rgba(0, 255, 255, 0.4));
          }
        }
      `}</style>
    </section>
  );
};

export default Profile;