"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, RESPECT_REDUCED_MOTION } from "@/lib/gsap";
// Smooth scrolling (wheel + nav links) kept in sync with GSAP ScrollTrigger.
export default function SmoothScroll() {
  useEffect(() => {
    // Mobile: don't recalculate on address-bar resize; recalculate once fonts/images are ready.
    ScrollTrigger.config({ ignoreMobileResize: true });
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);
    const t = setTimeout(refresh, 800);
    const cleanup = () => { clearTimeout(t); window.removeEventListener("load", refresh); };

    if (RESPECT_REDUCED_MOTION && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return cleanup;
    const lenis = new Lenis({ duration: 1.2, easing: (x) => Math.min(1, 1.001 - Math.pow(2, -10 * x)) });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    const onClick = (e) => {
      const a = e.target.closest?.('a[href^="#"]');
      const el = a && document.getElementById(a.getAttribute("href").slice(1));
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { duration: 1.6 });
      history.replaceState(null, "", a.getAttribute("href"));
    };
    document.addEventListener("click", onClick);
    return () => { cleanup(); document.removeEventListener("click", onClick); gsap.ticker.remove(tick); lenis.destroy(); };
  }, []);
  return null;
}