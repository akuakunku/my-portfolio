import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [expandedProject, setExpandedProject] = useState(null);
  
  const projects = [
    {
      id: "01",
      title: "Pendaftaran Wifi",
      subtitle: "NETWORK_MODULE",
      description: "A web-based application for easy and efficient Wifi registration services. Streamlining connectivity for urban sectors.",
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2070&auto=format&fit=crop",
      link: "https://heaven-link.vercel.app/",
      size: "large",
      date: "2024.05.21",
      tech: ["React", "Node.js", "MongoDB"],
      status: "LIVE"
    },
    {
      id: "02",
      title: "Resep Bunda",
      subtitle: "BIO_DATABASE",
      description: "A comprehensive platform providing various Indonesian recipes. Nutritional data for the populace.",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop",
      link: "https://resep-bunda.vercel.app/",
      size: "small",
      date: "2024.04.12",
      tech: ["Vue.js", "Firebase", "Tailwind"],
      status: "LIVE"
    },
    {
      id: "03",
      title: "Manajemen Pembayaran",
      subtitle: "FINANCIAL_CORE",
      description: "Internal management tool to track and process monthly client payments. Secure ledger sync active.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2070&auto=format&fit=crop",
      link: "https://app-pembayaran-wifi.vercel.app/",
      size: "medium",
      date: "2024.03.15",
      tech: ["Next.js", "Prisma", "PostgreSQL"],
      status: "LIVE"
    },
    {
      id: "04",
      title: "Al Quran Digital",
      subtitle: "SACRED_DATA",
      description: "Feature-rich digital Al Quran application with elegant interface. Spiritual guidance in digital format.",
      image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop",
      link: "https://github.com/akuakunku/alquran-digital/",
      size: "medium",
      date: "2024.02.28",
      tech: ["Flutter", "Dart", "API"],
      status: "ARCHIVED"
    },
    {
      id: "05",
      title: "IPTV_Player",
      subtitle: "STREAM_ENGINE",
      description: "High-performance streaming engine. Media distribution via global satellite uplink.",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
      link: "https://github.com/chesko21/IPTV_Player",
      size: "small",
      date: "2024.01.10",
      tech: ["Python", "FFmpeg", "WebRTC"],
      status: "LIVE"
    },
    {
      id: "06",
      title: "Smart_TV_App",
      subtitle: "VISUAL_INTERFACE",
      description: "Custom smart TV suite for next-gen entertainment. HUD integration for domestic units.",
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=2070&auto=format&fit=crop",
      link: "https://github.com/chesko21/smart_tv",
      size: "medium",
      date: "2023.12.20",
      tech: ["React Native", "GraphQL", "Apollo"],
      status: "BETA"
    },
    {
      id: "07",
      title: "Chesko_TV",
      subtitle: "BROADCAST_HUB",
      description: "Personalized TV broadcasting platform. Global reach via encrypted channels.",
      image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2070&auto=format&fit=crop",
      link: "https://github.com/chesko21/Chesko_TV",
      size: "large",
      date: "2023.11.05",
      tech: ["Angular", "Socket.io", "Redis"],
      status: "LIVE"
    },
    {
      id: "08",
      title: "M3U_Manager",
      subtitle: "DATA_ARCHITECT",
      description: "Advanced editor for managing complex playlists. Structural integrity verified.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
      link: "https://github.com/chesko21/m3u-editor",
      size: "small",
      date: "2023.10.15",
      tech: ["TypeScript", "Express", "Jest"],
      status: "LIVE"
    },
    {
      id: "09",
      title: "IPTV_Core_Edit",
      subtitle: "PYTHON_BACKEND",
      description: "Python core for high-speed manipulation of streaming data structures.",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
      link: "https://github.com/chesko21/iptv_edit",
      size: "medium",
      date: "2023.09.30",
      tech: ["Python", "FastAPI", "Docker"],
      status: "ARCHIVED"
    },
    {
      id: "10",
      title: "Chord Gitar",
      subtitle: "AUDIO_RESOURCE",
      description: "Simple web application for guitar chords. Dark mode enabled for late-night sessions.",
      image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=2070&auto=format&fit=crop",
      link: "https://chord-gitar.vercel.app/",
      size: "small",
      date: "2023.08.12",
      tech: ["HTML5", "CSS3", "JavaScript"],
      status: "LIVE"
    },
    {
      id: "11",
      title: "X-StreamPro",
      subtitle: "Xtream Iptv Player",
      description: "X-StreamPro is a high-performance IPTV streaming application designed for the best user experience. It supports Xtream Codes API, PiP (Picture-in-Picture) mode, and high-quality live streaming.",
      image: "https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?w=1920&auto=format&fit=crop",
      link: "https://github.com/chesko21/X-StreamPro/tree/master",
      size: "small",
      date: "2026.05.22",
      tech: ["Kotlin", "ExoPlayer", "MVVM"],
      status: "LIVE"
    }
  ];

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
      // Header animations
      gsap.from(".header-title", {
        y: isMobile ? 50 : 80,
        opacity: 0,
        duration: isMobile ? 1 : 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".header-title",
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });

      gsap.from(".header-subtitle", {
        x: isMobile ? -30 : -50,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".header-title",
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });

      // Cards animation with stagger for mobile
      const cards = gsap.utils.toArray(".project-card");
      
      cards.forEach((card, index) => {
        gsap.from(card, {
          y: isMobile ? 40 : 50,
          opacity: 0,
          scale: isMobile ? 0.95 : 1,
          duration: isMobile ? 0.8 : 1,
          delay: isMobile ? index * 0.05 : index * 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none"
          }
        });
      });

      // Parallax effect for images on scroll
      if (!isMobile) {
        const images = gsap.utils.toArray(".project-image");
        images.forEach((img) => {
          gsap.to(img, {
            y: 30,
            scrollTrigger: {
              trigger: img,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5
            }
          });
        });
      }

      // Floating animation for decorative elements
      gsap.to(".floating-line", {
        y: isMobile ? 10 : 15,
        duration: isMobile ? 2 : 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2
      });

    }, containerRef);

    return () => ctx.revert();
  }, [isMobile]);

  const handleCardClick = (projectId) => {
    if (!isMobile) return;
    if (expandedProject === projectId) {
      setExpandedProject(null);
    } else {
      setExpandedProject(projectId);
    }
  };

  return (
    <section ref={containerRef} id="portfolio" className="bg-[#050505] text-white py-12 md:py-20 px-3 md:px-8 overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(transparent 0px, transparent 19px, rgba(0, 255, 255, 0.05) 20px)`,
          backgroundSize: '100% 20px'
        }}></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(90deg, transparent 0px, transparent 19px, rgba(0, 255, 255, 0.05) 20px)`,
          backgroundSize: '20px 100%'
        }}></div>
      </div>

      {/* Newspaper Header */}
      <div className="max-w-7xl mx-auto mb-12 md:mb-16 border-b-4 border-cyber-blue/20 pb-6 md:pb-8 flex flex-col md:flex-row justify-between items-end gap-4 px-2 relative">
        <div className="w-full md:w-auto">
          <h2 className="header-title text-3xl md:text-8xl font-black tracking-tighter uppercase cyber-text-gradient py-2 px-1 overflow-visible relative">
            PROJECT_ARCHIVES
            <div className="absolute -bottom-2 left-0 w-20 h-0.5 bg-cyber-blue/50 md:hidden"></div>
          </h2>
          <p className="header-subtitle font-mono text-[6px] md:text-xs text-cyber-blue/60 tracking-[0.15em] md:tracking-[0.5em] mt-2 flex flex-wrap gap-2">
            <span>DAILY_INTEL_REPORT</span>
            <span className="hidden md:inline">//</span>
            <span>SECTOR_WEB_DEV</span>
            <span className="hidden md:inline">//</span>
            <span>{new Date().toLocaleDateString()}</span>
          </p>
        </div>
        <div className="text-right hidden md:block">
          <p className="font-mono text-[8px] text-gray-500 uppercase tracking-widest">Classification: TOP_SECRET</p>
          <p className="font-mono text-[8px] text-gray-500 uppercase tracking-widest">Source: CHESKO_CORE_v4.0</p>
        </div>
        
        {/* Mobile Stats */}
        {isMobile && (
          <div className="flex gap-4 text-[6px] font-mono text-gray-500">
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
              <span>{projects.length} ACTIVE</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 bg-cyber-blue rounded-full"></div>
              <span>v4.0 CORE</span>
            </div>
          </div>
        )}
      </div>

      {/* Asymmetric Grid Layout */}
      <div className={`max-w-7xl mx-auto grid gap-3 md:gap-6 ${
        isMobile 
          ? 'grid-cols-1 auto-rows-auto'
          : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[280px] md:auto-rows-[300px]'
      }`}>
        {projects.map((project, index) => (
          <div 
            key={project.id} 
            className={`project-card glassmorphism border border-white/5 hover:border-cyber-blue/30 transition-all duration-500 overflow-hidden flex flex-col relative
              ${!isMobile && project.size === 'large' ? 'sm:col-span-2 lg:col-span-2 lg:row-span-2' : ''}
              ${!isMobile && project.size === 'medium' ? 'sm:col-span-1 lg:col-span-1 lg:row-span-2' : ''}
              ${!isMobile && project.size === 'small' ? 'sm:col-span-1 lg:col-span-1 lg:row-span-1' : ''}
              ${isMobile && expandedProject === project.id ? 'min-h-[400px]' : 'min-h-[280px]'}
              ${isMobile ? 'cursor-pointer active:scale-[0.98] transition-transform duration-200' : ''}
            `}
            onClick={() => handleCardClick(project.id)}
            onMouseEnter={() => !isMobile && setHoveredProject(project.id)}
            onMouseLeave={() => !isMobile && setHoveredProject(null)}
          >
            {/* Project Image Header */}
            <div className="absolute inset-0 z-0">
              <img 
                src={project.image} 
                className={`project-image w-full h-full object-cover transition-all duration-700 ${
                  isMobile 
                    ? 'opacity-50 group-active:scale-105' 
                    : `grayscale ${hoveredProject === project.id ? 'grayscale-0 scale-110 opacity-60' : 'opacity-40'}`
                }`}
                alt={project.title} 
                loading="lazy"
              />
              <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent transition-opacity duration-500 ${
                isMobile && expandedProject === project.id ? 'opacity-100' : 'opacity-80'
              }`}></div>
            </div>

            {/* Status Badge - Mobile Only */}
            {isMobile && (
              <div className="absolute top-3 right-3 z-20">
                <div className={`px-2 py-0.5 rounded-full text-[6px] font-mono font-bold uppercase tracking-wider ${
                  project.status === 'LIVE' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                  project.status === 'BETA' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                  'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                }`}>
                  {project.status}
                </div>
              </div>
            )}

            {/* Project Content */}
            <div className={`relative z-10 p-4 md:p-6 h-full flex flex-col transition-all duration-500 ${
              isMobile && expandedProject === project.id ? 'justify-start pt-12' : 'justify-end'
            }`}>
              <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                <span className="font-mono text-cyber-blue text-[7px] md:text-[9px] tracking-widest uppercase bg-cyber-blue/10 px-2 py-0.5 border border-cyber-blue/20">
                  {project.subtitle}
                </span>
                <span className="font-mono text-gray-500 text-[7px] md:text-[8px] tracking-widest hidden md:block">
                  {project.date}
                </span>
                {isMobile && (
                  <span className="font-mono text-gray-500 text-[6px] tracking-widest">
                    {project.date}
                  </span>
                )}
              </div>

              <h3 className={`font-black mb-2 md:mb-3 tracking-tighter uppercase group-hover:text-cyber-blue transition-colors leading-tight
                ${!isMobile && project.size === 'large' ? 'text-2xl md:text-5xl' : 'text-lg md:text-2xl'}
                ${isMobile ? 'text-xl' : ''}
              `}>
                {project.title.split("_").join(" ")}
              </h3>

              {/* Description - Conditional rendering for mobile */}
              {((!isMobile && project.size !== 'small') || (isMobile && expandedProject === project.id)) && (
                <>
                  <div className={`border-l-2 border-cyber-blue/30 pl-3 md:pl-4 mb-3 md:mb-4 transform transition-all duration-500 ${
                    isMobile ? 'translate-x-0 opacity-100' : 'opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0'
                  }`}>
                    <p className="text-gray-400 text-[9px] md:text-xs font-mono leading-relaxed uppercase tracking-wider line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack - Mobile Only when expanded */}
                  {isMobile && project.tech && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.tech.map((tech, i) => (
                        <span key={i} className="text-[6px] font-mono px-1.5 py-0.5 bg-cyber-blue/10 border border-cyber-blue/20 text-cyber-blue/80 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* Mobile Expand Indicator */}
              {isMobile && expandedProject !== project.id && (
                <div className="absolute bottom-4 right-4 text-cyber-blue/50">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              )}

              <div className={`flex justify-between items-center pt-3 md:pt-4 border-t border-white/5 mt-2 transition-all duration-500 ${
                isMobile && expandedProject === project.id ? 'mt-auto' : ''
              }`}>
                <a 
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[7px] md:text-[9px] text-white/50 hover:text-cyber-blue tracking-[0.2em] md:tracking-[0.3em] uppercase transition-all duration-300 hover:tracking-[0.4em]"
                  onClick={(e) => e.stopPropagation()}
                >
                  {isMobile ? '[ ACCESS ]' : '[ ACCESS_FILE ]'}
                </a>
                <div className="text-[7px] md:text-[8px] font-mono text-gray-600">
                  #{project.id}
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className={`absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyber-blue to-transparent transition-transform duration-500 ${
              isMobile ? (expandedProject === project.id ? 'translate-y-0' : '-translate-y-full') : '-translate-y-full group-hover:translate-y-0'
            } z-20`}></div>
            
            <div className={`absolute top-0 right-0 w-6 h-6 md:w-8 md:h-8 border-t border-r border-white/10 transition-all duration-500 ${
              !isMobile && hoveredProject === project.id ? 'border-cyber-blue/60 w-8 h-8' : ''
            }`}></div>
            <div className={`absolute bottom-0 left-0 w-6 h-6 md:w-8 md:h-8 border-b border-l border-white/10 transition-all duration-500 ${
              !isMobile && hoveredProject === project.id ? 'border-cyber-blue/60 w-8 h-8' : ''
            }`}></div>

            {/* Glow Effect on Hover - Desktop */}
            {!isMobile && hoveredProject === project.id && (
              <div className="absolute inset-0 bg-gradient-to-t from-cyber-blue/5 via-transparent to-transparent pointer-events-none"></div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile Load More Button */}
      {isMobile && (
        <div className="max-w-7xl mx-auto mt-8 flex justify-center">
          <button 
            className="group px-6 py-2 border border-cyber-blue/30 bg-cyber-blue/5 hover:bg-cyber-blue/10 transition-all duration-300 rounded-lg"
            onClick={() => {
              const cards = document.querySelectorAll('.project-card');
              const lastCard = cards[cards.length - 1];
              lastCard.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }}
          >
            <span className="font-mono text-[8px] text-cyber-blue tracking-wider uppercase flex items-center gap-2">
              SCAN_MORE
              <svg className="w-3 h-3 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 13l-7 7-7-7m7-7v14" />
              </svg>
            </span>
          </button>
        </div>
      )}

      {/* Footer Decoration */}
      <div className="max-w-7xl mx-auto mt-12 md:mt-16 pt-6 md:pt-8 border-t border-white/10">
        <div className="flex justify-center items-center gap-2 md:gap-8 opacity-20">
          {/* Floating decorative lines */}
          {[...Array(isMobile ? 3 : 5)].map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="floating-line w-px h-8 md:h-12 bg-cyber-blue mb-1 md:mb-2" style={{ animationDelay: `${i * 0.2}s` }}></div>
              <span className="font-mono text-[5px] md:text-[6px] tracking-widest text-cyber-blue">SCTR_0{i+1}</span>
            </div>
          ))}
        </div>
        
        {/* Mobile Footer Text */}
        {isMobile && (
          <div className="text-center mt-4">
            <p className="font-mono text-[5px] text-gray-600 tracking-wider">
              TOTAL_PROJECTS: {projects.length} // LAST_SYNC: {new Date().toLocaleTimeString()}
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        .glassmorphism {
          background: rgba(5, 5, 5, 0.7);
          backdrop-filter: blur(0px);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        @media (min-width: 768px) {
          .glassmorphism:hover {
            backdrop-filter: blur(10px);
            background: rgba(5, 5, 5, 0.5);
            transform: translateY(-5px);
          }
        }
        
        @media (max-width: 768px) {
          .glassmorphism {
            backdrop-filter: blur(0px);
            background: rgba(5, 5, 5, 0.85);
          }
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
        
        .animate-scan {
          animation: scan 1s ease-out;
        }
        
        @keyframes scan {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
        
        @media (max-width: 768px) {
          .project-card {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .cyber-text-gradient {
            animation: gradientShift 3s ease infinite;
          }
        }
      `}</style>
    </section>
  );
};

export default Portfolio;