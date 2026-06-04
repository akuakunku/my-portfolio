import { useRef, useEffect, useState } from 'react';
import { techStack } from '../../data/tech';
import { SectionReveal } from '../layout/SectionReveal';

const TechMarquee = () => {
  const [techItems, setTechItems] = useState([]);

  useEffect(() => {
    // Create tech items with random properties
    const items = techStack.map((tech) => ({
      name: tech,
      width: Math.random() > 0.7 ? 'wide' : 'normal',
      opacity: Math.random() > 0.8 ? 0.7 : 1,
      scale: Math.random() > 0.9 ? 1.1 : 1,
      row: Math.floor(Math.random() * 4), // Random row 0-3
    }));
    
    // Shuffle the array
    const shuffled = [...items];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    setTechItems(shuffled);
  }, []);

  // Group items by row
  const rows = [[], [], [], []];
  techItems.forEach(item => {
    rows[item.row].push(item);
  });

  return (
    <section id="skills" className="section-py relative overflow-hidden bg-[#050505]">
      <div className="section-container mb-10">
        <SectionReveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-cyber-blue/70">
            Tech_Stack
          </p>
          <h2 className="mt-3 text-3xl font-black uppercase tracking-tighter text-white md:text-5xl">
            <span className="cyber-text-gradient">Core Systems</span>
          </h2>
        </SectionReveal>
      </div>

      <div className="relative px-4 space-y-4">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex flex-wrap gap-3 justify-center">
            {row.map((item, itemIndex) => (
              <span
                key={`${item.name}-${rowIndex}-${itemIndex}`}
                className={`
                  rounded-xl border border-cyber-blue/20 
                  bg-cyber-blue/5 
                  font-mono text-[10px] md:text-xs uppercase tracking-widest 
                  text-cyber-blue/90 hover:bg-cyber-blue/10 
                  transition-all duration-300 select-none 
                  text-center hover:scale-105 hover:border-cyber-blue/40
                  ${item.width === 'wide' ? 'px-8 py-3' : 'px-5 py-2.5'}
                `}
                draggable="false"
                style={{
                  opacity: item.opacity,
                  transform: `scale(${item.scale})`,
                  animation: `floatIn ${0.3 + itemIndex * 0.05}s ease-out forwards`,
                  animationDelay: `${rowIndex * 0.1 + itemIndex * 0.02}s`
                }}
              >
                {item.name}
              </span>
            ))}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes floatIn {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </section>
  );
};

export default TechMarquee;