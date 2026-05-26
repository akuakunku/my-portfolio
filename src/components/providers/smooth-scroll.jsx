import { createContext, useContext, useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext(null);

export function useLenis() {
  return useContext(LenisContext);
}

export function scrollToSection(id, offset = -80) {
  const el = document.getElementById(id);
  if (!el) return;

  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(el, { offset, duration: 1.2 });
    return;
  }
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function scrollToTop(immediate = true) {
  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(0, { immediate });
    return;
  }
  window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' });
}

export function SmoothScrollProvider({ children }) {
  const reduced = usePrefersReducedMotion();
  const lenisRef = useRef(null);

  useEffect(() => {
    if (typeof history !== 'undefined' && 'scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    if (reduced) {
      window.__lenis = null;
      scrollToTop(true);
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    const tickerFn = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    lenisRef.current = lenis;
    window.__lenis = lenis;

    requestAnimationFrame(() => {
      lenis.scrollTo(0, { immediate: true });
      ScrollTrigger.refresh();
    });

    return () => {
      gsap.ticker.remove(tickerFn);
      lenis.destroy();
      window.__lenis = null;
      ScrollTrigger.scrollerProxy(document.documentElement, {});
    };
  }, [reduced]);

  return <LenisContext.Provider value={lenisRef.current}>{children}</LenisContext.Provider>;
}
