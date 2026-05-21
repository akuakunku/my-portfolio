import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaSatellite, FaSatelliteDish } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const Profile = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const imageRef = useRef(null);
  const containerRef = useRef(null);
  const spaceRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      // 1. Initial State: Background Reveal
      tl.fromTo(imageRef.current, 
        { scale: 1.4, filter: "blur(30px)", opacity: 0 },
        { scale: 1.1, filter: "blur(0px)", opacity: 0.3, duration: 2.5 }
      )
      
      // 2. Character-by-character Title Animation
      .fromTo(".title-char", 
        { y: 150, rotateX: -90, opacity: 0 },
        { y: 0, rotateX: 0, opacity: 1, stagger: 0.05, duration: 1.5 },
        "-=1.8"
      )

      // 3. Subtitle Lines Reveal
      .from(".subtitle-line", {
        x: -50,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2
      }, "-=1.2")

      // 4. Description Reveal (Typewriter-ish)
      .from(".profile-desc", {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power2.out"
      }, "-=0.8")

      // 5. HUD & UI Elements Entry
      .from(".hud-line", {
        width: 0,
        duration: 1,
        stagger: 0.1
      }, "-=1")
      .from(".hud-text", {
        opacity: 0,
        x: -10,
        duration: 0.5,
        stagger: 0.05
      }, "-=0.5");

      // Advanced Scroll Interactions
      gsap.to(imageRef.current, {
        yPercent: 20,
        scale: 1.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // Space Objects Animation
      const objects = gsap.utils.toArray('.space-obj');
      objects.forEach((obj) => {
        const speed = obj.dataset.speed || 1;
        const direction = obj.dataset.dir === 'left' ? -1 : 1;
        
        gsap.to(obj, {
          x: `${direction * 150}vw`,
          y: `${(Math.random() - 0.5) * 100}vh`,
          rotation: direction * 360,
          duration: 20 / speed,
          repeat: -1,
          ease: "none",
          delay: Math.random() * 10,
          onRepeat: () => {
            gsap.set(obj, { 
              x: `${-direction * 150}vw`,
              y: `${(Math.random() - 0.5) * 100}vh` 
            });
          }
        });
      });

      // Mouse Move Parallax for Title
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 40;
        const yPos = (clientY / window.innerHeight - 0.5) * 40;

        gsap.to(containerRef.current, {
          x: xPos,
          y: yPos,
          duration: 1,
          ease: "power2.out"
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const name = "CHESKO";

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#050505] perspective-1000"
    >
      {/* Background Cinematic Layer */}
      <div ref={imageRef} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#050505] z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
          alt="Tech Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Space Animation Layer */}
      <div ref={spaceRef} className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {/* Satellites */}
        <div className="space-obj absolute top-[20%] left-[-10%] text-cyber-primary/20" data-speed="0.3" data-dir="right">
          <FaSatellite size={30} />
        </div>
        <div className="space-obj absolute top-[60%] right-[-10%] text-cyber-primary/15" data-speed="0.2" data-dir="left">
          <FaSatelliteDish size={25} />
        </div>

        {/* Spacecraft / Ships */}
        <div className="space-obj absolute top-[40%] left-[-20%] text-white/10" data-speed="1.5" data-dir="right">
          <svg width="40" height="20" viewBox="0 0 40 20" fill="currentColor">
            <path d="M0 10 L10 0 L40 10 L10 20 Z" />
          </svg>
        </div>
        <div className="space-obj absolute top-[80%] right-[-20%] text-white/5" data-speed="1.2" data-dir="left">
          <svg width="30" height="15" viewBox="0 0 30 15" fill="currentColor">
            <path d="M30 7.5 L20 0 L0 7.5 L20 15 Z" />
          </svg>
        </div>

        {/* Shooting Stars */}
        {[...Array(3)].map((_, i) => (
          <div 
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
            style={{
              width: '100px',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: 'rotate(-45deg)',
              animation: `shooting-star ${5 + Math.random() * 10}s linear infinite`,
              animationDelay: `${Math.random() * 10}s`
            }}
          ></div>
        ))}
      </div>

      {/* Decorative HUD Frames */}
      <div className="absolute inset-0 z-20 pointer-events-none p-8 md:p-12">
        <div className="hud-line absolute top-12 left-12 h-px bg-cyber-primary/30 w-32 origin-left"></div>
        <div className="hud-line absolute top-12 left-12 w-px bg-cyber-primary/30 h-32 origin-top"></div>
        <div className="hud-line absolute bottom-12 right-12 h-px bg-cyber-primary/30 w-32 origin-right"></div>
        <div className="hud-line absolute bottom-12 right-12 w-px bg-cyber-primary/30 h-32 origin-bottom"></div>
        
        {/* Dynamic HUD Data */}
        <div className="absolute top-24 left-12 space-y-4">
          {["SYSTEM_ACTIVE", "NODE_01", "CORE_SYNC: 99%"].map((text, i) => (
            <div key={i} className="hud-text flex items-center space-x-3 font-mono text-[8px] text-cyber-primary/50 tracking-[0.4em]">
              <span className="w-1 h-1 bg-cyber-primary rounded-full animate-pulse"></span>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>

      <div ref={containerRef} className="relative z-30 text-center px-4 max-w-6xl mx-auto w-full">
        <h1 
          ref={titleRef}
          className="text-[15vw] md:text-[15vw] font-black tracking-tighter mb-4 leading-none flex justify-center overflow-visible py-4"
        >
          {name.split("").map((char, i) => (
            <span key={i} className="title-char inline-block px-0.5 md:px-1 cyber-text-gradient">{char}</span>
          ))}
        </h1>

        <div 
          ref={subtitleRef}
          className="flex flex-wrap items-center justify-center gap-3 md:gap-12 text-gray-500 mb-8 md:mb-12"
        >
          {["Web Developer", "UI/UX Designer", "JS Specialist"].map((text, i) => (
            <div key={i} className="subtitle-line flex items-center space-x-2 md:space-x-4">
              <span className="w-1 h-1 bg-cyber-primary rotate-45 shrink-0"></span>
              <span className="font-mono tracking-[0.2em] md:tracking-[0.4em] uppercase text-[8px] md:text-xs text-white/80 whitespace-nowrap">{text}</span>
            </div>
          ))}
        </div>
        
        <div className="profile-desc max-w-xl mx-auto border-t border-white/5 pt-8 md:pt-12 px-2">
          <p className="text-gray-500 text-[8px] md:text-xs leading-relaxed md:leading-loose font-mono uppercase tracking-[0.1em] md:tracking-[0.2em]">
            Specializing in high-performance digital experiences. 
            Merging aesthetic precision with technical excellence to build the next generation of web interfaces.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-[-10vh] left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="w-px h-20 bg-gradient-to-b from-cyber-primary to-transparent"></div>
        </div>
      </div>

      {/* Floating Personal Node - Left Bottom */}
      <div className="hud-text absolute bottom-32 md:bottom-12 left-6 md:left-12 z-40 flex items-center space-x-4 md:space-x-6 glassmorphism p-3 md:p-4 border border-white/5">
        <img 
          src="/img/aku.jpg" 
          alt="Node" 
          className="w-10 h-10 md:w-14 md:h-14 rounded-none border border-cyber-primary/20 grayscale hover:grayscale-0 transition-all duration-700"
        />
        <div className="text-left font-mono">
          <p className="text-white text-[8px] md:text-[10px] font-bold tracking-widest uppercase">CHESKO_AFIQ</p>
          <p className="text-cyber-primary/50 text-[6px] md:text-[8px] mt-1 tracking-widest uppercase">EST_2026 // PORTFOLIO_V4</p>
        </div>
      </div>
    </section>
  );
};

export default Profile;
