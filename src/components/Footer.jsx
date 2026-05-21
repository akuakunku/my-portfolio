import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-20 px-8 border-t border-white/5 relative overflow-hidden">
      {/* Decorative HUD background elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyber-blue/20 to-transparent"></div>
      <div className="absolute top-10 left-10 w-20 h-20 border-t border-l border-cyber-blue/10 pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-20 h-20 border-b border-r border-cyber-purple/10 pointer-events-none"></div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
        <div className="flex flex-col">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-2 h-2 bg-cyber-blue animate-pulse"></div>
            <span className="text-2xl font-black tracking-tighter uppercase">CHESKO</span>
          </div>
          <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest leading-relaxed">
            SYSTEM_INTEGRITY: OPTIMAL<br/>
            CORE_VERSION: 4.0.2<br/>
            SECTOR: WEB_DEV_SPEC
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col space-y-2">
            <span className="font-mono text-[8px] text-gray-600 uppercase tracking-[0.4em] mb-4 border-b border-white/5 pb-2">Navigation</span>
            <a href="/" className="font-mono text-[10px] uppercase tracking-widest text-gray-400 hover:text-cyber-blue transition-colors flex items-center group">
              <span className="w-1 h-1 bg-cyber-blue mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              Home
            </a>
            <a href="#portfolio" className="font-mono text-[10px] uppercase tracking-widest text-gray-400 hover:text-cyber-blue transition-colors flex items-center group">
              <span className="w-1 h-1 bg-cyber-blue mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              Projects
            </a>
          </div>
          <div className="flex flex-col space-y-2">
            <span className="font-mono text-[8px] text-gray-600 uppercase tracking-[0.4em] mb-4 border-b border-white/5 pb-2">Social_Links</span>
            <a href="https://github.com/chesko21" target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] uppercase tracking-widest text-gray-400 hover:text-cyber-blue transition-colors flex items-center group">
              <span className="w-1 h-1 bg-cyber-blue mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              GitHub
            </a>
            <a href="https://instagram.com/chesko_afiq" target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] uppercase tracking-widest text-gray-400 hover:text-cyber-blue transition-colors flex items-center group">
              <span className="w-1 h-1 bg-cyber-blue mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              Instagram
            </a>
            <a href="https://threads.net/@chesko_afiq" target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] uppercase tracking-widest text-gray-400 hover:text-cyber-blue transition-colors flex items-center group">
              <span className="w-1 h-1 bg-cyber-blue mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              Threads
            </a>
            <a href="https://tiktok.com/@afiq_chesko1" target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] uppercase tracking-widest text-gray-400 hover:text-cyber-blue transition-colors flex items-center group">
              <span className="w-1 h-1 bg-cyber-blue mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              TikTok
            </a>
          </div>
        </div>

        <div className="flex flex-col items-end justify-between text-right">
          <div className="font-mono text-[8px] text-gray-600 uppercase tracking-[0.4em] bg-white/5 px-3 py-1 rounded-full border border-white/10">
            SYNC_TIME: {new Date().toLocaleTimeString()}
          </div>
          <div className="mt-8">
            <p className="font-mono text-[10px] text-gray-500">
              &copy; {new Date().getFullYear()} [ CHESKO.SYS ]
            </p>
            <p className="font-mono text-[8px] text-gray-600 mt-1 uppercase tracking-widest">
              AUTONOMOUS_ENTITY_READY
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
