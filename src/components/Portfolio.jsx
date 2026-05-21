import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const containerRef = useRef(null);
  
  const projects = [
    {
      id: "01",
      title: "Pendaftaran Wifi",
      subtitle: "NETWORK_MODULE",
      description: "A web-based application for easy and efficient Wifi registration services. Streamlining connectivity for urban sectors.",
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2070&auto=format&fit=crop",
      link: "https://heaven-link.vercel.app/",
      size: "large",
      date: "2024.05.21"
    },
    {
      id: "02",
      title: "Resep Bunda",
      subtitle: "BIO_DATABASE",
      description: "A comprehensive platform providing various Indonesian recipes. Nutritional data for the populace.",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop",
      link: "https://resep-bunda.vercel.app/",
      size: "small",
      date: "2024.04.12"
    },
    {
      id: "03",
      title: "Manajemen Pembayaran",
      subtitle: "FINANCIAL_CORE",
      description: "Internal management tool to track and process monthly client payments. Secure ledger sync active.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2070&auto=format&fit=crop",
      link: "https://app-pembayaran-wifi.vercel.app/",
      size: "medium",
      date: "2024.03.15"
    },
    {
      id: "04",
      title: "Al Quran Digital",
      subtitle: "SACRED_DATA",
      description: "Feature-rich digital Al Quran application with elegant interface. Spiritual guidance in digital format.",
      image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop",
      link: "https://github.com/akuakunku/alquran-digital/",
      size: "medium",
      date: "2024.02.28"
    },
    {
      id: "05",
      title: "IPTV_Player",
      subtitle: "STREAM_ENGINE",
      description: "High-performance streaming engine. Media distribution via global satellite uplink.",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
      link: "https://github.com/chesko21/IPTV_Player",
      size: "small",
      date: "2024.01.10"
    },
    {
      id: "06",
      title: "Smart_TV_App",
      subtitle: "VISUAL_INTERFACE",
      description: "Custom smart TV suite for next-gen entertainment. HUD integration for domestic units.",
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=2070&auto=format&fit=crop",
      link: "https://github.com/chesko21/smart_tv",
      size: "medium",
      date: "2023.12.20"
    },
    {
      id: "07",
      title: "Chesko_TV",
      subtitle: "BROADCAST_HUB",
      description: "Personalized TV broadcasting platform. Global reach via encrypted channels.",
      image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2070&auto=format&fit=crop",
      link: "https://github.com/chesko21/Chesko_TV",
      size: "large",
      date: "2023.11.05"
    },
    {
      id: "08",
      title: "M3U_Manager",
      subtitle: "DATA_ARCHITECT",
      description: "Advanced editor for managing complex playlists. Structural integrity verified.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
      link: "https://github.com/chesko21/m3u-editor",
      size: "small",
      date: "2023.10.15"
    },
    {
      id: "09",
      title: "IPTV_Core_Edit",
      subtitle: "PYTHON_BACKEND",
      description: "Python core for high-speed manipulation of streaming data structures.",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
      link: "https://github.com/chesko21/iptv_edit",
      size: "medium",
      date: "2023.09.30"
    },
    {
      id: "10",
      title: "Chord Gitar",
      subtitle: "AUDIO_RESOURCE",
      description: "Simple web application for guitar chords. Dark mode enabled for late-night sessions.",
      image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=2070&auto=format&fit=crop",
      link: "https://chord-gitar.vercel.app/",
      size: "small",
      date: "2023.08.12"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".project-card");
      
      cards.forEach((card) => {
        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none"
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="portfolio" className="bg-[#050505] text-white py-20 px-4 md:px-8">
      {/* Newspaper Header */}
      <div className="max-w-7xl mx-auto mb-16 border-b-4 border-white/10 pb-8 flex flex-col md:flex-row justify-between items-end gap-4 px-2">
        <div className="w-full md:w-auto">
          <h2 className="text-4xl md:text-8xl font-black tracking-tighter uppercase italic cyber-text-gradient py-2 px-1 overflow-visible">
            PROJECT_ARCHIVES
          </h2>
          <p className="font-mono text-[8px] md:text-xs text-cyber-blue/60 tracking-[0.2em] md:tracking-[0.5em] mt-2">
            DAILY_INTEL_REPORT // SECTOR_WEB_DEV // {new Date().toLocaleDateString()}
          </p>
        </div>
        <div className="text-right hidden md:block">
          <p className="font-mono text-[8px] text-gray-500 uppercase tracking-widest">Classification: TOP_SECRET</p>
          <p className="font-mono text-[8px] text-gray-500 uppercase tracking-widest">Source: CHESKO_CORE_v4.0</p>
        </div>
      </div>

      {/* Asymmetric Grid Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-[280px] md:auto-rows-[300px]">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className={`project-card glassmorphism group border border-white/5 hover:border-cyber-blue/30 transition-all duration-500 overflow-hidden flex flex-col relative
              ${project.size === 'large' ? 'sm:col-span-2 lg:col-span-2 lg:row-span-2' : ''}
              ${project.size === 'medium' ? 'sm:col-span-1 lg:col-span-1 lg:row-span-2' : ''}
              ${project.size === 'small' ? 'sm:col-span-1 lg:col-span-1 lg:row-span-1' : ''}
            `}
          >
            {/* Project Image Header */}
            <div className="absolute inset-0 z-0">
              <img 
                src={project.image} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 opacity-40 group-hover:opacity-60" 
                alt={project.title} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
            </div>

            {/* Project Content (Newspaper Body) */}
            <div className="relative z-10 p-6 h-full flex flex-col justify-end">
              <div className="flex justify-between items-start mb-2">
                <span className="font-mono text-cyber-blue text-[8px] md:text-[9px] tracking-widest uppercase bg-cyber-blue/10 px-2 py-0.5 border border-cyber-blue/20">
                  {project.subtitle}
                </span>
                <span className="font-mono text-gray-500 text-[8px] tracking-widest">
                  {project.date}
                </span>
              </div>

              <h3 className={`font-black mb-3 tracking-tighter uppercase group-hover:text-cyber-blue transition-colors leading-none
                ${project.size === 'large' ? 'text-3xl md:text-5xl' : 'text-xl md:text-2xl'}
              `}>
                {project.title.split("_").join(" ")}
              </h3>

              {project.size !== 'small' && (
                <div className="border-l-2 border-cyber-blue/30 pl-4 mb-4 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-500">
                  <p className="text-gray-400 text-[10px] md:text-xs font-mono leading-relaxed uppercase tracking-wider line-clamp-3">
                    {project.description}
                  </p>
                </div>
              )}

              <div className="flex justify-between items-center pt-4 border-t border-white/5 mt-2">
                <a 
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[8px] md:text-[9px] text-white/50 hover:text-cyber-blue tracking-[0.3em] uppercase transition-colors"
                >
                  [ ACCESS_FILE ]
                </a>
                <div className="text-[8px] font-mono text-gray-600">
                  #{project.id}
                </div>
              </div>
            </div>

            {/* Decorative Scanning Line for Hover */}
            <div className="absolute top-0 left-0 w-full h-px bg-cyber-blue/40 -translate-y-full group-hover:animate-scan z-20"></div>
            
            {/* Grid Corner Decors */}
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/10 group-hover:border-cyber-blue/40 transition-colors"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/10 group-hover:border-cyber-blue/40 transition-colors"></div>
          </div>
        ))}
      </div>

      {/* Footer Decoration */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 flex justify-center">
        <div className="flex items-center space-x-8 opacity-20">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-px h-12 bg-white mb-2"></div>
              <span className="font-mono text-[6px] tracking-widest">SCTR_0{i+1}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
