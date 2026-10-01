"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
// Smooth, eased scrolling (wheel + nav links), kept in sync with GSAP ScrollTrigger.
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    // Nav links (#about, #projects...) glide to their section instead of jumping.
    const onClick = (e) => {
      const a = e.target.closest?.('a[href^="#"]');
      const el = a && document.getElementById(a.getAttribute("href").slice(1));
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { duration: 1.6 });
      history.replaceState(null, "", a.getAttribute("href"));
    };
    document.addEventListener("click", onClick);
    return () => { document.removeEventListener("click", onClick); gsap.ticker.remove(tick); lenis.destroy(); };
  }, []);
  return null;
}
