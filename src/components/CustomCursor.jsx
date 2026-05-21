import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
      });
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleHover = (e) => {
      if (e.target.closest('a, button, .interactive')) {
        gsap.to(follower, {
          scale: 3,
          backgroundColor: "rgba(0, 102, 255, 0.2)",
          borderColor: "rgba(0, 102, 255, 0.5)",
          duration: 0.3
        });
      } else {
        gsap.to(follower, {
          scale: 1,
          backgroundColor: "transparent",
          borderColor: "rgba(255, 255, 255, 0.2)",
          duration: 0.3
        });
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHover);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHover);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
      <div 
        ref={cursorRef} 
        className="fixed w-2 h-2 bg-cyber-primary rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#0066ff]"
      />
      <div 
        ref={followerRef} 
        className="fixed w-8 h-8 border border-white/20 rounded-full -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out"
      />
    </div>
  );
};

export default CustomCursor;
