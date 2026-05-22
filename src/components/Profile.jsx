import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaSatellite, FaSatelliteDish, FaChevronDown, FaCode, FaCrown, FaRocket, FaHeartbeat, FaGlobe, FaShieldAlt, FaBolt, FaStar } from 'react-icons/fa';

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
      const masterTl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Better handling for mobile vs desktop
      if (!isMobile) {
        masterTl
          .fromTo(imageRef.current, 
            { scale: 1.8, filter: "blur(50px)", opacity: 0 },
            { scale: 1.15, filter: "blur(0px)", opacity: 0.35, duration: 3, ease: "expo.out" }
          )
          .fromTo(".overlay-gradient", 
            { opacity: 0 },
            { opacity: 1, duration: 1.8 },
            "-=2.5"
          )
          .fromTo(".floating-orb", 
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 0.15, stagger: 0.15, duration: 1.8, ease: "back.out(1.2)" },
            "-=1.2"
          )
          .fromTo(".hud-corner", 
            { strokeDashoffset: 150, strokeDasharray: 150 },
            { strokeDashoffset: 0, duration: 1.5, stagger: 0.12, ease: "power2.inOut" },
            "-=1"
          );
      } else {
        // Mobile optimized initial state
        gsap.set(imageRef.current, { scale: 1, opacity: 0.4 });
        gsap.set(".overlay-gradient", { opacity: 1 });
        gsap.set(".floating-orb", { scale: 0.6, opacity: 0.08 });
        
        // Mobile specific animations
        masterTl
          .fromTo(imageRef.current, 
            { scale: 1.2, filter: "blur(15px)", opacity: 0 },
            { scale: 1, filter: "blur(0px)", opacity: 0.4, duration: 1.5, ease: "power2.out" }
          )
          .fromTo(".floating-orb", 
            { scale: 0, opacity: 0 },
            { scale: 0.6, opacity: 0.08, stagger: 0.1, duration: 1, ease: "back.out(1)" },
            "-=0.8"
          );
      }

      // Title animation with character staggering (common for both)
      masterTl
        .fromTo(".title-char", 
          { y: isMobile ? 80 : 250, rotateX: isMobile ? -40 : -150, opacity: 0, filter: "blur(10px)", scale: 0.6 },
          { y: 0, rotateX: 0, opacity: 1, filter: "blur(0px)", scale: 1, stagger: isMobile ? 0.04 : 0.1, duration: isMobile ? 0.8 : 1.5, ease: "elastic.out(1, 0.5)" },
          isMobile ? "-=0.5" : "-=1.2"
        )
        .fromTo(".glow-pulse", 
          { scale: 0, opacity: 0 },
          { scale: 1.5, opacity: 0.3, duration: 0.6, stagger: 0.03, repeat: 1, yoyo: true },
          "-=0.6"
        )
        .fromTo(".subtitle-line", 
          { x: isMobile ? -30 : -100, opacity: 0, rotation: isMobile ? -5 : -15, skewX: isMobile ? -5 : -20 },
          { x: 0, opacity: 1, rotation: 0, skewX: 0, stagger: isMobile ? 0.1 : 0.15, duration: isMobile ? 0.7 : 1.2, ease: "back.out(1)" },
          "-=0.8"
        )
        .fromTo(badgeRef.current, 
          { scale: 0, rotation: -360, opacity: 0, y: -30 },
          { scale: 1, rotation: 0, opacity: 1, y: 0, duration: isMobile ? 0.6 : 1, ease: "elastic.out(1, 0.5)" },
          "-=0.6"
        )
        .fromTo(profileImgRef.current, 
          { scale: 0, rotation: -180, opacity: 0, borderRadius: "50%" },
          { scale: 1, rotation: 0, opacity: 1, borderRadius: "12px", duration: isMobile ? 0.6 : 1, ease: "back.out(1)" },
          "-=0.5"
        )
        .fromTo(".profile-desc", 
          { opacity: 0, y: 30, filter: "blur(8px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: isMobile ? 0.7 : 1.2, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(".profile-desc span", 
          { opacity: 0, x: -10, rotationX: -15 },
          { opacity: 1, x: 0, rotationX: 0, stagger: isMobile ? 0.03 : 0.05, duration: 0.6, ease: "back.out(0.6)" },
          "-=0.7"
        )
        .fromTo(".hud-text", 
          { opacity: 0, x: -20, filter: "blur(4px)" },
          { opacity: 1, x: 0, filter: "blur(0px)", stagger: isMobile ? 0.08 : 0.12, duration: 0.6, ease: "power2.out" },
          "-=0.6"
        )
        .fromTo(".radar-container", 
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1)" },
          "-=0.4"
        )
        .fromTo(scrollIndicatorRef.current, 
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "bounce.out" },
          "-=0.3"
        );

      // Floating animations (optimized for mobile)
      if (!isMobile) {
        gsap.to(".floating-orb", {
          y: "random(-30, 30)",
          x: "random(-20, 20)",
          duration: "random(6, 12)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.2
        });
      } else {
        // Subtle movement on mobile to save battery
        gsap.to(".floating-orb", {
          y: "random(-15, 15)",
          duration: "random(8, 15)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.3
        });
      }

      // Parallax scroll effects
      gsap.to(imageRef.current, {
        yPercent: isMobile ? 15 : 30,
        scale: isMobile ? 1.1 : 1.3,
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

      // Mouse move effect (desktop only)
      const handleMouseMove = (e) => {
        if (isMobile) return;
        const { clientX, clientY } = e;
        const xPercent = (clientX / window.innerWidth - 0.5) * 2;
        const yPercent = (clientY / window.innerHeight - 0.5) * 2;
        
        gsap.to(containerRef.current, {
          x: xPercent * 30,
          y: yPercent * 20,
          rotationX: yPercent * 4,
          rotationY: xPercent * 4,
          duration: 0.8,
          ease: "power2.out"
        });
        
        gsap.to(imageRef.current, {
          x: xPercent * 20,
          y: yPercent * 15,
          duration: 1,
          ease: "power2.out"
        });
        
        gsap.to(".floating-orb", {
          x: xPercent * 35,
          y: yPercent * 30,
          duration: 1.2,
          ease: "power2.out",
          stagger: 0.05
        });
      };

      if (!isMobile) {
        window.addEventListener('mousemove', handleMouseMove);
      }
      
      // Scroll indicator animation
      gsap.to(scrollIndicatorRef.current, {
        y: 12,
        duration: isMobile ? 1 : 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });

      // Scan line animation (disabled on mobile for performance)
      if (!isMobile) {
        gsap.to(".scan-line", {
          y: "100%",
          duration: 4,
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

  const handleCharHover = (index) => {
    if (isMobile) return;
    setHoveredChar(index);
    gsap.to(`.title-char-${index}`, {
      y: -15,
      scale: 1.2,
      textShadow: "0 0 30px rgba(0, 255, 255, 0.8)",
      duration: 0.3,
      ease: "back.out(1.5)"
    });
    gsap.to(`.glow-${index}`, {
      scale: 1.8,
      opacity: 0.4,
      duration: 0.2,
      ease: "power2.out"
    });
  };

  const handleCharLeave = (index) => {
    if (isMobile) return;
    setHoveredChar(null);
    gsap.to(`.title-char-${index}`, {
      y: 0,
      scale: 1,
      textShadow: "0 0 0px rgba(0, 255, 255, 0)",
      duration: 0.4,
      ease: "power2.out"
    });
    gsap.to(`.glow-${index}`, {
      scale: 0,
      opacity: 0,
      duration: 0.2
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#010105]"
      style={{ perspective: isMobile ? "800px" : "2500px" }}
    >
      {/* Background Image */}
      <div ref={imageRef} className="absolute inset-0 z-0">
        <div className="overlay-gradient absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-[#010105] z-10"></div>
        {!isMobile && <div className="scan-line absolute inset-0 w-full h-full bg-gradient-to-b from-transparent via-cyber-primary/5 to-transparent pointer-events-none z-10" style={{ transform: "translateY(-100%)" }}></div>}
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
          alt="Tech Background"
          className="w-full h-full object-cover transform-gpu"
          style={{ willChange: "transform" }}
          loading="eager"
        />
      </div>

      {/* Floating Orbs */}
      <div className="absolute inset-0 z-5 pointer-events-none overflow-hidden">
        {[...Array(isMobile ? 4 : 12)].map((_, i) => (
          <div
            key={i}
            className="floating-orb absolute rounded-full"
            style={{
              width: `${Math.random() * (isMobile ? 120 : 300) + (isMobile ? 30 : 80)}px`,
              height: `${Math.random() * (isMobile ? 120 : 300) + (isMobile ? 30 : 80)}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: isMobile ? 0.03 : 0.06,
              filter: `blur(${isMobile ? '40px' : '80px'})`,
              background: `radial-gradient(circle, ${i % 2 === 0 ? 'rgba(0, 255, 255' : 'rgba(255, 0, 255'}, ${Math.random() * 0.3 + 0.05}), transparent)`
            }}
          />
        ))}
      </div>

      {/* Space Objects */}
      <div ref={spaceRef} className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        <div className="space-obj absolute top-[10%] left-[-20%] text-cyber-primary/35" data-speed="0.2" data-dir="right" data-start-x="-200" data-end-x="200">
          <FaSatellite size={isMobile ? 25 : 45} className="drop-shadow-glow animate-float" />
        </div>
        <div className="space-obj absolute top-[75%] right-[-20%] text-purple-500/25" data-speed="0.15" data-dir="left" data-start-x="200" data-end-x="-200">
          <FaSatelliteDish size={isMobile ? 20 : 40} className="drop-shadow-glow" />
        </div>
        
        <div className="space-obj absolute top-[25%] left-[-30%] text-cyan-400/20" data-speed="2" data-dir="right" data-start-x={isMobile ? "-250" : "-300"} data-end-x={isMobile ? "250" : "300"}>
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
        
        <div className="space-obj absolute top-[85%] left-[15%] text-yellow-500/15" data-speed="1.5" data-dir="right" data-start-x="-150" data-end-x="150">
          <FaStar size={isMobile ? 15 : 30} className="animate-spin-slow" />
        </div>
        
        {/* Shooting Stars - fewer on mobile */}
        {[...Array(isMobile ? 3 : 8)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-gradient-to-r from-transparent via-cyber-primary to-transparent opacity-30"
            style={{
              width: `${(isMobile ? 80 : 180) + Math.random() * (isMobile ? 60 : 120)}px`,
              height: isMobile ? '1px' : '2.5px',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `rotate(${-40 + Math.random() * 80}deg)`,
              animation: `shooting-star ${3 + Math.random() * 10}s linear infinite`,
              animationDelay: `${Math.random() * 15}s`,
              filter: 'blur(1px)'
            }}
          />
        ))}
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
          className={`${isMobile ? 'text-[15vw]' : 'text-[14vw] md:text-[13vw]'} font-black tracking-tighter mb-4 md:mb-8 leading-[0.85] flex justify-center flex-wrap relative`}
          style={{ perspective: "1500px" }}
        >
          {name.split("").map((char, i) => (
            <div key={i} className="relative inline-block">
              <div className={`glow-${i} absolute inset-0 bg-cyber-primary rounded-full filter blur-xl`} style={{ scale: 0, opacity: 0 }}></div>
              <span 
                className={`title-char title-char-${i} inline-block px-0.5 md:px-2 cyber-text-gradient cursor-default transition-all duration-300`}
                onMouseEnter={() => handleCharHover(i)}
                onMouseLeave={() => handleCharLeave(i)}
                style={{ 
                  transformStyle: "preserve-3d",
                  transform: !isMobile && hoveredChar === i ? "translateY(-10px) scale(1.1)" : "none",
                  filter: !isMobile && hoveredChar === i ? "drop-shadow(0 0 20px rgba(0, 255, 255, 0.6))" : "none",
                  display: "inline-block",
                  textShadow: "0 0 15px rgba(0, 255, 255, 0.3)"
                }}
              >
                {char}
              </span>
            </div>
          ))}
        </h1>

        <div 
          ref={subtitleRef}
          className={`flex flex-wrap items-center justify-center gap-3 md:gap-20 mb-6 md:mb-20 ${isMobile ? 'px-2' : ''}`}
        >
          {[
            { icon: FaCode, text: isMobile ? "WEB DEV" : "WEB DEVELOPER", color: "text-cyan-400" },
            { icon: FaRocket, text: isMobile ? "UI/UX" : "UI/UX DESIGNER", color: "text-purple-400" },
            { icon: FaCrown, text: isMobile ? "JS EXPERT" : "JAVASCRIPT EXPERT", color: "text-yellow-400" }
          ].map((item, i) => (
            <div key={i} className="subtitle-line flex items-center space-x-2 md:space-x-5 group cursor-default">
              <div className="relative">
                <item.icon className={`${item.color} text-[8px] md:text-base group-hover:scale-110 transition-transform duration-300`} />
                <div className={`absolute inset-0 ${item.color} filter blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300`}></div>
              </div>
              <span className={`font-mono tracking-[0.15em] md:tracking-[0.5em] uppercase ${isMobile ? 'text-[7px]' : 'text-[10px] md:text-sm'} text-white/80 group-hover:text-white transition-all duration-300 whitespace-nowrap font-bold`}>
                {item.text}
              </span>
              <div className="w-px h-3 md:h-5 bg-gradient-to-t from-cyber-primary/30 via-cyber-primary to-cyber-primary/30 group-hover:h-5 md:group-hover:h-6 transition-all duration-300"></div>
            </div>
          ))}
        </div>
        
        <div className={`profile-desc max-w-3xl mx-auto border-t border-cyber-primary/20 ${isMobile ? 'pt-6' : 'pt-12 md:pt-16'} ${isMobile ? 'px-2' : 'px-6'}`}>
          <p className={`${isMobile ? 'text-[7px]' : 'text-[10px] md:text-sm'} text-gray-300 leading-relaxed md:leading-loose font-mono uppercase tracking-[0.1em] md:tracking-[0.3em] font-light`}>
            {["✦", "Specializing in", "high-performance", "digital experiences.", "✦", "Merging aesthetic", "precision with", "technical excellence", "✦"].map((word, i) => (
              <span key={i} className="inline-block transition-all duration-300 hover:text-cyber-primary hover:tracking-[0.3em] md:hover:tracking-[0.5em] mx-0.5 md:mx-1 hover:scale-105">
                {word}
              </span>
            ))}
          </p>
        </div>

        <div ref={scrollIndicatorRef} className={`absolute ${isMobile ? 'bottom-[-8vh]' : 'bottom-[-18vh]'} left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 md:gap-5 cursor-pointer opacity-0 z-40`}>
          <div className="relative">
            <div className={`w-px ${isMobile ? 'h-16' : 'h-28'} bg-gradient-to-b from-cyber-primary via-cyber-primary/50 to-transparent`}></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 md:w-2 md:h-2 bg-cyber-primary rounded-full animate-ping"></div>
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-0.5 h-0.5 md:w-1.5 md:h-1.5 bg-cyber-primary rounded-full"></div>
          </div>
          <FaChevronDown className={`text-cyber-primary/60 ${isMobile ? 'text-[8px]' : 'text-sm'} animate-bounce`} />
          <span className={`font-mono ${isMobile ? 'text-[5px]' : 'text-[7px]'} tracking-[0.2em] md:tracking-[0.5em] text-cyber-primary/50 uppercase font-bold`}>
            {isMobile ? "SCROLL ↓" : "SCROLL TO EXPLORE ↓"}
          </span>
        </div>
      </div>

      {/* Profile Card - RAISED HIGHER ON MOBILE */}
      <div className={`hud-text absolute z-40 group cursor-pointer ${
        isMobile 
          ? 'top-6 right-4 left-auto bottom-auto' 
          : 'bottom-6 md:bottom-10 left-5 md:left-10'
      }`}>
        <div className={`flex items-center space-x-2 md:space-x-5 backdrop-blur-xl bg-black/40 border border-white/15 rounded-xl transition-all duration-500 hover:border-cyber-primary/60 hover:bg-black/60 hover:scale-105 ${
          isMobile ? 'p-2' : 'p-2 md:p-4'
        }`}>
          <div className="relative">
            <img 
              ref={profileImgRef}
              src="/img/aku.jpg" 
              alt="CHESKO AFIQ" 
              className={`${isMobile ? 'w-10 h-10' : 'w-14 h-14 md:w-20 md:h-20'} object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110 group-hover:rounded-2xl`}
              style={{ borderRadius: '12px' }}
              loading="eager"
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
            transform: translateX(-100px) translateY(-100px) rotate(-45deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateX(250px) translateY(250px) rotate(-45deg);
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
          background: linear-gradient(135deg, #ffffff 0%, #00ffff 30%, #ff00ff 70%, #ffffff 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradientShift 5s ease infinite;
        }
        
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .shadow-glow {
          box-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
        }
        
        @media (max-width: 768px) {
          .cyber-text-gradient {
            background: linear-gradient(135deg, #fff 0%, #00ffff 50%, #fff 100%);
            background-size: 200% 200%;
            -webkit-background-clip: text;
            background-clip: text;
            animation: gradientShift 3s ease infinite;
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